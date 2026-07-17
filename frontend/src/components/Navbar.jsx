import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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

const MapIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      stroke="currentColor"
      d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
    />
  </svg>
)

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [currency, setCurrency] = useState(CURRENCIES[0])
  const [language, setLanguage] = useState(LANGUAGES[0])
  const [dropdownView, setDropdownView] = useState('currency')
  const dropdownRef = useRef(null)

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
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={assets.image3}
              alt="FlyMunk Logo"
              className="h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Currency selector */}
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
                              <span className="text-sm text-slate-700">
                                {lang.label}
                              </span>
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

            {/* Customer support */}
            <Link
              to="/support"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
              style={{ color: NAVY }}
            >
             
              <span className="text-sm font-medium">Customer support</span>
            </Link>

            {/* Find Bookings */}
            <Link
              to="/find-booking"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
              style={{ color: NAVY }}
            >
            
              <span className="text-sm font-medium">Find Bookings</span>
            </Link>

            {/* Sign In / Register — icon "takes off" on hover */}
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
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-slate-50"
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
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out border-t border-slate-100 ${
          showMobileMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1 bg-white">
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

          <Link
            to="/support"
            className="flex items-center space-x-2 px-2 py-3 rounded-lg hover:bg-slate-50"
            style={{ color: NAVY }}
            onClick={() => setShowMobileMenu(false)}
          >
            <svg className="w-[18px] h-[18px] text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 18v-6a9 9 0 0118 0v6" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"
              />
            </svg>
            <span className="text-sm font-medium">Customer support</span>
          </Link>

          <Link
            to="/find-booking"
            className="flex items-center space-x-2 px-2 py-3 rounded-lg hover:bg-slate-50"
            style={{ color: NAVY }}
            onClick={() => setShowMobileMenu(false)}
          >
            <svg className="w-[18px] h-[18px] text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm font-medium">Find Bookings</span>
          </Link>

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