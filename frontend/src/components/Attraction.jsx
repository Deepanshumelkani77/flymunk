import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Star, Heart, Clock } from 'lucide-react'

const NAVY = '#02183D'
const ORANGE = '#FE6101'

const Attraction = () => {
  const scrollRef = useRef(null)

  const attractions = [
    {
      id: 1,
      name: 'Eiffel Tower',
      location: 'Paris, France',
      rating: 4.9,
      reviews: 25000,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=600&fit=crop',
      price: '$35',
      duration: '2 hours'
    },
    {
      id: 2,
      name: 'Grand Canyon',
      location: 'Arizona, USA',
      rating: 4.8,
      reviews: 18000,
      image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400&h=600&fit=crop',
      price: '$80',
      duration: 'Full day'
    },
    {
      id: 3,
      name: 'Machu Picchu',
      location: 'Peru',
      rating: 4.9,
      reviews: 12000,
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=600&fit=crop',
      price: '$120',
      duration: '4 hours'
    },
    {
      id: 4,
      name: 'Great Wall',
      location: 'Beijing, China',
      rating: 4.7,
      reviews: 22000,
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=600&fit=crop',
      price: '$65',
      duration: '3 hours'
    },
    {
      id: 5,
      name: 'Taj Mahal',
      location: 'Agra, India',
      rating: 4.9,
      reviews: 35000,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=600&fit=crop',
      price: '$25',
      duration: '2 hours'
    },
    {
      id: 6,
      name: 'Colosseum',
      location: 'Rome, Italy',
      rating: 4.8,
      reviews: 28000,
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=600&fit=crop',
      price: '$45',
      duration: '2.5 hours'
    },
    {
      id: 7,
      name: 'Niagara Falls',
      location: 'Ontario, Canada',
      rating: 4.7,
      reviews: 15000,
      image: 'https://images.unsplash.com/photo-1489447068241-b3490214e879?w=400&h=600&fit=crop',
      price: '$55',
      duration: '3 hours'
    },
    {
      id: 8,
      name: 'Sydney Opera',
      location: 'Sydney, Australia',
      rating: 4.8,
      reviews: 19000,
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=600&fit=crop',
      price: '$70',
      duration: '1.5 hours'
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
    <div className="w-full py-0 pb-6 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: NAVY }}>
              Top Attractions
            </h2>
            <p className="text-gray-500 mt-2 text-lg">Explore world-famous landmarks and experiences</p>
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
            {attractions.map((attraction) => (
              <div
                key={attraction.id}
                className="flex-shrink-0 w-64 group"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group-hover:-translate-y-2">
                  {/* Image */}
                  <img
                    src={attraction.image}
                    alt={attraction.name}
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
                      <span className="text-white/80 text-sm">{attraction.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{attraction.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-sm font-semibold">{attraction.rating}</span>
                      </div>
                      <span className="text-white/60 text-sm">({attraction.reviews.toLocaleString()} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold text-lg">{attraction.price}</span>
                        <span className="text-white/70 text-sm ml-1">/ person</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-white/70" />
                        <span className="text-white/70 text-sm">{attraction.duration}</span>
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

export default Attraction
