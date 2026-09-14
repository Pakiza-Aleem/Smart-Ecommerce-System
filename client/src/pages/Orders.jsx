// pages/Orders.jsx - read-only order history
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PackageSearch } from 'lucide-react';
import Loader from '../components/Loader';
import { fetchOrders, selectOrders, selectOrderStatus } from '../store/slices/orderSlice';
import { formatPKR } from '../utils/format';

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const status = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === 'loading' && orders.length === 0) return <Loader />;

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <PackageSearch size={40} />
        <h2>You have no orders yet</h2>
        <p>Once you check out, your orders will show up here.</p>
        <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      <div className="orders-table-wrap">
        <table className="orders-table">
          <thead>
            <tr><th>Order #</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(-6).toUpperCase()}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>{o.items.map((i) => `${i.name} x${i.quantity}`).join(', ')}</td>
                <td>{formatPKR(o.totalPrice)}</td>
                <td><span className={`status status-${o.status}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
