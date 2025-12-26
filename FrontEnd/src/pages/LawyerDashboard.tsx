import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { apiService } from '../services/api'
import type { BookingResponseDto } from '../types'

export default function LawyerDashboard() {
  const [bookings, setBookings] = useState<BookingResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('pending')

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      setIsLoading(true)
      const data = await apiService.getLawyerAppointments()
      setBookings(data)
    } catch (error) {
      console.error('Failed to load appointments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (bookingId: number) => {
    try {
      await apiService.updateBookingStatus(bookingId, 'Confirmed')
      await loadBookings()
    } catch (error) {
      console.error('Failed to approve booking:', error)
      alert('Failed to approve appointment')
    }
  }

  const handleCancel = async (bookingId: number) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return
    
    try {
      await apiService.updateBookingStatus(bookingId, 'Cancelled')
      await loadBookings()
    } catch (error) {
      console.error('Failed to cancel booking:', error)
      alert('Failed to cancel appointment')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status.toLowerCase() === filter
  })

  const pendingCount = bookings.filter(b => b.status.toLowerCase() === 'pending').length

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your client consultations
          </p>
          {pendingCount > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-xl">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">
                You have {pendingCount} pending appointment{pendingCount !== 1 ? 's' : ''} to review
              </span>
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                filter === status
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Bookings List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading appointments...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-dark-800 rounded-2xl">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No appointments found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                        {booking.clientName?.[0] || 'C'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {booking.clientName || 'Client'}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{booking.clientEmail}</span>
                          </div>
                          {booking.clientPhone && (
                            <div className="flex items-center gap-2">
                              <span>{booking.clientPhone}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(booking.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(booking.date).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                    {booking.status.toLowerCase() === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(booking.id)}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
