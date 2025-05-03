import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
// import { Toaster } from "react-hot-toast"; // Toaster seems unused here, maybe used within App?
import { store } from './store/store';
import "./index.css"; // Global styles
import App from "./App";

/**
 * Main application entry point.
 *
 * Initializes the React application, sets up the Redux store provider,
 * and renders the root App component.
 */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element with ID 'root'. Check your index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* Provides the Redux store to the entire application */}
    <Provider store={store}>
      {/* Main application component */}
      <App />
      {/* Note: <Toaster /> for react-hot-toast should likely be placed within App.tsx 
          or a top-level layout component to be accessible everywhere */}
    </Provider>
  </React.StrictMode>
);
