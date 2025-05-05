import { Link } from 'react-router-dom';

/** 404 Not Found Page */
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-8xl sm:text-9xl font-extrabold text-primary-600 tracking-tight">404</h1>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
            Oops! Page not found.
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center px-6 py-3 text-base font-medium"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;