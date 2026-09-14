// pages/Cart.jsx - view/edit cart, then go to checkout
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';
import { fetchCart, updateCartItem, removeFromCart, selectCartItems, selectCartTotal } from '../store/slices/cartSlice';
import { selectUser } from '../store/slices/authSlice';
import { formatPKR } from '../utils/format';

export default function Cart() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const status = useSelector((state) => state.cart.status);

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [user, dispatch]);

  if (status === 'loading' && items.length === 0) return <Loader />;

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <ShoppingBag size={40} />
        <h2>Your cart is empty</h2>
        <p>Browse the catalog and add something you like.</p>
        <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onUpdateQuantity={(productId, quantity) => dispatch(updateCartItem({ productId, quantity }))}
            onRemove={(productId) => dispatch(removeFromCart(productId))}
          />
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: {formatPKR(total)}</h3>
        <Link to="/checkout" className="btn btn-primary">Checkout</Link>
      </div>
    </div>
  );
}
