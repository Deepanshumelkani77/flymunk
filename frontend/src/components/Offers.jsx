import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Copy, Check, ArrowRight, Tag } from 'lucide-react'
import assets from '../assets/assets'

const NAVY = '#02183D'
const ORANGE = '#FE6101'

const CATEGORIES = ['All Offers', 'Flights', 'Hotels', 'Holiday Packages', 'Bank Offers', 'International']

const OFFERS = [
  {
    id: 1,
    category: 'Bank Offers',
    tag: 'HDFC Bank Offer',
    title: 'Summer Sale',
    discount: 'Up to 50% OFF',
    description: 'Instant discount on flight bookings paid via HDFC Credit Cards',
    image: assets.po1,
    code: 'HDFC50',
    validity: 'Valid till 31 Aug',
    cta: 'Book Now',
  },
  {
    id: 2,
    category: 'Flights',
    tag: 'Domestic Flights',
    title: 'Flight Deals',
    discount: 'Flat ₹1,200 OFF',
    description: 'Domestic flights at unbeatable prices on all major airlines',
    image: assets.po2,
    code: 'FLYLOW',
    validity: 'Valid till 15 Sep',
    cta: 'Explore',
  },
  {
    id: 3,
    category: 'Hotels',
    tag: 'Hotel Special',
    title: 'Breakfast On Us',
    discount: 'Free Breakfast',
    description: 'Stay 3 nights or more and get complimentary breakfast daily',
    image: assets.po3,
    code: 'STAY3',
    validity: 'Valid till 30 Sep',
    cta: 'Reserve',
  },
  {
    id: 4,
    category: 'Holiday Packages',
    tag: 'Weekend Getaway',
    title: 'Quick Escape',
    discount: '30% OFF',
    description: 'Perfect curated packages for your weekend trips nearby',
    image: assets.po4,
    code: 'WEEKEND30',
    validity: 'Valid till 10 Sep',
    cta: 'View Deals',
  },
  {
    id: 5,
    category: 'Holiday Packages',
    tag: 'Family Packages',
    title: 'Kids Stay Free',
    discount: 'Save up to ₹5,000',
    description: 'Special bundled offers for family vacations with kids',
    image: assets.po5,
    code: 'FAMILY5K',
    validity: 'Valid till 20 Sep',
    cta: 'Learn More',
  },
  {
    id: 6,
    category: 'International',
    tag: 'Adventure Tours',
    title: 'Explore Abroad',
    discount: 'Best Price Guarantee',
    description: 'Explore amazing international destinations with guided tours',
    image: assets.po6,
    code: 'GOABROAD',
    validity: 'Valid till 05 Oct',
    cta: 'Discover',
  },
  // TODO: swap the `image` value on each of these for your own asset once ready —
  // reusing p1-p6 here only as a placeholder so the layout doesn't break.
  {
    id: 7,
    category: 'Flights',
    tag: 'International Flights',
    title: 'Fly Further',
    discount: 'Flat ₹2,000 OFF',
    description: 'Exclusive discount on international flight bookings',
    image: assets.po7,
    code: 'FLYFAR2K',
    validity: 'Valid till 12 Oct',
    cta: 'Book Now',
  },
  {
    id: 8,
    category: 'Hotels',
    tag: 'Luxury Stays',
    title: 'Suite Upgrade',
    discount: 'Free Room Upgrade',
    description: 'Book a deluxe room and get upgraded to a suite, subject to availability',
    image: assets.po8,
    code: 'UPGRADE',
    validity: 'Valid till 25 Oct',
    cta: 'Reserve',
  },
  {
    id: 9,
    category: 'Bank Offers',
    tag: 'ICICI Bank Offer',
    title: 'Bank Bonanza',
    discount: '12% Instant Discount',
    description: 'Instant discount on all bookings paid via ICICI Bank cards',
    image: assets.po9,
    code: 'ICICI12',
    validity: 'Valid till 30 Oct',
    cta: 'Book Now',
  },
  {
    id: 10,
    category: 'Holiday Packages',
    tag: 'Honeymoon Special',
    title: 'Romantic Escape',
    discount: '25% OFF',
    description: 'Curated honeymoon packages with candlelight dinners included',
    image: assets.po10,
    code: 'LOVE25',
    validity: 'Valid till 18 Nov',
    cta: 'View Deals',
  },
  {
    id: 11,
    category: 'International',
    tag: 'Visa Assistance',
    title: 'Hassle-Free Visa',
    discount: 'Save ₹800',
    description: 'Discount on visa processing fees for select countries',
    image: assets.po11,
    code: 'VISA800',
    validity: 'Valid till 22 Nov',
    cta: 'Apply Now',
  },
  {
    id: 12,
    category: 'Hotels',
    tag: 'Early Bird',
    title: 'Book Ahead & Save',
    discount: '20% OFF',
    description: 'Extra savings on hotel bookings made 30 days in advance',
    image: assets.po12,
    code: 'EARLY20',
    validity: 'Valid till 30 Nov',
    cta: 'Reserve',
  },
]

const OfferCard = ({ offer }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(offer.code)
    } catch (e) {
      // clipboard not available — fail silently, UI still shows feedback
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="flex-shrink-0 w-[380px] sm:w-[420px] snap-start group">
      <div className="relative flex items-stretch rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1">
        {/* Image - left */}
        <div className="relative w-32 sm:w-36 flex-shrink-0">
          <img
            src={offer.image}
            alt={offer.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
         
        </div>

        {/* Dashed perforation divider */}
        <div className="relative flex-shrink-0 w-0">
          <div className="absolute inset-y-4 left-0 border-l border-dashed border-gray-300" />
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-50" />
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-50" />
        </div>

        {/* Content - right */}
        <div className="flex-1 min-w-0 p-4 flex flex-col justify-between">
          <div>
            <p
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide mb-1"
              style={{ color: ORANGE }}
            >
              <Tag size={12} />
              {offer.tag}
            </p>
            <h3 className="text-base font-bold leading-tight" style={{ color: NAVY }}>
              {offer.title}
            </h3>
            <p className="text-[13px] text-gray-500 leading-snug mt-1 line-clamp-2">{offer.description}</p>
          </div>

          <div>
            {/* Coupon code */}
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-between rounded-lg border border-dashed px-2.5 py-1.5 mt-2 transition-colors"
              style={{ borderColor: copied ? ORANGE : '#D1D5DB', backgroundColor: copied ? '#FFF4EC' : '#F9FAFB' }}
            >
              <span className="font-mono font-bold text-[13px] tracking-wide" style={{ color: NAVY }}>
                {offer.code}
              </span>
              <span
                className="flex items-center gap-1 text-[11px] font-semibold transition-colors"
                style={{ color: copied ? '#16A34A' : ORANGE }}
              >
                {copied ? (
                  <>
                    <Check size={12} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy
                  </>
                )}
              </span>
            </button>

            {/* Footer */}
            <div className="flex items-center justify-between mt-2.5">
              <span className="text-[10.5px] text-gray-400 font-medium">{offer.validity}</span>
              <a
                href="#"
                className="flex items-center gap-1 text-sm font-bold group/cta"
                style={{ color: NAVY }}
              >
                {offer.cta}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Offers = () => {
  const [activeCategory, setActiveCategory] = useState('All Offers')
  const scrollRef = useRef(null)
  const catScrollRef = useRef(null)

  const filteredOffers =
    activeCategory === 'All Offers' ? OFFERS : OFFERS.filter((o) => o.category === activeCategory)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.6
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  // Reset scroll position to the start whenever the category filter changes,
  // so the newly filtered set is never shown mid-scroll.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' })
    }
  }, [activeCategory])

  return (
    <div className="w-full py-10 px-4 bg-white">
      <div className="max-w-8xl mx-auto">
      
        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold" style={{ color: NAVY }}>
            Offers
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Exclusive deals and discounts for your travel
          </p>
        </div>

        {/* Category chips row */}
        <div
          ref={catScrollRef}
          className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 whitespace-nowrap"
                style={{
                  backgroundColor: isActive ? ORANGE : 'white',
                  color: isActive ? 'white' : NAVY,
                  borderColor: isActive ? ORANGE : '#E5E7EB',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Offer Cards Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-2xl shadow-xl items-center justify-center hover:shadow-2xl transition-all hover:scale-110 z-10 border border-gray-100"
          >
            <ChevronLeft size={22} className="text-gray-600" />
          </button>

          {filteredOffers.length > 0 ? (
            <div
              ref={scrollRef}
              className="grid grid-flow-col grid-rows-2 auto-cols-[380px] sm:auto-cols-[420px] gap-5 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm py-10">No offers in this category right now.</p>
          )}

          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-2xl shadow-xl items-center justify-center hover:shadow-2xl transition-all hover:scale-110 z-10"
            style={{ backgroundColor: ORANGE }}
          >
            <ChevronRight size={22} className="text-white" />
          </button>
        </div>
      </div>

      <style>{`
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