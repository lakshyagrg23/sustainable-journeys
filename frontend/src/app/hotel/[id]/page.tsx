'use client';

// Markdown rendering helper (simple)
const renderWithHighlights = (text: string) => {
  if (!text) return null;
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      const inner = part.slice(2, -2);
      return (
        <span key={idx} className="font-semibold text-blue-600">{inner}</span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
};



import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Phone,
  Mail,


} from 'lucide-react';
import { Wifi, Tv, Coffee } from 'lucide-react'; //Car, Wind, Users
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useHotelStore from '../../../../store/hotelStore';


// ChevronLeft,
//   ChevronRight,
//   Heart,
//   Share2,
//   Check,

// interface AmenityItem {
//   Amenities: string;
// }
// Type definitions for hotel API data
interface ImageType {
  id: number;
  url: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

interface Amenity {
  Amenities: string;
}

// Amenity icon helper (expanded keyword matching, defensive)
// const getAmenityIcon = (amenity: any) => {
//   const lower = typeof amenity === 'string' ? amenity.toLowerCase() : '';
//   if (lower.includes('wifi') || lower.includes('internet')) return <Wifi className="w-3 h-3" />;
//   if (lower.includes('tv') || lower.includes('television') || lower.includes('smart tv')) return <Tv className="w-3 h-3" />;
//   if (lower.includes('ac') || lower.includes('air') || lower.includes('aircon')) return <Wind className="w-3 h-3" />;
//   if (lower.includes('parking') || lower.includes('car') || lower.includes('valet')) return <Car className="w-3 h-3" />;
//   if (lower.includes('coffee') || lower.includes('tea') || lower.includes('kettle') || lower.includes('espresso')) return <Coffee className="w-3 h-3" />;
//   if (lower.includes('mini') && lower.includes('bar')) return <Coffee className="w-3 h-3" />;
//   if (lower.includes('balcony') || lower.includes('view') || lower.includes('sea') || lower.includes('ocean')) return <MapPin className="w-3 h-3" />;
//   if (lower.includes('pool') || lower.includes('swim')) return <Star className="w-3 h-3" />;
//   if (lower.includes('fridge') || lower.includes('refrigerator') || lower.includes('mini fridge')) return <Star className="w-3 h-3" />;
//   if (lower.includes('guest') || lower.includes('person') || lower.includes('occup')) return <Users className="w-3 h-3" />;
//   return <Star className="w-3 h-3" />;
// };

interface Room {
  id?: number;
  documentId?: string;
  document_id?: string;
  name?: string;
  price?: number;
  originalPrice?: number;
  Occupancy?: number;
  category?: string;
  Amenities?: Amenity[];
  photo?: ImageType;
  new_category?: string;
}

interface Hotel {
  documentId: string;
  name?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  photo?: ImageType;
  hero_section?: ImageType[];
  hotel_rooms?: Room[];
  room?: Room[];
  short_description?: string;
  About?: string;
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

// interface RoomType {
//   id: number;
//   name: string;
//   price: number;
//   Occupancy: string;
//   originalPrice?: number;
// }

interface ProcessedRoom {
  id: string;
  documentId?: string;
  type: string;
  category: string;
  price: number;
  originalPrice: number;
  size: string;
  occupancy: string;
  amenities: string[];
  image: string;
  new_category: string;
}

const HotelDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [currentImageIndex] = useState(0);
  const [selectedRoomCategory,] = useState('All');//setSelectedRoomCategory
  const [inquiry, setInquiry] = useState({ name: '', phone: '', email: '', members: '', message: '', arrivalDate: '' });
  const [inquiryError, setInquiryError] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Zustand store
  const { hotels, loading } = useHotelStore();

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);

  // Find hotel from Zustand state only (no API call)
  const hotel = hotels.find((h: Hotel) => String(h.documentId) === String(unwrappedParams.id));

  console.log('Hotel data from state:', hotel);

  // Update browser title and meta description when hotel data is available
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const title = hotel?.name;
    const short_description = hotel?.short_description || hotel?.About || '';
    const originalTitle = document.title;
    let createdMeta = false;

    if (title) {
      document.title = `${title} - Saarthi Andaman`;
    }

    try {
      const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (short_description) {
        if (meta) {
          meta.content = String(short_description).slice(0, 155);
        } else {
          const m = document.createElement('meta');
          m.name = 'description';
          m.content = String(short_description).slice(0, 155);
          document.head.appendChild(m);
          createdMeta = true;
        }
      }
    } catch (e) {
      console.error('Error setting meta description:', e);
    }

    return () => {
      try {
        document.title = originalTitle;
        if (createdMeta) {
          const m = document.querySelector('meta[name="description"]');
          if (m && m.parentElement) m.parentElement.removeChild(m);
        }
      } catch (e) {
        console.error('Error setting meta description:', e);
      }
    };
  }, [hotel]);
  // Prepare processed rooms and filtering
  const allRooms: ProcessedRoom[] = hotel && (hotel.hotel_rooms || hotel.room)
    ? (hotel.hotel_rooms || hotel.room).map((room: Room, idx: number) => {
      let category = room.category || '';
      if (!category) {
        const price = room.price || 0;
        if (price >= 15000) category = 'Luxury';
        else if (price >= 10000) category = 'Deluxe';
        else if (price >= 5000) category = 'Standard';
        else category = 'Budget';
      }
      return {
        id: String(room.id || idx + 1),
        documentId: room.documentId || room.document_id || String(room.id || idx + 1),
        type: room.name || 'Standard Room',
        category,
        new_category: room.new_category || 'Standard',
        price: room.price || (hotel.price ? hotel.price * 0.8 : 5000),
        originalPrice: room.originalPrice || (room.price ? room.price * 1.2 : 0),
        size: '45 sqm',
        occupancy: `${room.Occupancy || 2} Adults`,
        // Do not use backend amenities here — keep static icons only
        amenities: [],
        image: room.photo?.url || hotel.photo?.url || null,
      };
    }) : [];

  const displayedRooms = selectedRoomCategory === 'All'
    ? allRooms
    : allRooms.filter(r => r.category === selectedRoomCategory);

  // Helper function to get image URL
  const getImageUrl = (image: ImageType | null | undefined): string | null => {
    if (!image) return null;
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
    const url = image.formats?.large?.url ||
      image.formats?.medium?.url ||
      image.formats?.small?.url ||
      image.url;
    return url ? (url.startsWith('http') ? url : `${API_BASE}${url}`) : null;
  };


  // Get selected room based on index
  // const selectedRoom = hotelData?.rooms[selectedRoomIndex] || null;


  // Show loading state (optional: only if hotels are still loading)
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading hotel details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show not found if hotel is not in state
  if (!hotel) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
            <p className="text-gray-600 mb-4">The requested hotel could not be found in state.</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }


  // Compose hotelData-like variables for rendering
  const images = [
    ...(hotel.photo ? [getImageUrl(hotel.photo)] : []),
    ...(hotel.hero_section ? hotel.hero_section.map((img: ImageType) => getImageUrl(img)) : [])
  ].filter(Boolean).length > 0
    ? [
      ...(hotel.photo ? [getImageUrl(hotel.photo)] : []),
      ...(hotel.hero_section ? hotel.hero_section.map((img: ImageType) => getImageUrl(img)) : [])
    ].filter(Boolean)
    : [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ];

  // const amenities = Array.isArray(hotel.Amenities)
  //   ? hotel.Amenities.map((a: any) => a.Amenities)
  //   : [];

  // const highlights = hotel.highlights || [
  //   'Beachfront location with private beach access',
  //   'Award-winning spa and wellness center',
  //   'Multiple dining options with local and international cuisine',
  //   'Water sports and adventure activities',
  //   'Eco-friendly practices and sustainable tourism'
  // ];

  // const policies = hotel.policies || {
  //   checkIn: '2:00 PM',
  //   checkOut: '12:00 PM',
  //   cancellation: 'Free cancellation up to 24 hours before arrival',
  //   children: 'Children under 5 stay free',
  //   pets: 'Pets not allowed'
  // };

  const contact = hotel.contact || {
    phone: '+91 8944999448',
    email: 'info@saarthiandaman.com',
    address: hotel.location || 'Andaman & Nicobar Islands'
  };


  // const nextImage = () => {
  //   setCurrentImageIndex((prev) => (prev + 1) % images.length);
  // };

  // const prevImage = () => {
  //   setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  // };

  return (<>
    <Navbar />

    {/* Hero Section: mobile (full image overlay), desktop (split image/text) */}
    <div>
      {/* Mobile view */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] bg-black overflow-hidden animate-fadein mb-8 lg:hidden">
        <Image
          src={images[currentImageIndex]}
          alt={hotel.name || 'Hotel image'}
          fill
          priority
          sizes="100vw"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 100%)' }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg text-white" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            {hotel.name}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-200" />
            <span className="text-base text-blue-100">{hotel.location || 'Andaman & Nicobar Islands'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(typeof hotel.rating === 'number' ? hotel.rating : 3)
                  ? 'text-yellow-400 fill-current'
                  : 'text-blue-200'
                  }`}
              />
            ))}
            <span className="text-lg font-semibold text-white ml-1">{typeof hotel.rating === 'number' ? hotel.rating : 3}</span>
            <span className="text-xs text-blue-100">({hotel.reviewCount || 234} reviews)</span>

          </div>
          {/* Short description for mobile hero */}
          <div className="text-blue-100 text-sm leading-relaxed mt-2 px-4 max-w-xl">
            {renderWithHighlights(hotel.short_description || 'Experience luxury at its finest.')}
          </div>
        </div>
      </div>
      {/* Desktop view */}
      <div className="relative w-full h-[50vh] hidden lg:flex bg-black shadow-2xl flex-col md:flex-row items-center justify-center overflow-hidden animate-fadein mb-8">
        {/* Image Left - 50% width, minimal gap */}
        <div className="flex-shrink-0 w-full md:w-[50%] h-[50vh] md:h-full flex items-center justify-end bg-black relative pr-1">
          <div className="relative w-full h-[92%] md:w-[98%] md:h-[92%] rounded-2xl shadow-xl overflow-hidden">
            <Image
              src={images[currentImageIndex]}
              alt={hotel.name || 'Hotel image'}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-left rounded-2xl"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20 pointer-events-none rounded-2xl" />
        </div>
        {/* Text Right - 50% width, minimal gap */}
        <div className="w-full md:w-[50%] h-full flex items-center justify-start px-1 md:px-3">
          <div className="relative text-left text-white max-w-xl font-sans" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            <div className="absolute inset-0 bg-black/40 rounded-xl -z-10" />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-green-300" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
              {hotel.name}
            </h1>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-blue-200" />
              <span className="text-base text-blue-100">{hotel.location || 'Andaman & Nicobar Islands'}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(typeof hotel.rating === 'number' ? hotel.rating : 3)
                    ? 'text-yellow-400 fill-current'
                    : 'text-blue-200'
                    }`}
                />
              ))}
              <span className="text-lg font-semibold text-white ml-1">{typeof hotel.rating === 'number' ? hotel.rating : 3}</span>
              <span className="text-xs text-blue-100">({hotel.reviewCount || 234} reviews)</span>
            </div>
            {/* Markdown short description (desktop only) */}
            <div className="text-blue-100 text-base md:text-lg leading-relaxed md:leading-9 drop-shadow-md mt-2 mb-2" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
              {renderWithHighlights(hotel.short_description || hotel.About || 'Experience luxury at its finest.')}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Font import for Poppins */}
    <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
        `}</style>
    {/* Fade-in animation style */}
    <style jsx>{`
          .animate-fadein {
            animation: fadein 1s ease;    
          }
          @keyframes fadein {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

    <div className="w-full flex justify-center relative z-10 px-2 sm:px-4 lg:px-0 -mt-8 sm:-mt-12 lg:-mt-16">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-6 lg:space-y-8">
          {/* Room Category Filter - Responsive Tab Slider UI */}
          {/* <div className="w-full mb-8 ">
            <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent px-1 py-4 bg-white rounded-full shadow border border-gray-200 max-w-full mx-auto sm:justify-center ">
              {["All", "Luxury", "Deluxe", "Standard", "Budget"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedRoomCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-200 text-sm whitespace-nowrap
                        ${selectedRoomCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 bg-gray-100 hover:bg-blue-50'}
                      `}
                >
                  {cat === 'Luxury' && <Star className="w-4 h-4 text-yellow-400" />}
                  {cat === 'Deluxe' && <Star className="w-4 h-4 text-blue-400" />}
                  {cat === 'Standard' && <Star className="w-4 h-4 text-gray-400" />}
                  {cat === 'Budget' && <Star className="w-4 h-4 text-green-400" />}
                  {cat}
                </button>
              ))}
            </div>
          </div> */}

          {/* Room Cards - 3 per row, centered, enhanced UI */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-blue-400">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4 sm:mb-6 text-center">Rooms</h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {displayedRooms.length > 0 ? displayedRooms.map((room) => (
                  <div key={room.id} className="border border-blue-400 rounded-2xl p-6 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-2xl transition-all duration-200 flex flex-col items-center">
                    <div className="relative w-full h-44 mb-4 rounded-xl overflow-hidden shadow">
                      {room.image && (
                        <Image width={176} height={176} src={room.image} alt={room.type} className="object-cover w-full h-full" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-1 text-center">{room.type}</h3>
                    <div className="text-sm text-gray-600 mb-1 text-center">Category: <span className="font-semibold">{room.new_category}</span></div>
                    <div className="text-green-700 font-bold text-xl mb-1 text-center">₹{room.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mb-2 text-center">{room.occupancy} </div>

                    {/* Static common amenities: simple inline icons (no boxes) */}
                    <div className="flex items-center justify-center gap-6 mb-4 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Tv className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">TV</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">Wi‑Fi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">Breakfast</span>
                      </div>
                    </div>

                    {/* Backend amenities removed — only static common icons are shown above */}
                    <div className="mb-4" />

                    <Link
                      href={`/hotel/${hotel.documentId}/room/${room.documentId || room.id}`}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-2 rounded-lg font-semibold shadow text-base transition-all duration-200 transform hover:scale-105 mt-2 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                )) : (
                  <div className="col-span-full text-center text-gray-500">No rooms found for this category.</div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar - right of filter/cards, improved UI */}
          <div className="w-full flex flex-col md:flex-row justify-center gap-4">
            {/* Mobile: Inquiry form above, contact info below. Desktop: side by side. */}
            <div className="w-full md:w-2/3">
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-xl p-6 mb-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Enquire Now</h3>
                  <form
                    className="space-y-4 text-gray-500"
                    onSubmit={async e => {
                      e.preventDefault();
                      if (!inquiry.name.trim() || !inquiry.phone.trim() || !inquiry.email.trim() || !inquiry.members.trim() || !inquiry.message.trim() || !inquiry.arrivalDate.trim()) {
                        setInquiryError('Please fill all the details.');
                        setInquirySuccess(false);
                        return;
                      }
                      setInquiryError('');
                      setInquirySuccess(false);
                      try {
                        const res = await fetch('/api/zoho-lead', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            name: inquiry.name,
                            phone: inquiry.phone,
                            email: inquiry.email,
                            members: inquiry.members,
                            message: inquiry.message,
                            arrivalDate: inquiry.arrivalDate,
                            subject: hotel.name || 'Hotel Inquiry',
                            source: 'hotel-inquiry',
                            hotelId: hotel.documentId,
                          }),
                        });
                        if (!res.ok) {
                          const data = await res.json().catch(() => ({}));
                          throw new Error(data?.error || 'Failed to send inquiry.');
                        }
                        setInquirySuccess(true);
                        setInquiry({ name: '', phone: '', email: '', members: '', message: '', arrivalDate: '' });
                      } catch (err) {
                        const errorMsg = (err instanceof Error && err.message) ? err.message : 'Failed to send inquiry.';
                        setInquiryError(errorMsg);
                        setInquirySuccess(false);
                      }
                    }}
                  >
                    <div>
                      <label className="block text-xs font-medium text-blue-900 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={inquiry.name}
                        onChange={e => setInquiry({ ...inquiry, name: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-900 mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="Your Phone Number"
                        value={inquiry.phone}
                        onChange={e => setInquiry({ ...inquiry, phone: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-900 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={inquiry.email}
                        onChange={e => setInquiry({ ...inquiry, email: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-900 mb-1">Arrival / Pickup Date</label>
                      <input
                        type="date"
                        required
                        value={inquiry.arrivalDate}
                        onChange={e => setInquiry({ ...inquiry, arrivalDate: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-900 mb-1">Members</label>
                      <input
                        type="number"
                        min="1"
                        required
                        placeholder="No. of Members"
                        value={inquiry.members}
                        onChange={e => setInquiry({ ...inquiry, members: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-900 mb-1">Message</label>
                      <textarea
                        required
                        placeholder="Your message or requirements..."
                        rows={2}
                        value={inquiry.message}
                        onChange={e => setInquiry({ ...inquiry, message: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                      />
                    </div>
                    {inquiryError && (
                      <div className="text-red-600 text-xs font-medium mb-2">{inquiryError}</div>
                    )}
                    {inquirySuccess && (
                      <div className="text-green-600 text-xs font-medium mb-2">Inquiry sent successfully!</div>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-2 rounded-lg font-semibold shadow text-base transition-all duration-200 transform hover:scale-105"
                      disabled={inquirySuccess}
                    >
                      {inquirySuccess ? 'Sent!' : 'Send Inquiry'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* Contact Info */}
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <div className="bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col justify-center">
                <h3 className="text-base font-bold text-blue-900 mb-3">Need Help?</h3>
                <div className="space-y-2 ">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-blue-900 hover:text-blue-600 transition-colors text-lg font-medium"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-900 hover:text-blue-600 transition-colors text-xs font-medium break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                  {/* <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-900 text-xs font-medium">
                      {contact.address}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <Footer /> */}
  </>);
};

export default HotelDetailPage;