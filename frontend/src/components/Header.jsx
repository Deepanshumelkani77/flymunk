import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, Plane, Bed, Car, Briefcase, Landmark, ChevronDown } from 'lucide-react';
import assets from '../assets/assets';

const NAVY = '#02183D';
const ORANGE = '#FE6101';

const Header = () => {
  const [activeTab, setActiveTab] = useState('flights');

  const tabs = [
    { id: 'flights', name: 'Flights', icon: <Plane size={20} /> },
    { id: 'hotels', name: 'Hotels', icon: <Bed size={20} /> },
    { id: 'cars', name: 'Cars', icon: <Car size={20} /> },
    { id: 'flight-hotel', name: 'Flight + Hotel', icon: <Briefcase size={20} /> },
    { id: 'attractions', name: 'Attractions & Tours', icon: <Landmark size={20} /> },
  ];

  return (
    <div className="relative w-full h-[500px]">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src={assets.seenn} 
          alt="Travel Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#02183D]/60 via-[#02183D]/50 to-[#02183D]/40" />
      </div>

      {/* Search Box - Compact and centered */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 backdrop-blur-sm">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold transition-all relative text-sm ${
                  activeTab === tab.id
                    ? 'text-gray-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === tab.id ? {
                  backgroundColor: '#f8fafc',
                  borderBottom: '2px solid',
                  borderBottomColor: ORANGE
                } : {}}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Search Content */}
          <div className="p-5">
            {activeTab === 'flights' && (
              <div className="space-y-3">
                {/* Trip Type */}
                <div className="flex gap-2 mb-3">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-white text-sm transition-all hover:shadow-lg" style={{ backgroundColor: NAVY }}>
                    <Plane size={14} /> Round Trip
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm">
                    One Way
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm">
                    Multi-City
                  </button>
                </div>

                {/* Search Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* From */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">From</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} style={{ color: ORANGE }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                        defaultValue="New Delhi"
                      />
                    </div>
                  </div>

                  {/* To */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">To</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} style={{ color: ORANGE }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Departure - Return</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={16} style={{ color: ORANGE }} />
                      <span className="font-semibold text-gray-800 text-sm">Jul 16 - Jul 17</span>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Passengers & Class</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={16} style={{ color: ORANGE }} />
                      <span className="font-semibold text-gray-800 text-sm">1 Adult, Economy</span>
                      <ChevronDown size={14} className="text-gray-400 ml-auto" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button className="w-full text-white py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-3" style={{ backgroundColor: ORANGE }}>
                  <Search size={18} /> Search Flights
                </button>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Destination */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Destination</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} style={{ color: ORANGE }} />
                      <input
                        type="text"
                        placeholder="City, hotel, or landmark"
                        className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Check-in - Check-out</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={16} style={{ color: ORANGE }} />
                      <span className="font-semibold text-gray-800 text-sm">Jul 16 - Jul 17</span>
                      <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-semibold ml-auto">1 night</span>
                    </div>
                  </div>

                  {/* Rooms & Guests */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Rooms & Guests</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={16} style={{ color: ORANGE }} />
                      <span className="font-semibold text-gray-800 text-sm">1 Room, 2 Adults</span>
                      <ChevronDown size={14} className="text-gray-400 ml-auto" />
                    </div>
                  </div>
                </div>

                <button className="w-full text-white py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-3" style={{ backgroundColor: ORANGE }}>
                  <Search size={18} /> Search Hotels
                </button>
              </div>
            )}

            {activeTab === 'cars' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Pick-up Location */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Pick-up Location</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} style={{ color: ORANGE }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Pick-up - Drop-off</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={16} style={{ color: ORANGE }} />
                      <span className="font-semibold text-gray-800 text-sm">Jul 16 - Jul 17</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Pick-up Time</label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-gray-800 text-sm">10:00 AM</span>
                      <ChevronDown size={14} className="text-gray-400 ml-auto" />
                    </div>
                  </div>
                </div>

                <button className="w-full text-white py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-3" style={{ backgroundColor: ORANGE }}>
                  <Search size={18} /> Search Cars
                </button>
              </div>
            )}

            {activeTab === 'flight-hotel' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* From */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">From</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} style={{ color: ORANGE }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* To */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">To</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} style={{ color: ORANGE }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Departure - Return</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={16} style={{ color: ORANGE }} />
                      <span className="font-semibold text-gray-800 text-sm">Jul 16 - Jul 17</span>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Guests & Rooms</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={16} style={{ color: ORANGE }} />
                      <span className="font-semibold text-gray-800 text-sm">2 Adults, 1 Room</span>
                    </div>
                  </div>
                </div>

                <button className="w-full text-white py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-3" style={{ backgroundColor: ORANGE }}>
                  <Search size={18} /> Search Flight + Hotel
                </button>
              </div>
            )}

            {activeTab === 'attractions' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Destination */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Destination</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} style={{ color: ORANGE }} />
                      <input
                        type="text"
                        placeholder="City or attraction"
                        className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Date</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={16} style={{ color: ORANGE }} />
                      <span className="font-semibold text-gray-800 text-sm">Jul 16</span>
                    </div>
                  </div>

                  {/* Tickets */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Tickets</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={16} style={{ color: ORANGE }} />
                      <span className="font-semibold text-gray-800 text-sm">2 Adults</span>
                      <ChevronDown size={14} className="text-gray-400 ml-auto" />
                    </div>
                  </div>
                </div>

                <button className="w-full text-white py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-3" style={{ backgroundColor: ORANGE }}>
                  <Search size={18} /> Search Attractions
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
