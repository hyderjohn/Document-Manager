import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store"; // Adjust path if needed
import { loginUser, registerUser, logout, clearAuthError } from "../store/authSlice"; // Adjust path if needed
import { LoginFormData } from "../pages/auth/Login"; // Adjust path if needed
import { RegisterFormData } from "../pages/auth/Register"; // Adjust path if needed

/**
 * Centralized hook for authentication operations.
 *
 * Handles interactions with the Redux auth state (dispatching actions, selecting state)
 * and manages related side-effects like navigation and toast notifications.
 *
 * @returns Authentication state and handler functions.
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error: authError, user } = useSelector((state: RootState) => state.auth);

  /**
   * Triggers the user login process.
   * @param data User login credentials.
   */
  const handleLogin = (data: LoginFormData) => {
    dispatch(loginUser(data));
  };

  /**
   * Triggers the user registration process.
   * @param data User registration details.
   */
  const handleRegister = (data: RegisterFormData) => {
    // Note: Uses the same status/error flags in authSlice as login.
    // Separate flags might be needed if more distinct feedback is required.
    dispatch(registerUser({ email: data.email, password: data.password, confirmPassword: data.confirmPassword }));
  };

  /**
   * Logs the user out, shows feedback, and redirects to login.
   */
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out");
    navigate("/login");
  };

  // Handle side effects after auth status changes
  useEffect(() => {
    if (status === "succeeded" && user) {
      // Redirect on successful login or registration
      toast.success("Authentication successful!"); // Generic success message for now
      navigate("/");
    } else if (status === "failed" && authError) {
      // Show error toast and clear the error state
      toast.error(authError || "Authentication failed");
      dispatch(clearAuthError()); // Prevent error from sticking around
    }
  }, [status, user, authError, navigate, dispatch]);

  /** True if login or register is currently in progress. */
  const isLoading = status === "loading";

  return {
    /** Current auth request status: 'idle', 'loading', 'succeeded', 'failed'. */
    authStatus: status,
    /** Error message from the last failed auth attempt, if any. */
    authError,
    /** The logged-in user object, or null. */
    loggedInUser: user,
    /** Loading state flag. */
    isLoading,
    /** Function to initiate login. */
    handleLogin,
    /** Function to initiate registration. */
    handleRegister,
    /** Function to initiate logout. */
    handleLogout,
  };
};
