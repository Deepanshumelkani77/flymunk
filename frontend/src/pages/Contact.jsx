import React, { useState } from 'react'
import { MapPin, Mail, Phone, Send, ExternalLink } from 'lucide-react'

const NAVY = '#02173C'
const ORANGE = '#FF6102'

// Small helper so every icon badge derives its tint/hover state from the
// same brand colors used in the Navbar, instead of one-off hex values.
const hexToRgba = (hex, alpha) => {
  const h = hex.replace('#', '')
  const bigint = parseInt(h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Icon badge matching the Navbar's ServiceIcon treatment: navy tint at rest,
// solid orange with a lifted shadow on hover.
const IconBadge = ({ children, size = 44 }) => (
  <div
    className="flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300 ease-out group-hover:-translate-y-0.5"
    style={{
      width: size,
      height: size,
      backgroundColor: hexToRgba(NAVY, 0.07),
      border: `1px solid ${hexToRgba(NAVY, 0.14)}`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = ORANGE
      e.currentTarget.style.borderColor = ORANGE
      e.currentTarget.style.boxShadow = `0 8px 16px -4px ${hexToRgba(ORANGE, 0.45)}`
      const glyph = e.currentTarget.querySelector('.icon-glyph')
      if (glyph) glyph.style.color = '#FFFFFF'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = hexToRgba(NAVY, 0.07)
      e.currentTarget.style.borderColor = hexToRgba(NAVY, 0.14)
      e.currentTarget.style.boxShadow = 'none'
      const glyph = e.currentTarget.querySelector('.icon-glyph')
      if (glyph) glyph.style.color = NAVY
    }}
  >
    {children}
  </div>
)

// Signature element: a dashed flight path with a small plane marker,
// used as quiet decoration behind the hero copy — ties the page back
// to what Flymunk actually does without leaning on stock travel imagery.
const FlightPath = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1200 400"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M -40 320 C 220 220, 420 380, 640 240 S 1040 60, 1260 120"
      fill="none"
      stroke={hexToRgba('#FFFFFF', 0.14)}
      strokeWidth="2"
      strokeDasharray="2 10"
      strokeLinecap="round"
    />
    <g transform="translate(640 240) rotate(-25)">
      <path d="M0 -7 L16 0 L0 7 L3 0 Z" fill={ORANGE} opacity="0.85" />
    </g>
  </svg>
)

const inputClass =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:bg-white focus:border-transparent outline-none transition text-base'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address with @ and domain')
      return
    }

    // Phone validation - numeric and + sign only
    const phoneRegex = /^\+?[0-9]+$/
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid phone number (numeric and + sign only)')
      return
    }

    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ firstName: '', middleName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const quickContacts = [
    { label: 'Call us', value: '+91 9999117576', href: 'tel:+919910060345', icon: Phone },
    { label: 'WhatsApp', value: 'Chat now', href: 'https://wa.me/9999117576', icon: Send },
    { label: 'Email', value: 'care@mayankvarshney.com', href: 'mailto:care@mayankvarshney.com', icon: Mail },
  ]

  return (
    <div className="bg-slate-50 pt-10">
   
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
            <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: ORANGE }}>
              Send a message
            </span>
            <h2 className="text-2xl font-bold mt-1 mb-6" style={{ color: NAVY }}>
              We'd love to hear from you
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ '--tw-ring-color': ORANGE }}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1.5">Middle Name</label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ '--tw-ring-color': ORANGE }}
                    placeholder="Middle name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ '--tw-ring-color': ORANGE }}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ '--tw-ring-color': ORANGE }}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ '--tw-ring-color': ORANGE }}
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={inputClass}
                  style={{ '--tw-ring-color': ORANGE }}
                >
                  <option value="">Select a subject</option>
                  <option value="Flights">Flights</option>
                  <option value="Hotels">Hotels</option>
                  <option value="Flight + Hotel">Flight + Hotel</option>
                  <option value="Attractions">Attractions</option>
                  <option value="Transport">Transport</option>
                  <option value="Visa">Visa</option>
                  <option value="Forex">Forex</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Group Trip">Group Trip</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  style={{ '--tw-ring-color': ORANGE }}
                  placeholder="Tell us about your trip..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-orange-200 text-base"
                style={{ backgroundColor: ORANGE }}
              >
                <span>Send Message</span>
                <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {/* Right: Map */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 flex flex-col">
            <div className="p-6 pb-4 flex justify-between items-start">
              <div>
                <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: ORANGE }}>
                  Visit us
                </span>
                <h3 className="text-2xl font-bold mt-1" style={{ color: NAVY }}>Our Office</h3>
              </div>
              <a
                href="https://www.google.com/maps?q=28.5807941,77.4282933&z=17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 text-white rounded-lg transition-colors text-sm font-medium hover:opacity-90 flex-shrink-0"
                style={{ backgroundColor: NAVY }}
              >
                Open in Maps
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="flex-1 min-h-[280px]">
              <iframe
                src="https://www.google.com/maps?q=28.5807941,77.4282933&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Flymunk Office Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact detail cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-start gap-4 transition-shadow duration-300 hover:shadow-md">
            <IconBadge>
              <MapPin size={20} className="icon-glyph transition-colors duration-300" style={{ color: NAVY }} strokeWidth={1.9} />
            </IconBadge>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Address</span>
              <p className="text-base text-gray-700 mt-1 leading-snug">
                 FF 05, Rise Retailia 1, Plot No. SC 01, Sector 1,
                Greater Noida West, Gautam Buddha Nagar, Uttar Pradesh - 201306
              </p>
            </div>
          </div>

          <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-start gap-4 transition-shadow duration-300 hover:shadow-md">
            <IconBadge>
              <Mail size={20} className="icon-glyph transition-colors duration-300" style={{ color: NAVY }} strokeWidth={1.9} />
            </IconBadge>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Email</span>
              <p className="mt-1">
                <a href="mailto:care@mayankvarshney.com" className="text-base font-medium hover:underline" style={{ color: NAVY }}>
                  care@flymunk.com
                </a>
              </p>
            </div>
          </div>

          <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-start gap-4 transition-shadow duration-300 hover:shadow-md">
            <IconBadge>
              <Phone size={20} className="icon-glyph transition-colors duration-300" style={{ color: NAVY }} strokeWidth={1.9} />
            </IconBadge>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Phone &amp; WhatsApp</span>
              <p className="mt-1">
                <a href="tel:+919355544664" className="text-base font-medium hover:underline" style={{ color: NAVY }}>
                  +91 9355544664
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact