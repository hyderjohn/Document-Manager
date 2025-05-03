import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// Import other slice reducers here as they are created
// e.g., import documentsReducer from './documentsSlice';

/**
 * Configures and creates the Redux store.
 *
 * Combines all slice reducers into a single root reducer.
 * Includes Redux DevTools Extension support and default middleware (like redux-thunk) automatically.
 */
export const store = configureStore({
  reducer: {
    // Add slice reducers here
    auth: authReducer,
    // documents: documentsReducer, // Example of adding another slice
  },
  // Middleware and DevTools are configured by default, but can be customized here if needed
});

/**
 * Type representing the complete state of the Redux store.
 * Inferred automatically from the store configuration.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the dispatch function for the Redux store.
 * Includes types for dispatching standard actions and thunks.
 */
export type AppDispatch = typeof store.dispatch; 