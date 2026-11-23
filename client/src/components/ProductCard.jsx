// components/ProductCard.jsx - one product tile, used on Home/Shop/AI results
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { selectUser } from '../store/slices/authSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsWishlisted } from '../store/slices/wishlistSlice';
import { formatPKR } from '../utils/format';

// On-theme fallback shown when a product has no image: a clean graphite
// blueprint tile with an electric accent mark, instead of a stock placeholder.
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F2F4F6'/%3E%3Cg stroke='%23DCE0E5' stroke-width='1'%3E%3Cpath d='M0 60h400M0 120h400M0 180h400M0 240h400M80 0v300M160 0v300M240 0v300M320 0v300'/%3E%3C/g%3E%3Crect x='14' y='14' width='372' height='272' fill='none' stroke='%23C1C7CF' stroke-width='2'/%3E%3Crect x='186' y='118' width='28' height='28' fill='%23C9F227' stroke='%2314161A' stroke-width='2'/%3E%3Cpath d='M196 126l10 6-10 6z' fill='%2314161A'/%3E%3Ctext x='200' y='196' font-family='monospace' font-size='15' fill='%236A7079' text-anchor='middle' letter-spacing='3'%3EZENTRO%3C/text%3E%3C/svg%3E";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const wishlisted = useSelector(selectIsWishlisted(product._id));

  function handleAddToCart(e) {
    e.preventDefault(); // don't follow the <Link> when clicking the button
    e.stopPropagation();
    if (!user) return alert('Please log in first');
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  }

  function handleToggleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return alert('Please log in first');
    if (wishlisted) dispatch(removeFromWishlist(product._id));
    else dispatch(addToWishlist(product._id));
  }

  return (
    <Link to={`/product/${product._id}`} className="product-card card">
      <div className="product-card-image-wrap">
        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <button
          type="button"
          className={`icon-btn wishlist-btn ${wishlisted ? 'is-active' : ''}`}
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
        >
          <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card-body">
        <p className="product-card-brand">{product.brand}</p>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-category">{product.category}</p>
        <div className="product-card-rating">
          <Star size={14} fill="currentColor" />
          <span>{(product.rating || 0).toFixed(1)}</span>
          <span className="muted">({product.numReviews || 0})</span>
        </div>
        <div className="product-card-footer">
          <p className="product-price">{formatPKR(product.price)}</p>
          <button
            type="button"
            className="icon-btn cart-btn"
            onClick={handleAddToCart}
            aria-label="Add to cart"
            disabled={product.stock === 0}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
