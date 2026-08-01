import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronDown,
  Search,
  Plane,
  Bed,
  ShieldCheck,
  CreditCard,
  User,
  Headphones,
  FileText,
  DollarSign,
  HelpCircle,
  ArrowRight,
  Palmtree,
  Users,
  BadgeCheck,
  Clock,
  X,
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

const FAQ_CATEGORIES = [
  { id: 'all', name: 'All FAQs', icon: HelpCircle },
  { id: 'flights', name: 'Flights', icon: Plane },
  { id: 'hotels', name: 'Hotels', icon: Bed },
  { id: 'packages', name: 'Holiday Packages', icon: Palmtree },
  { id: 'visa', name: 'Visa Services', icon: FileText },
  { id: 'forex', name: 'Forex', icon: DollarSign },
  { id: 'insurance', name: 'Travel Insurance', icon: ShieldCheck },
  { id: 'group', name: 'Group & Corporate', icon: Users },
  { id: 'payments', name: 'Payments', icon: CreditCard },
  { id: 'account', name: 'Account & Profile', icon: User },
  { id: 'general', name: 'General', icon: Headphones },
]

const POPULAR_QUESTION_IDS = [1, 8, 46, 16, 26, 41]

const FAQ_DATA = [
  // Flights
  {
    id: 1,
    category: 'flights',
    question: 'How do I book a flight on Flymunk?',
    answer: 'To book a flight, simply enter your departure city, destination, travel dates, and number of passengers on our homepage. Click "Search" to view available flights, compare prices, and select your preferred option. Follow the prompts to enter passenger details and complete payment. You will receive a confirmation email with your e-ticket.',
  },
  {
    id: 2,
    category: 'flights',
    question: 'Can I cancel or modify my flight booking?',
    answer: 'Yes, you can cancel or modify your booking depending on the airline\'s fare rules. Some fares are non-refundable, while others allow changes with a fee. To modify your booking, go to "My Bookings" in your account, select the flight, and follow the modification process. Cancellations can also be requested through the same section.',
  },
  {
    id: 3,
    category: 'flights',
    question: 'What is the baggage allowance for my flight?',
    answer: 'Baggage allowance varies by airline, route, and fare type. During the booking process, you will see the baggage allowance for your selected flight. Generally, domestic flights allow 15kg check-in baggage, while international flights allow 20-25kg. Cabin baggage is typically 7kg. You can add extra baggage during booking or later through "Manage Booking".',
  },
  {
    id: 4,
    category: 'flights',
    question: 'How do I check-in for my flight?',
    answer: 'Most airlines offer web check-in 24-48 hours before departure. You can check-in through the airline\'s website or mobile app using your PNR (Passenger Name Record). Alternatively, airport check-in is available 2-3 hours before domestic flights and 3-4 hours before international flights. We recommend web check-in to save time at the airport.',
  },
  {
    id: 5,
    category: 'flights',
    question: 'What happens if my flight is delayed or cancelled?',
    answer: 'If your flight is delayed or cancelled by the airline, you are entitled to either a refund or rebooking on the next available flight, depending on the airline\'s policy. Flymunk will assist you in rebooking or processing refunds. For significant delays, some airlines may provide meal vouchers or accommodation. Contact our 24/7 support for immediate assistance.',
  },
  {
    id: 6,
    category: 'flights',
    question: 'Can I select my seat during booking?',
    answer: 'Yes, most airlines allow seat selection during booking for an additional fee. Some airlines offer free seat selection 24-48 hours before departure. You can also select seats later through "Manage Booking" or during web check-in. Seat selection fees vary by airline and seat type (window, aisle, emergency exit, etc.).',
  },
  {
    id: 7,
    category: 'flights',
    question: 'How do I get a refund for my cancelled flight?',
    answer: 'Refund processing depends on the airline\'s policy and fare type. Refundable fares are processed back to the original payment method within 7-21 business days. Non-refundable fares may only offer a credit note for future travel. To request a refund, go to "My Bookings", select the cancelled flight, and submit a refund request. Our team will process it according to the airline\'s guidelines.',
  },

  // Hotels
  {
    id: 8,
    category: 'hotels',
    question: 'How do I book a hotel on Flymunk?',
    answer: 'Search for hotels by entering your destination, check-in and check-out dates, and number of guests. Browse through available options, filter by amenities, price, or rating, and select your preferred hotel. Choose your room type, enter guest details, and complete payment. You will receive a confirmation email with booking details.',
  },
  {
    id: 9,
    category: 'hotels',
    question: 'What is the cancellation policy for hotel bookings?',
    answer: 'Cancellation policies vary by hotel and room type. Free cancellation is available up to a certain date (usually 24-48 hours before check-in) for most bookings. Some special rates or non-refundable bookings cannot be cancelled. The specific policy is displayed during booking and in your confirmation email. Always check the cancellation policy before completing your booking.',
  },
  {
    id: 10,
    category: 'hotels',
    question: 'Can I modify my hotel booking?',
    answer: 'Yes, modifications are possible depending on the hotel\'s policy. You can change dates, room type, or add guests through "My Bookings" if the hotel allows it. Some modifications may incur additional charges or difference in room rates. Contact our support team if you need help with modifications.',
  },
  {
    id: 11,
    category: 'hotels',
    question: 'What is the check-in and check-out time?',
    answer: 'Standard check-in time is usually 2:00 PM or 3:00 PM, and check-out time is 11:00 AM or 12:00 PM. Early check-in or late check-out may be available upon request and subject to availability, sometimes with an additional fee. Contact the hotel directly to arrange special check-in/check-out times.',
  },
  {
    id: 12,
    category: 'hotels',
    question: 'Are there any hidden charges for hotel bookings?',
    answer: 'Flymunk displays all applicable taxes and fees during the booking process. The final price you see includes all mandatory charges. Some hotels may have additional charges for amenities like parking, Wi-Fi, or breakfast, which are clearly mentioned. Resort fees or city taxes may apply at certain destinations and are disclosed before payment.',
  },
  {
    id: 13,
    category: 'hotels',
    question: 'How do I request special amenities or services?',
    answer: 'Special requests like early check-in, late check-out, room preferences (smoking/non-smoking, high floor, etc.), or additional amenities can be made during booking or by contacting the hotel directly. While we pass on your requests, fulfillment is subject to availability and at the hotel\'s discretion.',
  },

  // Holiday Packages (new)
  {
    id: 46,
    category: 'packages',
    question: 'What is included in a Flymunk holiday package?',
    answer: 'Most packages include flights, hotel stays, and select transfers or sightseeing tours, clearly itemized before you book. Meals, activities, and guides are included where stated on the package page. You can customize most packages by adding or removing components to fit your budget.',
  },
  {
    id: 47,
    category: 'packages',
    question: 'Can I customize a pre-built holiday package?',
    answer: 'Yes. Most packages support customization — you can change the hotel category, extend or shorten your stay, add excursions, or upgrade flights. Use "Customize" on the package page, or contact our holiday specialists for a fully tailored itinerary.',
  },
  {
    id: 48,
    category: 'packages',
    question: 'What is the cancellation policy for holiday packages?',
    answer: 'Package cancellation terms depend on the components booked (flights, hotels, activities) and how close to departure you cancel. A cancellation breakdown is shown before payment. Land-only components typically have more flexible policies than flight-inclusive packages.',
  },
  {
    id: 49,
    category: 'packages',
    question: 'Do you offer honeymoon or family holiday packages?',
    answer: 'Yes, we curate honeymoon, family, and senior-citizen-friendly packages with amenities suited to each — for example romantic add-ons for couples, kid-friendly activities for families, and accessible stays for senior travelers. Filter by "Package type" when browsing.',
  },
  {
    id: 50,
    category: 'packages',
    question: 'Is travel insurance included in holiday packages?',
    answer: 'Travel insurance is optional and not automatically bundled unless stated on the package. We strongly recommend adding it at checkout, especially for international trips, since it covers cancellations, medical emergencies, and lost baggage.',
  },

  // Visa Services
  {
    id: 14,
    category: 'visa',
    question: 'What visa services does Flymunk offer?',
    answer: 'Flymunk assists with visa processing for various countries including tourist visas, business visas, and transit visas. We provide end-to-end support from document collection to application submission. Our visa experts guide you through requirements, help with form filling, and track your application status.',
  },
  {
    id: 15,
    category: 'visa',
    question: 'What documents are required for visa application?',
    answer: 'Document requirements vary by country and visa type. Common documents include: Valid passport (minimum 6 months validity), passport-sized photographs, visa application form, proof of travel (flight tickets, hotel booking), financial documents (bank statements, income tax returns), and travel insurance. Specific requirements will be communicated based on your destination.',
  },
  {
    id: 16,
    category: 'visa',
    question: 'How long does visa processing take?',
    answer: 'Processing time varies by country and visa type. Tourist visas typically take 5-15 working days, while business visas may take 10-20 working days. Some countries offer expedited processing for an additional fee. We recommend applying at least 3-4 weeks before your travel date to account for any delays.',
  },
  {
    id: 17,
    category: 'visa',
    question: 'What is the visa processing fee?',
    answer: 'Visa fees vary by country, visa type, and processing speed. The fee includes the consulate/embassy fee and our service charge for document processing and application assistance. Expedited processing incurs additional fees. The exact fee will be quoted based on your destination and visa requirements.',
  },
  {
    id: 18,
    category: 'visa',
    question: 'Can I track my visa application status?',
    answer: 'Yes, once your visa application is submitted, you will receive a reference number. You can track your application status through our website using this reference number. We also provide regular updates via email and SMS at each stage of the process.',
  },
  {
    id: 19,
    category: 'visa',
    question: 'What happens if my visa application is rejected?',
    answer: 'Visa approval is at the discretion of the respective consulate/embassy. If your application is rejected, we will provide the reason for rejection and guide you on reapplication if applicable. Note that visa fees are generally non-refundable once the application is processed, regardless of the outcome.',
  },

  // Forex
  {
    id: 20,
    category: 'forex',
    question: 'What forex services does Flymunk offer?',
    answer: 'Flymunk provides forex services including currency exchange, travel cards (prepaid forex cards), and wire transfers. We offer competitive exchange rates for major currencies like USD, EUR, GBP, AED, THB, and more. Our services are designed for travelers, students, and business professionals.',
  },
  {
    id: 21,
    category: 'forex',
    question: 'How do I order forex through Flymunk?',
    answer: 'You can order forex through our website or mobile app. Select the currency you need, enter the amount, and choose between cash delivery or travel card. Complete the payment online, and your forex will be delivered to your doorstep or available for pickup at our partner locations. Travel cards can be loaded instantly.',
  },
  {
    id: 22,
    category: 'forex',
    question: 'What are the exchange rates offered?',
    answer: 'We offer competitive exchange rates that are regularly updated based on market conditions. Our rates include all charges with no hidden fees. You can view current rates on our website before placing an order. We also offer rate alerts where you can set your desired rate and we\'ll notify you when it\'s available.',
  },
  {
    id: 23,
    category: 'forex',
    question: 'What is a forex travel card and how does it work?',
    answer: 'A forex travel card is a prepaid card loaded with foreign currency. It works like a debit card and can be used at ATMs, merchant outlets, and online transactions abroad. It\'s safer than carrying cash and offers better exchange rates than credit/debit cards. You can reload the card online as needed.',
  },
  {
    id: 24,
    category: 'forex',
    question: 'Is there a limit on how much forex I can purchase?',
    answer: 'Yes, as per RBI regulations, individuals can purchase up to USD 2,50,000 per financial year for travel purposes under the Liberalized Remittance Scheme (LRS). For specific purposes like education or medical treatment, higher limits may apply with additional documentation.',
  },
  {
    id: 25,
    category: 'forex',
    question: 'What documents are required for forex purchase?',
    answer: 'For forex purchase, you need to provide: Valid passport, visa (if applicable), flight tickets, and PAN card. For amounts above certain thresholds, additional documents like Form A2 declaration may be required. The exact documentation depends on the amount and purpose of your travel.',
  },

  // Travel Insurance
  {
    id: 26,
    category: 'insurance',
    question: 'Why should I buy travel insurance?',
    answer: 'Travel insurance protects you against unexpected events like trip cancellation, medical emergencies, lost baggage, flight delays, and more. It provides financial coverage and assistance when you need it most abroad. Many countries also require travel insurance for visa approval. It\'s a small investment for peace of mind during your travels.',
  },
  {
    id: 27,
    category: 'insurance',
    question: 'What does travel insurance cover?',
    answer: 'Travel insurance typically covers: Medical emergencies and hospitalization, trip cancellation or interruption, lost or delayed baggage, flight delays or missed connections, emergency evacuation, and personal liability. Coverage varies by plan, so review the policy details before purchase.',
  },
  {
    id: 28,
    category: 'insurance',
    question: 'How do I file a travel insurance claim?',
    answer: 'To file a claim, contact our insurance partners within the specified timeframe (usually 30 days for medical claims, 7 days for baggage claims). Provide necessary documents like medical reports, police reports (for theft), original receipts, and claim forms. Our team assists you throughout the claim process.',
  },
  {
    id: 29,
    category: 'insurance',
    question: 'Can I buy travel insurance after booking my trip?',
    answer: 'Yes, you can purchase travel insurance up to the departure date. However, we recommend buying it at the time of booking to ensure coverage for pre-departure events like trip cancellation. Some benefits may have waiting periods, so early purchase is advisable.',
  },
  {
    id: 30,
    category: 'insurance',
    question: 'Does travel insurance cover pre-existing medical conditions?',
    answer: 'Standard travel insurance plans do not cover pre-existing medical conditions. However, some plans offer coverage for pre-existing conditions with additional premium or under specific conditions. Declare all pre-existing conditions accurately during purchase to avoid claim rejection.',
  },

  // Group & Corporate Travel (new)
  {
    id: 51,
    category: 'group',
    question: 'Does Flymunk handle group bookings?',
    answer: 'Yes, we handle group bookings of 10 or more travelers for flights, hotels, and full itineraries — ideal for weddings, school trips, and reunions. Group bookings get dedicated support, consolidated invoicing, and discounted group fares where available.',
  },
  {
    id: 52,
    category: 'group',
    question: 'Do you offer corporate travel management?',
    answer: 'Yes, our corporate travel desk manages bookings, travel policies, and expense-friendly invoicing for businesses of any size. Companies get a dedicated account manager, negotiated rates, and 24/7 travel-emergency support for employees on the road.',
  },
  {
    id: 53,
    category: 'group',
    question: 'How do payments and invoicing work for group or corporate bookings?',
    answer: 'Group and corporate bookings can be paid via a single consolidated invoice, split individual payments, or a company credit line for approved accounts. GST-compliant invoices are provided for business travel automatically.',
  },
  {
    id: 54,
    category: 'group',
    question: 'Can individual travelers in a group have different itineraries?',
    answer: 'Yes, within a single group booking you can mix different flight classes, hotel room types, or add-on activities per traveler. Our group desk coordinates these details so everyone still travels together where it matters, like flights and check-in dates.',
  },

  // Payments
  {
    id: 31,
    category: 'payments',
    question: 'What payment methods are accepted?',
    answer: 'We accept multiple payment methods including credit/debit cards (Visa, Mastercard, American Express), net banking, UPI, wallets (Paytm, Google Pay, PhonePe), and EMI options for eligible purchases. All transactions are secured with SSL encryption and comply with PCI DSS standards.',
  },
  {
    id: 32,
    category: 'payments',
    question: 'Is my payment information secure?',
    answer: 'Absolutely. We use industry-standard encryption and security measures to protect your payment information. We do not store your complete card details on our servers. All transactions are processed through secure payment gateways that are PCI DSS compliant.',
  },
  {
    id: 33,
    category: 'payments',
    question: 'How do I get a refund to my original payment method?',
    answer: 'Refunds are processed to the original payment method used for booking. Credit card refunds typically take 5-7 business days, net banking refunds take 7-10 business days, and wallet refunds are usually instant. The exact timeline depends on your bank or payment provider.',
  },
  {
    id: 34,
    category: 'payments',
    question: 'Can I pay in EMI?',
    answer: 'Yes, EMI options are available for eligible bookings above a certain value (usually ₹10,000). You can choose EMI during checkout if your credit card offers this facility. EMI tenure options range from 3 to 12 months. Interest rates and terms depend on your credit card provider.',
  },
  {
    id: 35,
    category: 'payments',
    question: 'What should I do if my payment fails?',
    answer: 'If your payment fails, check if you have sufficient funds, correct card details, and internet connectivity. Sometimes banks decline transactions for security reasons. Try again after a few minutes or use a different payment method. If the amount was deducted but booking failed, it will be refunded within 5-7 business days.',
  },

  // Account & Profile
  {
    id: 36,
    category: 'account',
    question: 'How do I create a Flymunk account?',
    answer: 'Click "Sign Up" on our website or app. Enter your name, email, phone number, and create a password. You can also sign up using Google or Facebook for quicker registration. Verify your email and phone number to activate your account. An account helps you track bookings, manage preferences, and access exclusive offers.',
  },
  {
    id: 37,
    category: 'account',
    question: 'I forgot my password. How do I reset it?',
    answer: 'Click "Forgot Password" on the login page. Enter your registered email address, and we\'ll send a password reset link. Follow the link to create a new password. If you don\'t receive the email, check your spam folder or contact our support team.',
  },
  {
    id: 38,
    category: 'account',
    question: 'How do I update my profile information?',
    answer: 'Log in to your account and go to "My Profile" or "Account Settings". Here you can update your name, email, phone number, address, and other details. Some information like email may require verification before the change is applied.',
  },
  {
    id: 39,
    category: 'account',
    question: 'Can I link multiple travelers to my account?',
    answer: 'Yes, you can add family members or frequent travel companions to your account. Go to "My Profile" and select "Travelers" or "Family & Friends". Add their details like name, date of birth, and passport information. This makes booking faster as you can select saved travelers during checkout.',
  },
  {
    id: 40,
    category: 'account',
    question: 'How do I delete my Flymunk account?',
    answer: 'To delete your account, go to "Account Settings" and select "Delete Account". Note that this action is irreversible and all your booking history, saved preferences, and personal data will be permanently deleted. Ensure you have no active bookings before proceeding. Contact support if you need assistance.',
  },

  // General
  {
    id: 41,
    category: 'general',
    question: 'How do I contact Flymunk customer support?',
    answer: 'Our customer support is available 24/7. You can reach us through: Phone: Call our toll-free number, Email: support@flymunk.com, Live Chat: Available on our website and app, Social Media: DM us on Facebook or Twitter. For urgent issues during travel, phone support is recommended for immediate assistance.',
  },
  {
    id: 42,
    category: 'general',
    question: 'What is Flymunk\'s service guarantee?',
    answer: 'We are committed to providing the best travel experience. Our service guarantee includes: Best price match on flights and hotels, transparent pricing with no hidden fees, secure transactions, and reliable customer support. If you find a lower price elsewhere for the same booking within 24 hours, we will refund the difference.',
  },
  {
    id: 43,
    category: 'general',
    question: 'Does Flymunk offer loyalty programs or rewards?',
    answer: 'Yes, we have a loyalty program where you earn points on every booking. Points can be redeemed for discounts on future bookings. Members also get access to exclusive deals, priority customer support, and additional benefits. Higher tiers offer more perks like free cancellations, extra baggage allowance, and lounge access.',
  },
  {
    id: 44,
    category: 'general',
    question: 'How do I provide feedback or file a complaint?',
    answer: 'We value your feedback. You can share your experience through our website\'s "Feedback" section, email us at feedback@flymunk.com, or leave a review after your trip. For complaints, contact our support team with your booking details. We investigate all complaints and respond within 24-48 hours.',
  },
  {
    id: 45,
    category: 'general',
    question: 'Is Flymunk available as a mobile app?',
    answer: 'Yes, Flymunk is available on both iOS and Android. Download our app from the App Store or Google Play Store. The app offers the same features as our website with additional benefits like exclusive app-only deals, faster booking, offline access to bookings, and real-time flight status updates.',
  },
  {
    id: 55,
    category: 'general',
    question: 'What travel documents should I carry for international trips?',
    answer: 'Always carry a valid passport (6+ months validity), your visa (if required), printed or digital flight and hotel confirmations, travel insurance details, and a government photo ID. Keep photocopies or cloud backups of key documents in case originals are lost.',
  },
  {
    id: 56,
    category: 'general',
    question: 'Does Flymunk provide safety advisories for destinations?',
    answer: 'Yes, our destination guides include up-to-date safety advisories, local emergency numbers, and entry requirements. We also send proactive alerts to travelers if conditions change at their destination shortly before or during their trip.',
  },
]

const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const popularFaqs = useMemo(
    () => POPULAR_QUESTION_IDS.map((id) => FAQ_DATA.find((f) => f.id === id)).filter(Boolean),
    []
  )

  const categoryInfo = FAQ_CATEGORIES.find((cat) => cat.id === selectedCategory)

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  return (
    <div className="bg-white pt-16 min-h-screen">
      <style>{`
        @keyframes fly-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fly-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fly-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fly-drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -15px) scale(1.05); }
          66% { transform: translate(-15px, 10px) scale(0.97); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .fly-float { animation: fly-float 5s ease-in-out infinite; }
        .fly-pulse { animation: fly-pulse 3s ease-in-out infinite; }
        .fly-drift { animation: fly-drift 12s ease-in-out infinite; }
        .fly-fade-up { animation: fly-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .fly-accordion {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fly-accordion.open { grid-template-rows: 1fr; }
        .fly-accordion > div { overflow: hidden; }
        @media (prefers-reduced-motion: reduce) {
          .fly-float, .fly-pulse, .fly-drift, .fly-fade-up { animation: none !important; }
          .fly-accordion { transition: none; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute -top-24 -left-16 w-72 h-72 rounded-full blur-3xl fly-drift pointer-events-none"
          style={{ backgroundColor: hexToRgba(ORANGE, 0.18) }}
        />
        <div
          className="absolute -bottom-32 right-10 w-80 h-80 rounded-full blur-3xl fly-drift pointer-events-none"
          style={{ backgroundColor: hexToRgba('#FFFFFF', 0.06), animationDelay: '3s' }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-20">
          <div
            className={`max-w-3xl ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.05s' }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Frequently Asked
              <span style={{ color: ORANGE }}> Questions</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
              Find answers to common questions about flights, hotels, holiday packages, visa services, forex, insurance, and more.
            </p>

            {/* Working search bar */}
            <div className="relative max-w-xl">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a question, e.g. 'baggage allowance'"
                className="w-full pl-12 pr-11 py-4 rounded-full border-none bg-white text-sm shadow-lg focus:outline-none focus:ring-2 transition-all duration-300"
                style={{ color: NAVY, '--tw-ring-color': hexToRgba(ORANGE, 0.4) }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Floating illustration */}
          <div
            className={`hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.15s' }}
          >
            <div className="relative w-56 h-56 fly-float">
              <div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: hexToRgba('#FFFFFF', 0.08) }}
              />
              <div
                className="absolute inset-7 rounded-full"
                style={{ backgroundColor: hexToRgba('#FFFFFF', 0.12) }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex items-center justify-center w-28 h-28 rounded-3xl shadow-2xl fly-pulse"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <HelpCircle size={48} strokeWidth={1.5} style={{ color: NAVY }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     

      {/* Popular questions */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className={mounted ? 'fly-fade-up' : 'opacity-0'} style={{ animationDelay: '0.1s' }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: NAVY }}>
              Popular questions
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularFaqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => {
                    const cat = FAQ_CATEGORIES.find((c) => c.id === faq.category)
                    setSelectedCategory(cat ? cat.id : 'all')
                    setExpandedFaq(faq.id)
                  }}
                  className="px-4 py-2 rounded-full text-sm border border-slate-200 hover:border-orange-300 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ color: NAVY, backgroundColor: '#F8FAFC' }}
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ Content */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category filter — horizontal scroll on mobile, sidebar on desktop */}
            <div className="lg:w-72 flex-shrink-0">
              <div
                className={`lg:sticky lg:top-24 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.15s' }}
              >
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: NAVY }}>
                  Categories
                </h3>
                <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide pb-2 lg:pb-0 -mx-1 px-1">
                  {FAQ_CATEGORIES.map((category) => {
                    const Icon = category.icon
                    const isActive = selectedCategory === category.id
                    const count =
                      category.id === 'all'
                        ? FAQ_DATA.length
                        : FAQ_DATA.filter((faq) => faq.category === category.id).length
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex-shrink-0 lg:w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          isActive ? 'shadow-md' : 'hover:bg-slate-50'
                        }`}
                        style={{
                          backgroundColor: isActive ? hexToRgba(NAVY, 0.05) : 'transparent',
                          color: isActive ? NAVY : '#64748B',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={isActive ? 'flex-shrink-0' : 'flex-shrink-0 text-slate-400'} />
                          <span className="whitespace-nowrap">{category.name}</span>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: isActive ? hexToRgba(ORANGE, 0.15) : '#F1F5F9',
                            color: isActive ? ORANGE : '#94A3B8',
                          }}
                        >
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* FAQ List */}
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-3 mb-6 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              >
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: ORANGE }} />
                <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
                  {categoryInfo?.name || 'All FAQs'}
                </h2>
                <span className="text-gray-500 text-sm">({filteredFaqs.length})</span>
              </div>

              {filteredFaqs.length > 0 ? (
                <div className="space-y-3">
                  {filteredFaqs.map((faq, i) => {
                    const isExpanded = expandedFaq === faq.id
                    return (
                      <div
                        key={faq.id}
                        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden hover:shadow-sm ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
                        style={{
                          borderColor: isExpanded ? hexToRgba(ORANGE, 0.3) : '#E2E8F0',
                          animationDelay: `${0.1 + Math.min(i, 10) * 0.04}s`,
                        }}
                      >
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                          className="w-full px-5 sm:px-6 py-5 flex items-start gap-4 text-left"
                        >
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                            style={{ backgroundColor: isExpanded ? hexToRgba(ORANGE, 0.1) : '#F8FAFC' }}
                          >
                            <HelpCircle
                              size={20}
                              className="transition-colors duration-300"
                              style={{ color: isExpanded ? ORANGE : '#94A3B8' }}
                            />
                          </div>
                          <div className="flex-1 min-w-0 pt-1.5">
                            <h3 className="text-base sm:text-lg font-semibold leading-snug" style={{ color: NAVY }}>
                              {faq.question}
                            </h3>
                          </div>
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 mt-1"
                            style={{
                              backgroundColor: isExpanded ? hexToRgba(ORANGE, 0.1) : '#F8FAFC',
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                          >
                            <ChevronDown size={18} style={{ color: isExpanded ? ORANGE : '#94A3B8' }} />
                          </div>
                        </button>

                        <div className={`fly-accordion ${isExpanded ? 'open' : ''}`}>
                          <div>
                            <div className="px-5 sm:px-6 pb-5 pt-0">
                              <div className="pl-14 pr-2">
                                <div className="pt-4 border-t border-slate-100">
                                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-16 fly-fade-up">
                  <div
                    className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: hexToRgba(NAVY, 0.05) }}
                  >
                    <Search size={32} style={{ color: '#94A3B8' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: NAVY }}>
                    No FAQs found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or selecting a different category.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: NAVY, color: '#FFFFFF' }}
                  >
                    Clear Filters
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-24" style={{ backgroundColor: hexToRgba(NAVY, 0.03) }}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`rounded-3xl p-8 sm:p-12 relative overflow-hidden fly-fade-up`}
            style={{ backgroundColor: NAVY }}
          >
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl fly-drift"
              style={{ backgroundColor: hexToRgba(ORANGE, 0.2) }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl fly-drift"
              style={{ backgroundColor: hexToRgba('#FFFFFF', 0.08), animationDelay: '2s' }}
            />

            <div className="relative">
              <Headphones size={44} style={{ color: ORANGE }} className="mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-8xl mx-auto">
                Our customer support team is available 24/7 to help you with any queries. Reach out and we'll be happy to assist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/20"
                  style={{ backgroundColor: ORANGE }}
                >
                  Contact Support
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="tel:+919355544664"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold border border-white/30 transition-all duration-300 hover:bg-white/10"
                >
                  Call Us: +91 9355544664
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq