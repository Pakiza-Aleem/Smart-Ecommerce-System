// components/ProductGrid.jsx - renders a list of ProductCard, or loading/empty states.
// Supports a "strip" variant used on mobile for swipeable featured rows.
import { Link } from 'react-router-dom';
import Loader from './Loader';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading, variant = 'grid', viewAllTo }) {
  if (loading) return <Loader />;
  if (!products || products.length === 0) return <p className="empty-state">No products found.</p>;

  const isStrip = variant === 'strip';

  return (
    <div className={isStrip ? 'product-grid-strip' : 'product-grid'}>
      <div className={isStrip ? 'product-grid-strip__track' : 'product-grid__track'}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      {isStrip && viewAllTo && (
        <div className="product-grid-footer">
          <Link to={viewAllTo} className="btn btn-outline product-grid-view-all">
            View All
          </Link>
        </div>
      )}
    </div>
  );
}