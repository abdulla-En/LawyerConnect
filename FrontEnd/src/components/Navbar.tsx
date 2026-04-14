import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X, Scale, Bot, LogOut, Home, Users, Calendar, Settings, Languages } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
  onLoginClick: () => void
  onSignupClick: () => void
  onAIChatClick: () => void
}

export default function Navbar({ isDark, toggleTheme, onLoginClick, onSignupClick, onAIChatClick }: NavbarProps) {
  const { user, isLoggedIn, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
              Estasheer
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 transition-colors font-medium ${
                location.pathname === '/'
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <Home className="w-4 h-4" />
              {t.nav.home}
            </button>
            <button
              onClick={() => navigate('/lawyers')}
              className={`flex items-center gap-2 transition-colors font-medium ${
                location.pathname === '/lawyers'
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <Users className="w-4 h-4" />
              {t.nav.browseLawyers}
            </button>
            {isLoggedIn && (
              <button
                onClick={() => navigate('/dashboard')}
                className={`flex items-center gap-2 transition-colors font-medium ${
                  location.pathname === '/dashboard'
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                <Calendar className="w-4 h-4" />
                {t.nav.myAppointments}
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* AI Chat Button */}
            <motion.button
              onClick={onAIChatClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Bot className="w-5 h-5" />
              <span>{t.nav.aiAssistant}</span>
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
              title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-semibold">{language === 'en' ? 'AR' : 'EN'}</span>
            </motion.button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-primary-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-dark-800 rounded-xl hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                >
                  {user?.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt={user.fullName || 'Profile'} 
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user?.fullName?.[0] || 'U'}
                      </span>
                    </div>
                  )}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user?.fullName?.split(' ')[0] || 'User'}
                  </span>
                </button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-gray-200 dark:border-dark-700 py-2"
                  >
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                      <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                        {user?.role}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/dashboard')
                        setShowUserMenu(false)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      {t.nav.myAppointments}
                    </button>
                    <button
                      onClick={() => {
                        navigate('/account')
                        setShowUserMenu(false)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      {t.nav.accountSettings}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {t.nav.logout}
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                >
                  {t.nav.login}
                </button>
                
                <motion.button
                  onClick={onSignupClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl font-medium shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
                >
                  {t.nav.getStarted}
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800"
        >
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={onAIChatClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-medium"
            >
              <Bot className="w-5 h-5" />
              {t.nav.aiAssistant}
            </button>

            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium"
            >
              <Languages className="w-5 h-5" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            <button
              onClick={() => {
                navigate('/')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              {t.nav.home}
            </button>
            <button
              onClick={() => {
                navigate('/lawyers')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              <Users className="w-4 h-4" />
              {t.nav.browseLawyers}
            </button>
            {isLoggedIn && (
              <button
                onClick={() => {
                  navigate('/dashboard')
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                <Calendar className="w-4 h-4" />
                {t.nav.myAppointments}
              </button>
            )}
            
            {isLoggedIn ? (
              <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-dark-700">
                <div className="px-4 py-2 bg-gray-50 dark:bg-dark-800 rounded-xl">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-3 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-xl font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  {t.nav.logout}
                </button>
              </div>
            ) : (
              <div className="pt-4 space-y-3">
                <button
                  onClick={onLoginClick}
                  className="w-full px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-dark-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={onSignupClick}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl font-medium shadow-lg"
                >
                  {t.nav.getStarted}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
