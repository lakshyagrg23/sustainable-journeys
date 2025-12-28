
"use client";
import React, { useState } from 'react';
import { Calendar, ArrowRight, Ship, Filter, Phone, MessageCircle } from 'lucide-react';


const FerrySection = () => {
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const availableTickets = [
    {
      from: 'Port Blair',
      to: 'Havelock Island',
      price: '₹1,299',
      duration: '2h 30m',
      type: 'Government Ferry',
      time: '6:30 AM',
      availability: 'Available',
      ticketType: 'Ferry'
    },
    {
      from: 'Port Blair',
      to: 'Havelock Island',
      price: '₹1,899',
      duration: '1h 45m',
      type: 'Private Cruise',
      time: '8:00 AM',
      availability: 'Available',
      ticketType: 'Cruise'
    },
    {
      from: 'Havelock Island',
      to: 'Neil Island',
      price: '₹899',
      duration: '1h 15m',
      type: 'Government Ferry',
      time: '11:30 AM',
      availability: 'Available',
      ticketType: 'Ferry'
    },
    {
      from: 'Port Blair',
      to: 'Neil Island',
      price: '₹1,199',
      duration: '2h 00m',
      type: 'Government Ferry',
      time: '7:00 AM',
      availability: 'Available',
      ticketType: 'Ferry'
    },
    {
      from: 'Neil Island',
      to: 'Port Blair',
      price: '₹1,199',
      duration: '2h 00m',
      type: 'Government Ferry',
      time: '3:30 PM',
      availability: 'Available',
      ticketType: 'Ferry'
    },
    {
      from: 'Havelock Island',
      to: 'Port Blair',
      price: '₹1,299',
      duration: '2h 30m',
      type: 'Government Ferry',
      time: '4:00 PM',
      availability: 'Available',
      ticketType: 'Ferry'
    },
    {
      from: 'Port Blair',
      to: 'Baratang Island',
      price: '₹2,499',
      duration: '4h 30m',
      type: 'Tour Package',
      time: '5:30 AM',
      availability: 'Limited',
      ticketType: 'Tour Package'
    },
    {
      from: 'Port Blair',
      to: 'Ross Island',
      price: '₹399',
      duration: '30 min',
      type: 'Local Ferry',
      time: 'Every 2 hours',
      availability: 'Available',
      ticketType: 'Ferry'
    },
    {
      from: 'Port Blair',
      to: 'Chennai',
      price: '₹4,999',
      duration: '2h 00m',
      type: 'Flight',
      time: '9:00 AM',
      availability: 'Available',
      ticketType: 'Aeroplane'
    },
    {
      from: 'Port Blair',
      to: 'Kolkata',
      price: '₹3,999',
      duration: '36h',
      type: 'Train',
      time: '10:00 AM',
      availability: 'Limited',
      ticketType: 'Train'
    }
  ];

  // Ticket type filter state
  const [filterType, setFilterType] = useState('All');

  // Filter tickets based on search criteria and type
  const filteredTickets = availableTickets.filter(ticket => {
    const matchFrom = !filterFrom || ticket.from.toLowerCase().includes(filterFrom.toLowerCase());
    const matchTo = !filterTo || ticket.to.toLowerCase().includes(filterTo.toLowerCase());
    const matchType = filterType === 'All' || ticket.ticketType === filterType;
    return matchFrom && matchTo && matchType;
  });

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🎫 Andaman Island Tickets
          </h2>
          <p className="text-base text-gray-600">Book tickets between islands & tour packages</p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <Filter className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold text-blue-900">Filter Routes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full max-w-3xl">
            <input
              type="text"
              value={filterFrom}
              onChange={(e) => setFilterFrom(e.target.value)}
              placeholder="Search from location..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm bg-white"
            />
            <input
              type="text"
              value={filterTo}
              onChange={(e) => setFilterTo(e.target.value)}
              placeholder="Search to location..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm bg-white"
            />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm bg-white"
            />
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm bg-white"
            >
              <option value="All">All Types</option>
              <option value="Ferry">Ferry</option>
              <option value="Cruise">Cruise</option>
              <option value="Aeroplane">Aeroplane</option>
              <option value="Train">Train</option>
              <option value="Tour Package">Bus</option>
            </select>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="grid gap-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
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
                        <span className="inline-block"><Ship className="w-4 h-4" /></span>
                        {ticket.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-block"><Calendar className="w-4 h-4" /></span>
                        {ticket.duration}
                      </div>
                      <div>
                        <strong>Departure:</strong> {ticket.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-block">{ticket.ticketType === 'Ferry' && '⛴️'}{ticket.ticketType === 'Cruise' && '🛳️'}{ticket.ticketType === 'Aeroplane' && '✈️'}{ticket.ticketType === 'Train' && '🚆'}{ticket.ticketType === 'Tour Package' && '🎒'}</span>
                        <span className="font-semibold text-blue-700 text-sm">{ticket.ticketType}</span>
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
            <div className="flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto my-12">
              {/* Header & Message */}
              <div className="mb-3">
                <span role="img" aria-label="ship" className="text-5xl sm:text-6xl">🧭⛴️</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
                No routes found
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl">
                Try adjusting your filters. Or tell us your plan and we’ll arrange the best option for you.
              </p>

              {/* Contact Form Section */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 w-full shadow-md border border-gray-200 text-left">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-3 text-black">
                  <input
                    type="text"
                    placeholder="Your name ✍️"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                  <div className="flex gap-2">
                    <select className="px-3 py-3 rounded-xl border border-gray-300 bg-white text-sm">
                      <option>+91</option>
                      <option>+1</option>
                      <option>+44</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone number 📞"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Where do you want to go? 🗺️"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all md:col-span-2"
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:col-span-2">
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Travellers 👨‍👩‍👧‍👦"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <textarea
                    placeholder="Share any details (timings, budget, preferences) ✨"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all md:col-span-2 h-24 resize-none"
                  />

                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 mt-1">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all shadow"
                    >
                      Request arrangement ✈️
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition-all shadow w-full sm:w-auto"
                      onClick={() => window.open('https://wa.me/918944999448?text=Hi%20Sarthi%2C%20I%20need%20help%20booking%20routes', '_blank')}
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-orange-700 transition-all shadow w-full sm:w-auto"
                      onClick={() => window.open('tel:+918944999448', '_self')}
                    >
                      <Phone className="w-5 h-5" /> Call us
                    </button>
                  </div>

                  <p className="md:col-span-2 text-xs text-gray-500 text-center mt-1">
                    We respect your privacy. We’ll only contact you for this request.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section >
  );
};

export default FerrySection;
