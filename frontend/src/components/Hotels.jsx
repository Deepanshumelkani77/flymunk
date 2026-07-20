import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Star, Heart, Wifi, Car, Coffee } from 'lucide-react'

const NAVY = '#02183D'
const ORANGE = '#FE6101'

const Hotels = () => {
  const scrollRef = useRef(null)

  const hotels = [
    {
      id: 1,
      name: 'The Ritz-Carlton',
      location: 'Paris, France',
      rating: 4.9,
      reviews: 8500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=600&fit=crop',
      price: '$850',
      amenities: ['wifi', 'parking', 'breakfast']
    },
    {
      id: 2,
      name: 'Burj Al Arab',
      location: 'Dubai, UAE',
      rating: 5.0,
      reviews: 12000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=600&fit=crop',
      price: '$1,200',
      amenities: ['wifi', 'parking', 'breakfast']
    },
    {
      id: 3,
      name: 'Four Seasons',
      location: 'New York, USA',
      rating: 4.8,
      reviews: 9200,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=600&fit=crop',
      price: '$650',
      amenities: ['wifi', 'parking', 'breakfast']
    },
    {
      id: 4,
      name: 'Aman Tokyo',
      location: 'Tokyo, Japan',
      rating: 4.9,
      reviews: 6800,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=600&fit=crop',
      price: '$950',
      amenities: ['wifi', 'parking', 'breakfast']
    },
    {
      id: 5,
      name: 'Mandarin Oriental',
      location: 'London, UK',
      rating: 4.8,
      reviews: 7600,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=600&fit=crop',
      price: '$780',
      amenities: ['wifi', 'parking', 'breakfast']
    },
    {
      id: 6,
      name: 'Shangri-La',
      location: 'Singapore',
      rating: 4.7,
      reviews: 8900,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=600&fit=crop',
      price: '$520',
      amenities: ['wifi', 'parking', 'breakfast']
    },
    {
      id: 7,
      name: 'The Peninsula',
      location: 'Hong Kong',
      rating: 4.9,
      reviews: 9500,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=600&fit=crop',
      price: '$680',
      amenities: ['wifi', 'parking', 'breakfast']
    },
    {
      id: 8,
      name: 'Waldorf Astoria',
      location: 'New York, USA',
      rating: 4.8,
      reviews: 11000,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=600&fit=crop',
      price: '$890',
      amenities: ['wifi', 'parking', 'breakfast']
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

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi': return <Wifi size={14} />
      case 'parking': return <Car size={14} />
      case 'breakfast': return <Coffee size={14} />
      default: return null
    }
  }

  return (
    <div className="w-full py-0 pb-6 px-4 bg-white">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: NAVY }}>
              Luxury Hotels
            </h2>
            <p className="text-gray-500 mt-2 text-lg">Experience world-class hospitality</p>
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
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="flex-shrink-0 w-64 group"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group-hover:-translate-y-2">
                  {/* Image */}
                  <img
                    src={hotel.image}
                    alt={hotel.name}
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
                      <span className="text-white/80 text-sm">{hotel.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{hotel.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-sm font-semibold">{hotel.rating}</span>
                      </div>
                      <span className="text-white/60 text-sm">({hotel.reviews.toLocaleString()} reviews)</span>
                    </div>

                    {/* Amenities */}
                    <div className="flex gap-3 mb-3">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">
                            {getAmenityIcon(amenity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold text-lg">{hotel.price}</span>
                        <span className="text-white/70 text-sm ml-1">/ night</span>
                      </div>
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

export default Hotels
