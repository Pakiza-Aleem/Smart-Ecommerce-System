// pages/Checkout.jsx - one simple form, Cash on Delivery only
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCartTotal, selectCartItems } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/orderSlice';
import { formatPKR } from '../utils/format';

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector(selectCartTotal);
  const items = useSelector(selectCartItems);
  const [form, setForm] = useState({ fullName: '', address: '', city: '', phone: '' });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setPlacing(true);
    try {
      await dispatch(createOrder({ shippingAddress: form })).unwrap();
      await dispatch(fetchCart()); // cart is now empty on the server, sync local state
      navigate('/orders');
    } catch (err) {
      setError(err?.message || 'Could not place order');
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form card">
          {error && <p className="error-text">{error}</p>}
          <label>
            Full name
            <input name="fullName" placeholder="Full name" value={form.fullName} onChange={handleChange} required />
          </label>
          <label>
            Address
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          </label>
          <label>
            City
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          </label>
          <label>
            Phone
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          </label>

          <button type="submit" className="btn btn-primary" disabled={placing || items.length === 0}>
            {placing ? 'Placing order...' : 'Place Order'}
          </button>
        </form>

        <div className="checkout-summary card">
          <h3>Order Summary</h3>
          {items.map((item) => (
            <div className="checkout-summary-row" key={item.product._id}>
              <span>{item.product.name} × {item.quantity}</span>
              <span>{formatPKR(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <p><strong>Payment method:</strong> Cash on Delivery</p>
          <div className="checkout-summary-total">
            <strong>Total</strong>
            <strong>{formatPKR(total)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
