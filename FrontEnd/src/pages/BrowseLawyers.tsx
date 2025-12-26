import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Star, Briefcase, DollarSign, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../services/api'
import type { LawyerResponseDto } from '../types'

export default function BrowseLawyers() {
  const navigate = useNavigate()
  const [lawyers, setLawyers] = useState<LawyerResponseDto[]>([])
  const [filteredLawyers, setFilteredLawyers] = useState<LawyerResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All')
  const [maxRate, setMaxRate] = useState(100000)

  const specializations = ['All', 'Criminal Law', 'Corporate Law', 'Family Law', 'Real Estate', 'Immigration', 'Tax Law','Employment Law']

  useEffect(() => {
    loadLawyers()
  }, [])

  useEffect(() => {
    filterLawyers()
  }, [lawyers, searchTerm, selectedSpecialization, maxRate])

  const loadLawyers = async () => {
    try {
      setIsLoading(true)
      const data = await apiService.getLawyers()
      setLawyers(data)
    } catch (error) {
      console.error('Failed to load lawyers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterLawyers = () => {
    let filtered = lawyers

    if (searchTerm) {
      filtered = filtered.filter(lawyer => 
        lawyer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedSpecialization !== 'All') {
      filtered = filtered.filter(lawyer => 
        lawyer.specialization === selectedSpecialization
      )
    }

    filtered = filtered.filter(lawyer => 
      lawyer.price <= maxRate
    )

    setFilteredLawyers(filtered)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Find Your Perfect <span className="text-primary-600 dark:text-primary-400">Legal Expert</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through our verified lawyers and book consultations instantly
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specialization
              </label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Hourly Rate (EGP)
              </label>
              <select
                value={maxRate}
                onChange={(e) => setMaxRate(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              >
                <option value={100000}>Any Rate</option>
                <option value={500}>Up to 500 EGP</option>
                <option value={1000}>Up to 1,000 EGP</option>
                <option value={2000}>Up to 2,000 EGP</option>
                <option value={5000}>Up to 5,000 EGP</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading lawyers...</p>
          </div>
        ) : filteredLawyers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No lawyers found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/lawyer/${lawyer.id}`)}
              >
                <div className="p-6">
                  {/* Avatar and Verified Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      {lawyer.fullName?.[0] || 'L'}
                    </div>
                    {lawyer.verified && (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Name and Specialization */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {lawyer.fullName}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                    {lawyer.specialization}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Briefcase className="w-4 h-4" />
                      <span>{lawyer.experienceYears} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>{lawyer.price} EGP/hour</span>
                    </div>
                  </div>

                  {/* Address Preview */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {lawyer.address}
                  </p>

                  {/* View Profile Button */}
                  <button className="w-full py-2.5 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 group-hover:shadow-lg transition-all">
                    View Profile
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
