import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Star, MapPin, Loader } from 'lucide-react';
import { apiService } from '../../services/api';
import type { LawyerResponseDto } from '../../types';

interface BrowseLawyersPageProps {
  onViewLawyer: (lawyer: LawyerResponseDto) => void;
  isDarkTheme?: boolean;
}

export function BrowseLawyersPage({ onViewLawyer, isDarkTheme }: BrowseLawyersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [lawyers, setLawyers] = useState<LawyerResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Fetch lawyers from backend
  useEffect(() => {
    const fetchLawyers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiService.getLawyers(page, 12);
        // /api/lawyers already returns only lawyer records from the Lawyers table
        setLawyers(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load lawyers';
        setError(message);
        console.error('Error fetching lawyers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLawyers();
  }, [page]);

  // Get unique specializations from lawyers
  const specializations = [
    'all',
    ...Array.from(new Set(lawyers.map(l => l.specialization))).sort()
  ];

  // Filter lawyers based on search and specialization
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = 
      lawyer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'all' || lawyer.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className={`pt-24 pb-20 min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-[#F5F5F5]'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className={`text-4xl mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Find Your Lawyer</h1>
          <p className={`text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Browse qualified legal professionals across all specializations</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className={`rounded-2xl p-5 shadow-sm border ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} mb-8`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or specialization..."
                className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 transition-all ${isDarkTheme ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-[#F5F5F5] text-gray-900'}`}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto px-5 py-3 bg-[#F5F5F5] rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Filters</span>
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-5 pt-5 border-t border-gray-100">
              <div className="mb-3 text-sm text-gray-600">Specialization</div>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialization(spec)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedSpecialization === spec
                        ? 'bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {spec === 'all' ? 'All' : spec}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-[#1A2A6C] animate-spin mb-4" />
            <p className="text-gray-600">Loading lawyers...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Lawyer Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer"
                  onClick={() => onViewLawyer(lawyer)}
                >
                  {/* Placeholder Image */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#1A2A6C] to-[#2B3E8C]">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl font-bold mb-2">{lawyer.fullName.charAt(0)}</div>
                        <p className="text-sm opacity-75">{lawyer.specialization}</p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm shadow-md">
                      <span className="text-[#1A2A6C]">${lawyer.price}/hr</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl text-gray-900 mb-1">{lawyer.fullName}</h3>
                    <p className="text-sm text-gray-500 mb-3">{lawyer.specialization}</p>

                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-700">✓ Verified</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{lawyer.address}</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      {lawyer.experienceYears} years experience
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-xl hover:shadow-lg transition-all">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredLawyers.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No lawyers found matching your criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
