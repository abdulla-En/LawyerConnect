import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { BrowseLawyersPage } from './components/pages/BrowseLawyersPage';
import { LawyerProfilePage } from './components/pages/LawyerProfilePage';
import { AccountPage } from './components/pages/AccountPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { LawyerAppointmentsPage } from './components/pages/LawyerAppointmentsPage';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { useAuth } from './contexts/AuthContext';

export type Page = 'home' | 'browse' | 'profile' | 'account' | 'login' | 'signup' | 'lawyer-appointments';
export type UserType = 'user' | 'lawyer' | null;

function AppContent() {
  const { user, isLoggedIn } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('isDarkTheme');
    return saved ? JSON.parse(saved) : false;
  });

  // Save dark theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn && (currentPage === 'account' || currentPage === 'lawyer-appointments')) {
      setCurrentPage('login');
    }
  }, [isLoggedIn, currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewLawyer = (lawyer: any) => {
    setSelectedLawyer(lawyer);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Determine user type from role
  const userType: UserType = user
    ? user.role === 'Lawyer'
      ? 'lawyer'
      : 'user'
    : null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkTheme ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <AnimatedBackground />
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onToggleChatbot={() => setIsChatbotOpen(!isChatbotOpen)}
        isLoggedIn={isLoggedIn}
        userType={userType}
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
      />
      
      <main>
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} isDarkTheme={isDarkTheme} />
        )}
        {currentPage === 'browse' && (
          <BrowseLawyersPage onViewLawyer={handleViewLawyer} isDarkTheme={isDarkTheme} />
        )}
        {currentPage === 'profile' && (
          <LawyerProfilePage lawyer={selectedLawyer} onNavigate={handleNavigate} isDarkTheme={isDarkTheme} />
        )}
        {currentPage === 'account' && (
          <AccountPage onNavigate={handleNavigate} isDarkTheme={isDarkTheme} />
        )}
        {currentPage === 'login' && (
          <LoginPage onNavigate={handleNavigate} isDarkTheme={isDarkTheme} />
        )}
        {currentPage === 'signup' && (
          <SignupPage onNavigate={handleNavigate} isDarkTheme={isDarkTheme} />
        )}
        {currentPage === 'lawyer-appointments' && (
          <LawyerAppointmentsPage isDarkTheme={isDarkTheme} />
        )}
      </main>
      
      <ChatbotWidget isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      <Footer onNavigate={handleNavigate} isDarkTheme={isDarkTheme} />
    </div>
  );
}

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A2A6C] via-[#2B3E8C] to-[#1A2A6C]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return <AppContent />;
}