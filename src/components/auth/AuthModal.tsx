import { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema } from '../../validations/auth.schema';
import { FormInput } from '../forms/FormInput';
import type {
  LoginFormData,
  SignupFormData,
} from '../../validations/auth.schema';
import { toast } from 'sonner';
import { login, register } from '../../service/authService';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { login: setLoginState } = useAuth();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    reset: resetLoginForm,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
    reset: resetSignupForm,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  if (!isOpen) return null;

  const loginHandler = async (values: LoginFormData) => {
    try {
      const response = await login(values);
      toast.success(response.message);
      setLoginState(response.token, response.orders);
      resetLoginForm();
      onClose();
    } catch (error) {
      toast.error(String(error));
    }
  };

  const signupHandler = async (values: SignupFormData) => {
    try {
      const response = await register({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      setLoginState(response.token, response.orders);
      toast.success(response.message);
      resetSignupForm();
      onClose();
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg">
        <button
          onClick={onClose}
          className="absolute text-gray-500 right-4 top-4 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold">
          {isLoginMode ? 'Welcome Back' : 'Create Account'}
        </h2>

        {isLoginMode ? (
          <form onSubmit={handleLoginSubmit(loginHandler)}>
            <div className="space-y-4">
              <FormInput
                label="Username"
                name="username"
                register={loginRegister}
                error={loginErrors.username?.message}
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                register={loginRegister}
                error={loginErrors.password?.message}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600"
                disabled={isLoginSubmitting}
              >
                {isLoginSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit(signupHandler)}>
            <div className="space-y-4">
              <FormInput
                label="Username"
                name="username"
                register={signupRegister}
                error={signupErrors.username?.message}
              />
              <FormInput
                label="Email"
                name="email"
                register={signupRegister}
                error={signupErrors.email?.message}
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                register={signupRegister}
                error={signupErrors.password?.message}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600"
                disabled={isSignupSubmitting}
              >
                {isSignupSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </form>
        )}

        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="mt-4 text-sm text-orange-500 hover:text-orange-600"
        >
          {isLoginMode
            ? 'Need an account? Sign up'
            : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
