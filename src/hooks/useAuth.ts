import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store"; // Adjust path if needed
import { loginUser, registerUser, logout, clearAuthError } from "../store/authSlice"; // Adjust path if needed
import { LoginFormData } from "../pages/auth/Login"; // Adjust path if needed
import { RegisterFormData } from "../pages/auth/Register"; // Adjust path if needed

/**
 * Custom hook for handling authentication logic.
 *
 * Encapsulates interactions with the auth slice of the Redux store,
 * manages side effects like navigation and toasts based on auth status.
 *
 * @returns {object} An object containing authentication state and actions.
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error: authError, user } = useSelector((state: RootState) => state.auth);

  /**
   * Dispatches the loginUser action with the provided form data.
   * @param {LoginFormData} data - The user's login credentials.
   */
  const handleLogin = (data: LoginFormData) => {
    dispatch(loginUser(data));
  };

  /**
   * Dispatches the registerUser action with the provided form data.
   * @param {RegisterFormData} data - The user's registration details.
   */
  const handleRegister = (data: RegisterFormData) => {
    dispatch(registerUser({ email: data.email, password: data.password, confirmPassword: data.confirmPassword }));
  };

  /**
   * Dispatches the logout action and navigates to the login page.
   */
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out");
    navigate("/login");
  };

  // Effect to handle post-authentication actions (navigation, toasts)
  useEffect(() => {
    // Navigate to dashboard on successful login/registration
    if (status === "succeeded" && user) {
      toast.success("Authentication successful!");
      navigate("/");
    }
    // Show error toast on failure
    else if (status === "failed" && authError) {
      toast.error(authError || "Authentication failed");
      // Clear the error after showing it so it doesn't persist
      dispatch(clearAuthError());
    }
  }, [status, user, authError, navigate, dispatch]);

  /**
   * Boolean indicating if an authentication operation (login, register) is in progress.
   */
  const isLoading = status === "loading";

  // Ensure the return object includes all handlers
  return {
    /** The current status of the authentication request ('idle', 'loading', 'succeeded', 'failed'). */
    authStatus: status,
    /** Any error message returned from the last failed authentication attempt. */
    authError,
    /** The currently authenticated user object, or null if not logged in. */
    loggedInUser: user,
    isLoading,
    handleLogin,
    handleRegister, // Explicitly ensure handleRegister is returned
    handleLogout,
  };
};
