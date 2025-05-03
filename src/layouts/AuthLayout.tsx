import { Outlet } from 'react-router-dom';

/**
 * Authentication Layout.
 *
 * Provides the layout structure for authentication pages (Login, Register).
 * Centers a content card with a gradient background.
 * The specific auth form (Login or Register) is rendered via `<Outlet />`.
 */
const AuthLayout = () => {
  return (
    // Full screen container, centering content vertically and horizontally
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 py-12 px-4 sm:px-6 lg:px-8">
      {/* Content card with white background, padding, and shadow */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 space-y-8">
        {/* Header Section */}
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            DocManager
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in or create an account
          </p>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 