"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, User, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    travelers: '',
    message: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim() || !formData.travelDates.trim()) {
      setFormError('Please fill all required fields.');
      setFormSuccess(false);
      return;
    }
    setFormError('');
    setFormSuccess(false);
    try {
      const res = await fetch('/api/zoho-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelDates: formData.travelDates,
          travelers: formData.travelers,
          message: formData.message,
          subject: 'Trip Inquiry',
          source: 'contact-page',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to send inquiry.');
      }
      setFormSuccess(true);
      setFormData({ name: '', email: '', phone: '', travelDates: '', travelers: '', message: '' });
    } catch (err) {
      const errorMsg = (err instanceof Error && err.message) ? err.message : 'Failed to send inquiry.';
      setFormError(errorMsg);
      setFormSuccess(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+91-8944999448", "+91-9476017072"],
      description: "Available 24/7 for your queries"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: [
        "info@saarthiandaman.com",
        "agents@saarthiandaman.com",
        "reservation@saarthiandaman.com",
      ],
      description: "We respond within 2-4 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Office",
      details: ["Shop No.22, Municipal Commercial Complex Building, Beside Island Arched, Junglighat, Sri Vijaya Puram (erstwhile Port Blair), 744103"],
      description: "Mon-Sat: 9 AM - 8 PM"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Saturday: 9:00 AM - 8:00 PM"],
      description: "Emergency support available 24/7"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full">
        {/* Hero Section - full-width banner image */}
        <section
          className="bg-cover bg-center bg-no-repeat text-white w-full bg-[url('/SA1.png')]  "
        >

          <div className="relative w-full  px-4 sm:px-6 lg:px-8 py-20">
            {/* overlay for readability */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
            <div className="relative text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get In <span className="text-yellow-400">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Ready to explore the Andaman Islands? Let&apos;s plan your perfect island adventure together!
              </p>
              <div className="w-24 h-1 bg-yellow-400 mx-auto rounded"></div>
            </div>
          </div>

          {/* Decorative Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-12 fill-current text-blue-50">
              <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
            </svg>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Quick Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 -mt-8 relative z-10">
            {contactInfo.map((item, index) => {
              // choose a vibrant gradient per card type for the icon background
              const iconBg = item.title === 'Email Us'
                ? 'from-pink-500 to-orange-400'
                : item.title === 'Call Us'
                  ? 'from-green-400 to-teal-500'
                  : item.title === 'Visit Our Office'
                    ? 'from-blue-400 to-cyan-500'
                    : 'from-indigo-400 to-purple-500';

              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-gradient-to-br ${iconBg} text-white`}>
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <div className="space-y-2 mb-3">
                    {item.details.map((detail, idx) => {
                      const isEmail = detail && detail.includes && detail.includes('@');
                      if (isEmail) {
                        // support prefixed labels like 'B2B: agents@...' or raw emails
                        const parts = detail.split(':');
                        if (parts.length > 1) {
                          const label = parts[0].trim();
                          const email = parts.slice(1).join(':').trim();
                          return (
                            <div key={idx} className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-gray-700">{label}</span>
                              <a key={idx} href={`mailto:${email}`} className="inline-block text-xs md:text-sm bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:from-indigo-100 hover:to-indigo-200 transition">
                                {email}
                              </a>
                            </div>
                          );
                        }

                        return (
                          <a key={idx} href={`mailto:${detail}`} className="inline-block text-sm bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:from-indigo-100 hover:to-indigo-200 transition">
                            {detail}
                          </a>
                        );
                      }

                      return (
                        <p key={idx} className="text-sm text-gray-700 font-medium">
                          {detail}
                        </p>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Plan Your Trip
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and our travel experts will create a customized itinerary just for you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-700"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-700"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-700"
                      placeholder="+91-8944999448"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Arrival / Pickup Date
                    </label>
                    <input
                      type="date"
                      name="travelDates"
                      value={formData.travelDates}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-700"
                      placeholder="Select date"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-700"
                  >
                    <option value="">Select number of travelers</option>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3-4">3-4 People</option>
                    <option value="5-8">5-8 People</option>
                    <option value="9+">9+ People</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Tell us about your ideal trip
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-gray-700"
                    placeholder="What activities interest you? Any special requirements? Budget preferences?"
                  ></textarea>
                </div>

                {formError && <div className="text-red-600 text-xs font-medium">{formError}</div>}
                {formSuccess && <div className="text-green-600 text-xs font-medium">Inquiry sent successfully!</div>}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 "
                  disabled={formSuccess}
                >
                  <Send className="w-5 h-5" />
                  <span>{formSuccess ? 'Sent!' : 'Send Inquiry'}</span>
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Interactive Map
                </h3>
                <div className="mb-6 rounded-xl overflow-hidden border border-blue-200 shadow">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.5002289943513!2d92.7315095!3d11.658918199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30889506fcaddabd%3A0xcd0921cc9572e6d9!2sSaarthi%20Andaman!5e0!3m2!1sen!2sin!4v1761024990650!5m2!1sen!2sin"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Saarthi Andaman Location"
                  ></iframe>
                  {/* <div className="text-center mt-3">
                    <p className="text-gray-700 font-medium">Marine Drive, Aberdeen Bazaar</p>
                    <p className="text-sm text-gray-500">Sri Vijaya Puram (Port Blair)</p>
                  </div> */}
                </div>
                {/* <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Near</p>
                    <p className="font-semibold text-gray-900">Safexpress Pvt. Ltd.</p>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <p className="text-sm text-gray-600">5 min from</p>
                    <p className="font-semibold text-gray-900">Phoenix Bay Jetty</p>
                  </div>
                </div> */}
              </div>

              {/* Quick Response Promise */}
              <div className="bg-gradient-to-r from-blue-900 to-teal-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Our Response Promise
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 text-sm font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold">Instant Acknowledgment</p>
                      <p className="text-blue-100 text-sm">We confirm receipt of your inquiry immediately</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 text-sm font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold">Expert Consultation</p>
                      <p className="text-blue-100 text-sm">Detailed response within 2-4 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 text-sm font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold">Personalized Itinerary</p>
                      <p className="text-blue-100 text-sm">Custom travel plan within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-red-600 mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold text-red-800">Emergency Support</h4>
                    <p className="text-red-700">24/7 assistance during your trip</p>
                    <p className="text-red-800 font-bold text-lg">+91-8944999448</p>
                    <p className="text-red-800 font-bold text-lg">+91-9476017072</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ContactPage;