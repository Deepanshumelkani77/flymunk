import React from 'react'

const NAVY = '#02183D'
const ORANGE = '#FE6101'

const Newuser = () => {
  const offers = [
    {
      id: 1,
      title: 'First Flight Discount',
      description: 'Get 20% off on your first flight booking',
      discount: '20% OFF',
      bgColor: 'from-blue-600 to-blue-800',
      icon: '✈️'
    },
    {
      id: 2,
      title: 'Hotel Special',
      description: 'Book 2 nights, get 1 night free',
      discount: 'FREE NIGHT',
      bgColor: 'from-orange-500 to-orange-700',
      icon: '🏨'
    },
    {
      id: 3,
      title: 'Car Rental Deal',
      description: 'Save 15% on weekly car rentals',
      discount: '15% OFF',
      bgColor: 'from-green-500 to-green-700',
      icon: '🚗'
    },
    {
      id: 4,
      title: 'Package Bonus',
      description: 'Flight + Hotel combo save extra',
      discount: '25% OFF',
      bgColor: 'from-purple-500 to-purple-700',
      icon: '🎁'
    },
    {
      id: 5,
      title: 'Student Discount',
      description: 'Special rates for students',
      discount: '10% OFF',
      bgColor: 'from-pink-500 to-pink-700',
      icon: '🎓'
    },
    {
      id: 6,
      title: 'Weekend Getaway',
      description: 'Perfect weekend trip deals',
      discount: '30% OFF',
      bgColor: 'from-teal-500 to-teal-700',
      icon: '🌴'
    }
  ]

  return (
    <div className="w-full py-8 px-4 bg-gray-50">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
              New user exclusive
            </h2>
            <p className="text-gray-600 mt-1">Exclusive deals to make your trip memorable</p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: ORANGE }}>
            View All Offers
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              >
                {/* Offer Card */}
                <div className={`bg-gradient-to-br ${offer.bgColor} p-6 text-white relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                  
                  {/* Icon */}
                  <div className="text-4xl mb-3 relative z-10">{offer.icon}</div>
                  
                  {/* Discount Badge */}
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold mb-3">
                    {offer.discount}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 relative z-10">{offer.title}</h3>
                  <p className="text-white/90 text-sm relative z-10">{offer.description}</p>
                </div>

                {/* CTA Section */}
                <div className="p-4 bg-white">
                  <button className="w-full py-3 rounded-lg font-semibold text-white transition-all group-hover:scale-105" style={{ backgroundColor: NAVY }}>
                    Claim Offer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {offers.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <button className="md:hidden w-full mt-4 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: ORANGE }}>
          View All Offers
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
