"use client"
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Ship, Phone, Mail, Clock, ArrowRight, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const AndamanTicketsPage = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [ticketType, setTicketType] = useState('ferry');

  // Inquiry Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Filter States
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const locations = [
    'Port Blair',
    'Havelock Island (Swaraj Dweep)',
    'Neil Island (Shaheed Dweep)',
    'Ross Island',
    'Baratang Island',
    'Rangat',
    'Mayabunder',
    'Diglipur',
    'Long Island',
    'Little Andaman'
  ];

  const availableTickets = [
    {
      from: 'Port Blair',
      to: 'Havelock Island',
      price: '₹1,299',
      duration: '2h 30m',
      type: 'Government Ferry',
      time: '6:30 AM',
      availability: 'Available'
    },
    {
      from: 'Port Blair',
      to: 'Havelock Island',
      price: '₹1,899',
      duration: '1h 45m',
      type: 'Private Cruise',
      time: '8:00 AM',
      availability: 'Available'
    },
    {
      from: 'Havelock Island',
      to: 'Neil Island',
      price: '₹899',
      duration: '1h 15m',
      type: 'Government Ferry',
      time: '11:30 AM',
      availability: 'Available'
    },
    {
      from: 'Port Blair',
      to: 'Neil Island',
      price: '₹1,199',
      duration: '2h 00m',
      type: 'Government Ferry',
      time: '7:00 AM',
      availability: 'Available'
    },
    {
      from: 'Neil Island',
      to: 'Port Blair',
      price: '₹1,199',
      duration: '2h 00m',
      type: 'Government Ferry',
      time: '3:30 PM',
      availability: 'Available'
    },
    {
      from: 'Havelock Island',
      to: 'Port Blair',
      price: '₹1,299',
      duration: '2h 30m',
      type: 'Government Ferry',
      time: '4:00 PM',
      availability: 'Available'
    },
    {
      from: 'Port Blair',
      to: 'Baratang Island',
      price: '₹2,499',
      duration: '4h 30m',
      type: 'Tour Package',
      time: '5:30 AM',
      availability: 'Limited'
    },
    {
      from: 'Port Blair',
      to: 'Ross Island',
      price: '₹399',
      duration: '30 min',
      type: 'Local Ferry',
      time: 'Every 2 hours',
      availability: 'Available'
    }
  ];

  // Filter tickets based on search criteria
  const filteredTickets = availableTickets.filter(ticket => {
    const matchFrom = !filterFrom || ticket.from.toLowerCase().includes(filterFrom.toLowerCase());
    const matchTo = !filterTo || ticket.to.toLowerCase().includes(filterTo.toLowerCase());
    return matchFrom && matchTo;
  });

  const handleInquiry = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission
    alert('Inquiry submitted! We will contact you soon.');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        {/* HERO SECTION WITH FILTER AT BOTTOM CENTER */}
        <div className="relative w-full bg-gradient-to-br from-blue-600 via-teal-600 to-cyan-700 text-white flex items-center justify-center" style={{ minHeight: '60vh' }}>
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image width={1000} height={1000} src="/map/andamanmap.jpg" alt="Andaman Islands" className="w-full h-full object-cover opacity-40" />
            {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-700/70 via-teal-700/60 to-cyan-800/60" /> */}
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
            {/* HERO TEXT */}
            <div className="flex flex-col justify-center items-center text-center py-2 md:py-0 flex-1">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">Andaman Island Tickets</h1>
              <p className="text-base md:text-lg opacity-90 drop-shadow">Book ferry tickets between islands & tour packages</p>
            </div>
            {/* FILTER AT BOTTOM CENTER */}
            <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-lg p-4 border border-gray-100 backdrop-blur flex flex-col justify-center items-center z-20">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-semibold text-blue-900">Filter Routes</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                <div>
                  <input
                    type="text"
                    value={filterFrom}
                    onChange={(e) => setFilterFrom(e.target.value)}
                    placeholder="Search from location..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm bg-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={filterTo}
                    onChange={(e) => setFilterTo(e.target.value)}
                    placeholder="Search to location..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm bg-white"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row gap-8">
          {/* Available Tickets Section */}
          <div className="flex-1 grid gap-4">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="font-semibold text-gray-900">{ticket.from}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-semibold text-gray-900">{ticket.to}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {ticket.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Ship className="w-4 h-4" />
                          {ticket.type}
                        </div>
                        <div>
                          <strong>Departure:</strong> {ticket.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{ticket.price}</div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                      <div className="text-center">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${ticket.availability === 'Available'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {ticket.availability}
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all">
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Ship className="w-16 h-16 mx-auto opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No routes found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </div>
          {/* Inquiry Form Section */}
          <div className="w-full md:w-[350px] lg:w-[400px] flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-white/90 rounded-xl shadow-xl p-4 md:p-6 lg:p-8 backdrop-blur-md">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 text-center">Ticket Inquiry Form</h2>
                <form onSubmit={handleInquiry} className="space-y-4">
                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="Enter your phone number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                    />
                  </div>
                  {/* Travel Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                          value={fromLocation}
                          onChange={(e) => setFromLocation(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                        >
                          <option value="">Select starting point</option>
                          {locations.map((location) => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                          value={toLocation}
                          onChange={(e) => setToLocation(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                        >
                          <option value="">Select destination</option>
                          {locations.map((location) => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Travel Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Passengers *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                          value={passengers}
                          onChange={(e) => setPassengers(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ticket Type
                      </label>
                      <div className="relative">
                        <Ship className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                          value={ticketType}
                          onChange={(e) => setTicketType(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                        >
                          <option value="ferry">Ferry Tickets</option>
                          <option value="cruise">Cruise Tickets</option>
                          <option value="tour">Tour Package</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      placeholder="Any special requirements or questions..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                    ></textarea>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <Mail className="w-5 h-5" />
                      Send Inquiry
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <Phone className="w-5 h-5" />
                      Call: +91-9876543210
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AndamanTicketsPage;