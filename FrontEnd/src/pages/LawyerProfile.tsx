import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, DollarSign, Calendar, ArrowLeft, CheckCircle } from 'lucide-react'
import { apiService } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import type { LawyerResponseDto } from '../types'
import BookingCalendar from '../components/BookingCalendar'

export default function LawyerProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [lawyer, setLawyer] = useState<LawyerResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showBooking, setShowBooking] = useState(false)

  useEffect(() => {
    if (id) {
      loadLawyer(Number(id))
    }
  }, [id])

  const loadLawyer = async (lawyerId: number) => {
    try {
      setIsLoading(true)
      const data = await apiService.getLawyerById(lawyerId)
      setLawyer(data)
    } catch (error) {
      console.error('Failed to load lawyer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBooking = () => {
    if (!isLoggedIn) {
      alert('Please login to book a consultation')
      return
    }
    setShowBooking(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Lawyer not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/lawyers')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Lawyers
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8"
            >
              {/* Header */}
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                  {lawyer.fullName?.[0] || 'L'}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {lawyer.fullName}
                      </h1>
                      <p className="text-xl text-primary-600 dark:text-primary-400 font-medium">
                        {lawyer.specialization}
                      </p>
                    </div>
                    {lawyer.verified && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Briefcase className="w-5 h-5" />
                      <span>{lawyer.experienceYears} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-5 h-5" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {lawyer.price} EGP/hour
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="border-t border-gray-200 dark:border-dark-700 pt-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Office Address</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {lawyer.address}
                </p>
              </div>

              {/* Expertise */}
              <div className="border-t border-gray-200 dark:border-dark-700 pt-6 mt-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-xl font-medium">
                    {lawyer.specialization}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {lawyer.price} EGP
                  <span className="text-lg text-gray-600 dark:text-gray-400 font-normal">/hour</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Book a consultation session
                </p>
              </div>

              {showBooking ? (
                <BookingCalendar
                  lawyerId={lawyer.id}
                  onSuccess={() => {
                    setShowBooking(false)
                    navigate('/dashboard')
                  }}
                  onCancel={() => setShowBooking(false)}
                />
              ) : (
                <button
                  onClick={handleBooking}
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Consultation
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free cancellation</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
