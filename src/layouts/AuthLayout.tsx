import { Outlet } from 'react-router-dom';

/**
 * Layout for Authentication Pages (Login, Register).
 *
 * Displays a centered card on a gradient background where the specific
 * authentication form (Login or Register) is rendered using React Router's `<Outlet />`.
 */
const AuthLayout = () => {
  return (
    // Full-height container, centers the card
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 py-12 px-4 sm:px-6 lg:px-8">
      {/* The content card */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 space-y-8">
        {/* Card Header: Title and subtitle */}
        <div>
          {/* Consider replacing this with a Logo component */}
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            DocManager
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in or create an account
          </p>
        </div>
        {/* Renders the matched child route component (Login or Register) */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 