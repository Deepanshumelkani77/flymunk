import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Plane,
  Bed,
  Car,
  Ship,
  Shield,
  Users,
  Stamp,
  Landmark,
  Menu,
  Phone,
  FileText,
  Mail,
  Info,
  PenTool,
  Building2,
  X,
  DollarSign,
  Calendar,
  MoreHorizontal,
  MapPin,
  Train,
} from 'lucide-react'
import assets from '../assets/assets.js'

const CURRENCIES = [
  { code: 'INR', label: 'India', flag: '🇮🇳', countryCode: 'in' },
  { code: 'USD', label: 'USA', flag: '🇺🇸', countryCode: 'us' },
  { code: 'GBP', label: 'UK', flag: '🇬🇧', countryCode: 'gb' },
]

const LANGUAGES = [
  { code: 'en', label: 'English', countryCode: 'us' },
  { code: 'hi', label: 'Hindi', countryCode: 'in' },
  { code: 'es', label: 'Spanish', countryCode: 'es' },
  { code: 'fr', label: 'French', countryCode: 'fr' },
  { code: 'de', label: 'German', countryCode: 'de' },
  { code: 'it', label: 'Italian', countryCode: 'it' },
  { code: 'pt', label: 'Portuguese', countryCode: 'pt' },
  { code: 'ru', label: 'Russian', countryCode: 'ru' },
  { code: 'ja', label: 'Japanese', countryCode: 'jp' },
  { code: 'ko', label: 'Korean', countryCode: 'kr' },
  { code: 'zh', label: 'Chinese', countryCode: 'cn' },
  { code: 'ar', label: 'Arabic', countryCode: 'sa' },
]

const NAVY = '#02173C'
const ORANGE = '#FF6102'

// All service badges share one brand color (navy tint, orange on hover)
// so the strip reads as one consistent icon set instead of a rainbow.
const SERVICE_COLOR = NAVY
const SERVICE_HOVER_COLOR = ORANGE

const SERVICES = [
  { id: 'flights', name: 'Flights', icon: Plane },
  { id: 'hotels', name: 'Hotels', icon: Bed },
  { id: 'flight - hotel', name: 'Flight + Hotel', icon: Calendar },
  { id: 'attractions', name: 'Attractions', icon: Landmark },
  { id: 'transport', name: 'Transport', icon: Car },
  { id: 'visa', name: 'Visa', icon: Stamp },
  { id: 'forex', name: 'Forex', icon: DollarSign },
]

// Small helper: hex -> rgba, so each badge's tint/hover states derive
// from a single source color instead of hand-picked pastel classes.
const hexToRgba = (hex, alpha) => {
  const h = hex.replace('#', '')
  const bigint = parseInt(h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const ServiceIcon = ({ service, size = 44, iconSize = 20 }) => {
  const Icon = service.icon
  return (
    <div
      className="flex items-center justify-center rounded-2xl transition-all duration-300 ease-out group-hover:-translate-y-0.5"
      style={{
        width: size,
        height: size,
        backgroundColor: hexToRgba(SERVICE_COLOR, 0.07),
        border: `1px solid ${hexToRgba(SERVICE_COLOR, 0.14)}`,
        boxShadow: `0 0 0 0 ${hexToRgba(SERVICE_HOVER_COLOR, 0)}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = SERVICE_HOVER_COLOR
        e.currentTarget.style.borderColor = SERVICE_HOVER_COLOR
        e.currentTarget.style.boxShadow = `0 8px 16px -4px ${hexToRgba(SERVICE_HOVER_COLOR, 0.45)}`
        const glyph = e.currentTarget.querySelector('.service-icon-glyph')
        if (glyph) glyph.style.color = '#FFFFFF'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = hexToRgba(SERVICE_COLOR, 0.07)
        e.currentTarget.style.borderColor = hexToRgba(SERVICE_COLOR, 0.14)
        e.currentTarget.style.boxShadow = `0 0 0 0 ${hexToRgba(SERVICE_HOVER_COLOR, 0)}`
        const glyph = e.currentTarget.querySelector('.service-icon-glyph')
        if (glyph) glyph.style.color = SERVICE_COLOR
      }}
    >
      <Icon size={iconSize} strokeWidth={1.9} style={{ color: SERVICE_COLOR }} className="service-icon-glyph" />
    </div>
  )
}

const Navbar = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showMenuDropdown, setShowMenuDropdown] = useState(false)
  const [showMoreServicesDropdown, setShowMoreServicesDropdown] = useState(false)
  const [showTransportDropdown, setShowTransportDropdown] = useState(false)
  const [currency, setCurrency] = useState(CURRENCIES[0])
  const [language, setLanguage] = useState(LANGUAGES[0])
  const [dropdownView, setDropdownView] = useState('currency')
  const dropdownRef = useRef(null)
  const menuDropdownRef = useRef(null)
  const moreServicesRef = useRef(null)
  const transportRef = useRef(null)

  const menuItems = [
    { id: 'support', name: 'Customer Support', icon: <Phone size={18} /> },
    { id: 'bookings', name: 'Find Bookings', icon: <FileText size={18} /> },
    { id: 'contact', name: 'Contact', icon: <Mail size={18} /> },
    { id: 'about', name: 'About', icon: <Info size={18} /> },
    { id: 'blog', name: 'Blog', icon: <PenTool size={18} /> },
    { id: 'career', name: 'Career', icon: <Building2 size={18} /> },
  ]

  // Add a shadow once the page has scrolled, so the bar reads as "lifted"
  // above the content instead of always carrying a heavy shadow.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the currency dropdown when clicking anywhere outside it.
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowLanguageDropdown(false)
      }
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(e.target)) {
        setShowMenuDropdown(false)
      }
      if (moreServicesRef.current && !moreServicesRef.current.contains(e.target)) {
        setShowMoreServicesDropdown(false)
      }
      if (transportRef.current && !transportRef.current.contains(e.target)) {
        setShowTransportDropdown(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 border-b ${
        isScrolled ? 'shadow-lg border-slate-100' : 'shadow-sm border-transparent'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img
              src={assets.image3}
              alt="FlyMunk Logo"
              className="h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Services - Center */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {SERVICES.map((service) => {
              const isActive = location.pathname === `/${service.id}`
              const isTransport = service.id === 'transport'
              
              return (
                <div
                  key={service.id}
                  className="relative"
                  ref={isTransport ? transportRef : null}
                  onMouseEnter={isTransport ? () => setShowTransportDropdown(true) : undefined}
                  onMouseLeave={isTransport ? () => setShowTransportDropdown(false) : undefined}
                >
                  <Link
                    to={`/${service.id}`}
                    className="relative flex items-center px-4 py-2.5 mx-0.5 rounded-xl group transition-all duration-300 ease-out hover:-translate-y-0.5"
                    style={{
                      backgroundColor: isActive ? hexToRgba(ORANGE, 0.08) : 'transparent',
                    }}
                  >
                    <span
                      className="text-[18px] font-semibold tracking-tight transition-colors duration-300 whitespace-nowrap"
                      style={{ color: isActive ? ORANGE : NAVY }}
                    >
                      {service.name}
                    </span>
                    {/* animated underline: grows from center on hover, stays full-width when active */}
                    <span
                      className={`absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full origin-center transition-transform duration-300 ease-out ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ backgroundColor: ORANGE }}
                    />
                  </Link>

                  {isTransport && showTransportDropdown && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                      <Link
                        to="/cars"
                        onClick={() => setShowTransportDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                      >
                        <Car size={18} style={{ color: ORANGE }} />
                        <span>Car Rental</span>
                      </Link>
                      <Link
                        to="/cabs"
                        onClick={() => setShowTransportDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                      >
                        <Car size={18} style={{ color: ORANGE }} />
                        <span>Airport Transfer</span>
                      </Link>
                      <Link
                        to="/cabs"
                        onClick={() => setShowTransportDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                      >
                        <Car size={18} style={{ color: ORANGE }} />
                        <span>Cabs</span>
                      </Link>
                      <Link
                        to="/cruises"
                        onClick={() => setShowTransportDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                      >
                        <Ship size={18} style={{ color: ORANGE }} />
                        <span>Cruises</span>
                      </Link>
                      <Link
                        to="/train"
                        onClick={() => setShowTransportDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                      >
                        <Train size={18} style={{ color: ORANGE }} />
                        <span>Train</span>
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
            
            {/* More Services Dropdown */}
            <div className="relative" ref={moreServicesRef}>
              <button
                type="button"
                onClick={() => setShowMoreServicesDropdown((v) => !v)}
                className="relative flex items-center px-3 py-2.5 mx-0.5 rounded-xl transition-all duration-300 ease-out hover:-translate-y-0.5"
                style={{
                  backgroundColor: showMoreServicesDropdown ? hexToRgba(ORANGE, 0.08) : 'transparent',
                }}
              >
                <MoreHorizontal size={20} style={{ color: NAVY }} />
              </button>

              {showMoreServicesDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                  <Link
                    to="/insurance"
                    onClick={() => setShowMoreServicesDropdown(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                  >
                    <Shield size={18} style={{ color: ORANGE }} />
                    <span>Insurance</span>
                  </Link>
                  <Link
                    to="/group-trip"
                    onClick={() => setShowMoreServicesDropdown(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                  >
                    <Users size={18} style={{ color: ORANGE }} />
                    <span>Group Trip</span>
                  </Link>
                  <Link
                    to="/private-trip"
                    onClick={() => setShowMoreServicesDropdown(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                  >
                    <MapPin size={18} style={{ color: ORANGE }} />
                    <span>Private Trip</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Language & Currency Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={showLanguageDropdown}
                className="flex items-center space-x-2 pl-3 pr-2.5 py-2 rounded-lg border transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  borderColor: showLanguageDropdown ? ORANGE : '#E2E8F0',
                  '--tw-ring-color': ORANGE,
                }}
                onClick={() => setShowLanguageDropdown((v) => !v)}
              >
                <span className={`fi fi-${currency.countryCode} rounded`}></span>
                <span className="text-sm font-semibold" style={{ color: NAVY }}>
                  {currency.code}
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    showLanguageDropdown ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLanguageDropdown && (
                <div
                  role="listbox"
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                >
                  {/* Toggle Tabs */}
                  <div className="flex border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setDropdownView('currency')}
                      className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                        dropdownView === 'currency'
                          ? 'text-[#02173C] border-b-2 border-[#02173C] bg-blue-50'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Currency
                    </button>
                    <button
                      type="button"
                      onClick={() => setDropdownView('language')}
                      className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                        dropdownView === 'language'
                          ? 'text-[#02173C] border-b-2 border-[#02173C] bg-blue-50'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Language
                    </button>
                  </div>

                  {/* Content */}
                  <div className="max-h-80 overflow-y-auto">
                    {dropdownView === 'currency' ? (
                      <div>
                        {CURRENCIES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            role="option"
                            aria-selected={currency.code === c.code}
                            onClick={() => {
                              setCurrency(c)
                              setShowLanguageDropdown(false)
                            }}
                            className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                          >
                            <span className="flex items-center space-x-2.5">
                              <span className={`fi fi-${c.countryCode} rounded`}></span>
                              <span className="text-sm text-slate-700">
                                {c.code} · {c.label}
                              </span>
                            </span>
                            {currency.code === c.code && (
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={ORANGE} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            type="button"
                            role="option"
                            aria-selected={language.code === lang.code}
                            onClick={() => {
                              setLanguage(lang)
                            }}
                            className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                          >
                            <span className="flex items-center space-x-2.5">
                              <span className={`fi fi-${lang.countryCode} rounded`}></span>
                              <span className="text-sm text-slate-700">{lang.label}</span>
                            </span>
                            {language.code === lang.code && (
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={ORANGE} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sign In / Register */}
            <Link
              to="/signin"
              className="group relative flex items-center px-6 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: ORANGE, '--tw-ring-color': ORANGE }}
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                Sign In / Register
              </span>
              <svg
                className="w-0 opacity-0 ml-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.7 3.3a1 1 0 00-1-.25L2.3 9.03a1 1 0 00-.06 1.87l7.11 2.85 2.85 7.11a1 1 0 001.87-.06l6-18.4a1 1 0 00-.36-1.1z" />
              </svg>
            </Link>

            {/* Menu Button */}
            <div className="relative" ref={menuDropdownRef}>
              <button
                type="button"
                onClick={() => setShowMenuDropdown((v) => !v)}
                className="flex items-center justify-center w-10 h-10 rounded-lg border transition-colors hover:bg-slate-50"
                style={{ borderColor: showMenuDropdown ? ORANGE : '#E2E8F0' }}
              >
                {showMenuDropdown ? <X size={20} style={{ color: NAVY }} /> : <Menu size={20} style={{ color: NAVY }} />}
              </button>

              {showMenuDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                  {menuItems.map((item) => (
                    <Link
                      key={item.id}
                      to={`/${item.id}`}
                      onClick={() => setShowMenuDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-slate-50"
            aria-label="Toggle menu"
            aria-expanded={showMobileMenu}
            onClick={() => setShowMobileMenu((v) => !v)}
          >
            <svg className="w-6 h-6" style={{ color: NAVY }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out border-t border-slate-100 ${
          showMobileMenu ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1 bg-white">
          {/* Services */}
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 px-2">Services</span>
            <div className="grid grid-cols-4 gap-y-3 mt-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  to={`/${service.id}`}
                  className="flex flex-col items-center gap-1.5 group"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <ServiceIcon service={service} size={40} iconSize={18} />
                  <span className="text-[11px] font-semibold text-center leading-tight" style={{ color: NAVY }}>
                    {service.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Language & Currency */}
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Language</span>
            <div className="flex space-x-1">
              {LANGUAGES.slice(0, 4).map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    language.code === lang.code ? 'text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  style={language.code === lang.code ? { backgroundColor: NAVY } : {}}
                >
                  <span className={`fi fi-${lang.countryCode} rounded mr-1`}></span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Currency</span>
            <div className="flex space-x-1">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    currency.code === c.code ? 'text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  style={currency.code === c.code ? { backgroundColor: NAVY } : {}}
                >
                  <span className={`fi fi-${c.countryCode} rounded mr-1`}></span>
                  {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 px-2">Menu</span>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50"
                style={{ color: NAVY }}
                onClick={() => setShowMobileMenu(false)}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Sign In / Register */}
          <Link
            to="/signin"
            className="block text-center px-6 py-3 rounded-lg font-semibold text-sm text-white"
            style={{ backgroundColor: ORANGE }}
            onClick={() => setShowMobileMenu(false)}
          >
            Sign In / Register
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar