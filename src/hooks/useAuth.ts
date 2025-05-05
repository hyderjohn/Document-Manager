import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginUser, registerUser, logout, clearAuthError } from "../store/authSlice";
import { LoginFormData } from "../pages/auth/Login";
import { RegisterFormData } from "../pages/auth/Register";

/**
 * Hook managing authentication state and actions.
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error: authError, user } = useSelector((state: RootState) => state.auth);

  // Ref to track the previous status, initialized with current status
  const prevStatusRef = useRef<typeof status>(status);

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
    // Only show success toast on transition from loading to succeeded
    if (status === "succeeded" && prevStatusRef.current === "loading" && user) {
      toast.success("Authentication successful!");
      navigate("/");
    } else if (status === "failed" && authError) {
      toast.error(authError || "Authentication failed");
      dispatch(clearAuthError());
    }

    // Update previous status ref *after* checking the transition
    prevStatusRef.current = status;
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
