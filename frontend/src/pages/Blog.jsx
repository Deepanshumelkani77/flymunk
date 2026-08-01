import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  Heart,
  Share2,
  Bookmark,
  ChevronRight,
  Plane,
  MapPin,
  Camera,
  Utensils,
  Mountain,
  Building2,
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

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Top 10 Hidden Gems in Southeast Asia You Must Visit in 2026',
    excerpt: 'Discover untouched beaches, ancient temples, and vibrant local cultures that most tourists never get to experience. From the pristine islands of Thailand to the mystical mountains of Vietnam.',
    image: 'https://picsum.photos/id/1039/800/500',
    category: 'Destinations',
    author: 'Priya Sharma',
    date: 'July 28, 2026',
    readTime: '8 min read',
    featured: true,
    tags: ['Southeast Asia', 'Hidden Gems', 'Travel Tips'],
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Budget Travel: How to Explore More for Less',
    excerpt: 'Master the art of budget travel with our comprehensive guide. Learn how to find cheap flights, affordable accommodations, and free activities in any destination.',
    image: 'https://picsum.photos/id/1043/800/500',
    category: 'Travel Tips',
    author: 'Rahul Verma',
    date: 'July 25, 2026',
    readTime: '6 min read',
    featured: true,
    tags: ['Budget Travel', 'Money Saving', 'Tips'],
  },
  {
    id: 3,
    title: 'Sustainable Travel: 7 Ways to Reduce Your Carbon Footprint',
    excerpt: 'Travel responsibly with our guide to eco-friendly tourism. From choosing green accommodations to supporting local communities, make every trip count.',
    image: 'https://picsum.photos/id/1015/800/500',
    category: 'Sustainability',
    author: 'Anita Desai',
    date: 'July 22, 2026',
    readTime: '5 min read',
    featured: false,
    tags: ['Sustainability', 'Eco Travel', 'Environment'],
  },
  {
    id: 4,
    title: 'A Food Lover Journey Through the Streets of Mumbai',
    excerpt: 'Experience the culinary delights of Mumbai from street food to fine dining. Discover the best vada pav, authentic thalis, and hidden food gems.',
    image: 'https://picsum.photos/id/1050/800/500',
    category: 'Food & Culture',
    author: 'Vikram Patel',
    date: 'July 19, 2026',
    readTime: '7 min read',
    featured: false,
    tags: ['Food', 'Mumbai', 'Street Food'],
  },
  {
    id: 5,
    title: 'Digital Nomad Guide: Best Cities for Remote Work in 2026',
    excerpt: 'Work from paradise with our curated list of the best cities for digital nomads. Great internet, affordable living, and amazing communities await.',
    image: 'https://picsum.photos/id/1016/800/500',
    category: 'Lifestyle',
    author: 'Meera Nair',
    date: 'July 15, 2026',
    readTime: '9 min read',
    featured: false,
    tags: ['Digital Nomad', 'Remote Work', 'Lifestyle'],
  },
  {
    id: 6,
    title: 'Adventure Awaits: Trekking Through the Himalayas',
    excerpt: 'Embark on an unforgettable journey through the majestic Himalayas. From easy day hikes to challenging expeditions, find your perfect adventure.',
    image: 'https://picsum.photos/id/110/800/500',
    category: 'Adventure',
    author: 'Arjun Singh',
    date: 'July 12, 2026',
    readTime: '10 min read',
    featured: false,
    tags: ['Himalayas', 'Trekking', 'Adventure'],
  },
  {
    id: 7,
    title: 'Luxury on a Budget: How to Experience 5-Star Travel for Less',
    excerpt: 'Indulge in luxury without breaking the bank. Learn insider tips for upgrading flights, booking premium hotels at discounts, and accessing exclusive perks.',
    image: 'https://picsum.photos/id/1018/800/500',
    category: 'Travel Tips',
    author: 'Sneha Kapoor',
    date: 'July 8, 2026',
    readTime: '6 min read',
    featured: false,
    tags: ['Luxury Travel', 'Budget', 'Tips'],
  },
  {
    id: 8,
    title: 'Family Travel: Making Memories with Kids of All Ages',
    excerpt: 'Plan the perfect family vacation with our guide to traveling with children. From toddlers to teenagers, keep everyone happy and engaged.',
    image: 'https://picsum.photos/id/1019/800/500',
    category: 'Family Travel',
    author: 'Kavita Reddy',
    date: 'July 5, 2026',
    readTime: '7 min read',
    featured: false,
    tags: ['Family Travel', 'Kids', 'Vacation'],
  },
  {
    id: 9,
    title: 'Solo Travel Safety: Essential Tips for First-Time Solo Travelers',
    excerpt: 'Embark on your first solo adventure with confidence. Our comprehensive safety guide covers everything from destination research to emergency preparedness.',
    image: 'https://picsum.photos/id/1025/800/500',
    category: 'Travel Tips',
    author: 'Neha Gupta',
    date: 'July 1, 2026',
    readTime: '8 min read',
    featured: false,
    tags: ['Solo Travel', 'Safety', 'Tips'],
  },
]

const CATEGORIES = ['All', 'Destinations', 'Travel Tips', 'Sustainability', 'Food & Culture', 'Lifestyle', 'Adventure', 'Family Travel']

const CATEGORY_ICONS = {
  'Destinations': MapPin,
  'Travel Tips': Plane,
  'Sustainability': Mountain,
  'Food & Culture': Utensils,
  'Lifestyle': Building2,
  'Adventure': Mountain,
  'Family Travel': Heart,
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured && (selectedCategory === 'All' || post.category === selectedCategory))

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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 sm:pb-20">
          <div
            className={`max-w-3xl ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.05s' }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Travel Stories &
              <span style={{ color: ORANGE }}> Inspiration</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
              Discover expert travel tips, destination guides, and inspiring stories from our community of globetrotters.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-full text-white placeholder-white/50 border border-white/20 focus:border-orange-400 focus:outline-none transition-colors"
                style={{ backgroundColor: hexToRgba('#FFFFFF', 0.1) }}
              />
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50" />
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
                  <Camera size={56} strokeWidth={1.5} style={{ color: NAVY }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="py-16 sm:py-10 bg-white">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`flex items-center gap-3 mb-8 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.25s' }}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ORANGE }} />
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>Featured Stories</h2>
            </div>

            <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
              {featuredPosts.map((post, i) => (
                <div
                  key={post.id}
                  className={`group relative rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex-shrink-0 w-full sm:w-[500px] snap-start ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                      style={{ backgroundColor: ORANGE }}
                    >
                      {post.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-orange-200 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-white/70 text-xs">
                        <div className="flex items-center gap-1.5">
                          <User size={14} />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {post.readTime}
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="py-16 sm:py-24" style={{ backgroundColor: hexToRgba(NAVY, 0.03) }}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div
            className={`flex flex-wrap justify-center gap-2 mb-8 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category]
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border hover:-translate-y-0.5"
                  style={{
                    backgroundColor: selectedCategory === category ? NAVY : '#FFFFFF',
                    borderColor: selectedCategory === category ? NAVY : '#E2E8F0',
                    color: selectedCategory === category ? '#FFFFFF' : NAVY,
                  }}
                >
                  {Icon && <Icon size={16} />}
                  {category}
                </button>
              )
            })}
          </div>

          <div
            className={`flex items-center gap-3 mb-8 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.45s' }}
          >
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ORANGE }} />
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
              {selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
            </h2>
            <span className="text-gray-500 text-sm">({regularPosts.length} articles)</span>
          </div>

          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, i) => (
                <div
                  key={post.id}
                  className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.5 + i * 0.08}s` }}
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: ORANGE }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors" style={{ color: NAVY }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: hexToRgba(NAVY, 0.08), color: NAVY }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <User size={14} />
                        {post.author}
                      </div>
                      <button className="flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2" style={{ color: ORANGE }}>
                        Read
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`text-center py-12 ${mounted ? 'fly-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.5s' }}
            >
              <p className="text-gray-500 text-lg">No articles found. Try a different category or search term.</p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 sm:py-5 bg-white">
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
              <div className="flex items-center justify-center gap-2 mb-4">
                <Plane size={32} style={{ color: ORANGE }} />
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Travel Inspiration, Delivered
                </h2>
              </div>
              <p className="text-white/80 text-lg mb-8 max-w-6xl mx-auto">
                Subscribe to our newsletter and get the latest travel tips, destination guides, and exclusive deals delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full text-white placeholder-white/50 border border-white/20 focus:border-orange-400 focus:outline-none transition-colors"
                  style={{ backgroundColor: hexToRgba('#FFFFFF', 0.1) }}
                />
                <button
                  className="px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: ORANGE }}
                >
                  Subscribe
                </button>
              </div>
              <p className="text-white/60 text-sm mt-4">
                No spam, unsubscribe anytime. Read our <Link to="/privacy" className="underline hover:text-orange-300">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
