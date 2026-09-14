// components/ProductGrid.jsx - renders a list of ProductCard, or loading/empty states
import Loader from './Loader';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading }) {
  if (loading) return <Loader />;
  if (!products || products.length === 0) return <p className="empty-state">No products found.</p>;

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
