import { useState, useEffect } from 'react';
import { Scale, Mail, Lock, Eye, EyeOff, User, Briefcase, Loader } from 'lucide-react';
import type { Page } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import logo from 'figma:asset/abdcc5fdd23bbd6fd9ff5c18e66196cd93db9a23.png';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
  isDarkTheme?: boolean;
}

export function LoginPage({ onNavigate, isDarkTheme }: LoginPageProps) {
  const { login, isLoading, error, clearError, isLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      onNavigate('home');
    }
  }, [isLoggedIn, onNavigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    clearError();

    if (!email || !password) {
      setLoginError('Please fill in all fields');
      return;
    }

    try {
      await login({ email, password });
      // Navigation handled by useEffect above
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setLoginError(message);
    }
  };

  const displayError = loginError || error;

  return (
    <div className={`pt-20 pb-20 min-h-screen flex items-center justify-center px-6 ${isDarkTheme ? 'bg-gray-900' : 'bg-gradient-to-br from-[#1A2A6C] via-[#2B3E8C] to-[#1A2A6C]'}`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="text-4xl font-bold text-white tracking-wider" style={{
              background: 'linear-gradient(135deg, #4FC3F7 0%, #64B5F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}>
              🔨 Estasheer
            </div>
          </div>
          <h1 className="text-3xl text-white mb-2">Welcome Back</h1>
          <p className="text-blue-200 dark:text-gray-400">Log in to access your account</p>
        </div>

        {/* Note about role */}
        <div className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-3 mb-6 border border-blue-400/30">
          <p className="text-blue-100 text-sm">
            Use your registered email and password. Your account role (Client/Lawyer) was set during registration.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          {/* Error Message */}
          {displayError && (
            <div className="mb-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 dark:focus:ring-blue-500/30 transition-all placeholder-gray-400"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 dark:focus:ring-blue-500/30 transition-all placeholder-gray-400"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-[#1A2A6C] hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}