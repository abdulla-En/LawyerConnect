import { Star } from 'lucide-react';

interface Lawyer {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  price: number;
  photo: string;
}

interface LawyerSectionProps {
  onBookLawyer: (lawyer: Lawyer) => void;
}

export function LawyerSection({ onBookLawyer }: LawyerSectionProps) {
  const lawyers: Lawyer[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialization: 'Corporate Law',
      rating: 4.9,
      reviews: 127,
      price: 250,
      photo: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NDk4ODY2NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialization: 'Criminal Defense',
      rating: 4.8,
      reviews: 203,
      price: 300,
      photo: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY1MDQ4MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      specialization: 'Family Law',
      rating: 5.0,
      reviews: 89,
      price: 220,
      photo: 'https://images.unsplash.com/photo-1607286908165-b8b6a2874fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ5OTcwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 4,
      name: 'David Thompson',
      specialization: 'Real Estate Law',
      rating: 4.7,
      reviews: 156,
      price: 280,
      photo: 'https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXd5ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjUwNTYxODR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <section className="bg-[#F5F5F5] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-3 text-gray-900">Connect with Expert Lawyers</h2>
          <p className="text-gray-500">Browse our network of qualified legal professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="mb-4">
                <img
                  src={lawyer.photo}
                  alt={lawyer.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg text-gray-900 mb-1">{lawyer.name}</h3>
                <p className="text-sm text-gray-500">{lawyer.specialization}</p>
              </div>

              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                <span className="text-sm text-gray-900">{lawyer.rating}</span>
                <span className="text-sm text-gray-400">({lawyer.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg text-gray-900">${lawyer.price}</span>
                  <span className="text-sm text-gray-500">/hr</span>
                </div>
                <button
                  onClick={() => onBookLawyer(lawyer)}
                  className="px-5 py-2 bg-gradient-to-r from-[#5A4FFF] to-[#7C64FF] text-white rounded-full hover:shadow-md transition-all text-sm"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
