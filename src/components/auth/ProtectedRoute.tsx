import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/** ProtectedRoute props */
interface ProtectedRouteProps {
  /** The content to render if the user is authenticated. */
  children: React.ReactNode;
}

/** Route guard for authenticated users */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Get user status from the central auth hook
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    // User not authenticated, redirect to login
    // `replace` prevents the current (protected) URL from entering browser history
    return <Navigate to="/login" replace />;
  }

  // User authenticated, render the intended child component(s)
  return <>{children}</>;
};

export default ProtectedRoute; 