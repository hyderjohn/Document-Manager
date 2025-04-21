import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockAuthService, User } from "../services/authService";
import { LoginFormData } from "../pages/auth/Login"; 
import { RegisterFormData } from "../pages/auth/Register";

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

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials: LoginFormData, { rejectWithValue }) => {
  try {
    const response = await mockAuthService.login(credentials.email, credentials.password);

    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await mockAuthService.register(credentials.email, credentials.password);

      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
    
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
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

      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
