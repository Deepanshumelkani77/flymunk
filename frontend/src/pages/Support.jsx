import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageCircle,
  Phone,
  Info,
  ShieldAlert,
  ShieldCheck,
  PlayCircle,
  Smartphone,
  QrCode,
  Zap,
  ClipboardCheck,
  ArrowRight,
  ChevronRight,
  Plane,
  Bed,
  Train,
  Car,
  Headphones,
  X,
  ThumbsUp,
  ThumbsDown,
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

// Placeholder photography — swap for real Flymunk shots when available.
const IMAGES = {
  video: 'https://picsum.photos/id/1076/1200/700',
}

const QUICK_ACTIONS = [
  { icon: Headphones, label: 'Chat', href: '#chat' },
  { icon: Phone, label: 'Call us', href: 'tel:+919910060345' },
  { icon: Info, label: 'FAQ', href: '/faq' },
  { icon: ShieldAlert, label: 'Emergency assistance', href: '/emergency' },
]

// Placeholder content — replace questions, answers, and tags with your
// actual policies and FAQ taxonomy before launch.
const SERVICE_CATEGORIES = [
  {
    id: 'flights',
    label: 'Flights',
    icon: Plane,
    questions: [
      {
        q: 'Are there any flight ticket promotions going on?',
        a: 'Yes — check the offers banner on our Flights page for current fare deals and bank card discounts, updated regularly.',
      },
      {
        q: 'How do I change my ticket?',
        a: 'Go to Find Bookings, select your flight, and choose "Change Ticket." Fare difference and airline change fees may apply.',
      },
      {
        q: 'How can I cancel my flight ticket?',
        a: "Cancel from Find Bookings under \"Manage Booking.\" Refund amount depends on the airline's fare rules and how close to departure you cancel.",
      },
    ],
    tags: ['Hot Topics', 'Booking & Price', 'Ticketing & Payment', 'Booking Query', 'Passenger Information-related'],
  },
  {
    id: 'hotels',
    label: 'Hotels & Homes',
    icon: Bed,
    questions: [
      {
        q: 'How do I cancel or modify my hotel booking?',
        a: 'Open Find Bookings, select the hotel reservation, and use "Modify" or "Cancel." Free cancellation windows vary by property.',
      },
      {
        q: 'Is breakfast included in my room rate?',
        a: 'Meal inclusions are listed on the room rate details before you book, and again in your confirmation email.',
      },
      {
        q: "What if the hotel can't find my reservation?",
        a: "Show your Flymunk confirmation email and contact our 24/7 support line — we'll resolve it directly with the property.",
      },
    ],
    tags: ['Hot Topics', 'Booking & Cancellation', 'Payments & Refunds', 'Property Policies', 'Check-in / Check-out'],
  },
  {
    id: 'trains',
    label: 'Trains',
    icon: Train,
    questions: [
      {
        q: 'How do I book a train ticket?',
        a: 'Search your route on the Train page, pick a class and quota, and complete payment — your e-ticket is emailed instantly.',
      },
      {
        q: 'Can I cancel or reschedule my train ticket?',
        a: 'Yes, from Find Bookings. Refund amounts follow railway cancellation rules based on time before departure.',
      },
      {
        q: 'How do I check my PNR status?',
        a: 'Your PNR and live status are available under Find Bookings, or by entering the PNR on our Train page.',
      },
    ],
    tags: ['Hot Topics', 'Booking & PNR', 'Cancellation & Refunds', 'Boarding & ID', 'Schedule Changes'],
  },
  {
    id: 'transfers',
    label: 'Airport Transfers',
    icon: Car,
    questions: [
      {
        q: 'How do I book an airport transfer?',
        a: 'Choose Airport Transfer under Transport, enter your flight details, and pick a vehicle — confirmation is instant.',
      },
      {
        q: 'What happens if my flight is delayed?',
        a: "We track your flight automatically and adjust your driver's pickup time at no extra charge.",
      },
      {
        q: 'Can I cancel my airport transfer booking?',
        a: 'Yes, free cancellation is available up to the window shown at booking — check Find Bookings for your specific policy.',
      },
    ],
    tags: ['Hot Topics', 'Booking & Pricing', 'Driver & Vehicle', 'Cancellations', 'Flight Delay Handling'],
  },
]

const APP_REASONS = [
  { icon: Zap, text: 'Get help in one tap' },
  { icon: ClipboardCheck, text: 'Manage bookings effortlessly' },
  { icon: Phone, text: 'Free in-app calls to support' },
  { icon: Smartphone, text: 'Real-time flight & hotel alerts' },
]

const FOOTER_COLUMNS = [
  {
    title: 'Contact us',
    links: [
      { label: 'Customer support', to: '/support' },
      { label: 'Service guarantee', to: '/service-guarantee' },
      { label: 'More service info', to: '/service-info' },
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
    title: 'Other services',
    links: [
      { label: 'List your property', to: '/list-property' },
      { label: 'Become a supplier', to: '/become-supplier' },
      { label: 'All hotels', to: '/hotels' },
      { label: 'Group trips', to: '/group-trip' },
    ],
  },
]

// Decorative hero graphic — layered, softly animated shapes instead of a
// stock photo, so the hero has presence without relying on an external asset.
const SupportIllustration = () => (
  <div className="relative w-56 h-56 flex-shrink-0 fly-float">
    <div
      className="absolute inset-0 rounded-full fly-pulse-ring"
      style={{ backgroundColor: hexToRgba('#FFFFFF', 0.08) }}
    />
    <div
      className="absolute inset-6 rounded-full"
      style={{ backgroundColor: hexToRgba('#FFFFFF', 0.1) }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="flex items-center justify-center w-28 h-28 rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105 hover:-rotate-2"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <Headphones size={48} strokeWidth={1.6} style={{ color: NAVY }} />
      </div>
    </div>
    <div
      className="absolute top-4 right-2 flex items-center justify-center w-12 h-12 rounded-2xl shadow-lg fly-bob"
      style={{ backgroundColor: ORANGE, animationDelay: '0.3s' }}
    >
      <MessageCircle size={20} className="text-white" />
    </div>
    <div
      className="absolute bottom-6 left-0 flex items-center justify-center w-10 h-10 rounded-full shadow-lg fly-bob"
      style={{ backgroundColor: '#FFFFFF', animationDelay: '0.8s' }}
    >
      <ShieldCheck size={18} style={{ color: ORANGE }} />
    </div>
  </div>
)

const Support = () => {
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES[0].id)
  const [openQA, setOpenQA] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const currentCategory = SERVICE_CATEGORIES.find((c) => c.id === activeCategory)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const selectCategory = (id) => {
    setActiveCategory(id)
    setOpenQA(null)
  }

  const openModal = (item) => {
    setOpenQA(item)
    requestAnimationFrame(() => setModalVisible(true))
  }

  const closeModal = () => {
    setModalVisible(false)
    setTimeout(() => setOpenQA(null), 200)
  }

  return (
    <div className="bg-white pt-16">
      <style>{`
        @keyframes fly-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fly-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fly-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fly-bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(4deg); }
        }
        @keyframes fly-pulse-ring {
          0% { transform: scale(0.94); opacity: 0.9; }
          50% { transform: scale(1.04); opacity: 0.5; }
          100% { transform: scale(0.94); opacity: 0.9; }
        }
        @keyframes fly-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes fly-drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -15px) scale(1.05); }
          66% { transform: translate(-15px, 10px) scale(0.97); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes fly-scale-in {
          from { opacity: 0; transform: scale(0.94) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .fly-float { animation: fly-float 5s ease-in-out infinite; }
        .fly-bob { animation: fly-bob 4s ease-in-out infinite; }
        .fly-pulse-ring { animation: fly-pulse-ring 4s ease-in-out infinite; }
        .fly-twinkle { animation: fly-twinkle 2.4s ease-in-out infinite; }
        .fly-drift { animation: fly-drift 12s ease-in-out infinite; }
        .fly-fade-up { animation: fly-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .fly-fade-in { animation: fly-fade-in 0.5s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .fly-float, .fly-bob, .fly-pulse-ring, .fly-twinkle, .fly-drift, .fly-fade-up, .fly-fade-in {
            animation: none !important;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        {/* Ambient drifting glow accents */}
        <div
          className="absolute -top-24 -left-16 w-72 h-72 rounded-full blur-3xl fly-drift pointer-events-none"
          style={{ backgroundColor: hexToRgba(ORANGE, 0.18) }}
        />
        <div
          className="absolute -bottom-32 right-10 w-80 h-80 rounded-full blur-3xl fly-drift pointer-events-none"
          style={{ backgroundColor: hexToRgba('#FFFFFF', 0.06), animationDelay: '3s' }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-12 sm:pb-14">
          <div className="flex items-center justify-between gap-8">
            <div
              className={mounted ? 'fly-fade-up' : 'opacity-0'}
              style={{ animationDelay: '0.05s' }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Customer support
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full ml-2 align-middle fly-twinkle"
                  style={{ backgroundColor: ORANGE }}
                />
              </h1>
              <div
                className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border transition-colors duration-300 hover:border-white/40"
                style={{ backgroundColor: hexToRgba('#FFFFFF', 0.08), borderColor: hexToRgba('#FFFFFF', 0.18) }}
              >
                <ShieldCheck size={16} style={{ color: ORANGE }} />
                <span className="text-sm font-semibold text-white">Support in approx. 30s</span>
              </div>
            </div>
            <div
              className={`hidden lg:block ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.15s' }}
            >
              <SupportIllustration />
            </div>
          </div>
        </div>
      </div>

      {/* Service Chat card, overlapping the hero */}
      <div className="bg-slate-50 rounded-t-[2.5rem] -mt-8 sm:-mt-10 relative pt-10 sm:pt-14 pb-16 sm:pb-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`bg-white rounded-3xl shadow-lg border border-slate-100 p-6 sm:p-8 transition-shadow duration-300 hover:shadow-xl ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.22s' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: ORANGE }} />
              <h2 className="text-2xl font-bold" style={{ color: NAVY }}>Service chat</h2>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {SERVICE_CATEGORIES.map(({ id, label, icon: Icon }) => {
                const isActive = activeCategory === id
                return (
                  <div key={id} className="relative">
                    <button
                      type="button"
                      onClick={() => selectCategory(id)}
                      className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                      style={{
                        backgroundColor: isActive ? NAVY : '#FFFFFF',
                        borderColor: isActive ? NAVY : '#E2E8F0',
                        color: isActive ? '#FFFFFF' : NAVY,
                      }}
                    >
                      <Icon
                        size={16}
                        style={{ color: isActive ? ORANGE : NAVY }}
                        className="transition-transform duration-300"
                      />
                      {label}
                    </button>
                    {isActive && (
                      <span
                        className="absolute left-1/2 -bottom-1.5 w-3 h-3 -translate-x-1/2 rotate-45"
                        style={{ backgroundColor: NAVY, animation: 'fly-scale-in 0.25s ease both' }}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* FAQ grid: category questions + chat CTA */}
            <div key={activeCategory} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {currentCategory.questions.map((item, i) => {
                const isOpen = openQA && openQA.q === item.q
                return (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => openModal(item)}
                    className="group flex items-center justify-between gap-3 px-5 py-4 rounded-xl text-left border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md fly-fade-up"
                    style={{
                      backgroundColor: isOpen ? hexToRgba(NAVY, 0.05) : '#F8FAFC',
                      borderColor: isOpen ? hexToRgba(NAVY, 0.2) : 'transparent',
                      animationDelay: `${i * 0.06}s`,
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: NAVY }}>{item.q}</span>
                    <MessageCircle
                      size={16}
                      className="flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
                      style={{ color: isOpen ? ORANGE : '#94A3B8' }}
                    />
                  </button>
                )
              })}

              <a
                href="#chat"
                className="group flex items-center justify-between gap-3 px-5 py-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md fly-fade-up"
                style={{
                  backgroundColor: hexToRgba(ORANGE, 0.06),
                  borderColor: hexToRgba(ORANGE, 0.25),
                  animationDelay: `${currentCategory.questions.length * 0.06}s`,
                }}
              >
                <span className="text-sm font-semibold" style={{ color: ORANGE }}>
                  Have a different question? Chat with us now.
                </span>
                <ChevronRight
                  size={16}
                  style={{ color: ORANGE }}
                  className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Chat-style answer panel - Modal */}
            {openQA && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop with blur */}
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
                  style={{ opacity: modalVisible ? 1 : 0 }}
                  onClick={closeModal}
                />
                {/* Modal content */}
                <div
                  className="relative w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl overflow-hidden bg-white transition-all duration-200"
                  style={{
                    opacity: modalVisible ? 1 : 0,
                    transform: modalVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
                  }}
                >
                  <div
                    className="flex items-center justify-between px-5 py-3 border-b border-slate-100"
                    style={{ backgroundColor: hexToRgba(NAVY, 0.03) }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                          style={{ backgroundColor: '#22C55E' }}
                        />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: '#22C55E' }} />
                      </span>
                      <span className="text-sm font-semibold" style={{ color: NAVY }}>Flymunk Assistant</span>
                    </div>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex items-center justify-center w-7 h-7 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 hover:rotate-90 transition-all duration-300"
                      aria-label="Close"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="p-5 space-y-4 bg-white">
                    {/* User's question bubble */}
                    <div className="flex justify-end fly-fade-up" style={{ animationDelay: '0.05s' }}>
                      <div
                        className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-white shadow-sm"
                        style={{ backgroundColor: NAVY }}
                      >
                        {openQA.q}
                      </div>
                    </div>

                    {/* Assistant's answer bubble */}
                    <div className="flex items-start gap-2.5 fly-fade-up" style={{ animationDelay: '0.2s' }}>
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: hexToRgba(ORANGE, 0.12) }}
                      >
                        <Headphones size={14} style={{ color: ORANGE }} />
                      </div>
                      <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed">
                        {openQA.a}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-100 bg-white">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      Was this helpful?
                      <button type="button" className="p-1.5 rounded-full hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all duration-200" aria-label="Yes, helpful">
                        <ThumbsUp size={14} />
                      </button>
                      <button type="button" className="p-1.5 rounded-full hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all duration-200" aria-label="Not helpful">
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                    <a
                      href="#chat"
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold flex-shrink-0"
                      style={{ color: ORANGE }}
                    >
                      Still need help? Chat with our team
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Topic tags */}
            <h3 className="text-sm font-bold mb-3" style={{ color: NAVY }}>
              More {currentCategory.label} FAQ
            </h3>
            <div key={`tags-${activeCategory}`} className="flex flex-wrap gap-2">
              {currentCategory.tags.map((tag, i) => (
                <a
                  key={tag}
                  href="#faq"
                  className="px-4 py-2 rounded-full text-sm bg-slate-100 hover:bg-slate-200 hover:-translate-y-0.5 transition-all duration-300 fly-fade-up"
                  style={{ color: NAVY, animationDelay: `${i * 0.04}s` }}
                >
                  {tag}
                </a>
              ))}
              <span className="px-4 py-2 rounded-full text-sm bg-slate-100" style={{ color: NAVY }}>…</span>
            </div>
          </div>

          {/* Quick actions bar */}
          <div
            className={`bg-white rounded-2xl shadow-sm border border-slate-100 mt-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100 transition-shadow duration-300 hover:shadow-md ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s' }}
          >
            {QUICK_ACTIONS.map(({ icon: Icon, label, href }) => {
              const isExternal = href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#')
              const Wrapper = isExternal ? 'a' : Link
              const wrapperProps = isExternal ? { href } : { to: href }
              return (
                <Wrapper
                  key={label}
                  {...wrapperProps}
                  className="group flex items-center justify-center gap-2.5 py-6 px-3 transition-all duration-300 hover:bg-slate-50"
                >
                  <Icon
                    size={18}
                    strokeWidth={1.9}
                    style={{ color: NAVY }}
                    className="transition-all duration-300 group-hover:scale-110 group-hover:text-[#FF6102]"
                  />
                  <span className="text-sm font-semibold transition-colors duration-300" style={{ color: NAVY }}>{label}</span>
                </Wrapper>
              )
            })}
          </div>
        </div>
      </div>

   
  


    </div>
  )
}

export default Support