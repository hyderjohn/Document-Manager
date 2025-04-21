import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-card p-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Document Management
          </h2>
          <h3 className="text-center text-xl text-gray-600 mt-2">
            System
          </h3>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 