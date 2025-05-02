import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { registerUser } from '../../store/authSlice';

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error: authError, user } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    dispatch(registerUser({ email: data.email, password: data.password, confirmPassword: data.confirmPassword }));
  };

  useEffect(() => {
    if (status === 'succeeded' && user) {
      toast.success('Registration successful!');
      navigate('/');
    } else if (status === 'failed' && authError) {
      toast.error(authError || 'Registration failed');
    }
  }, [status, user, authError, navigate]);

  const isLoading = status === 'loading';

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            id="email"
            type="email"
            disabled={isLoading}
            className="input rounded-t-md disabled:opacity-50 disabled:bg-gray-100"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            id="password"
            type="password"
            disabled={isLoading}
            className="input disabled:opacity-50 disabled:bg-gray-100"
            placeholder="Password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value =>
                value === password || 'The passwords do not match',
            })}
            id="confirmPassword"
            type="password"
            disabled={isLoading}
            className="input rounded-b-md disabled:opacity-50 disabled:bg-gray-100"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </div>

      <div className="text-sm text-center">
        <Link
          to="/login"
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
};

export default Register; 