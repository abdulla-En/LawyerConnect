import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, MapPin, Settings, LogOut, Loader } from 'lucide-react';
import type { Page } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import type { BookingResponseDto } from '../../types';

interface AccountPageProps {
  onNavigate: (page: Page) => void;
  isDarkTheme?: boolean;
}

export function AccountPage({ onNavigate, isDarkTheme }: AccountPageProps) {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState<BookingResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiService.getUserBookings();
        setBookings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
        console.error('Failed to load bookings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Separate upcoming and past bookings
  const now = new Date();
  const upcomingBookings = bookings.filter((b) => new Date(b.date) > now);
  const pastBookings = bookings.filter((b) => new Date(b.date) <= now);

  if (!user) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your account</p>
          <button
            onClick={() => onNavigate('login')}
            className="px-6 py-3 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-xl hover:shadow-lg transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-24 pb-20 min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-[#F5F5F5]'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl text-gray-900 mb-3">My Account</h1>
          <p className="text-lg text-gray-500">Manage your profile and bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#1A2A6C] to-[#2B3E8C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-white">{user.fullName.charAt(0)}</span>
                </div>
                <h2 className="text-2xl text-gray-900 mb-1">{user.fullName}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-xl">
                  <Mail className="w-5 h-5 text-[#1A2A6C]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm text-gray-900 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-xl">
                  <Phone className="w-5 h-5 text-[#1A2A6C]" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                    <p className="text-sm text-gray-900">{user.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-xl">
                  <MapPin className="w-5 h-5 text-[#1A2A6C]" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">City</p>
                    <p className="text-sm text-gray-900">{user.city || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#F5F5F5] rounded-xl transition-colors">
                  <Settings className="w-5 h-5" />
                  <span>Account Settings</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    onNavigate('home');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Bookings */}
          <div className="lg:col-span-2 space-y-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-xl">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 text-[#1A2A6C] animate-spin" />
              </div>
            ) : (
              <>
                {/* Upcoming Bookings */}
                <div>
                  <h2 className="text-2xl text-gray-900 mb-4">Upcoming Consultations</h2>
                  <div className="space-y-4">
                    {upcomingBookings.length > 0 ? (
                      upcomingBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#1A2A6C] to-[#2B3E8C] flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl font-bold text-white">
                                {booking.lawyerName ? booking.lawyerName.charAt(0) : 'L'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl text-gray-900 mb-1">{booking.lawyerName || 'Lawyer'}</h3>
                              <p className="text-sm text-gray-500 mb-3">Legal Consultation</p>

                              <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <Calendar className="w-4 h-4 text-[#1A2A6C]" />
                                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <Clock className="w-4 h-4 text-[#1A2A6C]" />
                                  <span>{new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                booking.status === 'Pending' 
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : booking.status === 'Confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : booking.status === 'Cancelled'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {booking.status || 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-4">No upcoming consultations</p>
                        <button
                          onClick={() => onNavigate('browse')}
                          className="px-6 py-3 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-xl hover:shadow-lg transition-all"
                        >
                          Browse Lawyers
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Past Bookings */}
                <div>
                  <h2 className="text-2xl text-gray-900 mb-4">Past Consultations</h2>
                  <div className="space-y-3">
                    {pastBookings.length > 0 ? (
                      pastBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg text-gray-900 mb-1">{booking.lawyerName || 'Lawyer'}</h3>
                              <p className="text-sm text-gray-500 mb-2">Legal Consultation</p>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>
                            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                              Completed
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                        <p className="text-gray-500">No past consultations</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
