import { Navigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

/**
 * Props expected by the ProtectedRoute component.
 */
interface ProtectedRouteProps {
  /** The content to render if the user is authenticated. */
  children: React.ReactNode;
}

/**
 * Wraps routes that require user authentication.
 *
 * Checks authentication status using the `useAuth` hook.
 * Renders the route's content (`children`) if logged in,
 * otherwise redirects to the `/login` page.
 */
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