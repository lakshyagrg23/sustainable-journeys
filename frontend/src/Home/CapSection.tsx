// CapSection.tsx
'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCapStore from '../../store/capStore';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
const buildAssetUrl = (u?: string) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  return `${API_BASE_URL}${u.startsWith('/') ? u : '/' + u}`;
};

// Types for Cap entities from API
interface ImageFormat { url: string }
interface MediaFormats { small?: ImageFormat; thumbnail?: ImageFormat }
interface MediaAttributes { url?: string; formats?: MediaFormats }
interface MediaDirect { url?: string; formats?: MediaFormats; data?: { attributes?: MediaAttributes } }
interface CapEntity {
  id?: number;
  name?: string;
  price?: number;
  seats?: number;
  short_description?: string;
  photo?: MediaDirect;
}

const CapSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { caps, loading, error, fetchCaps } = useCapStore();

  useEffect(() => {
    if (!caps || caps.length === 0) {
      fetchCaps();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizedCabs = useMemo(() => {
    const list = Array.isArray(caps) ? (caps as CapEntity[]) : [];
    return list.map((item: CapEntity) => {
      const name = item?.name || 'Cab';
      const price = item?.price ?? null;
      const seats = item?.seats ?? null;
      const shortDesc = item?.short_description || '';
      const photo = item?.photo as MediaDirect | undefined;
      const photoAttr = photo?.data?.attributes || (photo as MediaAttributes | undefined);
      const imgRaw = photoAttr?.formats?.small?.url || photoAttr?.url || '';
      return {
        id: item?.id || name,
        name,
        image: buildAssetUrl(imgRaw),
        seats,
        price,
        short_description: shortDesc,
      };
    });
  }, [caps]);

  console.log('Final normalized cabs:', normalizedCabs);

  const totalSlides = normalizedCabs.length;
  const nextSlide = () => setCurrentSlide(p => (p + 1) % Math.max(totalSlides, 1));
  const prevSlide = () => setCurrentSlide(p => (p - 1 + Math.max(totalSlides, 1)) % Math.max(totalSlides, 1));
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const getVisibleCards = () => {
    if (isMobile) {
      return totalSlides > 0 ? [normalizedCabs[currentSlide]] : [];
    }
    const num = Math.min(2, totalSlides);
    return Array.from({ length: num }, (_, i) => normalizedCabs[(currentSlide + i) % totalSlides]);
  };

  const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
    <Image width={300} height={200} src={src || '/api/placeholder/300/200'} alt={alt} className="w-full h-full object-cover rounded-xl" loading="lazy" />
  );

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🚕 Cab Booking</h2>
          <p className="text-gray-600">Comfortable, affordable rides with transparent pricing.</p>
        </div>

        {loading && (
          <div className="text-center py-8 text-gray-500">Loading cabs...</div>
        )}
        {error && !loading && (
          <div className="text-center py-8 text-red-500">{String(error)}</div>
        )}

        {!loading && totalSlides > 0 ? (
          <div className="relative">
            {totalSlides > (isMobile ? 1 : 2) && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-500 hover:text-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-300 group"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-500 hover:text-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-300 group"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            <div className={isMobile ? 'mx-2' : 'mx-8'}>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
                {getVisibleCards().map((cab) => (
                  <div key={cab.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="flex flex-col sm:flex-row h-auto sm:h-56">
                      <div className="relative w-full sm:w-2/5 h-40 sm:h-full">
                        <ImageBlock src={cab.image} alt={cab.name} />
                        {cab.seats ? (
                          <div className="absolute top-3 left-3">
                            <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">{cab.seats} Seats</div>
                          </div>
                        ) : null}
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{cab.name}</h3>
                          {cab.short_description && (
                            <div className="text-sm text-gray-600 mb-2 line-clamp-2">{cab.short_description}</div>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-700 font-semibold">
                            {cab.price ? `₹${Number(cab.price).toLocaleString()}` : 'Contact for Price'}
                          </span>
                          <Link href='/cab ' className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 whitespace-nowrap">View</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {totalSlides > (isMobile ? 1 : 2) && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(totalSlides / (isMobile ? 1 : 2)) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index * (isMobile ? 1 : 2))}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentSlide / (isMobile ? 1 : 2)) === index ? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : !loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🚕</div>
            <h3 className="text-xl text-gray-600 mb-2">No cabs found</h3>
            <p className="text-gray-500">Please add cabs in the dashboard.</p>
          </div>
        ) : null}
        <div className="text-center mt-8">
          <Link href="/cab" className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-300">View All Cabs<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </section>
  );
};

export default CapSection;
