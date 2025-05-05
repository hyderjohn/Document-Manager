import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// Import other slice reducers here as they are created
// e.g., import documentsReducer from './documentsSlice';

/** Main Redux store configuration */
export const store = configureStore({
  reducer: {
    // Register slice reducers here. The key name determines the state property name.
    auth: authReducer,
    // documents: documentsReducer, // Example of adding another slice
  },
  // `middleware` and `devTools` are automatically configured.
  // Customization is possible but often not needed initially.
});

/** Root state type inferred from the store */
export type RootState = ReturnType<typeof store.getState>;

/** App dispatch type inferred from the store */
export type AppDispatch = typeof store.dispatch; 