import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Star, Heart } from 'lucide-react'
import assets from '../assets/assets'

const NAVY = '#02183D'
const ORANGE = '#FE6101'

const Places = () => {
  const scrollRef = useRef(null)

  const places = [
    {
      id: 1,
      name: 'Maldives',
      location: 'Indian Ocean',
      rating: 4.9,
      reviews: 1250,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=600&fit=crop',
      price: '$2,500'
    },
    {
      id: 2,
      name: 'Swiss Alps',
      location: 'Switzerland',
      rating: 4.8,
      reviews: 980,
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=600&fit=crop',
      price: '$1,800'
    },
    {
      id: 3,
      name: 'Santorini',
      location: 'Greece',
      rating: 4.9,
      reviews: 1450,
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=600&fit=crop',
      price: '$1,200'
    },
    {
      id: 4,
      name: 'Bali',
      location: 'Indonesia',
      rating: 4.7,
      reviews: 2100,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=600&fit=crop',
      price: '$900'
    },
    {
      id: 5,
      name: 'Paris',
      location: 'France',
      rating: 4.8,
      reviews: 3200,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=600&fit=crop',
      price: '$1,500'
    },
    {
      id: 6,
      name: 'Tokyo',
      location: 'Japan',
      rating: 4.9,
      reviews: 1800,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=600&fit=crop',
      price: '$1,100'
    },
    {
      id: 7,
      name: 'Dubai',
      location: 'UAE',
      rating: 4.7,
      reviews: 1650,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=600&fit=crop',
      price: '$2,000'
    },
    {
      id: 8,
      name: 'New York',
      location: 'USA',
      rating: 4.8,
      reviews: 4500,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=600&fit=crop',
      price: '$1,700'
    }
  ]

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="w-full py-0 pb-6 px-4 bg-white">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: NAVY }}>
              Beautiful Places
            </h2>
            <p className="text-gray-500 mt-2 text-lg">Discover amazing destinations around the world</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-xl border-2 flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
              style={{ borderColor: '#E5E7EB' }}
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: ORANGE }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {places.map((place) => (
              <div
                key={place.id}
                className="flex-shrink-0 w-64 group"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group-hover:-translate-y-2">
                  {/* Image */}
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Heart Button */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                    <Heart size={20} className="text-white" />
                  </button>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin size={16} className="text-white/80" />
                      <span className="text-white/80 text-sm">{place.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{place.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-sm font-semibold">{place.rating}</span>
                      </div>
                      <span className="text-white/60 text-sm">({place.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-lg">{place.price}</span>
                      <span className="text-white/70 text-sm">per person</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Places
