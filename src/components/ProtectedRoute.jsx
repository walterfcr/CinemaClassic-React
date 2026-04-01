import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading spinner while checking auth
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, but save the current location
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
