// App.jsx - defines every page route in ZENTRO
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ZenWidget from './components/ZenWidget';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Support from './pages/Support';

import { selectUser } from './store/slices/authSlice';
import { fetchCart, clearCartState } from './store/slices/cartSlice';
import { fetchWishlist, clearWishlistState } from './store/slices/wishlistSlice';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Keep cart + wishlist in sync with who's logged in - this is the Redux
  // replacement for the old CartContext's "refetch when user changes" effect.
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    } else {
      dispatch(clearCartState());
      dispatch(clearWishlistState());
    }
  }, [user, dispatch]);

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support/:topic" element={<Support />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ZenWidget />
    </>
  );
}
