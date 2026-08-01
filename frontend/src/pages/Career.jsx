import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Heart,
  Users,
  Zap,
  Award,
  Coffee,
  Home,
  Plane,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  CheckCircle,
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

const BENEFITS = [
  { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage for you and your family' },
  { icon: Home, title: 'Remote Work', desc: 'Flexible work arrangements and hybrid options' },
  { icon: Plane, title: 'Travel Benefits', desc: 'Discounted flights and hotel bookings for personal travel' },
  { icon: GraduationCap, title: 'Learning Budget', desc: 'Annual stipend for courses, conferences, and certifications' },
  { icon: Coffee, title: 'Unlimited Coffee', desc: 'Free beverages and snacks in the office' },
  { icon: Award, title: 'Performance Bonus', desc: 'Quarterly bonuses based on individual and team achievements' },
]

const OPEN_POSITIONS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Delhi / Remote',
    type: 'Full-time',
    experience: '5+ years',
    salary: '₹25L - ₹40L',
    description: 'We are looking for an experienced Frontend Developer to lead our UI/UX initiatives. You will work with React, TypeScript, and modern CSS frameworks to build beautiful, performant user interfaces.',
    requirements: [
      '5+ years of experience with React and modern JavaScript',
      'Strong proficiency in TypeScript and modern CSS (Tailwind, CSS Modules)',
      'Experience with state management (Redux, Zustand, or similar)',
      'Knowledge of performance optimization and accessibility best practices',
      'Excellent communication skills and ability to mentor junior developers',
    ],
  },
  {
    id: 2,
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '3+ years',
    salary: '₹18L - ₹30L',
    description: 'Join our backend team to build scalable APIs and microservices that power our travel platform. You will work with Node.js, PostgreSQL, and cloud infrastructure.',
    requirements: [
      '3+ years of experience with Node.js and Express or similar frameworks',
      'Strong knowledge of PostgreSQL and database design',
      'Experience with RESTful APIs and microservices architecture',
      'Familiarity with AWS, GCP, or Azure cloud services',
      'Understanding of caching strategies (Redis, Memcached)',
    ],
  },
  {
    id: 3,
    title: 'Product Designer',
    department: 'Design',
    location: 'Mumbai / Remote',
    type: 'Full-time',
    experience: '4+ years',
    salary: '₹20L - ₹35L',
    description: 'We are seeking a creative Product Designer to craft intuitive and delightful user experiences across our web and mobile platforms. You will collaborate closely with product and engineering teams.',
    requirements: [
      '4+ years of product design experience',
      'Proficiency in Figma and design systems',
      'Strong portfolio demonstrating UX/UI skills',
      'Experience with user research and usability testing',
      'Excellent visual design and typography skills',
    ],
  },
  {
    id: 4,
    title: 'Product Manager',
    department: 'Product',
    location: 'Delhi',
    type: 'Full-time',
    experience: '5+ years',
    salary: '₹30L - ₹50L',
    description: 'Lead product strategy and roadmap for our core travel booking platform. You will work with cross-functional teams to deliver features that delight our customers.',
    requirements: [
      '5+ years of product management experience in e-commerce or travel',
      'Strong analytical and data-driven decision making',
      'Experience with agile development methodologies',
      'Excellent stakeholder management skills',
      'MBA or equivalent experience preferred',
    ],
  },
  {
    id: 5,
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote',
    type: 'Full-time',
    experience: '2+ years',
    salary: '₹12L - ₹18L',
    description: 'Help our customers achieve their goals with Flymunk. You will be the primary point of contact for key accounts and ensure high satisfaction and retention.',
    requirements: [
      '2+ years of customer success or account management experience',
      'Excellent communication and problem-solving skills',
      'Experience with CRM tools (Salesforce, HubSpot, etc.)',
      'Ability to analyze customer data and provide insights',
      'Fluency in English and at least one regional language',
    ],
  },
  {
    id: 6,
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '2+ years',
    salary: '₹15L - ₹25L',
    description: 'Transform data into actionable insights to drive business decisions. You will work with marketing, product, and operations teams to optimize our platform.',
    requirements: [
      '2+ years of data analysis experience',
      'Proficiency in SQL and Python/R',
      'Experience with data visualization tools (Tableau, Looker, or similar)',
      'Strong statistical analysis skills',
      'Experience with A/B testing and experimentation',
    ],
  },
]

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Product', 'Customer Success', 'Analytics']

const Career = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [expandedJob, setExpandedJob] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const filteredPositions = selectedDepartment === 'All'
    ? OPEN_POSITIONS
    : OPEN_POSITIONS.filter(job => job.department === selectedDepartment)

  return (
    <div className="bg-white pt-16">
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
        @media (prefers-reduced-motion: reduce) {
          .fly-float, .fly-pulse, .fly-drift, .fly-fade-up {
            animation: none !important;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        {/* Ambient glow accents */}
        <div
          className="absolute -top-24 -left-16 w-72 h-72 rounded-full blur-3xl fly-drift pointer-events-none"
          style={{ backgroundColor: hexToRgba(ORANGE, 0.18) }}
        />
        <div
          className="absolute -bottom-32 right-10 w-80 h-80 rounded-full blur-3xl fly-drift pointer-events-none"
          style={{ backgroundColor: hexToRgba('#FFFFFF', 0.06), animationDelay: '3s' }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 sm:pb-32">
          <div
            className={`max-w-3xl ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.05s' }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Build the future of
              <span style={{ color: ORANGE }}> travel</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
              Join a team that's passionate about making travel accessible, affordable, and unforgettable for millions of travelers worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#openings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: ORANGE }}
              >
                View Open Positions
                <ArrowRight size={18} />
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold border border-white/30 transition-all duration-300 hover:bg-white/10"
              >
                Learn About Us
              </Link>
            </div>
          </div>

          {/* Floating illustration */}
          <div
            className={`hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.15s' }}
          >
            <div className="relative w-64 h-64 fly-float">
              <div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: hexToRgba('#FFFFFF', 0.08) }}
              />
              <div
                className="absolute inset-8 rounded-full"
                style={{ backgroundColor: hexToRgba('#FFFFFF', 0.12) }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex items-center justify-center w-32 h-32 rounded-3xl shadow-2xl fly-pulse"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <Briefcase size={56} strokeWidth={1.5} style={{ color: NAVY }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              Why work at Flymunk?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We believe in taking care of our team so they can take care of our customers. Here's what you can expect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <div
                key={benefit.title}
                className={`group p-6 rounded-2xl border border-slate-100 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: hexToRgba(ORANGE, 0.1) }}
                >
                  <benefit.icon size={28} style={{ color: ORANGE }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: NAVY }}>{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div id="openings" className="py-16 sm:py-1" style={{ backgroundColor: hexToRgba(NAVY, 0.03) }}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.5s' }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              Open Positions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find your perfect role and join our growing team.
            </p>
          </div>

          {/* Department Filter */}
          <div
            className={`flex flex-wrap justify-center gap-2 mb-10 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.55s' }}
          >
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border hover:-translate-y-0.5"
                style={{
                  backgroundColor: selectedDepartment === dept ? NAVY : '#FFFFFF',
                  borderColor: selectedDepartment === dept ? NAVY : '#E2E8F0',
                  color: selectedDepartment === dept ? '#FFFFFF' : NAVY,
                }}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredPositions.map((job, i) => {
              const isExpanded = expandedJob === job.id
              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.6 + i * 0.08}s` }}
                >
                  <button
                    onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-bold" style={{ color: NAVY }}>{job.title}</h3>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: hexToRgba(ORANGE, 0.1), color: ORANGE }}
                        >
                          {job.department}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase size={14} />
                          {job.experience}
                        </div>
                        <div className="flex items-center gap-1.5 font-semibold" style={{ color: ORANGE }}>
                          <DollarSign size={14} />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{ color: NAVY, transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                      <div className="pt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-bold mb-2" style={{ color: NAVY }}>About this role</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-3" style={{ color: NAVY }}>Requirements</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2">
                          <button
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                            style={{ backgroundColor: ORANGE }}
                          >
                            Apply Now
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {filteredPositions.length === 0 && (
            <div
              className={`text-center py-12 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.6s' }}
            >
              <p className="text-gray-500 text-lg">No positions available in this department. Check back later!</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`rounded-3xl p-8 sm:p-12 relative overflow-hidden ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ backgroundColor: NAVY, animationDelay: '0.7s' }}
          >
            {/* Background decoration */}
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
              style={{ backgroundColor: hexToRgba(ORANGE, 0.2) }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl"
              style={{ backgroundColor: hexToRgba('#FFFFFF', 0.08) }}
            />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Don't see the right role?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                We're always looking for talented people to join our team. Send us your resume and we'll keep you in mind for future openings.
              </p>
              <a
                href="mailto:careers@flymunk.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: ORANGE }}
              >
                Send Your Resume
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Career
