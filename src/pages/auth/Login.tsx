import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

/**
 * Interface defining the structure for login form data.
 */
export interface LoginFormData {
  /**
   * User's email address.
   */
  email: string;
  /**
   * User's password.
   */
  password: string;
}

/**
 * Login page component.
 *
 * Renders the login form and uses the `useAuth` hook to handle
 * form submission, loading state, and potential errors.
 */
const Login = () => {
  const { handleLogin, isLoading /*, loginError */ } = useAuth(); // loginError available if needed for display
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  /**
   * Handles the form submission by calling the login handler from the useAuth hook.
   * @param {LoginFormData} data - The validated form data.
   */
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    handleLogin(data);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            id="email"
            type="email"
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-100"
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            id="password"
            type="password"
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-100"
            placeholder="Enter your password"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </div>

      <div className="text-sm text-center">
        <Link
          to="/register"
          className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
        >
          Don't have an account? Sign up
        </Link>
      </div>

      <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
        <p className="font-medium mb-2">Demo credentials:</p>
        <p className="mb-1">Admin: admin@example.com / admin123</p>
        <p>User: user@example.com / user123</p>
      </div>
    </form>
  );
};

export default Login;
