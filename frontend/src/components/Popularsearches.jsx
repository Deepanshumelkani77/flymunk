import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const NAVY = '#02183D'
const ORANGE = '#FE6101'

// Each category mirrors the structure of a real OTA "popular searches" block:
// a short bold title, followed by a pipe-separated set of internal links.
// Swap the `items` arrays for your own live city/hotel/package data —
// the layout and collapse behaviour stay the same.
const CATEGORIES = [
  {
    title: 'Popular Flight Routes',
    items: [
      'New York to London', 'London to Paris', 'Dubai to London', 'New York to Paris',
      'Delhi to Dubai', 'Singapore to Bangkok', 'Los Angeles to Tokyo', 'Dubai to Bangkok',
      'London to New York', 'Toronto to London', 'Sydney to Singapore', 'Dubai to New York',
      'Paris to Rome', 'London to Dubai', 'Singapore to Sydney', 'New York to Dubai',
      'Delhi to Singapore', 'London to Amsterdam', 'Dubai to Istanbul', 'Bangkok to Tokyo',
      'Paris to Barcelona', 'London to Rome', 'Dubai to Doha', 'Singapore to Hong Kong',
      'Mumbai to Dubai', 'Mumbai to London', 'Delhi to New York', 'Delhi to London',
      'Chicago to London', 'Miami to Madrid', 'San Francisco to Tokyo', 'Vancouver to Hong Kong',
      'Toronto to Dubai', 'Sydney to Los Angeles', 'Auckland to Sydney', 'Seoul to Tokyo',
      'Shanghai to Singapore', 'Hong Kong to Bangkok', 'Kuala Lumpur to Singapore',
      'Johannesburg to London', 'Cairo to Dubai', 'Istanbul to Paris', 'Frankfurt to New York',
      'Amsterdam to New York', 'Barcelona to Rome', 'Doha to London', 'Doha to Bangkok',
      'Bali to Singapore', 'Melbourne to Bali', 'Perth to Singapore',
    ],
  },
  {
    title: 'Hotels By Destination',
    items: [
      'Paris', 'London', 'Dubai', 'New York', 'Singapore', 'Bangkok', 'Rome', 'Barcelona',
      'Bali', 'Tokyo', 'Istanbul', 'Amsterdam', 'Sydney', 'Hong Kong', 'Los Angeles',
      'Maldives', 'Phuket', 'Kuala Lumpur', 'Cape Town', 'Toronto', 'Vienna', 'Prague',
      'Zurich', 'Doha', 'Abu Dhabi', 'Seoul', 'Santorini', 'Venice', 'Miami', 'Las Vegas',
      'San Francisco', 'Chicago', 'Vancouver', 'Berlin', 'Madrid', 'Lisbon', 'Milan',
      'Florence', 'Athens', 'Marrakech', 'Cairo', 'Auckland', 'Melbourne', 'Brisbane',
      'Chiang Mai', 'Ho Chi Minh City', 'Hanoi', 'Bora Bora', 'Mauritius', 'Seychelles',
    ].map((c) => `Hotels in ${c}`),
  },
  {
    title: 'Explore By Country',
    items: [
      'United States', 'United Kingdom', 'United Arab Emirates', 'France', 'Italy', 'Spain',
      'Thailand', 'Singapore', 'Australia', 'Japan', 'Turkey', 'Netherlands', 'Switzerland',
      'Germany', 'Malaysia', 'Indonesia', 'Maldives', 'South Africa', 'Canada', 'Greece',
      'Egypt', 'Qatar', 'Saudi Arabia', 'New Zealand', 'Vietnam', 'Portugal', 'Austria',
      'Ireland', 'Sri Lanka', 'Mauritius', 'Seychelles', 'Morocco', 'Kenya', 'Jordan',
      'Oman', 'Bahrain', 'Kuwait', 'South Korea', 'China', 'Brazil',
    ].map((c) => `Flights to ${c}`),
  },
  {
    title: 'Luxury Hotels Worldwide',
    items: [
      'Burj Al Arab Dubai', 'The Ritz Paris', 'The Savoy London', 'Marina Bay Sands Singapore',
      'Atlantis The Palm Dubai', 'Four Seasons George V Paris', 'The Peninsula Hong Kong',
      'Aman Tokyo', 'Raffles Singapore', 'The Plaza New York', 'Burj Khalifa Suites Dubai',
      "One&Only Reethi Rah Maldives", 'The Dorchester London', 'Hotel de Paris Monte-Carlo',
      'Emirates Palace Abu Dhabi', 'The St. Regis Bali Resort', 'Jumeirah Beach Hotel Dubai',
      'The Ritz-Carlton Bali', 'Waldorf Astoria Dubai', 'Belmond Cadogan Hotel London',
      "Claridge's London", 'Mandarin Oriental Bangkok', 'The Peninsula Paris',
      'Shangri-La Singapore', 'Four Seasons Resort Bora Bora', 'Atlantis The Royal Dubai',
      'The Oberoi Marrakech', 'Belmond Hotel Cipriani Venice', 'The Ritz-Carlton Kyoto',
      'Aman Venice', 'Six Senses Zighy Bay Oman', 'The Upper House Hong Kong',
      'Capella Singapore', 'The Peninsula Tokyo', 'Gleneagles Scotland',
      'Fairmont Banff Springs Canada',
    ],
  },
  {
    title: 'Budget Hotels Worldwide',
    items: [
      'Bangkok', 'Bali', 'Phuket', 'Istanbul', 'Kuala Lumpur', 'Prague', 'Dubai', 'Cairo',
      'Ho Chi Minh City', 'Hanoi', 'Marrakech', 'Krabi', 'Pattaya', 'Manila', 'Colombo',
      'Cebu', 'Jakarta', 'Antalya', 'Nairobi', 'Cape Town', 'Budapest', 'Warsaw', 'Lisbon',
      'Porto', 'Mexico City', 'Buenos Aires', 'Lima', 'Bogota', 'Amman', 'Beirut', 'Tbilisi',
      'Yerevan', 'Kathmandu', 'Chiang Mai', 'Da Nang', 'Siem Reap', 'Zanzibar',
    ].map((c) => `Budget Hotels in ${c}`),
  },
  {
    title: 'Visa Services',
    items: [
      'USA Visa', 'UK Visa', 'Schengen Visa', 'Canada Visa', 'Australia Visa', 'Dubai Visa',
      'Singapore Visa', 'Thailand Visa', 'Japan Visa', 'New Zealand Visa', 'Turkey Visa',
      'Saudi Arabia Visa', 'Malaysia Visa', 'Indonesia Visa', 'South Korea Visa', 'Egypt Visa',
      'Qatar Visa', 'Vietnam Visa', 'Ireland Visa', 'Switzerland Visa', 'China Visa',
      'Russia Visa', 'Kenya Visa', 'Sri Lanka Visa', 'Morocco Visa', 'Jordan Visa',
      'Oman Visa', 'Bahrain Visa', 'Kuwait Visa', 'Azerbaijan Visa', 'Cambodia Visa',
      'Myanmar Visa', 'Brazil Visa', 'Mexico Visa', 'South Africa Visa', 'Mauritius Visa',
      'Seychelles Visa', 'Bhutan Visa', 'Nepal Visa',
    ],
  },
  {
    title: 'Cruise Destinations',
    items: [
      'Caribbean Cruises', 'Mediterranean Cruises', 'Alaska Cruises', 'Bahamas Cruises',
      'Norwegian Fjords Cruises', 'Dubai Cruises', 'Greek Islands Cruises', 'Baltic Sea Cruises',
      'Singapore Cruises', 'Australia & New Zealand Cruises', 'Red Sea Cruises',
      'Transatlantic Cruises', 'Panama Canal Cruises', 'Hawaii Cruises', 'Antarctica Cruises',
      'Adriatic Sea Cruises', 'Asia Cruises', 'South Pacific Cruises', 'Black Sea Cruises',
      'Canary Islands Cruises', 'Iceland Cruises', 'Amazon River Cruises', 'Nile River Cruises',
      'Danube River Cruises',
    ],
  },
  {
    title: 'Top Attractions Worldwide',
    items: [
      'Eiffel Tower Paris', 'Burj Khalifa Dubai', 'Statue Of Liberty New York', 'Colosseum Rome',
      'Sagrada Familia Barcelona', 'Marina Bay Sands SkyPark Singapore', 'Tokyo Skytree',
      'Petronas Towers Kuala Lumpur', 'Sydney Opera House', 'Grand Canyon USA',
      'Great Wall Of China', 'Santorini Caldera Greece', 'Palm Jumeirah Dubai', 'London Eye',
      'Louvre Museum Paris', 'Angkor Wat Cambodia', 'Machu Picchu Peru', 'Taj Mahal Agra',
      'Niagara Falls', 'Christ The Redeemer Rio', 'Pyramids Of Giza Egypt',
      'Table Mountain Cape Town', 'Golden Gate Bridge San Francisco', 'Times Square New York',
      'Vatican Museums Rome', 'Buckingham Palace London', 'Dubai Miracle Garden',
      'Ha Long Bay Vietnam', 'Petra Jordan', 'Disneyland Paris', 'Universal Studios Singapore',
      'Blue Mosque Istanbul', 'Neuschwanstein Castle Germany', 'Acropolis Athens',
    ],
  },
  {
    title: 'Popular Holiday Packages',
    items: [
      'Bali Packages', 'Maldives Packages', 'Switzerland Packages', 'Thailand Packages',
      'Dubai Packages', 'Singapore Packages', 'Europe Packages', 'Turkey Packages',
      'Mauritius Packages', 'Sri Lanka Packages', 'Vietnam Packages', 'Egypt Packages',
      'Bhutan Packages', 'Seychelles Packages', 'Andaman Packages', 'Kashmir Packages',
      'Malaysia Packages', 'Indonesia Packages', 'Greece Packages', 'Spain Packages',
      'Italy Packages', 'France Packages', 'Japan Packages', 'South Korea Packages',
      'Australia Packages', 'New Zealand Packages', 'South Africa Packages',
      'Kenya Safari Packages', 'Morocco Packages', 'Jordan Packages', 'Iceland Packages',
      'Scandinavia Packages', 'USA Packages', 'Canada Packages', 'Philippines Packages',
    ],
  },
  {
    title: 'Car Rentals By Destination',
    items: [
      'Dubai', 'USA', 'UK', 'Singapore', 'Thailand', 'Malaysia', 'Australia', 'Spain',
      'Italy', 'France', 'Germany', 'Turkey', 'South Africa', 'New Zealand', 'Canada',
      'Japan', 'Portugal', 'Greece', 'Netherlands', 'Switzerland', 'Ireland', 'Iceland',
      'Morocco', 'Egypt', 'Bali', 'Vietnam', 'Mexico', 'Croatia',
    ].map((c) => `Car Rental in ${c}`),
  },
]

const CATEGORY_PREVIEW_COUNT = 5

const PopularSearches = () => {
  const [expanded, setExpanded] = useState(false)
  const visibleCategories = expanded ? CATEGORIES : CATEGORIES.slice(0, CATEGORY_PREVIEW_COUNT)

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-5 rounded-full" style={{ backgroundColor: ORANGE }} />
          <h2 className="text-lg font-bold" style={{ color: NAVY }}>
            Popular Searches
          </h2>
        </div>

        <div className="relative">
          <div
            className={`divide-y divide-gray-100 transition-[max-height] duration-500 ease-in-out overflow-hidden ${
              expanded ? 'max-h-[8000px]' : 'max-h-[460px]'
            }`}
          >
            {visibleCategories.map((category) => (
              <div key={category.title} className="py-2.5 first:pt-0">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="text-sm font-bold" style={{ color: NAVY }}>
                    {category.title}
                  </h3>
                  <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                    {category.items.length} results
                  </span>
                </div>
                <p className="text-[13px] leading-[1.6] text-gray-500">
                  {category.items.map((item, idx) => (
                    <React.Fragment key={item}>
                      <a href="#" className="hover:text-orange-500 transition-colors">
                        {item}
                      </a>
                      {idx < category.items.length - 1 && <span className="text-gray-300"> &nbsp;|&nbsp; </span>}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>

          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        <div className="flex justify-center mt-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold border transition-colors hover:bg-orange-50"
            style={{ color: ORANGE, borderColor: '#FDD9BF' }}
          >
            {expanded ? 'Show less' : 'Show more'}
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
    </section>
  )
}

export default PopularSearches