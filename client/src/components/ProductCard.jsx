// components/ProductCard.jsx - one product tile, used on Home/Shop/AI results
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { selectUser } from '../store/slices/authSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsWishlisted } from '../store/slices/wishlistSlice';
import { formatPKR } from '../utils/format';

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
          src={product.image || 'https://placehold.co/400x300/F7F7F5/6B7280?text=ZENTRO'}
          alt={product.name}
          className="product-card-image"
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
