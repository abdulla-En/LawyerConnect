import { useState, useEffect } from 'react';
import { Scale, Mail, Lock, User, Eye, EyeOff, Briefcase, Loader, Phone, MapPin, DollarSign, Award, Home } from 'lucide-react';
import type { Page } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import logo from 'figma:asset/abdcc5fdd23bbd6fd9ff5c18e66196cd93db9a23.png';

interface SignupPageProps {
  onNavigate: (page: Page) => void;
  isDarkTheme?: boolean;
}

export function SignupPage({ onNavigate, isDarkTheme }: SignupPageProps) {
  const { register, isLoading, error, clearError, isLoggedIn } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupType, setSignupType] = useState<'user' | 'lawyer'>('user');
  const [signupError, setSignupError] = useState('');

  // Lawyer-specific fields
  const [specialization, setSpecialization] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      onNavigate('home');
    }
  }, [isLoggedIn, onNavigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    clearError();

    // Validation
    if (!fullName || !email || !password || !confirmPassword || !phone || !city) {
      setSignupError('Please fill in all fields');
      return;
    }

    if (signupType === 'lawyer' && (!specialization || !experienceYears || !price || !address)) {
      setSignupError('Please fill in all lawyer profile fields');
      return;
    }

    if (password !== confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setSignupError('Password must be at least 6 characters');
      return;
    }

    try {
      // Step 1: Register user
      const authResponse = await register({
        fullName,
        email,
        password,
        phone,
        city,
        role: signupType === 'lawyer' ? 'Lawyer' : 'User',
      });

      console.log('User registered successfully:', authResponse);

      // Step 2: If lawyer, register lawyer profile
      if (signupType === 'lawyer') {
        try {
          console.log('Attempting to register lawyer profile with:', {
            specialization,
            experienceYears: parseInt(experienceYears, 10),
            price: parseFloat(price),
            address,
          });

          // Use the token from the registration response directly
          const token = authResponse.token;
          if (!token) {
            throw new Error('Auth token not found in registration response.');
          }

          console.log('Auth token received from registration, proceeding with lawyer registration');

          // Validate token format (basic check)
          if (typeof token !== 'string' || token.length < 10) {
            throw new Error('Invalid auth token format.');
          }

          const result = await apiService.registerLawyer({
            specialization,
            experienceYears: parseInt(experienceYears, 10),
            price: parseFloat(price),
            address,
            latitude: 0, // Default coordinates - can be updated later
            longitude: 0,
          }, token); // Pass token directly

          console.log('Lawyer profile registered successfully:', result);
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to create lawyer profile';
          console.error('Lawyer registration error - Full error:', err);
          console.error('Lawyer registration error - Message:', message);
          
          // Display error to user (optional)
          alert(`Error: ${message}`);
        }
      }

      // Navigation handled by useEffect above
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      console.error('Registration error:', err);
      setSignupError(message);
    }
  };

  const displayError = signupError || error;

  return (
    <div className={`pt-20 pb-20 min-h-screen flex items-center justify-center px-6 ${isDarkTheme ? 'bg-gray-900' : 'bg-gradient-to-br from-[#1A2A6C] via-[#2B3E8C] to-[#1A2A6C]'}`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img
              src={require('../../assets/abdcc5fdd23bbd6fd9ff5c18e66196cd93db9a23.png')}
              alt="Estasheer Logo"
              className="h-16 w-16 rounded-full object-contain bg-white"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
            />
          </div>
          <h1 className="text-3xl text-white mb-2">Create Account</h1>
          <p className="text-blue-200 dark:text-gray-400">Join us to get expert legal assistance</p>
        </div>

        {/* Signup Type Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 mb-6 flex gap-1.5">
          <button
            type="button"
            onClick={() => setSignupType('user')}
            className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              signupType === 'user'
                ? 'bg-white text-[#1A2A6C] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <User className="w-4 h-4" />
            Client
          </button>
          <button
            type="button"
            onClick={() => setSignupType('lawyer')}
            className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              signupType === 'lawyer'
                ? 'bg-white text-[#1A2A6C] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Lawyer
          </button>
        </div>

        {/* Signup Form */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          {/* Error Message */}
          {displayError && (
            <div className="mb-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Anderson"
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 transition-all placeholder-gray-400"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

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
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 transition-all placeholder-gray-400"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 transition-all placeholder-gray-400"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* City Input */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">City</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="New York"
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 transition-all placeholder-gray-400"
                  disabled={isLoading}
                  required
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
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 transition-all placeholder-gray-400"
                  disabled={isLoading}
                  required
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 transition-all placeholder-gray-400"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Signup Type Selector */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-200 dark:border-blue-700">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium">Account Type</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="user"
                    checked={signupType === 'user'}
                    onChange={() => setSignupType('user')}
                    disabled={isLoading}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Client</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="lawyer"
                    checked={signupType === 'lawyer'}
                    onChange={() => setSignupType('lawyer')}
                    disabled={isLoading}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Lawyer</span>
                </label>
              </div>
            </div>

            {/* Lawyer Profile Fields - Only show when signup type is Lawyer */}
            {signupType === 'lawyer' && (
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
                <div className="space-y-4">
                  {/* Specialization Input */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Specialization</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder="e.g., Criminal Law, Civil Law"
                        className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-amber-400/30 transition-all placeholder-gray-400"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  {/* Experience Years Input */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Years of Experience</label>
                    <div className="relative">
                      <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        placeholder="10"
                        className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-amber-400/30 transition-all placeholder-gray-400"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  {/* Hourly Rate / Price Input */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Hourly Rate (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="150.00"
                        className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-amber-400/30 transition-all placeholder-gray-400"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  {/* Address Input */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Office Address</label>
                    <div className="relative">
                      <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Legal Street, New York, NY 10001"
                        className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] dark:bg-gray-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-amber-400/30 transition-all placeholder-gray-400"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#1A2A6C] dark:text-blue-400 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}