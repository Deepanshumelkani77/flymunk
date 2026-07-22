import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Search, Plane, Bed, Car, Briefcase, Landmark, ChevronDown, ChevronLeft, ChevronRight, TrendingUp, IndianRupee, PawPrint, Clock } from 'lucide-react';
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
  const [hoveredSpecialFare, setHoveredSpecialFare] = useState(null);
  const [isGroupTrip, setIsGroupTrip] = useState(false);
  
  // Special fare details
  const specialFareDetails = {
    'Regular': {
      description: 'Standard fares with no special requirements',
      documents: 'None required'
    },
    'Student': {
      description: 'Extra discounts and baggage allowance for students',
      documents: 'Valid Student ID card from recognized institution'
    },
    'Armed Forces': {
      description: 'Special discounts up to ₹ 600 for military personnel',
      documents: 'Armed Forces ID card or Service certificate'
    },
    'Senior Citizen': {
      description: 'Special fares for senior citizens with additional benefits',
      documents: 'Government-issued ID showing age 60+'
    },
    'Doctor and Nurses': {
      description: 'Special discounts up to ₹ 600 for medical professionals',
      documents: 'Valid medical registration certificate or ID'
    },
    'GST Number': {
      description: 'Up to 10% extra savings on GST registered bookings',
      documents: 'Valid GST registration number'
    }
  };
  
  // Hotel calendar state
  const [showHotelCalendar, setShowHotelCalendar] = useState(false);
  const [hotelCheckInDate, setHotelCheckInDate] = useState(null);
  const [hotelCheckOutDate, setHotelCheckOutDate] = useState(null);
  const [hotelDepartureMonth, setHotelDepartureMonth] = useState(new Date());
  const [hotelReturnMonth, setHotelReturnMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1));
  const [hotelHoveredDate, setHotelHoveredDate] = useState(null);
  
  // Hotel rooms & guests state
  const [showHotelGuestsDropdown, setShowHotelGuestsDropdown] = useState(false);
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelAdults, setHotelAdults] = useState(2);
  const [hotelChildren, setHotelChildren] = useState(0);
  const [travelingWithPet, setTravelingWithPet] = useState(false);
  const [hotelRoomType, setHotelRoomType] = useState('upto4rooms');
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [showHotelSearch, setShowHotelSearch] = useState(false);
  const [hoveredGroupDeals, setHoveredGroupDeals] = useState(false);

  // Car search state
  const [carSearchType, setCarSearchType] = useState('carRentals');
  const [dropOffDifferentLocation, setDropOffDifferentLocation] = useState(false);
  const [airportTransferType, setAirportTransferType] = useState('pickup');
  const [showCarPickupCalendar, setShowCarPickupCalendar] = useState(false);
  const [showCarDropoffCalendar, setShowCarDropoffCalendar] = useState(false);
  const [carPickupDate, setCarPickupDate] = useState(null);
  const [carDropoffDate, setCarDropoffDate] = useState(null);
  const [carPickupMonth, setCarPickupMonth] = useState(new Date());
  const [carDropoffMonth, setCarDropoffMonth] = useState(new Date());
  const [showCarPickupTime, setShowCarPickupTime] = useState(false);
  const [showCarDropoffTime, setShowCarDropoffTime] = useState(false);
  const [carPickupTime, setCarPickupTime] = useState('10:00');
  const [carDropoffTime, setCarDropoffTime] = useState('10:00');

  // Airport transfer state
  const [showAirportDropoffCalendar, setShowAirportDropoffCalendar] = useState(false);
  const [airportDropoffDate, setAirportDropoffDate] = useState(null);
  const [airportDropoffMonth, setAirportDropoffMonth] = useState(new Date());
  const [showAirportDropoffTime, setShowAirportDropoffTime] = useState(false);
  const [airportDropoffTime, setAirportDropoffTime] = useState('10:00');

  // Airport transfer passenger state
  const [showAirportPickupPassenger, setShowAirportPickupPassenger] = useState(false);
  const [airportPickupAdults, setAirportPickupAdults] = useState(1);
  const [airportPickupChildren, setAirportPickupChildren] = useState(0);
  const [showAirportDropoffPassenger, setShowAirportDropoffPassenger] = useState(false);
  const [airportDropoffAdults, setAirportDropoffAdults] = useState(1);
  const [airportDropoffChildren, setAirportDropoffChildren] = useState(0);

  // Sync return month to always be next month of departure month
  useEffect(() => {
    setReturnMonth(new Date(departureMonth.getFullYear(), departureMonth.getMonth() + 1, 1));
  }, [departureMonth]);

  // Sync hotel return month to always be next month of hotel departure month
  useEffect(() => {
    setHotelReturnMonth(new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth() + 1, 1));
  }, [hotelDepartureMonth]);

  // Generate time slots with half-hour intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        slots.push(timeStr);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const tabs = [
    { id: 'flights', name: 'Flights', icon: <Plane size={20} /> },
    { id: 'hotels', name: 'Hotels', icon: <Bed size={20} /> },
    { id: 'flight-hotel', name: 'Flight + Hotel', icon: <Briefcase size={20} /> },
    { id: 'cars', name: 'Cars', icon: <Car size={20} /> },
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12h18M3 12l6-6M3 12l6 6M21 12l-6-6M21 12l-6 6"/>
                    </svg>
                    Round Trip
                  </button>
                  <button 
                    onClick={() => setTripType('oneWay')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      tripType === 'oneWay' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={tripType === 'oneWay' ? { backgroundColor: NAVY } : {}}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M5 12l6-6M5 12l6 6"/>
                    </svg>
                    One Way
                  </button>
                  <button 
                    onClick={() => setTripType('multiCity')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      tripType === 'multiCity' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={tripType === 'multiCity' ? { backgroundColor: NAVY } : {}}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="4" cy="12" r="2"/>
                      <circle cx="12" cy="6" r="2"/>
                      <circle cx="20" cy="12" r="2"/>
                      <circle cx="12" cy="18" r="2"/>
                      <path d="M6 11l4-3M14 7l4 3M18 13l-4 3M10 17l-4-3"/>
                    </svg>
                    Multi-City
                  </button>
                  
                  {/* Direct Checkbox */}
                  <div className="flex ml-15 items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all cursor-pointer">
                    <input type="checkbox" id="direct" className="w-4 h-4 accent-orange-500 cursor-pointer" />
                    <label htmlFor="direct" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Direct flights </label>
                  </div>

                  {/* Group Trip Checkbox */}
                  <div className="flex ml-5 items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="groupTrip" 
                      checked={isGroupTrip}
                      onChange={(e) => {
                        setIsGroupTrip(e.target.checked);
                        if (e.target.checked) {
                          setAdults(10);
                          setChildren(0);
                          setInfants(0);
                        } else {
                          setAdults(1);
                          setChildren(0);
                          setInfants(0);
                        }
                      }}
                      className="w-4 h-4 accent-orange-500 cursor-pointer" 
                    />
                    <label htmlFor="groupTrip" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Group Trip </label>
                  </div>
                </div>

                {/* Search Inputs */}
                <div className="flex gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 flex-1">
                    {/* From */}
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowCalendar(!showCalendar)}>
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
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  const isPastDate = date < today;
                                  return (
                                    <div
                                      key={i}
                                      className={`p-2 rounded-lg transition-all ${
                                        !isCurrentMonth ? 'text-gray-300' : isPastDate ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-orange-100 cursor-pointer'
                                      } ${isSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''} ${
                                        isInRange && isCurrentMonth && !isPastDate ? 'bg-orange-200' : ''
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isCurrentMonth && !isPastDate) {
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
                                        if (isCurrentMonth && !isPastDate) setHoveredDate(formatDate(date));
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}>
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowClassDropdown(!showClassDropdown)}>
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
                      onMouseEnter={() => setHoveredSpecialFare('Regular')}
                      onMouseLeave={() => setHoveredSpecialFare(null)}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 relative ${
                        selectedSpecialFare === 'Regular' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Regular</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Regular fares</span>
                      {hoveredSpecialFare === 'Regular' && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-[320px] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Briefcase size={16} className="text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-sm">Regular</h4>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{specialFareDetails['Regular'].description}</p>
                            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded bg-orange-200 flex items-center justify-center">
                                  <svg className="w-3 h-3 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <p className="text-[11px] font-semibold text-orange-800 uppercase tracking-wide">Required Documents</p>
                              </div>
                              <p className="text-xs text-gray-700 pl-7">{specialFareDetails['Regular'].documents}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('Student')}
                      onMouseEnter={() => setHoveredSpecialFare('Student')}
                      onMouseLeave={() => setHoveredSpecialFare(null)}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 relative ${
                        selectedSpecialFare === 'Student' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Student</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Extra discounts/baggage</span>
                      {hoveredSpecialFare === 'Student' && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-[320px] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Briefcase size={16} className="text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-sm">Student</h4>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{specialFareDetails['Student'].description}</p>
                            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded bg-orange-200 flex items-center justify-center">
                                  <svg className="w-3 h-3 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <p className="text-[11px] font-semibold text-orange-800 uppercase tracking-wide">Required Documents</p>
                              </div>
                              <p className="text-xs text-gray-700 pl-7">{specialFareDetails['Student'].documents}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('Armed Forces')}
                      onMouseEnter={() => setHoveredSpecialFare('Armed Forces')}
                      onMouseLeave={() => setHoveredSpecialFare(null)}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 relative ${
                        selectedSpecialFare === 'Armed Forces' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Armed Forces</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Up to ₹ 600 off</span>
                      {hoveredSpecialFare === 'Armed Forces' && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-[320px] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Briefcase size={16} className="text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-sm">Armed Forces</h4>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{specialFareDetails['Armed Forces'].description}</p>
                            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded bg-orange-200 flex items-center justify-center">
                                  <svg className="w-3 h-3 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <p className="text-[11px] font-semibold text-orange-800 uppercase tracking-wide">Required Documents</p>
                              </div>
                              <p className="text-xs text-gray-700 pl-7">{specialFareDetails['Armed Forces'].documents}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('Senior Citizen')}
                      onMouseEnter={() => setHoveredSpecialFare('Senior Citizen')}
                      onMouseLeave={() => setHoveredSpecialFare(null)}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 relative ${
                        selectedSpecialFare === 'Senior Citizen' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Senior Citizen</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Up to ₹ 600 off</span>
                      {hoveredSpecialFare === 'Senior Citizen' && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-[320px] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Briefcase size={16} className="text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-sm">Senior Citizen</h4>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{specialFareDetails['Senior Citizen'].description}</p>
                            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded bg-orange-200 flex items-center justify-center">
                                  <svg className="w-3 h-3 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <p className="text-[11px] font-semibold text-orange-800 uppercase tracking-wide">Required Documents</p>
                              </div>
                              <p className="text-xs text-gray-700 pl-7">{specialFareDetails['Senior Citizen'].documents}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('Doctor and Nurses')}
                      onMouseEnter={() => setHoveredSpecialFare('Doctor and Nurses')}
                      onMouseLeave={() => setHoveredSpecialFare(null)}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 relative ${
                        selectedSpecialFare === 'Doctor and Nurses' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>Doctor and Nurses</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Up to ₹ 600 off</span>
                      {hoveredSpecialFare === 'Doctor and Nurses' && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-[320px] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Briefcase size={16} className="text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-sm">Doctor and Nurses</h4>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{specialFareDetails['Doctor and Nurses'].description}</p>
                            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded bg-orange-200 flex items-center justify-center">
                                  <svg className="w-3 h-3 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <p className="text-[11px] font-semibold text-orange-800 uppercase tracking-wide">Required Documents</p>
                              </div>
                              <p className="text-xs text-gray-700 pl-7">{specialFareDetails['Doctor and Nurses'].documents}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                    <button 
                      onClick={() => setSelectedSpecialFare('GST Number')}
                      onMouseEnter={() => setHoveredSpecialFare('GST Number')}
                      onMouseLeave={() => setHoveredSpecialFare(null)}
                      className={`flex flex-col items-start px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:shadow-md border-2 relative ${
                        selectedSpecialFare === 'GST Number' 
                          ? 'bg-orange-50 border-orange-400 text-orange-700' 
                          : 'bg-white border-gray-200 hover:border-orange-300 text-gray-700'
                      } min-w-[100px]`}
                    >
                      <span>GST Number</span>
                      <span className="text-[10px] py-0 rounded-full font-normal mt-0.5 text-gray-500">Upto 10% Extra Savings!</span>
                      {hoveredSpecialFare === 'GST Number' && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-[320px] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Briefcase size={16} className="text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-sm">GST Number</h4>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{specialFareDetails['GST Number'].description}</p>
                            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded bg-orange-200 flex items-center justify-center">
                                  <svg className="w-3 h-3 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <p className="text-[11px] font-semibold text-orange-800 uppercase tracking-wide">Required Documents</p>
                              </div>
                              <p className="text-xs text-gray-700 pl-7">{specialFareDetails['GST Number'].documents}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Search Button */}
                  <button className="text-white px-8 py-2 rounded-lg text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap" style={{ backgroundColor: ORANGE }}>
                    <Search size={20} /> Search
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="space-y-3">
                {/* Hotel Room Type Options */}
                <div className="flex gap-2 mb-3 flex-wrap items-center">
                  <button 
                    onClick={() => {
                      setHotelRoomType('upto4rooms');
                      setHotelRooms(1);
                      setHotelAdults(2);
                      setHotelChildren(0);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      hotelRoomType === 'upto4rooms' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={hotelRoomType === 'upto4rooms' ? { backgroundColor: NAVY } : {}}
                  >
                    <Bed size={14} /> Up to 4 rooms
                  </button>
                  <button 
                    onClick={() => {
                      setHotelRoomType('groupdeals');
                      setHotelRooms(5);
                      setHotelAdults(10);
                      setHotelChildren(0);
                    }}
                    onMouseEnter={() => setHoveredGroupDeals(true)}
                    onMouseLeave={() => setHoveredGroupDeals(false)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg relative ${
                      hotelRoomType === 'groupdeals' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={hotelRoomType === 'groupdeals' ? { backgroundColor: NAVY } : {}}
                  >
                    <Briefcase size={14} /> Group Trip
                    {hoveredGroupDeals && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-[360px] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-50 to-white px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <Briefcase size={18} className="text-orange-500" />
                            <h4 className="font-bold text-gray-800 text-base">Group Deals</h4>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <p className="text-sm text-gray-600 leading-relaxed">Exclusive discounts and special offers for group bookings at participating hotels</p>
                          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                            <div className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-2">
                              <Users size={14} className="text-orange-500" />
                              Requirements
                            </div>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                                <span>Minimum 10 rooms required per booking</span>
                              </li>
                              <li className="flex items-start gap-2 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                                <span>Valid company/group ID proof mandatory</span>
                              </li>
                              <li className="flex items-start gap-2 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                                <span>Advance booking (7+ days) recommended</span>
                              </li>
                              <li className="flex items-start gap-2 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                                <span>Flexible cancellation policies available</span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-orange-600 font-medium">
                            <TrendingUp size={12} />
                            <span>Save up to 25% on group bookings</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>

                <div className="flex gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 flex-1">
                    {/* Destination */}
                    <div className="md:col-span-2 bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowHotelCalendar(!showHotelCalendar)}>
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Check-in - Check-out</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={16} style={{ color: ORANGE }} />
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-gray-800 text-sm">
                            {hotelCheckInDate ? new Date(hotelCheckInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Add date'}
                          </span>
                          <span className="text-gray-400">-</span>
                          <span className="font-semibold text-gray-800 text-sm">
                            {hotelCheckOutDate ? new Date(hotelCheckOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Add date'}
                          </span>
                        </div>
                        {hotelCheckInDate && hotelCheckOutDate && (
                          <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-semibold ml-auto">
                            {Math.ceil((new Date(hotelCheckOutDate) - new Date(hotelCheckInDate)) / (1000 * 60 * 60 * 24))} night{Math.ceil((new Date(hotelCheckOutDate) - new Date(hotelCheckInDate)) / (1000 * 60 * 60 * 24)) !== 1 ? 's' : ''}
                          </span>
                        )}
                        <ChevronDown size={14} className="text-gray-400 ml-auto" />
                      </div>

                      {/* Hotel Calendar Popup */}
                      {showHotelCalendar && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-[600px]">
                          <div className="flex items-center gap-4">
                            {/* Decrease Month Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setHotelDepartureMonth(new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth() - 1, 1));
                              }}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                            >
                              <ChevronDown size={16} className="text-gray-600 rotate-90" />
                            </button>
                            
                            <div className="grid grid-cols-2 gap-4 flex-1">
                              {/* Check-in Calendar */}
                              <div>
                                <div className="flex items-center justify-center mb-3">
                                  <h3 className="font-semibold text-gray-800 text-sm">
                                    {hotelDepartureMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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
                                  const firstDayOfMonth = new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth(), 1);
                                  const startDay = firstDayOfMonth.getDay();
                                  const day = i - startDay + 1;
                                  const date = new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth(), day);
                                  const isCurrentMonth = date.getMonth() === hotelDepartureMonth.getMonth();
                                  const formatDate = (d) => {
                                    const year = d.getFullYear();
                                    const month = String(d.getMonth() + 1).padStart(2, '0');
                                    const dayNum = String(d.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${dayNum}`;
                                  };
                                  const isSelected = formatDate(date) === hotelCheckInDate;
                                  const lastDayOfDepartureMonth = new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth() + 1, 0);
                                  const isHoveredInSameMonth = hotelHoveredDate && new Date(hotelHoveredDate).getMonth() === hotelDepartureMonth.getMonth() && 
                                    new Date(hotelHoveredDate).getFullYear() === hotelDepartureMonth.getFullYear();
                                  const isInRange = hotelHoveredDate && hotelCheckInDate && 
                                    new Date(hotelCheckInDate) <= date && 
                                    (isHoveredInSameMonth ? date <= new Date(hotelHoveredDate) : date <= lastDayOfDepartureMonth);
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  const isPastDate = date < today;
                                  return (
                                    <div
                                      key={i}
                                      className={`p-2 rounded-lg transition-all ${
                                        !isCurrentMonth ? 'text-gray-300' : isPastDate ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-orange-100 cursor-pointer'
                                      } ${isSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''} ${
                                        isInRange && isCurrentMonth && !isPastDate ? 'bg-orange-200' : ''
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isCurrentMonth && !isPastDate) {
                                          if (!hotelCheckInDate) {
                                            setHotelCheckInDate(formatDate(date));
                                          } else if (hotelCheckInDate && new Date(formatDate(date)) >= new Date(hotelCheckInDate)) {
                                            setHotelCheckOutDate(formatDate(date));
                                            setShowHotelCalendar(false);
                                          } else {
                                            setHotelCheckInDate(formatDate(date));
                                          }
                                        }
                                      }}
                                      onMouseEnter={() => {
                                        if (isCurrentMonth && !isPastDate) setHotelHoveredDate(formatDate(date));
                                      }}
                                      onMouseLeave={() => {
                                        setHotelHoveredDate(null);
                                      }}
                                    >
                                      {date.getDate()}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Check-out Calendar */}
                            <div>
                              <div className="flex items-center justify-center mb-3">
                                <h3 className="font-semibold text-gray-800 text-sm">
                                  {hotelReturnMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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
                                  const firstDayOfMonth = new Date(hotelReturnMonth.getFullYear(), hotelReturnMonth.getMonth(), 1);
                                  const startDay = firstDayOfMonth.getDay();
                                  const day = i - startDay + 1;
                                  const date = new Date(hotelReturnMonth.getFullYear(), hotelReturnMonth.getMonth(), day);
                                  const isCurrentMonth = date.getMonth() === hotelReturnMonth.getMonth();
                                  const formatDate = (d) => {
                                    const year = d.getFullYear();
                                    const month = String(d.getMonth() + 1).padStart(2, '0');
                                    const dayNum = String(d.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${dayNum}`;
                                  };
                                  const isSelected = formatDate(date) === hotelCheckOutDate;
                                  const firstDayOfReturnMonth = new Date(hotelReturnMonth.getFullYear(), hotelReturnMonth.getMonth(), 1);
                                  const isSameMonthAsDeparture = hotelReturnMonth.getMonth() === new Date(hotelCheckInDate).getMonth() && 
                                    hotelReturnMonth.getFullYear() === new Date(hotelCheckInDate).getFullYear();
                                  const isInRange = hotelHoveredDate && hotelCheckInDate && 
                                    (isSameMonthAsDeparture ? new Date(hotelCheckInDate) <= date : firstDayOfReturnMonth <= date) && 
                                    date <= new Date(hotelHoveredDate);
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
                                          setHotelCheckOutDate(formatDate(date));
                                          setShowHotelCalendar(false);
                                        }
                                      }}
                                      onMouseEnter={() => {
                                        if (isCurrentMonth) setHotelHoveredDate(formatDate(date));
                                      }}
                                      onMouseLeave={() => {
                                        setHotelHoveredDate(null);
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
                                setHotelDepartureMonth(new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth() + 1, 1));
                              }}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                            >
                              <ChevronDown size={16} className="text-gray-600 -rotate-90" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Rooms & Guests */}
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowHotelGuestsDropdown(!showHotelGuestsDropdown)}>
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Rooms & Guests</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Users size={16} style={{ color: ORANGE }} />
                        <span className="font-semibold text-gray-800 text-sm">
                          {hotelRooms} Room{hotelRooms !== 1 ? 's' : ''}, {hotelAdults} Adult{hotelAdults !== 1 ? 's' : ''}{hotelChildren > 0 && `, ${hotelChildren} Child${hotelChildren !== 1 ? 'ren' : ''}`}
                        </span>
                        {travelingWithPet && <PawPrint size={14} className="text-orange-500 ml-1" />}
                        <ChevronDown size={14} className="text-gray-400 ml-auto" />
                      </div>

                      {/* Hotel Guests Dropdown */}
                      {showHotelGuestsDropdown && (
                        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-[320px]">
                          {/* Rooms */}
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">Rooms</div>
                              <div className="text-xs text-gray-500">Number of rooms</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); setHotelRooms(Math.max(1, hotelRooms - 1)); }}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-all font-semibold"
                              >
                                -
                              </button>
                              <span className="font-semibold text-gray-800 w-6 text-center">{hotelRooms}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); setHotelRooms(Math.min(10, hotelRooms + 1)); }}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-all font-semibold"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Adults */}
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">Adults</div>
                              <div className="text-xs text-gray-500">Ages 18 or above</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); setHotelAdults(Math.max(1, hotelAdults - 1)); }}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-all font-semibold"
                              >
                                -
                              </button>
                              <span className="font-semibold text-gray-800 w-6 text-center">{hotelAdults}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); setHotelAdults(Math.min(16, hotelAdults + 1)); }}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-all font-semibold"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Children */}
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">Children</div>
                              <div className="text-xs text-gray-500">Ages 0-17</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); setHotelChildren(Math.max(0, hotelChildren - 1)); }}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-all font-semibold"
                              >
                                -
                              </button>
                              <span className="font-semibold text-gray-800 w-6 text-center">{hotelChildren}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); setHotelChildren(Math.min(10, hotelChildren + 1)); }}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 flex items-center justify-center transition-all font-semibold"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Pet Travel Checkbox */}
                          <div className="pt-3 border-t border-gray-100">
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={travelingWithPet}
                                  onChange={(e) => { e.stopPropagation(); setTravelingWithPet(e.target.checked); }}
                                  className="w-5 h-5 rounded border-2 border-gray-300 accent-orange-500 cursor-pointer transition-all group-hover:border-orange-300"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-800 text-sm group-hover:text-orange-600 transition-all">Traveling with pet?</div>
                                <div className="text-xs text-gray-500">Find pet-friendly hotels</div>
                              </div>
                            </label>
                          </div>

                          {/* Done Button */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowHotelGuestsDropdown(false); }}
                            className="w-full mt-4 py-2.5 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                            style={{ backgroundColor: ORANGE }}
                          >
                            Done
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Price per Night */}
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowPriceDropdown(!showPriceDropdown)}>
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Price per Night</label>
                      <div className="flex items-center gap-2 mt-1">
                        <IndianRupee size={16} style={{ color: ORANGE }} />
                        <span className="font-semibold text-gray-800 text-sm">
                          {selectedPriceRange || 'Select price'}
                        </span>
                        <ChevronDown size={14} className="text-gray-400 ml-auto" />
                      </div>

                      {/* Price Dropdown */}
                      {showPriceDropdown && (
                        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-[280px]">
                          <div className="space-y-2">
                            {[
                              { label: '₹0 - ₹1500', value: '₹0-₹1500' },
                              { label: '₹1500 - ₹2500', value: '₹1500-₹2500' },
                              { label: '₹2500 - ₹5000', value: '₹2500-₹5000' },
                              { label: '₹5000+', value: '₹5000+' }
                            ].map((price) => (
                              <button
                                key={price.value}
                                onClick={(e) => { e.stopPropagation(); setSelectedPriceRange(price.label); setShowPriceDropdown(false); }}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                                  selectedPriceRange === price.label
                                    ? 'bg-orange-50 border-2 border-orange-400'
                                    : 'hover:bg-gray-50 border-2 border-transparent'
                                }`}
                              >
                                <span className={`text-sm font-medium ${
                                  selectedPriceRange === price.label ? 'text-orange-600' : 'text-gray-800'
                                }`}>
                                  {price.label}
                                </span>
                                {selectedPriceRange === price.label && (
                                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                {/* Trending Searches */}
                <div className="pt-3 border-t border-gray-100 flex items-center gap-3 overflow-x-auto">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <TrendingUp size={16} className="text-orange-500" />
                    <span className="text-sm font-semibold text-gray-700">Trending Searches:</span>
                  </div>
                  <div className="flex gap-2">
                    {[
                      'Goa',
                      'Delhi',
                      'Mumbai',
                      'Dubai',
                      'Singapore',
                      'Thailand',
                      'London',
                      'New York',
                      'Bali'
                    ].map((trend, index) => (
                      <button
                        key={index}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 transition-all whitespace-nowrap"
                      >
                        {trend}
                      </button>
                    ))}
                  </div>
                  
                  {/* Search Button */}
                  <button className="ml-auto text-white px-8 py-1.5 rounded-lg text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0" style={{ backgroundColor: ORANGE }}>
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'cars' && (
              <div className="space-y-3">
                {/* Car Search Type Options */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setCarSearchType('carRentals')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      carSearchType === 'carRentals' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={carSearchType === 'carRentals' ? { backgroundColor: NAVY } : {}}
                  >
                    <Car size={14} /> Car Rentals
                  </button>
                  <button
                    onClick={() => setCarSearchType('airportTransfers')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      carSearchType === 'airportTransfers' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={carSearchType === 'airportTransfers' ? { backgroundColor: NAVY } : {}}
                  >
                    <Plane size={14} /> Airport Transfers
                  </button>
                </div>

                {/* Car Rentals Search */}
                {carSearchType === 'carRentals' && (
                  <div className="space-y-3">
                    {/* Drop off at different location checkbox */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="dropOffDifferentLocation"
                        checked={dropOffDifferentLocation}
                        onChange={(e) => setDropOffDifferentLocation(e.target.checked)}
                        className="w-4 h-4 accent-orange-500 cursor-pointer"
                      />
                      <label htmlFor="dropOffDifferentLocation" className="text-sm text-gray-700 font-medium cursor-pointer">
                        Drop off at a different location
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <div className={`grid gap-3 flex-1 ${dropOffDifferentLocation ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
                        {/* Pick-up Location */}
                        <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                          <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Pick-up Location</label>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin size={16} style={{ color: ORANGE }} />
                            <input
                              type="text"
                              placeholder="Airport, city, station, region, district..."
                              className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                            />
                          </div>
                        </div>

                        {/* Drop-off Location (only shown when checkbox is checked) */}
                        {dropOffDifferentLocation && (
                          <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                            <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Drop-off Location</label>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin size={16} style={{ color: ORANGE }} />
                              <input
                                type="text"
                                placeholder="Airport, city, station, region, district..."
                                className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                              />
                            </div>
                          </div>
                        )}

                        {/* Pick-up Date & Time */}
                        <div className="relative">
                          <div 
                            className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer"
                            onClick={() => setShowCarPickupCalendar(!showCarPickupCalendar)}
                          >
                            <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Pick-up Date & Time</label>
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} style={{ color: ORANGE }} />
                                <span className="font-semibold text-gray-800 text-sm">
                                  {carPickupDate ? carPickupDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Jul 16'}
                                </span>
                              </div>
                              <div 
                                className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-gray-200 hover:border-orange-300 transition-all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowCarPickupTime(!showCarPickupTime);
                                }}
                              >
                                <Clock size={14} style={{ color: ORANGE }} />
                                <span className="font-semibold text-gray-800 text-sm">{carPickupTime}</span>
                                <ChevronDown size={12} className="text-gray-400" />
                              </div>
                            </div>
                          </div>

                          {/* Time Dropdown */}
                          {showCarPickupTime && (
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-32 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                              {timeSlots.map((time) => (
                                <div
                                  key={time}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCarPickupTime(time);
                                    setShowCarPickupTime(false);
                                  }}
                                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 transition-all ${
                                    carPickupTime === time ? 'bg-orange-100 text-orange-700 font-semibold' : 'text-gray-700'
                                  }`}
                                >
                                  {time}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Calendar */}
                          {showCarPickupCalendar && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                              {/* Calendar Header */}
                              <div className="flex items-center justify-between mb-4">
                                <button
                                  onClick={() => setCarPickupMonth(new Date(carPickupMonth.getFullYear(), carPickupMonth.getMonth() - 1, 1))}
                                  className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                  <ChevronLeft size={20} className="text-gray-600" />
                                </button>
                                <span className="font-bold text-gray-800">
                                  {carPickupMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                                <button
                                  onClick={() => setCarPickupMonth(new Date(carPickupMonth.getFullYear(), carPickupMonth.getMonth() + 1, 1))}
                                  className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                  <ChevronRight size={20} className="text-gray-600" />
                                </button>
                              </div>

                              {/* Calendar Grid */}
                              <div className="grid grid-cols-7 gap-1 text-center">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                  <div key={day} className="text-xs font-semibold text-gray-500 py-2">
                                    {day}
                                  </div>
                                ))}
                                {Array.from({ length: new Date(carPickupMonth.getFullYear(), carPickupMonth.getMonth() + 1, 0).getDate() }, (_, i) => {
                                  const date = new Date(carPickupMonth.getFullYear(), carPickupMonth.getMonth(), i + 1);
                                  const isPast = date < new Date().setHours(0, 0, 0, 0);
                                  const isSelected = carPickupDate && date.toDateString() === carPickupDate.toDateString();
                                  return (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        if (!isPast) {
                                          setCarPickupDate(date);
                                          setShowCarPickupCalendar(false);
                                        }
                                      }}
                                      className={`py-2 text-sm rounded-lg cursor-pointer transition-all ${
                                        isPast
                                          ? 'text-gray-300 cursor-not-allowed'
                                          : isSelected
                                          ? 'bg-orange-500 text-white font-semibold'
                                          : 'hover:bg-orange-100 text-gray-700'
                                      }`}
                                    >
                                      {i + 1}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Drop-off Date & Time */}
                        <div className="relative">
                          <div 
                            className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer"
                            onClick={() => setShowCarDropoffCalendar(!showCarDropoffCalendar)}
                          >
                            <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Drop-off Date & Time</label>
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} style={{ color: ORANGE }} />
                                <span className="font-semibold text-gray-800 text-sm">
                                  {carDropoffDate ? carDropoffDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Jul 17'}
                                </span>
                              </div>
                              <div 
                                className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-gray-200 hover:border-orange-300 transition-all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowCarDropoffTime(!showCarDropoffTime);
                                }}
                              >
                                <Clock size={14} style={{ color: ORANGE }} />
                                <span className="font-semibold text-gray-800 text-sm">{carDropoffTime}</span>
                                <ChevronDown size={12} className="text-gray-400" />
                              </div>
                            </div>
                          </div>

                          {/* Time Dropdown */}
                          {showCarDropoffTime && (
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-32 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                              {timeSlots.map((time) => (
                                <div
                                  key={time}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCarDropoffTime(time);
                                    setShowCarDropoffTime(false);
                                  }}
                                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 transition-all ${
                                    carDropoffTime === time ? 'bg-orange-100 text-orange-700 font-semibold' : 'text-gray-700'
                                  }`}
                                >
                                  {time}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Calendar */}
                          {showCarDropoffCalendar && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                              {/* Calendar Header */}
                              <div className="flex items-center justify-between mb-4">
                                <button
                                  onClick={() => setCarDropoffMonth(new Date(carDropoffMonth.getFullYear(), carDropoffMonth.getMonth() - 1, 1))}
                                  className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                  <ChevronLeft size={20} className="text-gray-600" />
                                </button>
                                <span className="font-bold text-gray-800">
                                  {carDropoffMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                                <button
                                  onClick={() => setCarDropoffMonth(new Date(carDropoffMonth.getFullYear(), carDropoffMonth.getMonth() + 1, 1))}
                                  className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                  <ChevronRight size={20} className="text-gray-600" />
                                </button>
                              </div>

                              {/* Calendar Grid */}
                              <div className="grid grid-cols-7 gap-1 text-center">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                  <div key={day} className="text-xs font-semibold text-gray-500 py-2">
                                    {day}
                                  </div>
                                ))}
                                {Array.from({ length: new Date(carDropoffMonth.getFullYear(), carDropoffMonth.getMonth() + 1, 0).getDate() }, (_, i) => {
                                  const date = new Date(carDropoffMonth.getFullYear(), carDropoffMonth.getMonth(), i + 1);
                                  const isPast = date < new Date().setHours(0, 0, 0, 0);
                                  const isSelected = carDropoffDate && date.toDateString() === carDropoffDate.toDateString();
                                  return (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        if (!isPast) {
                                          setCarDropoffDate(date);
                                          setShowCarDropoffCalendar(false);
                                        }
                                      }}
                                      className={`py-2 text-sm rounded-lg cursor-pointer transition-all ${
                                        isPast
                                          ? 'text-gray-300 cursor-not-allowed'
                                          : isSelected
                                          ? 'bg-orange-500 text-white font-semibold'
                                          : 'hover:bg-orange-100 text-gray-700'
                                      }`}
                                    >
                                      {i + 1}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Search Button */}
                      <button className="m-auto text-white px-8 py-3 rounded-lg text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap" style={{ backgroundColor: ORANGE }}>
                        <Search size={18} /> Search
                      </button>
                    </div>
                  </div>
                )}

                {/* Airport Transfers Search */}
                {carSearchType === 'airportTransfers' && (
                  <div className="space-y-3">
                    {/* Airport Transfer Type Options */}
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setAirportTransferType('pickup')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-lg border-2 ${
                          airportTransferType === 'pickup' 
                            ? 'border-orange-500 text-orange-600 bg-orange-50' 
                            : 'border-gray-200 text-gray-600 bg-white hover:border-orange-300 hover:bg-orange-50'
                        }`}
                      >
                        <Plane size={14} className={airportTransferType === 'pickup' ? 'text-orange-600' : 'text-gray-500'} /> Airport Pick-up
                      </button>
                      <button
                        onClick={() => setAirportTransferType('dropoff')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-lg border-2 ${
                          airportTransferType === 'dropoff' 
                            ? 'border-orange-500 text-orange-600 bg-orange-50' 
                            : 'border-gray-200 text-gray-600 bg-white hover:border-orange-300 hover:bg-orange-50'
                        }`}
                      >
                        <Car size={14} className={airportTransferType === 'dropoff' ? 'text-orange-600' : 'text-gray-500'} /> Airport Drop-off
                      </button>
                    </div>

                    {/* Airport Pick-up Search Fields */}
                    {airportTransferType === 'pickup' && (
                      <div className="flex gap-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                          {/* Arrival Airport */}
                          <div className="bg-white rounded-lg p-2 hover:bg-orange-50 transition-all border-2 border-gray-200 hover:border-orange-400">
                            <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Arrival Airport</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Plane size={16} style={{ color: ORANGE }} />
                              <input
                                type="text"
                                placeholder="Enter airport name"
                                className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                              />
                            </div>
                          </div>

                          {/* Destination */}
                          <div className="bg-white rounded-lg p-2 hover:bg-orange-50 transition-all border-2 border-gray-200 hover:border-orange-400">
                            <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Enter a Destination</label>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin size={16} style={{ color: ORANGE }} />
                              <input
                                type="text"
                                placeholder="City or address"
                                className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                              />
                            </div>
                          </div>

                          {/* Passenger */}
                          <div className="relative">
                            <div 
                              className="bg-white rounded-lg p-3 hover:bg-orange-50 transition-all border-2 border-gray-200 hover:border-orange-400 cursor-pointer"
                              onClick={() => setShowAirportPickupPassenger(!showAirportPickupPassenger)}
                            >
                              <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Passenger</label>
                              <div className="flex items-center gap-2 mt-1">
                                <Users size={16} style={{ color: ORANGE }} />
                                <span className="font-semibold text-gray-800 text-sm">{airportPickupAdults} Adult{airportPickupAdults !== 1 ? 's' : ''}{airportPickupChildren > 0 ? `, ${airportPickupChildren} Child${airportPickupChildren !== 1 ? 'ren' : ''}` : ''}</span>
                                <ChevronDown size={14} className="text-gray-400 ml-auto" />
                              </div>
                            </div>

                            {/* Passenger Dropdown */}
                            {showAirportPickupPassenger && (
                              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-64 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* Adults */}
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <div className="font-semibold text-gray-800 text-sm">Adults</div>
                                    <div className="text-xs text-gray-500">12+ years</div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (airportPickupAdults > 1) setAirportPickupAdults(airportPickupAdults - 1);
                                      }}
                                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center justify-center"
                                    >
                                      <span className="text-gray-600 font-bold">-</span>
                                    </button>
                                    <span className="font-semibold text-gray-800 w-6 text-center">{airportPickupAdults}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setAirportPickupAdults(airportPickupAdults + 1);
                                      }}
                                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center justify-center"
                                    >
                                      <span className="text-gray-600 font-bold">+</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Children */}
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <div className="font-semibold text-gray-800 text-sm">Children</div>
                                    <div className="text-xs text-gray-500">2-11 years</div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (airportPickupChildren > 0) setAirportPickupChildren(airportPickupChildren - 1);
                                      }}
                                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center justify-center"
                                    >
                                      <span className="text-gray-600 font-bold">-</span>
                                    </button>
                                    <span className="font-semibold text-gray-800 w-6 text-center">{airportPickupChildren}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setAirportPickupChildren(airportPickupChildren + 1);
                                      }}
                                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center justify-center"
                                    >
                                      <span className="text-gray-600 font-bold">+</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Done Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAirportPickupPassenger(false);
                                  }}
                                  className="w-full py-2 rounded-lg font-bold text-white transition-all hover:shadow-lg"
                                  style={{ backgroundColor: ORANGE }}
                                >
                                  Done
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Search Button */}
                        <button className="m-auto text-white px-8 py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap bg-gradient-to-r from-orange-500 to-orange-600" style={{ backgroundColor: ORANGE }}>
                          <Search size={18} /> Search
                        </button>
                      </div>
                    )}

                    {/* Airport Drop-off Search Fields */}
                    {airportTransferType === 'dropoff' && (
                      <div className="flex gap-3">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">
                          {/* Pick-up Point */}
                          <div className="bg-white rounded-lg p-2 hover:bg-orange-50 transition-all border-2 border-gray-200 hover:border-orange-400">
                            <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Enter a Pick-up Point</label>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin size={16} style={{ color: ORANGE }} />
                              <input
                                type="text"
                                placeholder="Address or location"
                                className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                              />
                            </div>
                          </div>

                          {/* Airport or City */}
                          <div className="bg-white rounded-lg p-2 hover:bg-orange-50 transition-all border-2 border-gray-200 hover:border-orange-400">
                            <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Enter an Airport or City</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Plane size={16} style={{ color: ORANGE }} />
                              <input
                                type="text"
                                placeholder="Airport name or city"
                                className="w-full outline-none font-semibold text-gray-800 bg-transparent placeholder-gray-400 text-sm"
                              />
                            </div>
                          </div>

                          {/* Date & Time */}
                          <div className="relative">
                            <div 
                              className="bg-white rounded-lg p-2 hover:bg-orange-50 transition-all border-2 border-gray-200 hover:border-orange-400 cursor-pointer"
                              onClick={() => setShowAirportDropoffCalendar(!showAirportDropoffCalendar)}
                            >
                              <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Date & Time</label>
                              <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-2">
                                  <Calendar size={16} style={{ color: ORANGE }} />
                                  <span className="font-semibold text-gray-800 text-sm">
                                    {airportDropoffDate ? airportDropoffDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Jul 16'}
                                  </span>
                                </div>
                                <div 
                                  className="flex items-center gap-2 bg-orange-50 px-2 py-1 rounded border border-orange-200 hover:border-orange-400 transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAirportDropoffTime(!showAirportDropoffTime);
                                  }}
                                >
                                  <Clock size={14} style={{ color: ORANGE }} />
                                  <span className="font-semibold text-gray-800 text-sm">{airportDropoffTime}</span>
                                  <ChevronDown size={12} className="text-gray-400" />
                                </div>
                              </div>
                            </div>

                            {/* Time Dropdown */}
                            {showAirportDropoffTime && (
                              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-32 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                {timeSlots.map((time) => (
                                  <div
                                    key={time}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setAirportDropoffTime(time);
                                      setShowAirportDropoffTime(false);
                                    }}
                                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 transition-all ${
                                      airportDropoffTime === time ? 'bg-orange-100 text-orange-700 font-semibold' : 'text-gray-700'
                                    }`}
                                  >
                                    {time}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Calendar */}
                            {showAirportDropoffCalendar && (
                              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* Calendar Header */}
                                <div className="flex items-center justify-between mb-4">
                                  <button
                                    onClick={() => setAirportDropoffMonth(new Date(airportDropoffMonth.getFullYear(), airportDropoffMonth.getMonth() - 1, 1))}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                                  >
                                    <ChevronLeft size={20} className="text-gray-600" />
                                  </button>
                                  <span className="font-bold text-gray-800">
                                    {airportDropoffMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                  </span>
                                  <button
                                    onClick={() => setAirportDropoffMonth(new Date(airportDropoffMonth.getFullYear(), airportDropoffMonth.getMonth() + 1, 1))}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                                  >
                                    <ChevronRight size={20} className="text-gray-600" />
                                  </button>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1 text-center">
                                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div key={day} className="text-xs font-semibold text-gray-500 py-2">
                                      {day}
                                    </div>
                                  ))}
                                  {Array.from({ length: new Date(airportDropoffMonth.getFullYear(), airportDropoffMonth.getMonth() + 1, 0).getDate() }, (_, i) => {
                                    const date = new Date(airportDropoffMonth.getFullYear(), airportDropoffMonth.getMonth(), i + 1);
                                    const isPast = date < new Date().setHours(0, 0, 0, 0);
                                    const isSelected = airportDropoffDate && date.toDateString() === airportDropoffDate.toDateString();
                                    return (
                                      <div
                                        key={i}
                                        onClick={() => {
                                          if (!isPast) {
                                            setAirportDropoffDate(date);
                                            setShowAirportDropoffCalendar(false);
                                          }
                                        }}
                                        className={`py-2 text-sm rounded-lg cursor-pointer transition-all ${
                                          isPast
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : isSelected
                                            ? 'bg-orange-500 text-white font-semibold'
                                            : 'hover:bg-orange-100 text-gray-700'
                                        }`}
                                      >
                                        {i + 1}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Passenger */}
                          <div className="relative">
                            <div 
                              className="bg-white rounded-lg p-3 hover:bg-orange-50 transition-all border-2 border-gray-200 hover:border-orange-400 cursor-pointer"
                              onClick={() => setShowAirportDropoffPassenger(!showAirportDropoffPassenger)}
                            >
                              <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Passenger</label>
                              <div className="flex items-center gap-2 mt-1">
                                <Users size={16} style={{ color: ORANGE }} />
                                <span className="font-semibold text-gray-800 text-sm">{airportDropoffAdults} Adult{airportDropoffAdults !== 1 ? 's' : ''}{airportDropoffChildren > 0 ? `, ${airportDropoffChildren} Child${airportDropoffChildren !== 1 ? 'ren' : ''}` : ''}</span>
                                <ChevronDown size={14} className="text-gray-400 ml-auto" />
                              </div>
                            </div>

                            {/* Passenger Dropdown */}
                            {showAirportDropoffPassenger && (
                              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-64 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* Adults */}
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <div className="font-semibold text-gray-800 text-sm">Adults</div>
                                    <div className="text-xs text-gray-500">12+ years</div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (airportDropoffAdults > 1) setAirportDropoffAdults(airportDropoffAdults - 1);
                                      }}
                                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center justify-center"
                                    >
                                      <span className="text-gray-600 font-bold">-</span>
                                    </button>
                                    <span className="font-semibold text-gray-800 w-6 text-center">{airportDropoffAdults}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setAirportDropoffAdults(airportDropoffAdults + 1);
                                      }}
                                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center justify-center"
                                    >
                                      <span className="text-gray-600 font-bold">+</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Children */}
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <div className="font-semibold text-gray-800 text-sm">Children</div>
                                    <div className="text-xs text-gray-500">2-11 years</div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (airportDropoffChildren > 0) setAirportDropoffChildren(airportDropoffChildren - 1);
                                      }}
                                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center justify-center"
                                    >
                                      <span className="text-gray-600 font-bold">-</span>
                                    </button>
                                    <span className="font-semibold text-gray-800 w-6 text-center">{airportDropoffChildren}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setAirportDropoffChildren(airportDropoffChildren + 1);
                                      }}
                                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center justify-center"
                                    >
                                      <span className="text-gray-600 font-bold">+</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Done Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAirportDropoffPassenger(false);
                                  }}
                                  className="w-full py-2 rounded-lg font-bold text-white transition-all hover:shadow-lg"
                                  style={{ backgroundColor: ORANGE }}
                                >
                                  Done
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Search Button */}
                      <button className="m-auto text-white px-8 py-3 rounded-lg text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap" style={{ backgroundColor: ORANGE }}>
                        <Search size={18} /> Search
                      </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'flight-hotel' && (
              <div className="space-y-3">
                {/* Trip Type Selection */}
                <div className="flex gap-2 flex-wrap items-center">
                  <button 
                    onClick={() => setTripType('roundTrip')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      tripType === 'roundTrip' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={tripType === 'roundTrip' ? { backgroundColor: NAVY } : {}}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M5 12l6-6M5 12l6 6"/>
                    </svg>
                    Round Trip
                  </button>
                  <button 
                    onClick={() => setTripType('oneWay')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      tripType === 'oneWay' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={tripType === 'oneWay' ? { backgroundColor: NAVY } : {}}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M5 12l6-6M5 12l6 6"/>
                    </svg>
                    One Way
                  </button>
                  <button 
                    onClick={() => setTripType('multiCity')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg ${
                      tripType === 'multiCity' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={tripType === 'multiCity' ? { backgroundColor: NAVY } : {}}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="4" cy="12" r="2"/>
                      <circle cx="12" cy="6" r="2"/>
                      <circle cx="20" cy="12" r="2"/>
                      <circle cx="12" cy="18" r="2"/>
                      <path d="M6 11l4-3M14 7l4 3M18 13l-4 3M10 17l-4-3"/>
                    </svg>
                    Multi-City
                  </button>
                  
                  {/* Direct Checkbox */}
                  <div className="flex ml-15 items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all cursor-pointer">
                    <input type="checkbox" id="direct-fh" className="w-4 h-4 accent-orange-500 cursor-pointer" />
                    <label htmlFor="direct-fh" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Direct flights </label>
                  </div>

                  {/* Group Trip Checkbox */}
                  <div className="flex ml-5 items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="groupTrip-fh" 
                      checked={isGroupTrip}
                      onChange={(e) => {
                        setIsGroupTrip(e.target.checked);
                        if (e.target.checked) {
                          setAdults(10);
                          setChildren(0);
                          setInfants(0);
                        } else {
                          setAdults(1);
                          setChildren(0);
                          setInfants(0);
                        }
                      }}
                      className="w-4 h-4 accent-orange-500 cursor-pointer" 
                    />
                    <label htmlFor="groupTrip-fh" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Group Trip </label>
                  </div>
                </div>

                {/* Search Inputs */}
                <div className="flex gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 flex-1">
                    {/* From */}
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowCalendar(!showCalendar)}>
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
                                  const isReturnSelected = formatDate(date) === returnDate;
                                  const isInRange = departureDate && returnDate && 
                                    formatDate(date) >= departureDate && formatDate(date) <= returnDate;
                                  const isHovered = hoveredDate && formatDate(date) >= departureDate && formatDate(date) <= hoveredDate;
                                  const isPast = date < new Date(new Date().setHours(0,0,0,0));
                                  return (
                                    <div
                                      key={i}
                                      className={`p-2 rounded-lg cursor-pointer transition-all ${
                                        !isCurrentMonth || isPast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-orange-100'
                                      } ${isSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''} ${
                                        isReturnSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''
                                      } ${isHovered && isCurrentMonth && !isPast ? 'bg-orange-200' : ''} ${
                                        isInRange && isCurrentMonth && !isPast ? 'bg-orange-200' : ''
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isCurrentMonth && !isPast) {
                                          if (!departureDate || departureDate && returnDate) {
                                            setDepartureDate(formatDate(date));
                                            setReturnDate(null);
                                          } else {
                                            setReturnDate(formatDate(date));
                                            setShowCalendar(false);
                                          }
                                        }
                                      }}
                                      onMouseEnter={() => {
                                        if (isCurrentMonth && !isPast && departureDate && !returnDate) setHoveredDate(formatDate(date));
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
                                  const isSelected = formatDate(date) === departureDate;
                                  const isReturnSelected = formatDate(date) === returnDate;
                                  const isInRange = departureDate && returnDate && 
                                    formatDate(date) >= departureDate && formatDate(date) <= returnDate;
                                  const isHovered = hoveredDate && formatDate(date) >= departureDate && formatDate(date) <= hoveredDate;
                                  const isPast = date < new Date(new Date().setHours(0,0,0,0));
                                  return (
                                    <div
                                      key={i}
                                      className={`p-2 rounded-lg cursor-pointer transition-all ${
                                        !isCurrentMonth || isPast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-orange-100'
                                      } ${isSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''} ${
                                        isReturnSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''
                                      } ${isHovered && isCurrentMonth && !isPast ? 'bg-orange-200' : ''} ${
                                        isInRange && isCurrentMonth && !isPast ? 'bg-orange-200' : ''
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isCurrentMonth && !isPast) {
                                          setReturnDate(formatDate(date));
                                          setShowCalendar(false);
                                        }
                                      }}
                                      onMouseEnter={() => {
                                        if (isCurrentMonth && !isPast && departureDate && !returnDate) setHoveredDate(formatDate(date));
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}>
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowClassDropdown(!showClassDropdown)}>
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

                {/* Hotel Search Content - Show when checkbox is selected */}
                {showHotelSearch && (
                  <div className="space-y-3 pt-3 border-t border-gray-200">
                    <div className="flex gap-3">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 flex-1">
                        {/* Destination */}
                        <div className="md:col-span-2 bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
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
                        <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowHotelCalendar(!showHotelCalendar)}>
                          <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Check-in - Check-out</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar size={16} style={{ color: ORANGE }} />
                            <div className="flex items-center gap-4">
                              <span className="font-semibold text-gray-800 text-sm">
                                {hotelCheckInDate ? new Date(hotelCheckInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Add date'}
                              </span>
                              <span className="text-gray-400">-</span>
                              <span className="font-semibold text-gray-800 text-sm">
                                {hotelCheckOutDate ? new Date(hotelCheckOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Add date'}
                              </span>
                            </div>
                            {hotelCheckInDate && hotelCheckOutDate && (
                              <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-semibold ml-auto">
                                {Math.ceil((new Date(hotelCheckOutDate) - new Date(hotelCheckInDate)) / (1000 * 60 * 60 * 24))} night{Math.ceil((new Date(hotelCheckOutDate) - new Date(hotelCheckInDate)) / (1000 * 60 * 60 * 24)) !== 1 ? 's' : ''}
                              </span>
                            )}
                            <ChevronDown size={14} className="text-gray-400 ml-auto" />
                          </div>

                          {/* Hotel Calendar Popup */}
                          {showHotelCalendar && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-[600px]">
                              <div className="flex items-center gap-4">
                                {/* Decrease Month Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setHotelDepartureMonth(new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth() - 1, 1));
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                  <ChevronDown size={16} className="text-gray-600 rotate-90" />
                                </button>
                                
                                <div className="grid grid-cols-2 gap-4 flex-1">
                                  {/* Check-in Calendar */}
                                  <div>
                                    <div className="flex items-center justify-center mb-3">
                                      <h3 className="font-semibold text-gray-800 text-sm">
                                        {hotelDepartureMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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
                                        const firstDayOfMonth = new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth(), 1);
                                        const startDay = firstDayOfMonth.getDay();
                                        const day = i - startDay + 1;
                                        const date = new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth(), day);
                                        const isCurrentMonth = date.getMonth() === hotelDepartureMonth.getMonth();
                                        const formatDate = (d) => {
                                          const year = d.getFullYear();
                                          const month = String(d.getMonth() + 1).padStart(2, '0');
                                          const dayNum = String(d.getDate()).padStart(2, '0');
                                          return `${year}-${month}-${dayNum}`;
                                        };
                                        const isCheckInSelected = formatDate(date) === hotelCheckInDate;
                                        const isCheckOutSelected = formatDate(date) === hotelCheckOutDate;
                                        const isInRange = hotelCheckInDate && hotelCheckOutDate && 
                                          formatDate(date) >= hotelCheckInDate && formatDate(date) <= hotelCheckOutDate;
                                        const isHovered = hotelHoveredDate && formatDate(date) >= hotelCheckInDate && formatDate(date) <= hotelHoveredDate;
                                        const isPast = date < new Date(new Date().setHours(0,0,0,0));
                                        return (
                                          <div
                                            key={i}
                                            className={`p-2 rounded-lg cursor-pointer transition-all ${
                                              !isCurrentMonth || isPast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-orange-100'
                                            } ${isCheckInSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''} ${
                                              isCheckOutSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''
                                            } ${isHovered && isCurrentMonth && !isPast ? 'bg-orange-200' : ''} ${
                                              isInRange && isCurrentMonth && !isPast ? 'bg-orange-200' : ''
                                            }`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (isCurrentMonth && !isPast) {
                                                if (!hotelCheckInDate || hotelCheckInDate && hotelCheckOutDate) {
                                                  setHotelCheckInDate(formatDate(date));
                                                  setHotelCheckOutDate(null);
                                                } else {
                                                  setHotelCheckOutDate(formatDate(date));
                                                  setShowHotelCalendar(false);
                                                }
                                              }
                                            }}
                                            onMouseEnter={() => {
                                              if (isCurrentMonth && !isPast && hotelCheckInDate && !hotelCheckOutDate) setHotelHoveredDate(formatDate(date));
                                            }}
                                            onMouseLeave={() => {
                                              setHotelHoveredDate(null);
                                            }}
                                          >
                                            {date.getDate()}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* Check-out Calendar */}
                                  <div>
                                    <div className="flex items-center justify-center mb-3">
                                      <h3 className="font-semibold text-gray-800 text-sm">
                                        {hotelReturnMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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
                                        const firstDayOfMonth = new Date(hotelReturnMonth.getFullYear(), hotelReturnMonth.getMonth(), 1);
                                        const startDay = firstDayOfMonth.getDay();
                                        const day = i - startDay + 1;
                                        const date = new Date(hotelReturnMonth.getFullYear(), hotelReturnMonth.getMonth(), day);
                                        const isCurrentMonth = date.getMonth() === hotelReturnMonth.getMonth();
                                        const formatDate = (d) => {
                                          const year = d.getFullYear();
                                          const month = String(d.getMonth() + 1).padStart(2, '0');
                                          const dayNum = String(d.getDate()).padStart(2, '0');
                                          return `${year}-${month}-${dayNum}`;
                                        };
                                        const isCheckInSelected = formatDate(date) === hotelCheckInDate;
                                        const isCheckOutSelected = formatDate(date) === hotelCheckOutDate;
                                        const isInRange = hotelCheckInDate && hotelCheckOutDate && 
                                          formatDate(date) >= hotelCheckInDate && formatDate(date) <= hotelCheckOutDate;
                                        const isHovered = hotelHoveredDate && formatDate(date) >= hotelCheckInDate && formatDate(date) <= hotelHoveredDate;
                                        const isPast = date < new Date(new Date().setHours(0,0,0,0));
                                        return (
                                          <div
                                            key={i}
                                            className={`p-2 rounded-lg cursor-pointer transition-all ${
                                              !isCurrentMonth || isPast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-orange-100'
                                            } ${isCheckInSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''} ${
                                              isCheckOutSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''
                                            } ${isHovered && isCurrentMonth && !isPast ? 'bg-orange-200' : ''} ${
                                              isInRange && isCurrentMonth && !isPast ? 'bg-orange-200' : ''
                                            }`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (isCurrentMonth && !isPast) {
                                                setHotelCheckOutDate(formatDate(date));
                                                setShowHotelCalendar(false);
                                              }
                                            }}
                                            onMouseEnter={() => {
                                              if (isCurrentMonth && !isPast && hotelCheckInDate && !hotelCheckOutDate) setHotelHoveredDate(formatDate(date));
                                            }}
                                            onMouseLeave={() => {
                                              setHotelHoveredDate(null);
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
                                    setHotelDepartureMonth(new Date(hotelDepartureMonth.getFullYear(), hotelDepartureMonth.getMonth() + 1, 1));
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                  <ChevronDown size={16} className="text-gray-600 -rotate-90" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Rooms & Guests */}
                        <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowHotelGuestsDropdown(!showHotelGuestsDropdown)}>
                          <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Rooms & Guests</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Users size={16} style={{ color: ORANGE }} />
                            <span className="font-semibold text-gray-800 text-sm">
                              {hotelRooms} Room{hotelRooms !== 1 ? 's' : ''}, {hotelAdults} Adult{hotelAdults !== 1 ? 's' : ''}{hotelChildren > 0 && `, ${hotelChildren} Child${hotelChildren !== 1 ? 'ren' : ''}`}
                            </span>
                            {travelingWithPet && <PawPrint size={14} className="text-orange-500 ml-1" />}
                            <ChevronDown size={14} className="text-gray-400 ml-auto" />
                          </div>

                          {/* Hotel Guests Dropdown */}
                          {showHotelGuestsDropdown && (
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-[320px]">
                              {/* Rooms */}
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <div className="font-semibold text-gray-800 text-sm">Rooms</div>
                                  <div className="text-xs text-gray-500">Number of rooms</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setHotelRooms(Math.max(1, hotelRooms - 1)); }}
                                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                  >
                                    -
                                  </button>
                                  <span className="font-semibold text-gray-800 w-6 text-center">{hotelRooms}</span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setHotelRooms(hotelRooms + 1); }}
                                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Adults */}
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <div className="font-semibold text-gray-800 text-sm">Adults</div>
                                  <div className="text-xs text-gray-500">18+ years</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setHotelAdults(Math.max(1, hotelAdults - 1)); }}
                                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                  >
                                    -
                                  </button>
                                  <span className="font-semibold text-gray-800 w-6 text-center">{hotelAdults}</span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setHotelAdults(hotelAdults + 1); }}
                                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Children */}
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <div className="font-semibold text-gray-800 text-sm">Children</div>
                                  <div className="text-xs text-gray-500">0-17 years</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setHotelChildren(Math.max(0, hotelChildren - 1)); }}
                                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                  >
                                    -
                                  </button>
                                  <span className="font-semibold text-gray-800 w-6 text-center">{hotelChildren}</span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setHotelChildren(hotelChildren + 1); }}
                                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all font-bold"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Pet Checkbox */}
                              <div className="flex items-center gap-2 mb-4">
                                <input
                                  type="checkbox"
                                  id="pet"
                                  checked={travelingWithPet}
                                  onChange={(e) => { e.stopPropagation(); setTravelingWithPet(e.target.checked); }}
                                  className="w-4 h-4 accent-orange-500 cursor-pointer"
                                />
                                <label htmlFor="pet" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Traveling with pet?</label>
                              </div>

                              {/* Done Button */}
                              <button
                                onClick={(e) => { e.stopPropagation(); setShowHotelGuestsDropdown(false); }}
                                className="w-full mt-4 py-2.5 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                                style={{ backgroundColor: ORANGE }}
                              >
                                Done
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Price per Night */}
                        <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer relative" onClick={() => setShowPriceDropdown(!showPriceDropdown)}>
                          <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Price per Night</label>
                          <div className="flex items-center gap-2 mt-1">
                            <IndianRupee size={16} style={{ color: ORANGE }} />
                            <span className="font-semibold text-gray-800 text-sm">
                              {selectedPriceRange || 'Select price'}
                            </span>
                            <ChevronDown size={14} className="text-gray-400 ml-auto" />
                          </div>

                          {/* Price Dropdown */}
                          {showPriceDropdown && (
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 w-[280px]">
                              <div className="space-y-2">
                                {[
                                  { label: '₹0 - ₹1500', value: '₹0-₹1500' },
                                  { label: '₹1500 - ₹2500', value: '₹1500-₹2500' },
                                  { label: '₹2500 - ₹5000', value: '₹2500-₹5000' },
                                  { label: '₹5000+', value: '₹5000+' }
                                ].map((price) => (
                                  <button
                                    key={price.value}
                                    onClick={(e) => { e.stopPropagation(); setSelectedPriceRange(price.label); setShowPriceDropdown(false); }}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                                      selectedPriceRange === price.label
                                        ? 'bg-orange-50 border-2 border-orange-400'
                                        : 'hover:bg-gray-50 border-2 border-transparent'
                                    }`}
                                  >
                                    <span className={`text-sm font-medium ${
                                      selectedPriceRange === price.label ? 'text-orange-600' : 'text-gray-800'
                                    }`}>
                                      {price.label}
                                    </span>
                                    {selectedPriceRange === price.label && (
                                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  </div>
                )}

                {/* Find Hotels Checkbox and Search Button */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all cursor-pointer w-fit">
                    <input 
                      type="checkbox" 
                      id="findHotels" 
                      checked={showHotelSearch}
                      onChange={(e) => setShowHotelSearch(e.target.checked)}
                      className="w-4 h-4 accent-orange-500 cursor-pointer" 
                    />
                    <label htmlFor="findHotels" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Find hotels in other cities/for different dates</label>
                  </div>

                  {/* Search Button */}
                  <button className="text-white px-8 py-2 rounded-lg text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ml-auto" style={{ backgroundColor: ORANGE }}>
                    <Search size={20} /> Search
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'attractions' && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                    {/* Destination */}
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
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
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200">
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Date</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={16} style={{ color: ORANGE }} />
                        <span className="font-semibold text-gray-800 text-sm">Jul 16</span>
                      </div>
                    </div>

                    {/* Tickets */}
                    <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all border-2 border-transparent hover:border-orange-200 cursor-pointer">
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
