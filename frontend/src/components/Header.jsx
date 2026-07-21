import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Search, Plane, Bed, Car, Briefcase, Landmark, ChevronDown } from 'lucide-react';
import assets from '../assets/assets';

const NAVY = '#02183D';
const ORANGE = '#FE6101';
const LIGHT_ORANGE = '#FF8C42';

const Header = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [showCalendar, setShowCalendar] = useState(false);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [departureMonth, setDepartureMonth] = useState(new Date());
  const [returnMonth, setReturnMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1));
  const [hoveredDate, setHoveredDate] = useState(null);
  const [tripType, setTripType] = useState('roundTrip');
  const [selectedSpecialFare, setSelectedSpecialFare] = useState('Regular');

  // Sync return month to always be next month of departure month
  useEffect(() => {
    setReturnMonth(new Date(departureMonth.getFullYear(), departureMonth.getMonth() + 1, 1));
  }, [departureMonth]);

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
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
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
                <div className="flex gap-2 mb-3 flex-wrap items-center">
                  <button 
                    onClick={() => setTripType('roundTrip')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      tripType === 'roundTrip' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={tripType === 'roundTrip' ? { backgroundColor: NAVY } : {}}
                  >
                    <Plane size={14} /> Round Trip
                  </button>
                  <button 
                    onClick={() => setTripType('oneWay')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      tripType === 'oneWay' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={tripType === 'oneWay' ? { backgroundColor: NAVY } : {}}
                  >
                    One Way
                  </button>
                  <button 
                    onClick={() => setTripType('multiCity')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      tripType === 'multiCity' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={tripType === 'multiCity' ? { backgroundColor: NAVY } : {}}
                  >
                    Multi-City
                  </button>
                  
                  {/* Direct Checkbox */}
                  <div className="flex items-center gap-2 ml-10 px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all cursor-pointer">
                    <input type="checkbox" id="direct" className="w-4 h-4 accent-orange-500 cursor-pointer" />
                    <label htmlFor="direct" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Direct flights </label>
                  </div>
                </div>

                {/* Search Inputs */}
                <div className="flex gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 flex-1">
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
                    <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowCalendar(!showCalendar)}>
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Departure - Return</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={16} style={{ color: ORANGE }} />
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-gray-800 text-sm">
                            {new Date(departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-gray-400">-</span>
                          <span className="font-semibold text-gray-800 text-sm">
                            {new Date(returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <ChevronDown size={14} className="text-gray-400 ml-auto" />
                      </div>

                      {/* Calendar Popup */}
                      {showCalendar && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-[600px]">
                          <div className="flex items-center gap-4">
                            {/* Decrease Month Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDepartureMonth(new Date(departureMonth.getFullYear(), departureMonth.getMonth() - 1, 1));
                              }}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                            >
                              <ChevronDown size={16} className="text-gray-600 rotate-90" />
                            </button>
                            
                            <div className="grid grid-cols-2 gap-4 flex-1">
                              {/* Departure Calendar */}
                              <div>
                                <div className="flex items-center justify-center mb-3">
                                  <h3 className="font-semibold text-gray-800 text-sm">
                                    {departureMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                  </h3>
                                </div>
                              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                <div className="text-gray-500 font-medium">Su</div>
                                <div className="text-gray-500 font-medium">Mo</div>
                                <div className="text-gray-500 font-medium">Tu</div>
                                <div className="text-gray-500 font-medium">We</div>
                                <div className="text-gray-500 font-medium">Th</div>
                                <div className="text-gray-500 font-medium">Fr</div>
                                <div className="text-gray-500 font-medium">Sa</div>
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center text-xs mt-2">
                                {Array.from({ length: 42 }, (_, i) => {
                                  const firstDayOfMonth = new Date(departureMonth.getFullYear(), departureMonth.getMonth(), 1);
                                  const startDay = firstDayOfMonth.getDay();
                                  const day = i - startDay + 1;
                                  const date = new Date(departureMonth.getFullYear(), departureMonth.getMonth(), day);
                                  const isCurrentMonth = date.getMonth() === departureMonth.getMonth();
                                  const formatDate = (d) => {
                                    const year = d.getFullYear();
                                    const month = String(d.getMonth() + 1).padStart(2, '0');
                                    const dayNum = String(d.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${dayNum}`;
                                  };
                                  const isSelected = formatDate(date) === departureDate;
                                  const lastDayOfDepartureMonth = new Date(departureMonth.getFullYear(), departureMonth.getMonth() + 1, 0);
                                  const isHoveredInSameMonth = hoveredDate && new Date(hoveredDate).getMonth() === departureMonth.getMonth() && 
                                    new Date(hoveredDate).getFullYear() === departureMonth.getFullYear();
                                  const isInRange = hoveredDate && departureDate && 
                                    new Date(departureDate) <= date && 
                                    (isHoveredInSameMonth ? date <= new Date(hoveredDate) : date <= lastDayOfDepartureMonth);
                                  return (
                                    <div
                                      key={i}
                                      className={`p-2 rounded-lg cursor-pointer transition-all ${
                                        !isCurrentMonth ? 'text-gray-300' : 'text-gray-700 hover:bg-orange-100'
                                      } ${isSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''} ${
                                        isInRange && isCurrentMonth ? 'bg-orange-200' : ''
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isCurrentMonth) {
                                          if (!departureDate) {
                                            setDepartureDate(formatDate(date));
                                          } else if (departureDate && new Date(formatDate(date)) >= new Date(departureDate)) {
                                            setReturnDate(formatDate(date));
                                            setShowCalendar(false);
                                          } else {
                                            setDepartureDate(formatDate(date));
                                          }
                                        }
                                      }}
                                      onMouseEnter={() => {
                                        if (isCurrentMonth) setHoveredDate(formatDate(date));
                                      }}
                                      onMouseLeave={() => {
                                        setHoveredDate(null);
                                      }}
                                    >
                                      {date.getDate()}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Return Calendar */}
                            <div>
                              <div className="flex items-center justify-center mb-3">
                                <h3 className="font-semibold text-gray-800 text-sm">
                                  {returnMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </h3>
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                <div className="text-gray-500 font-medium">Su</div>
                                <div className="text-gray-500 font-medium">Mo</div>
                                <div className="text-gray-500 font-medium">Tu</div>
                                <div className="text-gray-500 font-medium">We</div>
                                <div className="text-gray-500 font-medium">Th</div>
                                <div className="text-gray-500 font-medium">Fr</div>
                                <div className="text-gray-500 font-medium">Sa</div>
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center text-xs mt-2">
                                {Array.from({ length: 42 }, (_, i) => {
                                  const firstDayOfMonth = new Date(returnMonth.getFullYear(), returnMonth.getMonth(), 1);
                                  const startDay = firstDayOfMonth.getDay();
                                  const day = i - startDay + 1;
                                  const date = new Date(returnMonth.getFullYear(), returnMonth.getMonth(), day);
                                  const isCurrentMonth = date.getMonth() === returnMonth.getMonth();
                                  const formatDate = (d) => {
                                    const year = d.getFullYear();
                                    const month = String(d.getMonth() + 1).padStart(2, '0');
                                    const dayNum = String(d.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${dayNum}`;
                                  };
                                  const isSelected = formatDate(date) === returnDate;
                                  const firstDayOfReturnMonth = new Date(returnMonth.getFullYear(), returnMonth.getMonth(), 1);
                                  const isSameMonthAsDeparture = returnMonth.getMonth() === new Date(departureDate).getMonth() && 
                                    returnMonth.getFullYear() === new Date(departureDate).getFullYear();
                                  const isInRange = hoveredDate && departureDate && 
                                    (isSameMonthAsDeparture ? new Date(departureDate) <= date : firstDayOfReturnMonth <= date) && 
                                    date <= new Date(hoveredDate);
                                  return (
                                    <div
                                      key={i}
                                      className={`p-2 rounded-lg cursor-pointer transition-all ${
                                        !isCurrentMonth ? 'text-gray-300' : 'text-gray-700 hover:bg-orange-100'
                                      } ${isSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''} ${
                                        isInRange && isCurrentMonth ? 'bg-orange-200' : ''
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isCurrentMonth) {
                                          setReturnDate(formatDate(date));
                                          setShowCalendar(false);
                                        }
                                      }}
                                      onMouseEnter={() => {
                                        if (isCurrentMonth) setHoveredDate(formatDate(date));
                                      }}
                                      onMouseLeave={() => {
                                        setHoveredDate(null);
                                      }}
                                    >
                                      {date.getDate()}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            </div>
                            
                            {/* Increase Month Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDepartureMonth(new Date(departureMonth.getFullYear(), departureMonth.getMonth() + 1, 1));
                              }}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                            >
                              <ChevronDown size={16} className="text-gray-600 -rotate-90" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Passengers */}
                    <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}>
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Passengers</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Users size={16} style={{ color: ORANGE }} />
                        <span className="font-semibold text-gray-800 text-sm">
                          {adults} Adult{adults !== 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}{infants > 0 ? `, ${infants} Infant${infants !== 1 ? 's' : ''}` : ''}
                        </span>
                        <ChevronDown size={14} className="text-gray-400 ml-auto" />
                      </div>

                      {/* Passenger Dropdown */}
                      {showPassengerDropdown && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-[320px]">
                          <div className="space-y-4">
                            {/* Adults */}
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-800 text-sm">Adults</div>
                                <div className="text-xs text-gray-500">12+ years</div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setAdults(Math.max(1, adults - 1)); }}
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                >
                                  -
                                </button>
                                <span className="font-semibold text-gray-800 w-6 text-center">{adults}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setAdults(adults + 1); }}
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Children */}
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-800 text-sm">Children</div>
                                <div className="text-xs text-gray-500">2-11 years</div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setChildren(Math.max(0, children - 1)); }}
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                >
                                  -
                                </button>
                                <span className="font-semibold text-gray-800 w-6 text-center">{children}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setChildren(children + 1); }}
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Infants */}
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-800 text-sm">Infants on lap</div>
                                <div className="text-xs text-gray-500">Under 2 years</div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setInfants(Math.max(0, infants - 1)); }}
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                >
                                  -
                                </button>
                                <span className="font-semibold text-gray-800 w-6 text-center">{infants}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setInfants(infants + 1); }}
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Done Button */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowPassengerDropdown(false); }}
                            className="w-full mt-4 py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg"
                            style={{ backgroundColor: LIGHT_ORANGE }}
                          >
                            Done
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Class */}
                    <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowClassDropdown(!showClassDropdown)}>
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Class</label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-gray-800 text-sm">{selectedClass}</span>
                        <ChevronDown size={14} className="text-gray-400 ml-auto" />
                      </div>

                      {/* Class Dropdown */}
                      {showClassDropdown && (
                        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-[320px]">
                          <div className="space-y-2">
                            {[
                              { name: 'Economy', desc: 'Best value fares' },
                              { name: 'Economy/Premium Economy', desc: 'Extra comfort' },
                              { name: 'Premium Economy', desc: 'Enhanced experience' },
                              { name: 'Business/First', desc: 'Luxury combined' },
                              { name: 'Business', desc: 'Premium service' },
                              { name: 'First', desc: 'Ultimate luxury' }
                            ].map((classOption) => (
                              <button
                                key={classOption.name}
                                onClick={(e) => { e.stopPropagation(); setSelectedClass(classOption.name); setShowClassDropdown(false); }}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 border-2 ${
                                  selectedClass === classOption.name
                                    ? 'bg-orange-50 border-orange-400 shadow-md'
                                    : 'hover:bg-gray-50 border-transparent'
                                }`}
                              >
                                <div className="flex-1">
                                  <div className={`text-sm font-semibold ${
                                    selectedClass === classOption.name ? 'text-orange-600' : 'text-gray-800'
                                  }`}>
                                    {classOption.name}
                                  </div>
                                  <div className="text-xs text-gray-500">{classOption.desc}</div>
                                </div>
                                {selectedClass === classOption.name && (
                                  <div className="w-6 h-6 rounded-full bg-orange-500 shadow-sm flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Special Fares + Search Button */}
                <div className="flex gap-3 flex-wrap  pt-4 border-t border-gray-100 items-center">
                  <div className="flex gap-3 flex-wrap flex-1">
                    <button 
                      onClick={() => setSelectedSpecialFare('Regular')}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 ${
                        selectedSpecialFare === 'Regular' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Regular</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Regular fares</span>
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('Student')}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 ${
                        selectedSpecialFare === 'Student' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Student</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Extra discounts/baggage</span>
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('Armed Forces')}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 ${
                        selectedSpecialFare === 'Armed Forces' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Armed Forces</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Up to ₹ 600 off</span>
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('Senior Citizen')}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 ${
                        selectedSpecialFare === 'Senior Citizen' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Senior Citizen</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Up to ₹ 600 off</span>
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('Doctor and Nurses')}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 ${
                        selectedSpecialFare === 'Doctor and Nurses' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Doctor and Nurses</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Up to ₹ 600 off</span>
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('GST Number')}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 ${
                        selectedSpecialFare === 'GST Number' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>GST Number</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Upto 10% Extra Savings!</span>
                    </button>
                  </div>

                  {/* Search Button */}
                  <button className="text-white px-8 py-3 rounded-lg text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap" style={{ backgroundColor: ORANGE }}>
                    <Search size={20} /> Search
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
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

                  {/* Search Button */}
                  <button className="text-white px-8 py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap" style={{ backgroundColor: ORANGE }}>
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'cars' && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
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

                  {/* Search Button */}
                  <button className="text-white px-8 py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap" style={{ backgroundColor: ORANGE }}>
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'flight-hotel' && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">
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

                  {/* Search Button */}
                  <button className="text-white px-8 py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap" style={{ backgroundColor: ORANGE }}>
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'attractions' && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
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

                  {/* Search Button */}
                  <button className="text-white px-8  rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap" style={{ backgroundColor: ORANGE }}>
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
