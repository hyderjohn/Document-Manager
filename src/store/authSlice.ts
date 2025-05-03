import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { mockAuthService, User } from "../services/authService";
import { LoginFormData } from "../pages/auth/Login";
import { RegisterFormData } from "../pages/auth/Register";

/**
 * Interface defining the structure of the authentication state in the Redux store.
 */
interface AuthState {
  /** The authenticated user object, or null if not logged in. */
  user: User | null;
  /** The authentication token (e.g., JWT), or null if not logged in. */
  token: string | null;
  /** The current status of async operations (login, register). */
  status: "idle" | "loading" | "succeeded" | "failed";
  /** Stores any error message from failed async operations. */
  error: string | null;
}

/**
 * The initial state for the authentication slice.
 */
const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

/**
 * Async thunk action for handling user login.
 *
 * Calls the authentication service's login method and handles success/error cases.
 * Dispatches pending, fulfilled, or rejected actions based on the API call result.
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser", // Action type prefix
  async (credentials: LoginFormData, { rejectWithValue }) => {
    try {
      // TODO: Replace mockAuthService with actual service call
      const response = await mockAuthService.login(credentials.email, credentials.password);
      // On success, the response (user and token) is returned and becomes the fulfilled action payload
      return response;
    } catch (error) {
      // On error, return the error message to be the rejected action payload
      return rejectWithValue((error as Error).message || "Login failed");
    }
  }
);

/**
 * Async thunk action for handling user registration.
 *
 * Calls the authentication service's register method.
 * Dispatches pending, fulfilled, or rejected actions.
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser", // Action type prefix
  async (credentials: RegisterFormData, { rejectWithValue }) => {
    try {
      // TODO: Replace mockAuthService with actual service call
      const response = await mockAuthService.register(credentials.email, credentials.password);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Registration failed");
    }
  }
);

/**
 * Redux Toolkit slice for managing authentication state.
 *
 * Includes the initial state, reducers for synchronous actions (logout),
 * and extra reducers to handle the lifecycle of async thunk actions (loginUser, registerUser).
 */
const authSlice = createSlice({
  name: "auth", // Slice name, used in action types
  initialState,
  reducers: {
    /**
     * Reducer action to log the user out.
     * Resets user, token, status, and error to initial values.
     * @param {AuthState} state - The current authentication state.
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      // Optionally, clear token from localStorage/sessionStorage here
    },
    /**
     * Reducer action to clear the authentication error state.
     * Can be dispatched manually after displaying an error to the user.
     * @param {AuthState} state - The current authentication state.
     */
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  // Handlers for async thunk actions
  extraReducers: (builder) => {
    builder
      // --- Login User --- //
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors on new attempt
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Optionally, store token in localStorage/sessionStorage here
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Error message from rejectWithValue
        state.user = null; // Ensure user/token are cleared on failed login
        state.token = null;
      })
      // --- Register User --- //
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Optionally, store token in localStorage/sessionStorage here
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
      });
  },
});

// Export the synchronous actions
export const { logout, clearAuthError } = authSlice.actions;

// Export the reducer function for the store configuration
export default authSlice.reducer;
