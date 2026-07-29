import React from 'react'
import { Link } from 'react-router-dom'
import {
  Plane,
  Bed,
  Globe2,
  Headphones,
  ShieldCheck,
  Users,
  HandCoins,
  Handshake,
  ArrowRight,
  Quote,
} from 'lucide-react'

const NAVY = '#02173C'
const ORANGE = '#FF6102'

const hexToRgba = (hex, alpha) => {
  const h = hex.replace('#', '')
  const bigint = parseInt(h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Placeholder photography — swap these for real Flymunk / destination shots
// when you have them. Picsum IDs are stable so nothing breaks in the meantime.
const IMAGES = {
  hero: 'https://picsum.photos/id/1018/1920/1080',
  story: 'https://picsum.photos/id/1015/1000/1200',
  team: 'https://picsum.photos/id/1074/1200/900',
  destinations: [
    { src: 'https://picsum.photos/id/1039/800/1000', label: 'Himalayan Getaways' },
    { src: 'https://picsum.photos/id/1043/800/1000', label: 'Coastal Escapes' },
    { src: 'https://picsum.photos/id/110/800/1000', label: 'Desert Trails' },
    { src: 'https://picsum.photos/id/1050/800/1000', label: 'City Breaks' },
    { src: 'https://picsum.photos/id/1016/800/1000', label: 'Island Retreats' },
  ],
  cta: 'https://picsum.photos/id/1019/1920/800',
  services: [
    { src: 'https://picsum.photos/id/542/400/300', label: 'Flights', desc: 'Domestic & International' },
    { src: 'https://picsum.photos/id/237/400/300', label: 'Hotels', desc: 'Luxury & Budget Stays' },
    { src: 'https://picsum.photos/id/1015/400/300', label: 'Visa & Forex', desc: 'Quick Processing' },
    { src: 'https://picsum.photos/id/1018/400/300', label: 'Travel Insurance', desc: 'Comprehensive Coverage' },
  ],
}

const STATS = [
  { value: '600+', label: 'Airlines connected' },
  { value: '50,000+', label: 'Hotels & homestays' },
  { value: '24/7', label: 'Support, every day' },
  { value: '10+', label: 'Cities served' },
]

const VALUES = [
  {
    icon: Users,
    title: 'Traveler-first',
    text: 'Every itinerary, fare, and policy is built around what makes a trip easier — not what\'s easiest for us to sell.',
  },
  {
    icon: HandCoins,
    title: 'Transparent pricing',
    text: 'No hidden convenience fees at checkout. Taxes, baggage rules, and cancellation terms are shown upfront, always.',
  },
  {
    icon: Headphones,
    title: 'Always-on support',
    text: 'Flight delays and visa questions don\'t wait for business hours, so a real person is on call whenever you need one.',
  },
  {
    icon: Handshake,
    title: 'Trusted partnerships',
    text: 'We work directly with airlines, hotel groups, and licensed visa consultants — never anonymous resellers.',
  },
]

const FOOTER_COLUMNS = [
  {
    title: 'Contact us',
    links: [
      { label: 'Customer support', to: '/support' },
      { label: 'Find bookings', to: '/bookings' },
      { label: 'Service guarantee', to: '/contact' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Flymunk', to: '/about' },
      { label: 'Careers', to: '/career' },
      { label: 'Blog', to: '/blog' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Flights', to: '/flights' },
      { label: 'Hotels', to: '/hotels' },
      { label: 'Visa services', to: '/visa' },
      { label: 'Group trips', to: '/group-trip' },
      { label: 'Private trips', to: '/private-trip' },
    ],
  },
]

const IconTile = ({ icon: Icon, size = 48 }) => (
  <div
    className="flex items-center justify-center rounded-xl flex-shrink-0"
    style={{
      width: size,
      height: size,
      backgroundColor: hexToRgba(NAVY, 0.07),
      border: `1px solid ${hexToRgba(NAVY, 0.14)}`,
    }}
  >
    <Icon size={22} strokeWidth={1.9} style={{ color: NAVY }} />
  </div>
)

const About = () => {
  return (
    <div className="bg-white pt-16">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={IMAGES.hero}
          alt="Aerial view of mountains at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${hexToRgba(NAVY, 0.55)} 0%, ${hexToRgba(NAVY, 0.75)} 55%, ${NAVY} 100%)`,
          }}
        />
        <div className="relative h-full flex flex-col justify-end max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <span className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ORANGE }}>
            About Flymunk
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-3xl">
            Your trusted trip companion
          </h1>
          <p className="mt-5 text-base sm:text-lg max-w-xl" style={{ color: hexToRgba('#FFFFFF', 0.78) }}>
            One platform for flights, hotels, visas, forex, and attractions — built to make
            planning a trip feel as simple as taking one.
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs sm:text-sm mt-1" style={{ color: hexToRgba('#FFFFFF', 0.6) }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our story — image + text */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src={IMAGES.story}
                alt="Traveler looking out over a scenic valley"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div
              className="hidden sm:block absolute -bottom-6 -right-6 rounded-2xl px-6 py-5 shadow-lg"
              style={{ backgroundColor: ORANGE }}
            >
              <p className="text-2xl font-bold text-white leading-none">24/7</p>
              <p className="text-xs text-white/90 mt-1">Live travel support</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: ORANGE }}>
              Who we are
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-5" style={{ color: NAVY }}>
              One platform, every part of the trip
            </h2>
            <div className="space-y-4 text-gray-600 text-base leading-relaxed">
              <p>
                We built Flymunk because booking a trip usually means juggling five different
                apps — one for flights, another for hotels, a third for cabs, and a phone call
                or two for a visa. We wanted one place that handles all of it, without cutting
                corners on any single piece.
              </p>
              <p>
                From domestic flights and hand-picked hotels to airport transfers, cruises,
                travel insurance, and visa assistance, our team vets every partner directly so
                that what's listed is accurate and what's promised gets delivered.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 mt-7 text-sm font-semibold"
              style={{ color: ORANGE }}
            >
              Get in touch with our team
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-slate-50 py-4 sm:py-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: ORANGE }}>
              What we stand for
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2" style={{ color: NAVY }}>
              The principles behind every booking
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-shadow duration-300 hover:shadow-md"
              >
                <IconTile icon={icon} />
                <h3 className="text-base font-bold mt-5 mb-2" style={{ color: NAVY }}>{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations gallery */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: ORANGE }}>
              Where we take you
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2" style={{ color: NAVY }}>
              Handpicked, not generic
            </h2>
          </div>
          <Link to="/attractions" className="text-sm font-semibold flex items-center gap-1.5 flex-shrink-0" style={{ color: NAVY }}>
            Explore attractions <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {IMAGES.destinations.map((dest) => (
            <div key={dest.label} className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer">
              <img
                src={dest.src}
                alt={dest.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(180deg, transparent 40%, ${hexToRgba(NAVY, 0.85)} 100%)` }}
              />
              <span className="absolute bottom-4 left-4 right-4 text-white font-semibold text-sm sm:text-base">
                {dest.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability initiatives */}
      <div className="bg-slate-50 py-16 sm:py-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: ORANGE }}>
              Sustainability
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2" style={{ color: NAVY }}>
              Building a better future
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Community friendly */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: hexToRgba(ORANGE, 0.1) }}>
                <Users size={24} style={{ color: ORANGE }} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: NAVY }}>Community friendly</h3>
              <p className="text-xs font-semibold mb-2" style={{ color: ORANGE }}>SOS Service & Our CSR Activities</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Global SOS service provides emergency support to global users, offering services such as translation and missing baggage assistance. We support communities in need through donations and volunteering.
              </p>
            </div>

            {/* Environmentally-focused */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: hexToRgba(ORANGE, 0.1) }}>
                <Globe2 size={24} style={{ color: ORANGE }} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: NAVY }}>Environmentally-focused</h3>
              <p className="text-xs font-semibold mb-2" style={{ color: ORANGE }}>Our Carbon Neutrality Goal</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Committed to achieving carbon neutrality by 2050. Reducing greenhouse gas emissions by 47.5% by 2030 to support the global temperature control target of 1.5°C.
              </p>
            </div>

            {/* Family friendly */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: hexToRgba(ORANGE, 0.1) }}>
                <ShieldCheck size={24} style={{ color: ORANGE }} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: NAVY }}>Family friendly</h3>
              <p className="text-xs font-semibold mb-2" style={{ color: ORANGE }}>Employee & Family Well-being</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Commitment to support the well-being of employees and their families through comprehensive programs and initiatives that promote work-life balance.
              </p>
            </div>

            {/* Stakeholder friendly */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: hexToRgba(ORANGE, 0.1) }}>
                <Handshake size={24} style={{ color: ORANGE }} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: NAVY }}>Stakeholder friendly</h3>
              <p className="text-xs font-semibold mb-2" style={{ color: ORANGE }}>ESG Governance & Responsible Travel</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Comprehensive sustainability management system with ESG Management Committee led by CEO. Actively collaborating with partners to promote responsible travel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team / quote */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl">
          <div className="aspect-[4/3] lg:aspect-auto">
            <img
              src={IMAGES.team}
              alt="Flymunk travel desk team at work"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-8 sm:p-12 flex flex-col justify-center" style={{ backgroundColor: NAVY }}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>
              Sustainability
            </span>
            <p className="text-white text-lg sm:text-xl leading-relaxed font-medium">
              Flymunk is dedicated to sustainability through environmentally-focused practices, community-friendly engagement, family-friendly initiatives, and stakeholder-friendly collaboration.
            </p>
            <p className="mt-5 text-sm" style={{ color: hexToRgba('#FFFFFF', 0.6) }}>
              Building a better future for travel
            </p>
          </div>
        </div>
      </div>


     
   
    </div>
  )
}

export default About