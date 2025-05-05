import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { mockAuthService, User } from "../services/authService";
import { LoginFormData } from "../pages/auth/Login";
import { RegisterFormData } from "../pages/auth/Register";

/** Shape of the auth state */
interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

/** Thunk for user login */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await mockAuthService.login(credentials.email, credentials.password);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Login failed");
    }
  }
);

/** Thunk for user registration */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await mockAuthService.register(credentials.email, credentials.password);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Registration failed");
    }
  }
);

/** Auth slice definition */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Logs out the user */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
    /** Clears the auth error */
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
