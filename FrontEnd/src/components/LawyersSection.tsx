import { motion } from 'framer-motion'
import { Star, MapPin, Briefcase } from 'lucide-react'

const lawyers = [
  {
    name: 'Sarah Johnson',
    specialty: 'Corporate Law',
    experience: '15 years',
    rating: 4.9,
    reviews: 127,
    location: 'New York, NY',
    image: 'https://i.pravatar.cc/150?img=1'
  },
  {
    name: 'Michael Chen',
    specialty: 'Criminal Defense',
    experience: '12 years',
    rating: 4.8,
    reviews: 98,
    location: 'Los Angeles, CA',
    image: 'https://i.pravatar.cc/150?img=2'
  },
  {
    name: 'Emily Rodriguez',
    specialty: 'Family Law',
    experience: '10 years',
    rating: 5.0,
    reviews: 156,
    location: 'Chicago, IL',
    image: 'https://i.pravatar.cc/150?img=3'
  }
]

export default function LawyersSection() {
  return (
    <section id="lawyers" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Meet Our Expert Lawyers
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with verified legal professionals ready to help you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-dark-800 rounded-3xl border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {lawyer.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {lawyer.specialty}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {lawyer.rating}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({lawyer.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">{lawyer.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{lawyer.location}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                  Book Consultation
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white dark:bg-dark-800 text-gray-900 dark:text-white rounded-2xl font-semibold border-2 border-gray-200 dark:border-dark-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all">
            View All Lawyers
          </button>
        </div>
      </div>
    </section>
  )
}
