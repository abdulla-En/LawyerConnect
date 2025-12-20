import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, MoreVertical, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import type { BookingResponseDto } from '../../types';

export function LawyerAppointmentsPage({ isDarkTheme }: { isDarkTheme?: boolean }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiService.getLawyerBookings();
        setBookings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load appointments');
        console.error('Failed to load appointments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === 'Lawyer') {
      fetchAppointments();
    }
  }, [user?.role]);

  if (user?.role !== 'Lawyer') {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">This page is only available for lawyers</p>
        </div>
      </div>
    );
  }

  // Separate by status - for now we'll mark all as confirmed since the API doesn't have a status field
  const filteredAppointments = selectedStatus === 'all' 
    ? bookings 
    : bookings.filter(() => selectedStatus === 'confirmed'); // Default all to confirmed

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className={`pt-32 pb-20 px-6 min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-[#F5F5F5]'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>My Appointments</h1>
          <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Manage your client consultations</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 p-4 rounded-xl">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl mb-1 text-gray-900">{bookings.length}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl mb-1 text-green-600">{bookings.length}</div>
            <div className="text-sm text-gray-500">Confirmed</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl mb-1 text-yellow-600">0</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl mb-1 text-red-600">0</div>
            <div className="text-sm text-gray-500">Cancelled</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as any)}
              className={`px-5 py-2.5 rounded-full capitalize transition-all whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-[#1A2A6C] animate-spin" />
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No {selectedStatus !== 'all' ? selectedStatus : ''} appointments found</p>
            </div>
          ) : (
            filteredAppointments.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Left Section - Client Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl mb-1 text-gray-900">{booking.clientName || 'Client'}</h3>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${getStatusColor('confirmed')}`}>
                          {getStatusIcon('confirmed')}
                          <span className="capitalize">confirmed</span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{booking.clientEmail || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{booking.clientPhone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Appointment Details */}
                  <div className="lg:w-64 space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Date</div>
                        <div className="font-medium">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Time</div>
                        <div className="font-medium">{new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">Consultation Type</div>
                      <div className="text-sm bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white px-3 py-1.5 rounded-lg inline-block">
                        Legal Consultation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
