import React from 'react'
import { Plane, Hotel, Car, Gift, GraduationCap, Calendar, Sparkles, Clock, ArrowRight } from 'lucide-react'

const NAVY = '#02183D'
const ORANGE = '#FE6101'

const Newuser = () => {
  const offers = [
    {
      id: 1,
      title: 'First Flight',
      subtitle: '20% OFF',
      description: 'On your first flight booking',
      color: NAVY,
      accent: '#3B82F6',
      icon: Plane,
      featured: true
    },
    {
      id: 2,
      title: 'Hotel Deal',
      subtitle: 'FREE NIGHT',
      description: 'Book 2 nights, get 1 free',
      color: '#1E40AF',
      accent: '#60A5FA',
      icon: Hotel
    },
    {
      id: 3,
      title: 'Car Rental',
      subtitle: '15% OFF',
      description: 'Weekly car rentals',
      color: '#065F46',
      accent: '#34D399',
      icon: Car
    },
    {
      id: 4,
      title: 'Package',
      subtitle: '25% OFF',
      description: 'Flight + Hotel combo',
      color: '#7C3AED',
      accent: '#A78BFA',
      icon: Gift
    },
    {
      id: 5,
      title: 'Student',
      subtitle: '10% OFF',
      description: 'Special student rates',
      color: '#BE185D',
      accent: '#F472B6',
      icon: GraduationCap
    },
    {
      id: 6,
      title: 'Weekend',
      subtitle: '30% OFF',
      description: 'Perfect weekend trips',
      color: '#0D9488',
      accent: '#2DD4BF',
      icon: Calendar
    }
  ]

  return (
    <div className="w-full py-6 pt-6 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ backgroundColor: `${ORANGE}15` }}>
              <Sparkles size={24} style={{ color: ORANGE }} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight" style={{ color: NAVY }}>
                New User Exclusive
              </h2>
              <p className="text-gray-500 mt-1 text-base">Limited time offers for new customers</p>
            </div>
          </div>
          <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:scale-105" style={{ backgroundColor: ORANGE }}>
            View All Offers
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {offers.map((offer, index) => {
              const Icon = offer.icon
              const isFeatured = offer.featured
              
              return (
                <div
                  key={offer.id}
                  className="flex-shrink-0 group"
                  style={{ width: isFeatured ? '340px' : '280px' }}
                >
                  <div 
                    className="relative h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group-hover:-translate-y-2"
                    style={{ backgroundColor: offer.color }}
                  >
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    
                    {/* Decorative Elements */}
                    <div 
                      className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 transition-transform duration-700 group-hover:scale-125"
                      style={{ backgroundColor: offer.accent, transform: 'translate(40%, -40%)' }}
                    />
                    <div 
                      className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-15 transition-transform duration-700 group-hover:scale-125"
                      style={{ backgroundColor: offer.accent, transform: 'translate(-40%, 40%)' }}
                    />
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm"
                            style={{ backgroundColor: `${offer.accent}40` }}
                          >
                            {offer.subtitle}
                          </div>
                          {isFeatured && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                              <Clock size={12} className="text-white" />
                              <span className="text-xs text-white font-medium">Limited</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm w-fit mb-3">
                          <Icon size={isFeatured ? 32 : 28} className="text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-1">{offer.title}</h3>
                        <p className="text-white/90 text-sm leading-relaxed">{offer.description}</p>
                      </div>
                      
                      <button className="flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all group-hover:gap-3">
                        Claim Now
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center hover:shadow-2xl transition-all hover:scale-110 hidden lg:flex z-10 border border-gray-100">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center hover:shadow-2xl transition-all hover:scale-110 hidden lg:flex z-10 border border-gray-100">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile View All Button */}
        <button className="md:hidden w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all hover:shadow-lg flex items-center justify-center gap-2" style={{ backgroundColor: ORANGE }}>
          View All Offers
          <ArrowRight size={20} />
        </button>
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

export default Newuser
