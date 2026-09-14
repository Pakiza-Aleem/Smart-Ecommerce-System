// components/AdminRoute.jsx - guards /admin so only admins can see it
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectIsAdmin } from '../store/slices/authSlice';

export default function AdminRoute({ children }) {
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);

  if (!user) return <Navigate to="/login" replace />;   // not logged in at all
  if (!isAdmin) return <Navigate to="/" replace />;      // logged in but not an admin

  return children;
}
