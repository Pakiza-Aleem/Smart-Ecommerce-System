// components/Navbar.jsx - top nav, shown on every page
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, ShoppingCart, Heart, User } from 'lucide-react';
import { selectUser, selectIsAdmin, logout } from '../store/slices/authSlice';
import { selectCartCount } from '../store/slices/cartSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const count = useSelector(selectCartCount);
  const [menuOpen, setMenuOpen] = useState(false);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">ZENTRO</Link>

      <button
        type="button"
        className="navbar-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/#categories">Categories</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/cart">Cart{count > 0 && <span className="cart-badge">{count}</span>}</NavLink>
        {user && <NavLink to="/orders">Orders</NavLink>}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}

        {/* Mobile-only auth controls, shown inside the dropdown menu */}
        <div className="navbar-links-mobile-auth">
          {user ? (
            <>
              <span className="navbar-user">Hi, {user.name}</span>
              <button type="button" className="btn btn-text" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>

      <div className="navbar-actions">
        <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
          <Heart size={18} />
        </Link>
        <Link to="/cart" className="icon-btn navbar-cart" aria-label="Cart">
          <ShoppingCart size={18} />
          {count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name}</span>
            <button type="button" className="btn btn-text" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="icon-btn" aria-label="Account">
            <User size={18} />
          </Link>
        )}
      </div>

      {menuOpen && <button type="button" className="navbar-overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}
