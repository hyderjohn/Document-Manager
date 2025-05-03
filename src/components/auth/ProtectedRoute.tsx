import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

/**
 * Props for the ProtectedRoute component.
 */
interface ProtectedRouteProps {
  /**
   * The child elements to render if the user is authenticated.
   */
  children: React.ReactNode;
}

/**
 * A component that wraps routes requiring authentication.
 *
 * It checks the authentication status from the Redux store.
 * If the user is authenticated, it renders the child components.
 * Otherwise, it redirects the user to the login page.
 *
 * @param {ProtectedRouteProps} props - The component props.
 * @returns {React.ReactElement} The child components or a Redirect component.
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // TODO: Consider using the `loggedInUser` from the `useAuth` hook
  // instead of directly selecting from the store here for consistency.
  const { user /*, token */ } = useSelector((state: RootState) => state.auth);

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render the requested route's component
  return <>{children}</>;
};

export default ProtectedRoute; 