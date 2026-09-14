// pages/Admin.jsx - admin dashboard: stats, product CRUD, order status
import { useEffect, useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import api from '../services/api';
import { formatPKR } from '../utils/format';
import { CATEGORIES } from './Shop';

const PRODUCT_CATEGORIES = CATEGORIES.filter(Boolean);
const emptyForm = { name: '', price: '', category: PRODUCT_CATEGORIES[0], brand: '', stock: '', description: '', image: '' };

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); // null = "add" mode, else "edit" mode

  // The image file the admin picked, if any. When set, it's uploaded to
  // Cloudinary on submit and its hosted URL replaces form.image entirely.
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  function loadData() {
    api.get('/products').then((res) => setProducts(res.data));
    api.get('/orders', { params: { all: true } }).then((res) => setOrders(res.data));
  }

  useEffect(() => { loadData(); }, []);

  const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // local preview only, nothing uploaded yet
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function startEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name, price: product.price, category: product.category,
      brand: product.brand, stock: product.stock, description: product.description,
      image: product.image,
    });
    setImageFile(null);
    setImagePreview(product.image || '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      // FormData whenever there's a new file to upload (multipart/form-data,
      // parsed by Multer -> uploaded to Cloudinary server-side). Otherwise a
      // plain JSON-friendly object keeps the existing/typed image URL as-is.
      let body;
      if (imageFile) {
        body = new FormData();
        Object.entries(form).forEach(([key, value]) => body.append(key, value ?? ''));
        body.set('image', imageFile); // the file itself, under the same "image" field
      } else {
        body = { ...form, price: Number(form.price), stock: Number(form.stock) };
      }

      if (editingId) {
        await api.put(`/products/${editingId}`, body);
      } else {
        await api.post('/products', body);
      }
      resetForm();
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save product');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    loadData();
  }

  async function handleStatusChange(orderId, status) {
    await api.put(`/orders/${orderId}/status`, { status });
    loadData();
  }

  return (
    <div className="admin-page">
      <h1>ZENTRO Admin</h1>

      <div className="admin-stats">
        <div className="card stat-card"><h3>{products.length}</h3><p>Products</p></div>
        <div className="card stat-card"><h3>{orders.length}</h3><p>Orders</p></div>
        <div className="card stat-card"><h3>{formatPKR(revenue)}</h3><p>Revenue</p></div>
      </div>

      <section>
        <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} className="admin-product-form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price (PKR)" value={form.price} onChange={handleChange} required />
          <select name="category" value={form.category} onChange={handleChange} required>
            {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />

          <div className="admin-image-field">
            {imagePreview && <img src={imagePreview} alt="Product preview" className="admin-image-preview" />}
            <div className="admin-image-inputs">
              <label className="btn btn-secondary admin-file-btn">
                <ImagePlus size={16} />
                {imageFile ? 'Change selected file' : 'Upload image'}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  hidden
                />
              </label>
              <span className="muted">or paste an image URL:</span>
              <input
                name="image"
                placeholder="https://..."
                value={form.image}
                onChange={(e) => { handleChange(e); setImagePreview(e.target.value); setImageFile(null); }}
                disabled={Boolean(imageFile)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Product'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-text" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </section>

      <section>
        <h2>Products</h2>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{formatPKR(p.price)}</td>
                <td>{p.stock}</td>
                <td>
                  <button type="button" className="btn btn-text" onClick={() => startEdit(p)}>Edit</button>
                  <button type="button" className="btn btn-text" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Orders</h2>
        <table className="admin-table">
          <thead><tr><th>Order #</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(-6).toUpperCase()}</td>
                <td>{formatPKR(o.totalPrice)}</td>
                <td>
                  <select value={o.status} onChange={(e) => handleStatusChange(o._id, e.target.value)}>
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
