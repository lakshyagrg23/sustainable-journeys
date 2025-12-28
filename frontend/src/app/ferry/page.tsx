'use client';
import React, { useState } from 'react';
import { Ship, Clock, Calendar, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

interface Ferry {
  operator: string;
  departure: string;
  arrival: string;
  bookingWindow: string;
}

interface Route {
  title: string;
  ferries: Ferry[];
}

export default function AndamanFerryBooking() {
  const [expandedRoutes, setExpandedRoutes] = useState<{ [key: string]: boolean }>({
    'havelock-portblair': true,
  });

  const [activeTab, setActiveTab] = useState<'operators' | 'routes'>('operators');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    route: '',
    date: '',
    passengers: '1',
    message: ''
  });

  const ferryOperators = [
    { name: 'Nautika', logo: '/ferry/nautika.png' },
    { name: 'Makruzz', logo: '/ferry/makruzz.png' },
    { name: 'Sealink', logo: '/ferry/sea-link.png' },
    { name: 'ITT Majestic', logo: '/ferry/itt-majestic.png' },
    { name: 'Sonargroup', logo: '/ferry/sonar-group.png' },
    { name: 'Green Ocean', logo: '/ferry/green-ocean.png' },
  ];

  const routes: { [key: string]: Route } = {
    'portblair-havelock': {
      title: 'Port Blair to Havelock',
      ferries: [
        { operator: 'Makruzz Pearl', departure: '06:00 AM', arrival: '07:30 AM', bookingWindow: '30th June 2025' },
        { operator: 'Nautika Lite', departure: '06:30 AM', arrival: '08:15 AM', bookingWindow: '31st May 2025' },
        { operator: 'Green Ocean 2', departure: '06:40 AM', arrival: '09:00 AM', bookingWindow: '31st May 2025' },
        { operator: 'Green Ocean 1', departure: '07:00 AM', arrival: '09:15 AM', bookingWindow: '31st May 2025' },
        { operator: 'Nautika', departure: '07:30 AM', arrival: '08:45 AM', bookingWindow: '31st May 2025' },
        { operator: 'Makruzz', departure: '08:00 AM', arrival: '09:30 AM', bookingWindow: '30th June 2025' },
        { operator: 'Makruzz Pearl', departure: '08:30 AM', arrival: '10:00 AM', bookingWindow: '30th June 2025' },
        { operator: 'Nautika Lite', departure: '11:15 AM', arrival: '01:00 PM', bookingWindow: '31st May 2025' },
        { operator: 'Makruzz', departure: '11:30 AM', arrival: '01:00 PM', bookingWindow: '30th June 2025' },
        { operator: 'Nautika', departure: '12:45 AM', arrival: '02:00 PM', bookingWindow: '31st May 2025' },
        { operator: 'Green Ocean 2', departure: '01:00 PM', arrival: '03:00 PM', bookingWindow: '31st May 2025' },
        { operator: 'Green Ocean 1', departure: '01:00 PM', arrival: '03:15 PM', bookingWindow: '31st May 2025' },
        { operator: 'Makruzz', departure: '02:00 PM', arrival: '03:30 PM', bookingWindow: '30th June 2025' },
      ]
    },
    'havelock-neil': {
      title: 'Havelock to Neil Island',
      ferries: [
        { operator: 'Green Ocean 1', departure: '09:15 AM', arrival: '10:30 AM', bookingWindow: '31st May 2025' },
        { operator: 'Nautika', departure: '09:30 AM', arrival: '10:15 AM', bookingWindow: '31st May 2025' },
        { operator: 'Makruzz', departure: '10:00 AM', arrival: '11:00 AM', bookingWindow: '30th June 2025' },
        { operator: 'Makruzz Pearl', departure: '10:30 AM', arrival: '11:30 AM', bookingWindow: '30th June 2025' },
        { operator: 'Makruzz', departure: '02:00 PM', arrival: '03:00 PM', bookingWindow: '30th June 2025' },
        { operator: 'Nautika', departure: '03:00 PM', arrival: '03:45 PM', bookingWindow: '31st May 2025' },
        { operator: 'Green Ocean 2', departure: '02:15 PM', arrival: '03:30 PM', bookingWindow: '31st May 2025' },
      ]
    },

    'havelock-portblair': {
      title: 'Havelock to Port Blair',
      ferries: [
        { operator: 'Makruzz', departure: '08:00 AM', arrival: '09:30 AM', bookingWindow: '30th June 2025' },
        { operator: 'Nautika Lite', departure: '09:00 AM', arrival: '10:45 AM', bookingWindow: '31st May 2025' },
        { operator: 'Green Ocean 2', departure: '09:30 AM', arrival: '11:30 PM', bookingWindow: '31st May 2025' },
        { operator: 'Makruzz Pearl', departure: '12:00 PM', arrival: '01:30 PM', bookingWindow: '30th June 2025' },
        { operator: 'Green Ocean 1', departure: '03:45 PM', arrival: '06:00 PM', bookingWindow: '31st May 2025' },
        { operator: 'Nautika Lite', departure: '03:45 PM', arrival: '15:30 PM', bookingWindow: '31st May 2025' },
        { operator: 'Makruzz', departure: '04:00 PM', arrival: '05:30 PM', bookingWindow: '30th June 2025' },
      ]
    },
    'neil-portblair': {
      title: 'Neil Island to Port Blair',
      ferries: [
        { operator: 'Nautika', departure: '10:45 AM', arrival: '12:00 PM', bookingWindow: '31 May 2025' },
        { operator: 'Green Ocean 1', departure: '11:00 AM', arrival: '12:45 PM', bookingWindow: '31 May 2025' },
        { operator: 'Makruzz', departure: '11:20 AM', arrival: '12:30 PM', bookingWindow: '30 June 2025' },
        { operator: 'Makruzz Pearl', departure: '12:00 PM', arrival: '01:15 PM', bookingWindow: '30 June 2025' },
        { operator: 'Nautika', departure: '04:00 PM', arrival: '05:15 PM', bookingWindow: '31 May 2025' },
        { operator: 'Makruzz', departure: '04:00 PM', arrival: '04:00 PM', bookingWindow: '30 June 2025' },
        { operator: 'Green Ocean 2', departure: '04:45 PM', arrival: '06:00 PM', bookingWindow: '31 May 2025' },
      ]
    },


  };

  const toggleRoute = (routeKey: string) => {
    setExpandedRoutes(prev => ({
      ...prev,
      [routeKey]: !prev[routeKey]
    }));
  };

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const body = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Ferry Inquiry: ${formData.route || 'N/A'}`,
        message: `Route: ${formData.route || 'N/A'}\nTravel Date: ${formData.date || '-'}\nPassengers: ${formData.passengers || '1'}\nNotes: ${formData.message || ''}`,
        source: 'ferry-page'
      };

      const res = await fetch('/api/zoho-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', route: '', date: '', passengers: '1', message: '' });
        // auto-hide success after 5s
        setTimeout(() => setStatus(null), 5000);
      } else {
        console.error('Zoho API error', data);
        setStatus('error');
      }
    } catch (err) {
      console.error('Submit error', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

        {/* Hero Section */}
        <section className="relative min-h-screen w-full
        bg-[url('/ferry/Your.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
          <div className="relative flex items-center justify-center min-h-screen w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-0">
              <div className="inline-block  px-6 py-8 ">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
                  Discover Paradise Islands
                </h2>
                <p className="text-base sm:text-lg md:text-xl mb-6 text-blue-100 max-w-3xl mx-auto">
                  Fast, Safe & Comfortable Ferry Services Across Andaman
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href="#schedule" className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-blue-50 transition shadow-md">
                    View Schedule
                  </a>
                  <a href="#booking" className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md">
                    Book a Ferry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* Features */}
        < section className="py-16 bg-white" >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ship className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multiple Operators</h3>
                <p className="text-gray-600">Choose from Makruzz, Nautika, Green Ocean & more</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Timings</h3>
                <p className="text-gray-600">Morning, afternoon & evening departures available</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
                <p className="text-gray-600">Quick inquiry process with confirmed bookings</p>
              </div>
            </div>
          </div>
        </section >

        {/* Ferry Schedule */}
        < section id="schedule" className="py-16 bg-gray-50" >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Andaman Ferry Booking Schedule
              </h2>
              <p className="text-lg text-gray-600">
                Complete ferry timings for all major routes
              </p>
            </div>

            <div className="space-y-6">
              {Object.entries(routes).map(([key, route]) => (
                <div key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleRoute(key)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between hover:from-blue-700 hover:to-blue-800 transition"
                  >
                    <span className="text-xl font-bold">{route.title}</span>
                    {expandedRoutes[key] ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {expandedRoutes[key] && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ferry Operator</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Departure Timings</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Arrival Timings</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Open Booking Window</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {route.ferries.map((ferry, idx) => (
                            <tr key={idx} className="hover:bg-blue-50 transition">
                              <td className="px-6 py-4 font-medium text-gray-900">{ferry.operator}</td>
                              <td className="px-6 py-4 text-gray-700">{ferry.departure}</td>
                              <td className="px-6 py-4 text-gray-700">{ferry.arrival}</td>
                              <td className="px-6 py-4 text-gray-700">{ferry.bookingWindow}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Important Notes */}
            <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Things to Keep in Mind</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm">✓</span>
                  <span>During peak season, seats tend to fill fast. We suggest you book well in advance and also save up on peak costs.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm">✓</span>
                  <span>When traveling during monsoon months, the sea can be choppy. This can cause sea sickness to some people. Keep medicine handy and travel on an empty stomach.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm">✓</span>
                  <span>Carry valid ID proof for all passengers. Foreign nationals need to carry passport and visa documents.</span>
                </li>
              </ul>
              <div className="mt-6 flex justify-center">
                <a href="#booking" className="inline-flex items-center justify-center bg-yellow-400 text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md">
                  Book a Ferry
                </a>
              </div>
            </div>
          </div>
        </section >

        {/* Island Hopping Section */}
        < section id="operators" className="py-8 bg-gradient-to-br from-amber-50 to-orange-50 relative
        bg-[url('https://classroomclipart.com/images/gallery/Animations/Transportation/ship_in_ocean_animation_5C.gif')] bg-cover bg-center bg-no-repeat
        " >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-12">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Island Hopping Made Easy
                </h2>
                <div className="flex justify-center mb-8">
                  <div className="inline-flex rounded-full bg-white/80 p-1.5 shadow-md">
                    <button
                      onClick={() => setActiveTab('operators')}
                      className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'operators'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      Operators
                    </button>
                    <button
                      onClick={() => setActiveTab('routes')}
                      className={`ml-3 px-6 py-2 rounded-full font-semibold transition ${activeTab === 'routes'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      Routes
                    </button>
                  </div>
                </div>

                <div className="max-w-4xl mx-auto">
                  {activeTab === 'operators' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-8">
                      {ferryOperators.map((operator, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition text-center">
                          <Image src={operator.logo} alt={operator.name} className="w-12 h-12 mx-auto mb-2" width={64} height={64} />
                          <p className="font-bold text-gray-900 text-sm">{operator.name}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'routes' && (
                    <div className="space-y-4 mb-8">
                      <div className="bg-white/90 rounded-2xl p-6 shadow-sm">
                        <p className="font-bold text-lg">Port Blair ↔ Havelock Island</p>
                        <p className="text-gray-600 mt-1">Multiple daily departures</p>
                      </div>
                      <div className="bg-white/90 rounded-2xl p-6 shadow-sm">
                        <p className="font-bold text-lg">Havelock ↔ Neil Island</p>
                        <p className="text-gray-600 mt-1">Morning & afternoon services</p>
                      </div>
                      <div className="bg-white/90 rounded-2xl p-6 shadow-sm">
                        <p className="font-bold text-lg">Neil Island ↔ Port Blair</p>
                        <p className="text-gray-600 mt-1">Daily connections available</p>
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-3 bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-lg"
                    >
                      Book a ferry
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* Booking Inquiry Section */}
        < section id="booking" className="py-16 bg-white" >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Book Your Ferry
              </h2>
              <p className="text-lg text-gray-600">
                Send us an inquiry and we&apos;ll get back to you with booking details
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-lg p-8">
              {status === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4 text-green-800">
                  Thank you — your inquiry has been sent. We&apos;ll contact you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                  There was a problem submitting your inquiry. Please try again or call us.
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Route *</label>
                  <select
                    name="route"
                    value={formData.route}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a route</option>
                    <option value="havelock-portblair">Havelock to Port Blair</option>
                    <option value="portblair-havelock">Port Blair to Havelock</option>
                    <option value="neil-portblair">Neil Island to Port Blair</option>
                    <option value="havelock-neil">Havelock to Neil Island</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Passengers *</label>
                <input
                  type="number"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special requirements or questions..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 transition shadow-lg ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </div>
          </div>
        </section >


      </div >
    </>
  );
}