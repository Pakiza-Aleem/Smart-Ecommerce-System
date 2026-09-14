// pages/ProductDetails.jsx - single product page + Ask ZEN + reviews
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Star } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import { selectUser } from '../store/slices/authSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsWishlisted } from '../store/slices/wishlistSlice';
import { fetchProductById, selectSelectedProduct, selectProductStatus } from '../store/slices/productSlice';
import { runProductQuestion, selectZenLoading, selectZenResult } from '../store/slices/aiSlice';
import { formatPKR } from '../utils/format';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectProductStatus);
  const wishlisted = useSelector(selectIsWishlisted(id));
  const asking = useSelector(selectZenLoading);
  const zenResult = useSelector(selectZenResult);

  const [question, setQuestion] = useState('');

  // review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  function loadProduct() {
    dispatch(fetchProductById(id));
  }

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (status === 'loading' && !product) return <Loader />;
  if (!product || product._id !== id) return <Loader />;

  async function handleAsk(e) {
    e.preventDefault();
    if (!question.trim()) return;
    dispatch(runProductQuestion({ productId: id, question }));
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    if (!user) return alert('Please log in to leave a review');
    await api.post(`/products/${id}/reviews`, { rating: reviewRating, comment: reviewComment });
    setReviewComment('');
    loadProduct(); // refresh so the new review + rating shows up
  }

  function handleToggleWishlist() {
    if (!user) return alert('Please log in first');
    if (wishlisted) dispatch(removeFromWishlist(product._id));
    else dispatch(addToWishlist(product._id));
  }

  return (
    <div className="product-details-page">
      <div className="product-details-top">
        <img src={product.image} alt={product.name} className="product-details-image" />

        <div className="product-details-info">
          <p className="muted">{product.brand} · {product.category}</p>
          <h1>{product.name}</h1>
          <div className="product-card-rating">
            <Star size={16} fill="currentColor" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="muted">({product.numReviews} reviews)</span>
          </div>
          <p className="product-price product-price-lg">{formatPKR(product.price)}</p>
          <p>{product.description}</p>
          <p className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          <table className="spec-table">
            <tbody>
              {Object.entries(product.specifications || {}).map(([key, val]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{String(val)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="product-details-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={product.stock === 0}
              onClick={() => {
                if (!user) return alert('Please log in first');
                dispatch(addToCart({ productId: product._id, quantity: 1 }));
              }}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className={`btn btn-outline ${wishlisted ? 'is-active' : ''}`}
              onClick={handleToggleWishlist}
              aria-pressed={wishlisted}
            >
              <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
              {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Ask ZEN */}
      <section className="ask-zen-section card">
        <h2>Ask ZEN about this product</h2>
        <form onSubmit={handleAsk} className="ai-search-form">
          <input
            type="text"
            placeholder="Is this good for gaming?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={asking}>
            {asking ? 'Asking...' : 'Ask'}
          </button>
        </form>
        {zenResult?.answer && <p className="ai-answer">{zenResult.answer}</p>}
      </section>

      {/* Reviews */}
      <section className="reviews-section">
        <h2>Reviews</h2>
        {product.reviews.length === 0 && <p className="muted">No reviews yet.</p>}
        {product.reviews.map((r) => (
          <div key={r._id} className="review card">
            <div className="review-header">
              <strong>{r.name}</strong>
              <span className="review-stars">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
              </span>
            </div>
            <p>{r.comment}</p>
          </div>
        ))}

        <form onSubmit={handleReviewSubmit} className="review-form">
          <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
          </select>
          <input
            type="text"
            placeholder="Write a review..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
    </div>
  );
}
