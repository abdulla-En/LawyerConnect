import { useState, useEffect } from 'react';
import { Scale, MessageSquare, User, Menu, X, Calendar, LogOut } from 'lucide-react';
import type { Page } from '../App';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import logo from 'figma:asset/abdcc5fdd23bbd6fd9ff5c18e66196cd93db9a23.png';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onToggleChatbot: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ currentPage, onNavigate, onToggleChatbot, isDarkTheme, onToggleTheme }: NavbarProps) {
  const { user, isLoggedIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userType = user ? (user.role === 'Lawyer' ? 'lawyer' : 'user') : null;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsScrolled(false);
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className={`max-w-6xl mx-auto px-4 transition-all duration-300 ${
        isScrolled ? 'mt-4' : 'mt-6'
      }`}>
        <div className={`bg-white/80 backdrop-blur-lg rounded-full shadow-lg border border-gray-200/50 px-6 py-3 transition-all duration-300 dark:bg-gray-800/80 dark:border-gray-700/50 ${
          isScrolled ? 'shadow-xl' : 'shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2"
            >
              <div className="text-xl font-bold" style={{
                background: isDarkTheme 
                  ? 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)'
                  : 'linear-gradient(135deg, #1A2A6C 0%, #2B3E8C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                🔨 Estasheer
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {userType === 'lawyer' ? (
                <>
                  <button 
                    onClick={() => onNavigate('lawyer-appointments')}
                    className={`text-sm transition-colors flex items-center gap-2 ${
                      currentPage === 'lawyer-appointments' ? 'text-[#1A2A6C] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    My Appointments
                  </button>
                  <button 
                    onClick={() => onNavigate('browse')}
                    className={`text-sm transition-colors ${
                      currentPage === 'browse' ? 'text-[#1A2A6C] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Browse Lawyers
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => onNavigate('home')}
                    className={`text-sm transition-colors ${
                      currentPage === 'home' ? 'text-[#1A2A6C] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => onNavigate('browse')}
                    className={`text-sm transition-colors ${
                      currentPage === 'browse' ? 'text-[#1A2A6C] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Browse Lawyers
                  </button>
                </>
              )}
              {isLoggedIn && (
                <button 
                  onClick={() => onNavigate('account')}
                  className={`text-sm transition-colors ${
                    currentPage === 'account' ? 'text-[#1A2A6C] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  My Account
                </button>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle isDark={isDarkTheme} onToggle={onToggleTheme} />
              <button 
                onClick={onToggleChatbot}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Open chatbot"
              >
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end text-right">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{user?.fullName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      onNavigate('home');
                    }}
                    className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => onNavigate('login')}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => onNavigate('signup')}
                    className="px-5 py-2 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] dark:from-blue-600 dark:to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-200/50 dark:bg-gray-800/90 dark:border-gray-700/50 p-4">
              <div className="flex flex-col gap-2">
                {userType === 'lawyer' ? (
                  <>
                    <button 
                      onClick={() => {
                        onNavigate('lawyer-appointments');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      My Appointments
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('browse');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      Browse Lawyers
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        onNavigate('home');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      Home
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('browse');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      Browse Lawyers
                    </button>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <button 
                      onClick={() => {
                        onNavigate('account');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      My Account
                    </button>
                    <button 
                      onClick={() => {
                        logout();
                        onNavigate('home');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}
                <button 
                  onClick={() => {
                    onToggleChatbot();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                >
                  AI Assistant
                </button>
                {!isLoggedIn && (
                  <>
                    <button 
                      onClick={() => {
                        onNavigate('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] dark:from-blue-600 dark:to-purple-600 text-white rounded-lg"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}