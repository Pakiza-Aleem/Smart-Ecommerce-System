// components/Footer.jsx - full working footer, shown on customer-facing pages
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <p className="footer-logo">ZENTRO</p>
          <p className="muted">Smart technology, thoughtfully curated.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shop">All Products</Link>
          <Link to="/shop?category=Smartphones">Smartphones</Link>
          <Link to="/shop?category=Laptops">Laptops</Link>
          <Link to="/shop?category=Audio">Audio</Link>
          <Link to="/shop?category=Gaming">Gaming</Link>
          <Link to="/shop?category=Smart+Home">Smart Home</Link>
        </div>

        <div className="footer-col">
          <h4>Customer</h4>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/login">Account</Link>
        </div>

        <div className="footer-col">
          <h4>ZEN</h4>
          <Link to="/#ask-zen">Ask ZEN</Link>
          <Link to="/shop">Smart Search</Link>
          <Link to="/shop">Product Comparison</Link>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/support/contact">Contact</Link>
          <Link to="/support/faq">Help / FAQ</Link>
          <Link to="/support/shipping">Shipping</Link>
          <Link to="/support/returns">Returns</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ZENTRO. All rights reserved.</p>
      </div>
    </footer>
  );
}
