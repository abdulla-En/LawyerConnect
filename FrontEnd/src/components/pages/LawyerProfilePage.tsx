import { useState, useEffect } from 'react';
import { Star, MapPin, Briefcase, Award, Calendar, Clock, CheckCircle, X, Loader } from 'lucide-react';
import type { Page } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import type { LawyerResponseDto } from '../../types';

interface LawyerProfilePageProps {
  lawyer: LawyerResponseDto | null;
  onNavigate: (page: Page) => void;
  isDarkTheme?: boolean;
}

export function LawyerProfilePage({ lawyer: initialLawyer, onNavigate, isDarkTheme }: LawyerProfilePageProps) {
  const { isLoggedIn } = useAuth();
  const [lawyer, setLawyer] = useState<LawyerResponseDto | null>(initialLawyer);
  const [isLoadingLawyer, setIsLoadingLawyer] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Fetch full lawyer details if needed
  useEffect(() => {
    if (!lawyer && initialLawyer?.id) {
      const fetchLawyer = async () => {
        setIsLoadingLawyer(true);
        try {
          const data = await apiService.getLawyer(initialLawyer.id);
          setLawyer(data);
        } catch (err) {
          console.error('Failed to load lawyer details:', err);
        } finally {
          setIsLoadingLawyer(false);
        }
      };
      fetchLawyer();
    }
  }, [initialLawyer?.id, lawyer]);

  if (!lawyer && isLoadingLawyer) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-[#1A2A6C] animate-spin" />
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No lawyer selected</p>
          <button
            onClick={() => onNavigate('browse')}
            className="px-6 py-3 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-xl hover:shadow-lg transition-all"
          >
            Browse Lawyers
          </button>
        </div>
      </div>
    );
  }

  // Generate date options for next 7 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;
    if (!isLoggedIn) {
      onNavigate('login');
      return;
    }

    setIsBooking(true);
    setBookingError(null);

    try {
      const bookingDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes));

      await apiService.createBooking({
        lawyerId: lawyer.id,
        date: bookingDateTime.toISOString(),
      });

      setBookingSuccess(true);
      setShowConfirmation(false);
      setSelectedDate(null);
      setSelectedTime(null);

      setTimeout(() => {
        onNavigate('account');
      }, 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create booking';
      setBookingError(message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className={`pt-24 pb-20 min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-[#F5F5F5]'}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('browse')}
          className="mb-6 text-[#1A2A6C] hover:underline flex items-center gap-2"
        >
          ← Back to Lawyers
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Lawyer Info */}
          <div className="lg:col-span-2">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Avatar Placeholder */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1A2A6C] to-[#2B3E8C] flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl font-bold text-white">{lawyer.fullName.charAt(0)}</span>
                </div>

                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{lawyer.fullName}</h1>
                  <p className="text-xl text-[#1A2A6C] mb-4">{lawyer.specialization}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-semibold text-gray-900">{lawyer.experienceYears} years</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Hourly Rate</p>
                        <p className="font-semibold text-gray-900">${lawyer.price}/hr</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lawyer.verified ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="font-semibold text-green-600">Verified</p>
                          </div>
                        </>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="font-semibold text-yellow-600">Pending Verification</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{lawyer.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">
                  Experienced {lawyer.specialization} specialist with {lawyer.experienceYears} years of practice. Dedicated to providing professional legal advice and representation.
                </p>
              </div>
            </div>

            {/* Specialization Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialization</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#1A2A6C]" />
                  <span className="text-gray-700">{lawyer.specialization}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-28">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Consultation</h3>

              {bookingSuccess && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  Booking created successfully!
                </div>
              )}

              {bookingError && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
                  {bookingError}
                </div>
              )}

              {!isLoggedIn && (
                <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-xl text-sm">
                  Please log in to book a consultation.
                </div>
              )}

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                <div className="grid grid-cols-2 gap-2">
                  {dates.map((date, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedDate === date.toISOString().split('T')[0]
                          ? 'bg-[#1A2A6C] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      disabled={!isLoggedIn || isBooking}
                    >
                      <div className="text-xs font-semibold">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-sm">
                        {date.getDate()} {date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg transition-all text-sm ${
                          selectedTime === time
                            ? 'bg-[#1A2A6C] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        disabled={!isLoggedIn || isBooking}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              {selectedDate && selectedTime && (
                <button
                  onClick={() => setShowConfirmation(true)}
                  className="w-full py-4 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-60"
                  disabled={!isLoggedIn || isBooking}
                >
                  {isBooking ? 'Booking...' : 'Confirm Booking'}
                </button>
              )}

              {(!selectedDate || !selectedTime) && isLoggedIn && (
                <button
                  disabled
                  className="w-full py-4 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed"
                >
                  Select Date & Time
                </button>
              )}

              {!isLoggedIn && (
                <button
                  onClick={() => onNavigate('login')}
                  className="w-full py-4 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Log In to Book
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Confirm Booking</h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Lawyer</p>
                <p className="font-semibold text-gray-900">{lawyer.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="font-semibold text-gray-900">{lawyer.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-semibold text-gray-900">
                  {new Date(selectedDate || '').toLocaleDateString()} at {selectedTime}
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">Estimated Cost</p>
                <p className="text-2xl font-bold text-[#1A2A6C]">${lawyer.price}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                disabled={isBooking}
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                disabled={isBooking}
              >
                {isBooking ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
