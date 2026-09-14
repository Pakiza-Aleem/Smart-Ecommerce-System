// pages/Wishlist.jsx - backed by the server-side wishlist (Wishlist model),
// state shared via wishlistSlice.
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import Loader from '../components/Loader';
import { fetchWishlist, selectWishlistProducts } from '../store/slices/wishlistSlice';
import { selectUser } from '../store/slices/authSlice';

export default function Wishlist() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const products = useSelector(selectWishlistProducts);
  const status = useSelector((state) => state.wishlist.status);

  useEffect(() => {
    if (user) dispatch(fetchWishlist());
  }, [user, dispatch]);

  if (!user) {
    return (
      <div className="empty-state">
        <Heart size={40} />
        <h2>Log in to see your wishlist</h2>
        <p>Save products you like and find them here later.</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  if (status === 'loading' && products.length === 0) return <Loader />;

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <Heart size={40} />
        <h2>Your wishlist is empty</h2>
        <p>Tap the heart on any product to save it here.</p>
        <Link to="/shop" className="btn btn-primary">Browse the Shop</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>Wishlist</h1>
      <ProductGrid products={products} loading={false} />
    </div>
  );
}
