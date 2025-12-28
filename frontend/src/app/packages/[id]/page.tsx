"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaCalendarAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/Contact';
import IncludedList from '@/components/package/IncludedList';
import useTravelStore from '../../../../store/travelStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// Helper function to build full image URL
const buildImageUrl = (url?: string) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
};

// Helper function to render star ratings
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <FaStar
      key={i}
      className={`${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
    />
  ));
}

function PackagePage() {
  const params = useParams();
  const paramValue: unknown = (params as Record<string, unknown>)?.id;
  const rawId = Array.isArray(paramValue) ? paramValue[0] : paramValue;
  const { singlePackage, fetchPackageById, loading, error } = useTravelStore();

  // Gallery state management
  const [activeImage, setActiveImage] = useState<number>(0);
  const [showGalleryModal, setShowGalleryModal] = useState<boolean>(false);

  // Inquiry form state management
  const [inquiry, setInquiry] = useState({ name: '', phone: '', email: '', members: '', message: '', arrivalDate: '' });
  const [inquiryError, setInquiryError] = useState<string>('');
  const [inquirySuccess, setInquirySuccess] = useState<boolean>(false);

  useEffect(() => {
    if (rawId) {
      fetchPackageById(rawId as string);
    }
  }, [rawId, fetchPackageById]);

  // Update browser title and meta description when package data loads
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const pkg = singlePackage as Record<string, unknown> | null;
    const title = pkg && typeof pkg['title'] === 'string' ? (pkg['title'] as string) : undefined;
    let short_description: string | undefined;
    const sdRaw = pkg ? pkg['short_description'] : undefined;
    if (typeof sdRaw === 'string') {
      short_description = sdRaw;
    } else if (Array.isArray(sdRaw)) {
      try {
        // fallback for rich text arrays
        short_description = JSON.stringify(sdRaw);
      } catch {
        short_description = String(sdRaw);
      }
    } else if (sdRaw != null) {
      short_description = String(sdRaw);
    }
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
  }, [singlePackage]);

  if (!rawId) {
    return <div className="p-8 text-center text-red-500">No id provided in route.</div>;
  }
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </>
    );
  }
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  if (!singlePackage) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">Package Not Found</h2>
            <p>The package you&apos;re looking for could not be found.</p>
            <Link href="/" className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-md">
              Return Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Extract package data
  const {
    title,
    short_description,
    duration,
    discount,
    price,
    original_price,
    rating,
    number_of_reviews,
    detailed_description,
    images,
    gallery = [],
    Whats_Included = [],
    itinerary = [],
    person,
  } = singlePackage;

  // Prepare gallery images
  const galleryImages = Array.isArray(gallery) ? gallery : [];
  const allImages = [images, ...galleryImages].filter(Boolean);

  // Get hero image URL
  const heroImageUrl = images?.formats?.large?.url ||
    images?.formats?.medium?.url ||
    images?.url ||
    '';
  //console.log('Package Data:', Whats_Included);
  const whatsIncluded = Array.isArray(Whats_Included) ? Whats_Included : [];
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="hidden md:flex absolute inset-0 w-full h-full 
        bg-[url('https://i.makeagif.com/media/8-22-2017/X6QU6S.gif')] bg-cover bg-center 
        ">
          <div className="w-[60%] h-full flex items-center justify-center">
            {/* IMAGE FRAME — rounded + overflow hidden clips the waves exactly to the image */}
            <div className="relative w-[90%] h-[85%] rounded-2xl overflow-hidden shadow-xl shadow-black/10 ring-1 ring-white/40 bg-white/30">

              {/* the image */}
              <Image
                src={buildImageUrl(heroImageUrl)}
                alt={title || "Package Hero Image"}
                fill
                priority
                sizes="60vw"
                className="object-contain"
              />

              {/* WAVES (stick to edges): use preserveAspectRatio='none' so they stretch to the side */}
              {/* Top wave */}
              <svg
                className="pointer-events-none absolute top-0 inset-x-0 h-8 w-full"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 C20,0 80,0 100,8"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity="0.65"
                />
              </svg>

              {/* Bottom wave */}
              <svg
                className="pointer-events-none absolute bottom-0 inset-x-0 h-8 w-full rotate-180"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 C20,0 80,0 100,8"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity="0.65"
                />
              </svg>

              {/* Left wave */}
              <svg
                className="pointer-events-none absolute left-0 inset-y-0 w-8 h-full -rotate-90"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 C20,0 80,0 100,8"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity="0.65"
                />
              </svg>

              {/* Right wave */}
              <svg
                className="pointer-events-none absolute right-0 inset-y-0 w-8 h-full rotate-90"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 C20,0 80,0 100,8"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity="0.65"
                />
              </svg>

              {/* subtle inner inset stroke for “designed” border feel */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
            </div>
          </div>


          {/* Text Right 40% */}
          <div className="w-[40%] h-full flex items-center justify-center p-10 ">
            <div className="text-white max-w-lg rounded-xl p-8" >
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">{title}</h1>
              <p className="text-base lg:text-lg mb-4">{short_description}</p>
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <FaCalendarAlt className="mr-2 text-yellow-400" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <FaMapMarkerAlt className="mr-2 text-yellow-400" />
                  <span>Andaman Islands</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="flex mr-1">{renderStars(rating)}</span>
                  <span>({number_of_reviews} reviews)</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <p className="text-sm">{person}</p>
                  <div className="flex items-center">
                    <span className="text-2xl lg:text-3xl font-bold">₹{price?.toLocaleString()}</span>
                    {original_price && original_price > price && (
                      <span className="ml-2 text-white line-through">₹{original_price?.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                {discount > 0 && (
                  <div className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center">
                    <MdLocalOffer className="mr-1" size={20} />
                    <span className="font-bold">{discount}% OFF</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Mobile: Full image with text overlay (unchanged) */}
        <div className="md:hidden absolute inset-0 z-10">
          <Image
            src={buildImageUrl(heroImageUrl)}
            alt={title || "Package Hero Image"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              <p className="text-sm mb-3 max-w-3xl">{short_description}</p>
              <div className="flex flex-wrap gap-2 items-center mb-2">
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <FaCalendarAlt className="mr-1 text-yellow-400" />
                  <span className="text-xs">{duration}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <FaMapMarkerAlt className="mr-1 text-yellow-400" />
                  <span className="text-xs">Andaman Islands</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="flex mr-1">{renderStars(rating)}</span>
                  <span className="text-xs">({number_of_reviews} reviews)</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-2">
                  {/* <p className="text-xs">Price per person</p> */}
                  <div className="flex items-center">
                    <span className="text-lg font-bold">₹{price?.toLocaleString()}</span>
                    {original_price && original_price > price && (
                      <span className="ml-1 text-gray-300 line-through text-xs">₹{original_price?.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                {discount > 0 && (
                  <div className="bg-red-600 text-white px-2 py-1 rounded-lg flex items-center ml-2">
                    <MdLocalOffer className="mr-1" size={16} />
                    <span className="font-bold text-xs">{discount}% OFF</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Itinerary section after hero */}
        <div className="md:hidden">
          {/* Itinerary Section */}
          {Array.isArray(itinerary) && itinerary.length > 0 && (
            <div className="mt-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">Itinerary</h2>
              <div className="space-y-6">
                {itinerary.map((day, index) => (
                  <div key={day.id} className="border-l-4 border-purple-600 pl-4 bg-white rounded-lg shadow p-3 mx-2">
                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      {day.Day || `Day ${index + 1}`}
                    </h3>
                    <p className="text-gray-700 text-sm mb-2 whitespace-pre-line font-light text-justify">
                      {day.description}
                    </p>
                    {day.photo && day.hotel_name && day.short_description && (
                      <div className="mt-3 flex items-center gap-3 bg-purple-50 rounded-lg p-2 shadow">
                        <div className="w-20 h-16 relative rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={day.photo.formats?.small?.url || day.photo.url}
                            alt={day.hotel_name}
                            fill
                            sizes="80px"
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-purple-700 text-sm mb-1">Accommodation</div>
                          <div className="font-bold text-gray-900 text-xs mb-1">{day.hotel_name}</div>
                          <div className="text-gray-700 text-xs">{day.short_description}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Whats Included Section - Mobile */}

        </div>
      </section>

      {/* Package Details Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                {/* Render detailed_description preserving newlines as line breaks */}
                <div className="text-gray-700 leading-relaxed font-light text-justify whitespace-pre-wrap">
                  {typeof detailed_description === 'string' ? (
                    detailed_description
                      .replace(/\\\\n/g, '\\n')
                      .replace(/\\n/g, '\n')
                      .split('\n')
                      .map((line, idx, arr) => (
                        <React.Fragment key={idx}>
                          {line}
                          {/* insert a <br/> after each newline occurrence; consecutive '\n' yield consecutive <br/>s */}
                          {idx < arr.length - 1 && <br />}
                        </React.Fragment>
                      ))
                  ) : (
                    String(detailed_description)
                  )}
                </div>
              </div>

              {/* What's Included Section - moved to IncludedList component */}
              {Array.isArray(whatsIncluded) && whatsIncluded.length > 0 && (
                <IncludedList items={whatsIncluded} />
              )}

              {/* Gallery Section */}

              {/* Itinerary Section - Using Real API Data */}
              {Array.isArray(itinerary) && itinerary.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
                  <div className="space-y-8">
                    {itinerary.map((day, index) => (
                      <div key={day.id} className="border-l-4 border-purple-600 pl-4">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {day.Day || `Day ${index + 1}`}
                        </h3>
                        <p className="text-gray-700 mt-2 whitespace-pre-line font-light text-justify">
                          {day.description}
                        </p>

                        {/* Accommodation block: show only if photo, hotel_name, and short_description exist */}
                        {day.photo && day.hotel_name && day.short_description && (
                          <div>
                            <div className="flex items-center mb-1">
                              <SiHomeassistantcommunitystore className="h-6 w-6 text-purple-700 mr-2" />
                              <span className="font-semibold text-purple-700 text-lg">Accommodation</span>
                            </div>
                            <div className="mt-6 flex flex-col md:flex-row items-start gap-4 bg-purple-50 rounded-lg p-4 shadow">

                              <div className="w-full md:w-48 h-32 relative rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={
                                    day.photo.formats?.medium?.url ||
                                    day.photo.formats?.small?.url ||
                                    day.photo.url
                                  }
                                  alt={day.hotel_name}
                                  fill
                                  sizes="200px"
                                  className="object-cover rounded"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-bold text-gray-900 text-base mb-1">{day.hotel_name}</div>
                                <div className="text-gray-700 text-sm">{day.short_description}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {allImages.slice(0, 8).map((img, index) => {
                    const imgUrl = img?.formats?.medium?.url || img?.formats?.small?.url || img?.url;
                    if (!imgUrl) return null;

                    return (
                      <div
                        key={index}
                        className="aspect-square relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
                        onClick={() => {
                          setActiveImage(index);
                          setShowGalleryModal(true);
                        }}
                      >
                        <Image
                          src={buildImageUrl(imgUrl)}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>

                {allImages.length > 8 && (
                  <button
                    className="mt-4 text-purple-600 font-medium flex items-center"
                    onClick={() => setShowGalleryModal(true)}
                  >
                    View all {allImages.length} photos
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar - Inquiry Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Enquire about this package</h3>
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
                          arrivalDate: inquiry.arrivalDate,
                          message: inquiry.message,
                          subject: title || 'Package Inquiry',
                          source: 'package-inquiry',
                          packageId: rawId,
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
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={inquiry.name}
                    onChange={e => setInquiry({ ...inquiry, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 "
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={inquiry.phone}
                    onChange={e => setInquiry({ ...inquiry, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 "
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={inquiry.email}
                    onChange={e => setInquiry({ ...inquiry, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">Arrival / Pickup Date</label>
                    <input
                      type="date"
                      placeholder="Arrival / Pickup Date"
                      value={inquiry.arrivalDate}
                      onChange={e => setInquiry({ ...inquiry, arrivalDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <input
                    type="number"
                    min="1"
                    placeholder="Members"
                    value={inquiry.members}
                    onChange={e => setInquiry({ ...inquiry, members: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <textarea
                    placeholder="Message"
                    value={inquiry.message}
                    onChange={e => setInquiry({ ...inquiry, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={2}
                    required
                  />
                  {inquiryError && <div className="text-red-600 text-xs font-medium">{inquiryError}</div>}
                  {inquirySuccess && <div className="text-green-600 text-xs font-medium">Inquiry sent successfully!</div>}
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-medium transition"
                    disabled={inquirySuccess}
                  >
                    {inquirySuccess ? 'Sent!' : 'Send Inquiry'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Gallery */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl">
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
              onClick={() => setShowGalleryModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-video">
              {allImages[activeImage] && (
                <Image
                  src={buildImageUrl(allImages[activeImage]?.formats?.large?.url || allImages[activeImage]?.url)}
                  alt={`Gallery image ${activeImage + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-white bg-opacity-20 p-2 rounded-full text-white"
                onClick={() => setActiveImage(prev => (prev - 1 + allImages.length) % allImages.length)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="text-white text-sm">
                {activeImage + 1} / {allImages.length}
              </div>

              <button
                className="bg-white bg-opacity-20 p-2 rounded-full text-white"
                onClick={() => setActiveImage(prev => (prev + 1) % allImages.length)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {allImages.map((img, index) => {
                const thumbUrl = img?.formats?.thumbnail?.url || img?.formats?.small?.url || img?.url;
                if (!thumbUrl) return null;

                return (
                  <div
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 cursor-pointer rounded overflow-hidden w-20 h-20 border-2 ${index === activeImage ? 'border-purple-500' : 'border-transparent'
                      }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={buildImageUrl(thumbUrl)}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <ContactSection />

    </>
  );
}

export default PackagePage;