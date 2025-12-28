'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  text: string;
  avatar?: string;
  location?: string;
  tripType?: string;
  rating?: number; // 1-5
}

const staticTestimonials: Testimonial[] = [
  {
    name: 'Rohit Mehra',
    location: 'Mumbai',
    tripType: 'Family Trip',
    rating: 5,
    text:
      'From airport pickup to hotel check-ins, everything was smooth. Kids loved the beaches and the glass-bottom boat ride. Truly hassle-free!'
  },
  {
    name: 'Sneha Iyer',
    location: 'Bengaluru',
    tripType: 'Couple',
    rating: 5,
    text:
      'Sunsets at Radhanagar were magical. The team was super responsive and crafted a perfect romantic itinerary for us.'
  },
  {
    name: 'Aman Khanna',
    location: 'Delhi',
    tripType: 'Friends',
    rating: 4.5,
    text:
      'Great coordination for ferries and activities. Snorkeling at Elephant Beach was the highlight. Excellent value for money.'
  },
  {
    name: 'Pooja Desai',
    location: 'Ahmedabad',
    tripType: 'Solo',
    rating: 5,
    text:
      'Felt safe throughout and the guides were professional. Loved the nature trails and the serenity of the islands.'
  },
  {
    name: 'Arjun Nair',
    location: 'Kochi',
    tripType: 'Family Trip',
    rating: 4.8,
    text:
      'Neat hotels, on-time transfers, and friendly drivers. Kids still talk about the light & sound show at Cellular Jail!'
  },
  {
    name: 'Tanvi Joshi',
    location: 'Pune',
    tripType: 'Honeymoon',
    rating: 5,
    text:
      'Thoughtful surprises and perfectly paced days. It honestly exceeded our expectations. Highly recommended.'
  }
];

const getInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .filter(Boolean)
    .map(part => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('');
};

const StarRow = ({ rating = 5 }: { rating?: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center justify-center gap-0.5 mb-2" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f-${i}`} className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 13.347a1 1 0 00-1 0l-2.885 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.463a1 1 0 00.949-.69l1.07-3.292z" />
        </svg>
      ))}
      {half === 1 && (
        <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" stroke="currentColor" d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.163L12 18.896l-7.335 3.864 1.401-8.163L.132 9.21l8.2-1.192L12 .587z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e-${i}`} className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 13.347a1 1 0 00-1 0l-2.885 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.463a1 1 0 00.949-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<Testimonial[]>(staticTestimonials.slice(0, 4));
  const [, setLoading] = useState(false);//loading

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

  const buildUrl = useCallback((u?: string) => {
    if (!u) return '';
    if (u.startsWith('http')) return u;
    return `${API_BASE}${u.startsWith('/') ? u : `/${u}`}`;
  }, [API_BASE]);

  useEffect(() => {
    let mounted = true;
    const toObj = (v: unknown): Record<string, unknown> | null => (v && typeof v === 'object') ? v as Record<string, unknown> : null;
    const getKey = (o: unknown, k: string): unknown => (toObj(o)?.[k]);
    const asString = (v: unknown): string | undefined => typeof v === 'string' ? v : undefined;
    const pickString = (...vals: unknown[]): string | undefined => vals.find(v => typeof v === 'string') as string | undefined;
    const nestedUrl = (o: unknown): string | undefined => asString(getKey(o, 'url'));

    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const url = API_BASE ? `${API_BASE}/api/testimonials?populate=*` : '/api/testimonials';
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        // support array or { data: [...] } shapes
        let rawListUnknown: unknown = [];
        if (Array.isArray(data)) rawListUnknown = data;
        else if (data && typeof data === 'object') {
          const obj = data as Record<string, unknown>;
          rawListUnknown = (obj.data as unknown) ?? (obj.results as unknown) ?? [];
        }
        const rawList = Array.isArray(rawListUnknown) ? rawListUnknown : [];

        const apiList: Testimonial[] = rawList.map((r): Testimonial => {
          const rec = toObj(r) || {};
          const name = (asString(getKey(rec, 'name')) || asString(getKey(rec, 'title')) || 'Anonymous') as string;
          const text = (asString(getKey(rec, 'short_description')) || asString(getKey(rec, 'short_desc')) || asString(getKey(rec, 'description')) || asString(getKey(rec, 'text')) || '') as string;
          const photoUrl = pickString(
            nestedUrl(getKey(rec, 'photo')),
            nestedUrl(getKey(rec, 'avatar')),
            nestedUrl(getKey(rec, 'image')),
            asString(getKey(rec, 'photo')),
            asString(getKey(rec, 'avatar')),
            asString(getKey(rec, 'image')),
          );
          const location = pickString(getKey(rec, 'location'), getKey(rec, 'city'), getKey(rec, 'town')) || '';
          const rVal = getKey(rec, 'rating');
          const rating = typeof rVal === 'number' ? rVal : (typeof rVal === 'string' ? Number(rVal) : undefined);
          return { name, text, avatar: buildUrl(photoUrl), location, rating };
        }).filter(Boolean);

        if (!mounted) return;

        // Ensure at least 4 testimonials by appending static ones
        const combined = [...apiList];
        let idx = 0;
        while (combined.length < 4 && idx < staticTestimonials.length) {
          // avoid duplicates by name
          const candidate = staticTestimonials[idx];
          if (!combined.find(c => c.name === candidate.name)) combined.push(candidate);
          idx++;
        }

        setItems(combined.length > 0 ? combined : staticTestimonials.slice(0, 4));
      } catch (e: unknown) {
        console.error('Error fetching testimonials:', e);
        // on error, keep static testimonials
        setItems(staticTestimonials.slice(0, 4));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTestimonials();
    return () => { mounted = false; };
  }, [API_BASE, buildUrl]);

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0d2c4b] text-center mb-10">
          What Our Travelers Say
        </h2>

        <div className="relative">
          <button
            aria-label="Previous testimonials"
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white shadow border border-gray-200 items-center justify-center hover:bg-gray-50 active:scale-95 transition"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            aria-label="Next testimonials"
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white shadow border border-gray-200 items-center justify-center hover:bg-gray-50 active:scale-95 transition"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 pb-2
                       [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* hide scrollbar (webkit) */}
            <style>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            {items.map((t: Testimonial, i: number) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-[300px] md:w-[320px] bg-[#fcfcfc] rounded-xl shadow-lg p-6 flex flex-col items-center text-center
                           hover:-translate-y-1 hover:shadow-xl transition duration-300"
              >
                <div className="text-orange-500 text-3xl mb-3 opacity-80">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="relative w-20 h-20 mb-3">
                  {t.avatar ? (
                    <Image src={t.avatar} alt={t.name} fill sizes="80px" className="rounded-full object-cover border-4 border-white shadow" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold border-4 border-white shadow">
                      {getInitials(t.name)}
                    </div>
                  )}
                </div>
                <StarRow rating={t.rating} />
                <p className="text-[15px] leading-relaxed text-gray-600 italic mb-3">{t.text}</p>
                <h3 className="mt-auto font-semibold text-[#0d2c4b]">{t.name}</h3>
                {t.location || t.tripType ? (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {[t.location, t.tripType].filter(Boolean).join(' • ')}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Mobile arrow overlays */}
          <div className="flex md:hidden justify-between mt-6">
            <button
              onClick={() => scroll('left')}
              className="h-10 w-10 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="h-10 w-10 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;