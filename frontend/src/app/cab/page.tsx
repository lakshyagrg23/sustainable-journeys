"use client"
import React, { useState, useEffect } from 'react';
import { Phone, Mail, Search } from 'lucide-react';
import useCapStore from '../../../store/capStore';
import Navbar from '@/components/Navbar';
import Image from 'next/image';


// Cap API types
interface CapPhotoFormats {
  medium?: { url: string };
  small?: { url: string };
  large?: { url: string };
}
interface CapPhoto {
  formats?: CapPhotoFormats;
  url?: string;
}
interface Cap {
  id: number;
  documentId?: string;
  name: string;
  short_description: string;
  price: number;
  seats: number;
  photo?: CapPhoto;
}

// Update InquiryForm for travel context
interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  days: string;
  members: string;
  carType: string;
  message: string;
}

const CarCapsPage: React.FC = () => {
  const [inquiryForm, setInquiryForm] = useState<InquiryForm>({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    days: '',
    members: '',
    carType: '',
    message: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [seatFilter, setSeatFilter] = useState('');
  const { caps, fetchCaps } = useCapStore(); // caps: Cap[]

  useEffect(() => {
    fetchCaps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper to get image URL from cap.photo
  const getImageUrl = (photo?: CapPhoto) => {
    if (!photo) return '';
    if (photo.formats?.medium?.url) return photo.formats.medium.url;
    if (photo.formats?.small?.url) return photo.formats.small.url;
    if (photo.formats?.large?.url) return photo.formats.large.url;
    if (photo.url) return photo.url;
    return '';
  };

  // Filter caps by name and seats
  const filteredCaps = (caps as Cap[] || [])
    .filter((item: Cap) => {
      const nameMatch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const seatsMatch = seatFilter ? String(item.seats) === seatFilter : true;
      return nameMatch && seatsMatch;
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    alert('Inquiry submitted successfully! We will contact you soon.');
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      travelDate: '',
      days: '',
      members: '',
      carType: '',
      message: ''
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Reduced Height */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-12 bg-[url('https://www.spinny.com/blog/wp-content/uploads/2024/09/videoframe_0.webp')] bg-cover bg-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Hero Content - Hidden on mobile */}
              <div className="hidden lg:block">
                <h1 className="text-4xl font-bold mb-4">
                  Book Your <span className="text-yellow-400">Travel Car</span> in Andaman
                </h1>
                <p className="text-lg text-blue-100 mb-6">
                  Choose from a range of comfortable cars for your Andaman trip. Best rates, verified drivers, and hassle-free booking.
                </p>
                <div className="flex gap-6 text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    AC & Non-AC Options
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Family & Group Friendly
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Local Expert Drivers
                  </span>
                </div>
              </div>

              {/* Inquiry Form - Improved Design for Travel */}
              <div className="bg-white rounded-xl shadow-xl p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Get a Car Booking Quote</h2>
                  <p className="text-gray-600 text-sm">Share your travel details and get the best car options</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={inquiryForm.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black placeholder:text-gray-700"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={inquiryForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black placeholder:text-gray-700"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={inquiryForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black placeholder:text-gray-700"
                    placeholder="Email Address"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="date"
                        name="travelDate"
                        value={inquiryForm.travelDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black placeholder:text-gray-700"
                        required
                        placeholder="Travel Date"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="days"
                        value={inquiryForm.days}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black placeholder:text-gray-700"
                        placeholder="No. of Days"
                        min={1}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="number"
                        name="members"
                        value={inquiryForm.members}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black placeholder:text-gray-700"
                        placeholder="No. of Members"
                        min={1}
                      />
                    </div>
                    <div>
                      <select
                        name="carType"
                        value={inquiryForm.carType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                      >
                        <option value="">Select Car Type</option>
                        {filteredCaps.map((cap: Cap) => (
                          <option key={cap.id} value={cap.name}>{cap.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <textarea
                    name="message"
                    value={inquiryForm.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black placeholder:text-gray-700 resize-none"
                    placeholder="Any special requests? (Optional)"
                  />
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Get Free Quote
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      +91-8944999448 / +91-9476017072
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      info@saarthiandaman.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Hero Title */}
        <div className="lg:hidden bg-white py-6 border-b">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Book Your <span className="text-blue-600">Travel Car</span> in Andaman
            </h1>
            <p className="text-gray-600 text-sm mt-1">Comfortable cars for your trip</p>
          </div>
        </div>

        {/* Search Section */}
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search cars..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                />
              </div>
              {/* Seats Filter */}
              <div className="flex items-center gap-2">
                <label htmlFor="seatFilter" className="text-sm text-gray-700 font-medium">Seats:</label>
                <select
                  id="seatFilter"
                  value={seatFilter}
                  onChange={e => setSeatFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                >
                  <option value="">All</option>
                  {/* Unique seat options from caps */}
                  {(Array.from(new Set((caps as Cap[] || []).map((c: Cap) => c.seats))) as number[])
                    .sort((a, b) => a - b)
                    .map((seats) => (
                      <option key={seats} value={seats}>{seats} Seater</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Cars Section - Travel Cards */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Cars for Your Trip</h2>
              <p className="text-gray-600">
                {filteredCaps.length} cars found
              </p>
            </div>
            {filteredCaps.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCaps.map((cap: Cap) => (
                  <div key={cap.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        width={300}
                        height={200}
                        src={getImageUrl(cap.photo)}
                        alt={cap.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">{cap.seats} Seater</div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{cap.name}</h3>
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">{cap.short_description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                          <span>Seats: {cap.seats}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold text-blue-600">₹{cap.price}</span>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

    </>
  );
};

export default CarCapsPage;