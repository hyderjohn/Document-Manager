import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// Import other slice reducers here as they are created
// e.g., import documentsReducer from './documentsSlice';

/**
 * Configures the main Redux store for the application.
 *
 * Uses `configureStore` from Redux Toolkit, which simplifies setup:
 * - Combines slice reducers.
 * - Adds necessary middleware (like redux-thunk for async actions).
 * - Enables Redux DevTools Extension integration.
 */
export const store = configureStore({
  reducer: {
    // Register slice reducers here. The key name determines the state property name.
    auth: authReducer,
    // documents: documentsReducer, // Example of adding another slice
  },
  // `middleware` and `devTools` are automatically configured.
  // Customization is possible but often not needed initially.
});

/**
 * Represents the type of the entire Redux state tree.
 * Automatically inferred from the `store` configuration.
 * Use this type for `useSelector` hooks.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Represents the specific dispatch function type for this store.
 * Includes types for thunks as well as standard actions.
 * Use this type for `useDispatch` hooks and when dispatching thunks.
 */
export type AppDispatch = typeof store.dispatch; 