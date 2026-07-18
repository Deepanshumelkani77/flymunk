import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import assets from '../assets/assets';

const NAVY = '#02183D'
const ORANGE = '#FE6101'

const Offers = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef(null)

  const offers = [
    {
      id: 1,
      title: 'Summer Sale',
      subtitle: 'Up to 50% OFF',
      description: 'Book now and save big on your summer vacation',
      image: assets.p1,
      cta: 'Book Now'
    },
    {
      id: 2,
      title: 'Flight Deals',
      subtitle: 'Starting from $99',
      description: 'Domestic flights at unbeatable prices',
      image: assets.p2,
      cta: 'Explore'
    },
    {
      id: 3,
      title: 'Hotel Special',
      subtitle: 'Free Breakfast',
      description: 'Stay 3 nights and get complimentary breakfast',
      image: assets.p3,
      cta: 'Reserve'
    },
    {
      id: 4,
      title: 'Weekend Getaway',
      subtitle: '30% OFF',
      description: 'Perfect packages for your weekend trips',
      image: assets.p4,
      cta: 'View Deals'
    },
    {
      id: 5,
      title: 'Family Packages',
      subtitle: 'Kids Stay Free',
      description: 'Special offers for family vacations',
      image: assets.p5,
      cta: 'Learn More'
    },
    {
      id: 6,
      title: 'Adventure Tours',
      subtitle: 'Best Price',
      description: 'Explore amazing destinations with guided tours',
      image: assets.p6,
      cta: 'Discover'
    }
  ]

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.33
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="w-full py-12 pt-6 px-4 bg-white">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight" style={{ color: NAVY }}>
            Exclusive Offers
          </h2>
          <p className="text-gray-500 mt-2 text-lg">Limited time deals you don't want to miss</p>
        </div>

        {/* Image Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center hover:shadow-2xl transition-all hover:scale-110 z-10 border border-gray-100"
          >
            <ChevronLeft size={28} className="text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex-shrink-0 w-1/3 snap-start group"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group-hover:scale-[1.02]">
                  {/* Image */}
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center hover:shadow-2xl transition-all hover:scale-110 z-10 border border-gray-100"
            style={{ backgroundColor: ORANGE }}
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {offers.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8' : 'bg-gray-300'
              }`}
              style={{ backgroundColor: index === currentIndex ? ORANGE : '' }}
              onClick={() => {
                setCurrentIndex(index)
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * scrollRef.current.clientWidth * 0.33,
                    behavior: 'smooth'
                  })
                }
              }}
            />
          ))}
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

export default Offers
