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

      {/* Search Box - Spans from top to bottom of hero */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-[#02183D] border-b-2 border-[#02183D]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Search Content */}
          <div className="p-6">
            {activeTab === 'flights' && (
              <div className="space-y-4">
                {/* Trip Type */}
                <div className="flex gap-4 mb-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white" style={{ backgroundColor: NAVY }}>
                    <Plane size={16} /> Round Trip
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                    One Way
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                    Multi-City
                  </button>
                </div>

                {/* Search Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* From */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">From</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={18} style={{ color: NAVY }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800"
                        defaultValue="New Delhi"
                      />
                    </div>
                  </div>

                  {/* To */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">To</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={18} style={{ color: NAVY }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Departure - Return</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={18} style={{ color: NAVY }} />
                      <span className="font-semibold text-gray-800">Jul 16 - Jul 17</span>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Passengers & Class</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={18} style={{ color: NAVY }} />
                      <span className="font-semibold text-gray-800">1 Adult, Economy</span>
                      <ChevronDown size={16} className="text-gray-400 ml-auto" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button className="w-full text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition flex items-center justify-center gap-2" style={{ backgroundColor: ORANGE }}>
                  <Search size={22} /> Search Flights
                </button>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Destination */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Destination</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={18} style={{ color: NAVY }} />
                      <input
                        type="text"
                        placeholder="City, hotel, or landmark"
                        className="w-full outline-none font-semibold text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Check-in - Check-out</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={18} style={{ color: NAVY }} />
                      <span className="font-semibold text-gray-800">Jul 16 - Jul 17</span>
                      <span className="bg-blue-50 text-[#02183D] px-2 py-0.5 rounded text-xs font-medium ml-auto">1 night</span>
                    </div>
                  </div>

                  {/* Rooms & Guests */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Rooms & Guests</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={18} style={{ color: NAVY }} />
                      <span className="font-semibold text-gray-800">1 Room, 2 Adults</span>
                      <ChevronDown size={16} className="text-gray-400 ml-auto" />
                    </div>
                  </div>
                </div>

                <button className="w-full text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition flex items-center justify-center gap-2" style={{ backgroundColor: ORANGE }}>
                  <Search size={22} /> Search Hotels
                </button>
              </div>
            )}

            {activeTab === 'cars' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Pick-up Location */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Pick-up Location</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={18} style={{ color: NAVY }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Pick-up - Drop-off</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={18} style={{ color: NAVY }} />
                      <span className="font-semibold text-gray-800">Jul 16 - Jul 17</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Pick-up Time</label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-gray-800">10:00 AM</span>
                      <ChevronDown size={16} className="text-gray-400 ml-auto" />
                    </div>
                  </div>
                </div>

                <button className="w-full text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition flex items-center justify-center gap-2" style={{ backgroundColor: ORANGE }}>
                  <Search size={22} /> Search Cars
                </button>
              </div>
            )}

            {activeTab === 'flight-hotel' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* From */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">From</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={18} style={{ color: NAVY }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800"
                      />
                    </div>
                  </div>

                  {/* To */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">To</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={18} style={{ color: NAVY }} />
                      <input
                        type="text"
                        placeholder="City or Airport"
                        className="w-full outline-none font-semibold text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Departure - Return</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={18} style={{ color: NAVY }} />
                      <span className="font-semibold text-gray-800">Jul 16 - Jul 17</span>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Guests & Rooms</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={18} style={{ color: NAVY }} />
                      <span className="font-semibold text-gray-800">2 Adults, 1 Room</span>
                    </div>
                  </div>
                </div>

                <button className="w-full text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition flex items-center justify-center gap-2" style={{ backgroundColor: ORANGE }}>
                  <Search size={22} /> Search Flight + Hotel
                </button>
              </div>
            )}

            {activeTab === 'attractions' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Destination */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Destination</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={18} style={{ color: NAVY }} />
                      <input
                        type="text"
                        placeholder="City or attraction"
                        className="w-full outline-none font-semibold text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Date</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={18} style={{ color: NAVY }} />
                      <span className="font-semibold text-gray-800">Jul 16</span>
                    </div>
                  </div>

                  {/* Tickets */}
                  <div className="border border-gray-300 rounded-lg p-3 hover:border-[#02183D] transition">
                    <label className="text-xs text-gray-500 font-medium">Tickets</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={18} style={{ color: NAVY }} />
                      <span className="font-semibold text-gray-800">2 Adults</span>
                      <ChevronDown size={16} className="text-gray-400 ml-auto" />
                    </div>
                  </div>
                </div>

                <button className="w-full text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition flex items-center justify-center gap-2" style={{ backgroundColor: ORANGE }}>
                  <Search size={22} /> Search Attractions
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
