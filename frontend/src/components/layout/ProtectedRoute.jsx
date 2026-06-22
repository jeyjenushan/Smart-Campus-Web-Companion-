import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * ProtectedRoute Component
 * Checks if user is authenticated before rendering the component
 * Redirects to signin if not authenticated
 */
export function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
