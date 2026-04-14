import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, Mail, Lock, User, Loader, AlertCircle, Briefcase, DollarSign } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { apiService } from '../services/api'

interface SignupModalProps {
  onClose: () => void
  onSwitchToLogin: () => void
}

export default function SignupModal({ onClose, onSwitchToLogin }: SignupModalProps) {
  const { register, isLoading, error, clearError } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [role, setRole] = useState<'User' | 'Lawyer'>('User')
  
  // User fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  
  // Lawyer fields
  const [specialization, setSpecialization] = useState('')
  const [experienceYears, setExperienceYears] = useState('')
  const [price, setPrice] = useState('')
  const [address, setAddress] = useState('')
  
  const [agreed, setAgreed] = useState(false)
  const [localError, setLocalError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setLocalError('')

    if (!agreed) {
      setLocalError('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    // Validate lawyer fields if role is Lawyer
    if (role === 'Lawyer') {
      if (!specialization || !experienceYears || !price || !address) {
        setLocalError('Please fill in all lawyer profile fields')
        return
      }
    }

    try {
      setIsSubmitting(true)
      
      // Register user - this sets the token in localStorage via AuthContext
      await register({
        fullName,
        email,
        password,
        phone,
        city,
        role,
      })

      // If lawyer, create lawyer profile
      if (role === 'Lawyer') {
        try {
          // Wait for token to be available in localStorage
          let attempts = 0
          const maxAttempts = 10
          while (!localStorage.getItem('authToken') && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 200))
            attempts++
          }
          
          const token = localStorage.getItem('authToken')
          console.log('Token available:', !!token)
          console.log('Attempts needed:', attempts)
          
          if (!token) {
            throw new Error('Authentication token not available after registration. Please try logging in to complete your profile.')
          }
          
          console.log('Creating lawyer profile...')
          // Now create lawyer profile with the token
          await apiService.registerLawyer({
            specialization,
            experienceYears: parseInt(experienceYears),
            price: parseFloat(price),
            address,
            latitude: 30.0444, // Default Cairo latitude
            longitude: 31.2357, // Default Cairo longitude
          })
          console.log('Lawyer profile created successfully!')
        } catch (lawyerErr) {
          const message = lawyerErr instanceof Error ? lawyerErr.message : 'Failed to create lawyer profile'
          console.error('Lawyer profile creation error:', lawyerErr)
          console.error('Error details:', message)
          setLocalError(`User account created successfully, but lawyer profile failed: ${message}. Please login and contact support to complete your profile.`)
          setIsSubmitting(false)
          
          // Still close modal after showing error for 3 seconds
          setTimeout(() => {
            onClose()
          }, 3000)
          return
        }
      }
      
      // Close modal and navigate
      onClose()
      
      // Navigate after modal closes
      setTimeout(() => {
        if (role === 'Lawyer') {
          navigate('/dashboard')
        } else {
          navigate('/lawyers')
        }
      }, 300)
      
    } catch (err) {
      // Error handled by context or set local error
      const message = err instanceof Error ? err.message : 'Registration failed'
      if (message.includes('409') || message.includes('Conflict') || message.includes('already')) {
        setLocalError('This email is already registered. Please use a different email or try logging in.')
      } else {
        setLocalError(message)
      }
      setIsSubmitting(false)
    }
  }

  const displayError = localError || error

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-dark-800 rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            {t.auth.createAccount}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {displayError && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
                  {displayError}
                </p>
                {(displayError.includes('409') || displayError.includes('already') || displayError.includes('Conflict')) && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                    💡 Tip: This email is already registered. Try{' '}
                    <button
                      onClick={onSwitchToLogin}
                      className="underline font-medium hover:text-red-700 dark:hover:text-red-300"
                    >
                      logging in
                    </button>
                    {' '}or use a different email address.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection - First */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.auth.iAmA}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <motion.label 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center gap-2 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  role === 'User' 
                    ? 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 border-primary-500 shadow-lg shadow-primary-500/20' 
                    : 'bg-gray-50 dark:bg-dark-700 border-gray-200 dark:border-dark-600 hover:border-primary-400 hover:shadow-md'
                }`}>
                <input 
                  type="radio" 
                  name="role" 
                  value="User" 
                  checked={role === 'User'}
                  onChange={() => setRole('User')}
                  className="sr-only" 
                />
                <User className={`w-5 h-5 transition-colors ${role === 'User' ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                <span className="font-medium text-gray-900 dark:text-white">{t.auth.client}</span>
              </motion.label>
              <motion.label 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center gap-2 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  role === 'Lawyer' 
                    ? 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 border-primary-500 shadow-lg shadow-primary-500/20' 
                    : 'bg-gray-50 dark:bg-dark-700 border-gray-200 dark:border-dark-600 hover:border-primary-400 hover:shadow-md'
                }`}>
                <input 
                  type="radio" 
                  name="role" 
                  value="Lawyer" 
                  checked={role === 'Lawyer'}
                  onChange={() => setRole('Lawyer')}
                  className="sr-only" 
                />
                <Briefcase className={`w-5 h-5 transition-colors ${role === 'Lawyer' ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                <span className="font-medium text-gray-900 dark:text-white">{t.auth.lawyer}</span>
              </motion.label>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.auth.fullName}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              disabled={isLoading || isSubmitting}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.auth.email}
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading || isSubmitting}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.auth.phoneNumber}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 1234567890"
                required
                disabled={isLoading || isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.auth.city}
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Cairo"
                required
                disabled={isLoading || isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.auth.password}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading || isSubmitting}
                minLength={6}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Lawyer-specific fields - Show when Lawyer is selected */}
          {role === 'Lawyer' && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="space-y-4 pt-4 border-t border-gray-200 dark:border-dark-700"
            >
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Lawyer Profile Information
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialization
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required={role === 'Lawyer'}
                    disabled={isLoading || isSubmitting}
                    className="w-full pl-12 pr-10 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all disabled:opacity-50 appearance-none cursor-pointer hover:border-primary-400"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.5em 1.5em'
                    }}
                  >
                    <option value="">Select Specialization</option>
                    <option value="Criminal Law">⚖️ Criminal Law</option>
                    <option value="Corporate Law">🏢 Corporate Law</option>
                    <option value="Family Law">👨‍👩‍👧 Family Law</option>
                    <option value="Real Estate">🏠 Real Estate</option>
                    <option value="Immigration">✈️ Immigration</option>
                    <option value="Tax Law">💰 Tax Law</option>
                    <option value="Employment Law">💼 Employnent Law</option>
                  </select>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-2 gap-3"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    placeholder="10"
                    required={role === 'Lawyer'}
                    min="0"
                    max="60"
                    disabled={isLoading || isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hourly Rate (EGP)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="500"
                      required={role === 'Lawyer'}
                      min="0"
                      step="0.01"
                      disabled={isLoading || isSubmitting}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Office Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main Street, Cairo, Egypt"
                  required={role === 'Lawyer'}
                  rows={3}
                  disabled={isLoading || isSubmitting}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none disabled:opacity-50"
                />
              </motion.div>
            </motion.div>
          )}

          <label className="flex items-start gap-2">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 rounded" 
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t.auth.agreeToTerms}{' '}
              <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
                {t.auth.termsOfService}
              </a>{' '}
              {t.auth.and}{' '}
              <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
                {t.auth.privacyPolicy}
              </a>
            </span>
          </label>

          <motion.button
            type="submit"
            disabled={isLoading || isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading || isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                {t.auth.creatingAccount}
              </>
            ) : (
              t.auth.createAccount
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          {t.auth.alreadyHaveAccount}{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            {t.auth.signIn}
          </button>
        </p>
      </motion.div>
    </motion.div>
  )
}
