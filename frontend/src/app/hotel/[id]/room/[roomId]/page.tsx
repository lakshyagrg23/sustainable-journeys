'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Star, MapPin, Phone, Mail, Users, Wifi, Car, Coffee, Tv, Bed, Wind, ArrowLeft
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const buildImageUrl = (url?: string) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
};

// ------- Types (keep flexible: some rooms may come in Strapi v4 "attributes" shape) ------
interface ImageType {
  id?: number;
  url?: string;
  formats?: {
    large?: { url?: string };
    medium?: { url?: string };
    small?: { url?: string };
    thumbnail?: { url?: string };
  };
}

interface AmenityObj {
  Amenities?: unknown; // can be null/string/whatever coming from CMS
}

interface RoomFlat {
  id: number;
  documentId?: string;
  name?: string;
  price?: number;
  original_price?: number;
  Occupancy?: number;
  category?: string;
  new_category?: string;
  description?: string;
  short_description?: string;
  Amenities?: Array<string | AmenityObj>;
  photo?: ImageType;
  gallery?: ImageType[];
}

type RoomApi = { id: number; attributes?: RoomFlat } | RoomFlat;

// -------- Amenity helpers (icon bucketing + safe string ops) --------
const toLower = (v: unknown) => (v ?? '').toString().toLowerCase();

const amenityBucket = (amenity: unknown): string => {
  const s = toLower(amenity);
  if (!s) return 'other';
  if (s.includes('wifi') || s.includes('wi-fi') || s.includes('internet')) return 'wifi';
  if (s.includes('tv') || s.includes('television') || s.includes('smart tv')) return 'tv';
  if (s.includes('ac') || s.includes('aircon') || s.includes('air conditioner') || s.includes('air ')) return 'ac';
  if (s.includes('parking') || s.includes('car') || s.includes('valet')) return 'parking';
  if (s.includes('coffee') || s.includes('tea') || s.includes('kettle') || s.includes('espresso') || (s.includes('mini') && s.includes('bar'))) return 'beverage';
  if (s.includes('balcony') || s.includes('view') || s.includes('sea') || s.includes('ocean')) return 'view';
  if (s.includes('pool') || s.includes('swim')) return 'pool';
  if (s.includes('fridge') || s.includes('refrigerator') || s.includes('mini fridge')) return 'fridge';
  if (s.includes('guest') || s.includes('person') || s.includes('occup')) return 'occupancy';
  return 'other';
};

const bucketIcon = (bucket: string) => {
  switch (bucket) {
    case 'wifi': return <Wifi className="w-4 h-4" />;
    case 'tv': return <Tv className="w-4 h-4" />;
    case 'ac': return <Wind className="w-4 h-4" />;
    case 'parking': return <Car className="w-4 h-4" />;
    case 'beverage': return <Coffee className="w-4 h-4" />;
    case 'view': return <MapPin className="w-4 h-4" />;
    case 'pool': return <Star className="w-4 h-4" />;
    case 'fridge': return <Star className="w-4 h-4" />;
    case 'occupancy': return <Users className="w-4 h-4" />;
    default: return <Star className="w-4 h-4" />;
  }
};

const RoomDetailPage = () => {
  const params = useParams();
  const hotelId = (params?.id as string) ?? '';
  const roomId = (params?.roomId as string) ?? '';

  const [room, setRoom] = useState<RoomFlat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Inquiry form
  const [inquiry, setInquiry] = useState({
    name: '', phone: '', email: '', members: '', message: '', arrivalDate: ''
  });
  const [inquiryError, setInquiryError] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // -------- Fetch, normalizing both Strapi direct and attributes shapes -------
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);

        // 1) Try by ID
        let res = await fetch(`${API_BASE_URL}/api/hotel-rooms/${encodeURIComponent(roomId)}?populate=*`);

        // 2) If not found, try by documentId eq
        if (!res.ok) {
          const q = encodeURIComponent(`filters[documentId][$eq]=${roomId}&populate=*`);
          res = await fetch(`${API_BASE_URL}/api/hotel-rooms?${q}`);
        }
        if (!res.ok) throw new Error('Failed to fetch room details');

        const json = await res.json();

        let item: RoomApi | undefined;
        if (Array.isArray(json?.data)) item = json.data[0];
        else item = json?.data;

        if (!item) throw new Error('Room not found');

        // Normalize safely: detect Strapi wrapper shape { id, attributes }
        const hasAttributes = (v: unknown): v is { id: number; attributes: RoomFlat } => {
          return typeof v === 'object' && v !== null && 'attributes' in (v as Record<string, unknown>);
        };

        let normalized: RoomFlat;
        if (hasAttributes(item) && item.attributes) {
          // exclude any `id` present in attributes to avoid duplicate key
          const attrsObj = item.attributes as RoomFlat;
          const { ...restAttrs } = attrsObj; //id: _skipId
          // build object first, then set id to avoid duplicate-key literal error
          normalized = { ...(restAttrs as Omit<RoomFlat, 'id'>) } as RoomFlat;
          normalized.id = item.id;
        } else {
          normalized = item as RoomFlat;
        }

        setRoom(normalized);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    if (roomId) fetchRoom();
  }, [roomId]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !inquiry.name.trim() || !inquiry.phone.trim() || !inquiry.email.trim() ||
      !inquiry.members.trim() || !inquiry.message.trim() || !inquiry.arrivalDate.trim()
    ) {
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
          subject: `Room Inquiry - ${room?.name ?? ''}`,
          source: 'room-inquiry',
          hotelId, roomId,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to send inquiry.');
      }

      setInquirySuccess(true);
      setInquiry({ name: '', phone: '', email: '', members: '', message: '', arrivalDate: '' });
    } catch (err) {
      setInquiryError(err instanceof Error ? err.message : 'Failed to send inquiry.');
      setInquirySuccess(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !room) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-red-500 mb-4">{error || 'Room not found'}</p>
            <Link href={`/hotel/${hotelId}`} className="text-blue-600 hover:text-blue-700 font-medium">
              Back to Hotel
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ------- Images (safe) -------
  const images = [
    ...(room.photo?.url || room.photo?.formats?.large?.url
      ? [buildImageUrl(room.photo.formats?.large?.url || room.photo.url)]
      : []),
    ...((room.gallery ?? []).map(img => buildImageUrl(img.formats?.large?.url || img.url || '')).filter(Boolean))
  ];
  const hasImages = images.length > 0;

  const nextImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };
  const prevImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  // ------- Amenities (robust + no repeating icons) -------
  // Raw list (coerce to string; drop empties)
  const rawAmenitiesList: string[] = Array.isArray(room.Amenities)
    ? room.Amenities
      .map(a => {
        if (typeof a === 'string') return a;
        const val = (a as AmenityObj)?.Amenities;
        return (val ?? '').toString();
      })
      .map(s => s.trim())
      .filter(s => !!s)
    : [];

  // Common ones we already show as permanent boxes
  const commonMatchers = ['tv', 'television', 'smart tv', 'wifi', 'wi-fi', 'internet', 'ac', 'air', 'aircon', 'bed', 'breakfast'];
  const isCommonAmenity = (s: string) => {
    const key = toLower(s);
    return commonMatchers.some(m => key.includes(m));
  };

  // Deduplicate by *text* and also deduplicate by *icon bucket* so icons don't repeat.
  const seenTexts = new Set<string>();        // prevents duplicate strings
  const seenBuckets = new Set<string>();      // prevents duplicate icons

  const dynamicAmenities: Array<{ text: string; bucket: string }> = [];
  for (const a of rawAmenitiesList) {
    const trimmed = a.trim();
    if (!trimmed) continue;
    if (isCommonAmenity(trimmed)) continue;

    const low = toLower(trimmed);
    if (seenTexts.has(low)) continue;

    const bucket = amenityBucket(trimmed);
    if (seenBuckets.has(bucket)) continue;    // <<< ensures same icon not repeated

    seenTexts.add(low);
    seenBuckets.add(bucket);
    dynamicAmenities.push({ text: trimmed, bucket });
  }

  const price = Number(room.price) || 0;
  const originalPrice = Number(room.original_price) || 0;

  return (
    <>
      <Navbar />

      {/* Back */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/hotel/${hotelId}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hotel
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        {hasImages && (
          <>
            <Image
              src={images[currentImageIndex] || '/placeholder.svg'}
              alt={room.name || 'Room'}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ArrowLeft className="w-6 h-6 rotate-180" />
                </button>
              </>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{room.name || 'Room'}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  {room.Occupancy ? (
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>Up to {room.Occupancy} guests</span>
                    </div>
                  ) : null}
                  {(room.new_category || room.category) && (
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {room.new_category || room.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </>
        )}
      </section>

      {/* Main */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Details */}
            <div className="lg:col-span-2">
              {/* Price / basic */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{room.name || 'Room'}</h2>
                    {(room.new_category || room.category) && (
                      <p className="text-gray-600">{room.new_category || room.category}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">₹{price ? price.toLocaleString() : '—'}</div>
                    {originalPrice > price && (
                      <div className="text-lg text-gray-400 line-through">₹{originalPrice.toLocaleString()}</div>
                    )}
                  </div>
                </div>

                {room.Occupancy ? (
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>Up to {room.Occupancy} guests</span>
                    </div>
                  </div>

                ) : null}


                {/* Short description in hero (truncated) */}
                {room.short_description && (
                  <div className="text-black text-sm leading-relaxed mt-3 max-w-3xl">
                    <p className='line-clamp-3'>{room.short_description}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {room.description && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About This Room</h3>
                  <p className="text-gray-700 leading-relaxed">{room.description}</p>
                </div>
              )}

              {/* Amenities */}
              {Array.isArray(room.Amenities) && room.Amenities.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Room Amenities</h3>

                  {/* Common amenity boxes */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600"><Tv className="w-5 h-5" /></div>
                      <span className="text-gray-700 font-medium">TV</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600"><Bed className="w-5 h-5" /></div>
                      <span className="text-gray-700 font-medium">Bed</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600"><Coffee className="w-5 h-5" /></div>
                      <span className="text-gray-700 font-medium">Breakfast</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600"><Wifi className="w-5 h-5" /></div>
                      <span className="text-gray-700 font-medium">Wi-Fi</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600"><Wind className="w-5 h-5" /></div>
                      <span className="text-gray-700 font-medium">AC</span>
                    </div>
                  </div>

                  {/* Dynamic amenities (deduped by text + icon bucket) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {dynamicAmenities.length > 0 ? (
                      dynamicAmenities.map(({ text, bucket }, idx) => (
                        <div key={`${bucket}-${idx}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="text-blue-600">{bucketIcon(bucket)}</div>
                          <span className="text-gray-700 font-medium">{text}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500">No additional amenities listed.</div>
                    )}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {images.length > 1 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <Image
                          src={image || '/placeholder.svg'}
                          alt={`${room.name ?? 'Room'} ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Book This Room</h3>

                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-gray-500">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={inquiry.name}
                        onChange={e => setInquiry({ ...inquiry, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="Your Phone Number"
                        value={inquiry.phone}
                        onChange={e => setInquiry({ ...inquiry, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={inquiry.email}
                        onChange={e => setInquiry({ ...inquiry, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Arrival / Pickup Date</label>
                      <input
                        type="date"
                        required
                        value={inquiry.arrivalDate}
                        onChange={e => setInquiry({ ...inquiry, arrivalDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                      <input
                        type="number"
                        min={1}
                        max={room.Occupancy ?? 99}
                        required
                        placeholder="Number of guests"
                        value={inquiry.members}
                        onChange={e => setInquiry({ ...inquiry, members: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        required
                        placeholder="Special requests or questions..."
                        rows={3}
                        value={inquiry.message}
                        onChange={e => setInquiry({ ...inquiry, message: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {inquiryError && <div className="text-red-600 text-sm font-medium">{inquiryError}</div>}
                    {inquirySuccess && <div className="text-green-600 text-sm font-medium">Inquiry sent successfully!</div>}

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                      disabled={inquirySuccess}
                    >
                      {inquirySuccess ? 'Sent!' : 'Send Inquiry'}
                    </button>
                  </form>

                  {/* Contact info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <a href="tel:+918944999448" className="text-blue-600 hover:text-blue-700">
                          +91 8944999448
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <a href="mailto:info@saarthiandaman.com" className="text-blue-600 hover:text-blue-700">
                          info@saarthiandaman.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default RoomDetailPage;
