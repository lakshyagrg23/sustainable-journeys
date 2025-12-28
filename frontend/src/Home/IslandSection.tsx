import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define a type for island data
interface IslandCard {
  id: number;
  name: string;
  image: string;
  url: string;
  description?: string;
  highlights?: string[];
  bestTime?: string;
  activities?: string[];
  rating?: number;
}

const IslandSection = () => {
  // Memoize the islands array so its reference is stable
  const islands = React.useMemo<IslandCard[]>(() => [
    {
      id: 1,
      name: 'Port Blair',
      image: '/island/island1.jpg',
      url: '/islands/port-blair',
      description: 'Capital of the Andamans: heritage, museums, waterfronts, and island gateways.',
      bestTime: 'Oct–Apr',
      highlights: ['Cellular Jail', 'Ross Island', 'Jolly Buoy'],
      activities: ['History tours', 'Snorkeling', 'City walks'],
      rating: 4.7,
    },
    {
      id: 2,
      name: 'Havelock',
      image: '/island/island2.webp',
      url: '/islands/havelock',
      description: 'Laid‑back island vibes with Radhanagar sunsets, turquoise lagoons, and soft sands.',
      bestTime: 'Oct–Apr',
      highlights: ['Radhanagar Beach', 'Elephant Beach', 'Kalapathar'],
      activities: ['Scuba diving', 'Snorkeling', 'Sunset views'],
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Neil Island',
      image: '/island/neil.jpeg',
      url: '/islands/neil',
      description: 'Small, tranquil island known for clear waters, natural rock formations and relaxed beaches.',
      bestTime: 'Oct–Apr',
      highlights: ['Bharatpur Beach', 'Natural rock formations', 'Lighthouse views'],
      activities: ['Snorkeling', 'Beach walks', 'Cycling'],
      rating: 4.6,
    },
    {
      id: 4,
      name: 'Barren Island',
      image: '/island/Barren3.jpeg',
      url: '/islands/barren-island',
      description: "India's only active volcano — remote, rugged and dramatic volcanic landscape (access restricted; permits required).",
      bestTime: 'Nov–Mar',
      highlights: ['Volcanic terrain', 'Boat approach', 'Unique geology'],
      activities: ['Boat expedition', 'Wildlife spotting (from a distance)'],
      rating: 4.3,
    },
    {
      id: 5,
      name: 'Baratang',
      image: '/island/island4.jpg',
      url: '/islands/baratang',
      description: 'Limestone caves, mud volcano, and mangrove creeks—raw island nature.',
      bestTime: 'Nov–Mar',
      highlights: ['Limestone Caves', 'Mud Volcano', 'Parrot Island'],
      activities: ['Mangrove boat rides', 'Nature walks'],
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Diglipur',
      image: '/island/island5.jpg',
      url: '/islands/diglipur',
      description: 'Twin sandbar of Ross & Smith, hill treks to Saddle Peak, and quiet beaches.',
      bestTime: 'Nov–Apr',
      highlights: ['Ross & Smith', 'Saddle Peak', 'Kalipur'],
      activities: ['Trekking', 'Swimming', 'Island hopping'],
      rating: 4.8,
    },

  ], []);

  // Keep only the 6 Navbar islands in a specific order
  const navbarIslands = React.useMemo(() => [
    'Port Blair',
    'Havelock',
    'Neil Island',
    'Barren Island',
    'Baratang',
    'Diglipur',
  ], []);

  const selectedIslands = React.useMemo(() => {
    const byName = new Map(islands.map(i => [i.name.toLowerCase(), i]));
    const ordered = navbarIslands
      .map(n => byName.get(n.toLowerCase()))
      .filter(Boolean) as IslandCard[];
    return ordered.slice(0, 6);
  }, [islands, navbarIslands]);

  // Slider logic (like Sightseeing)
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }
    return 4;
  };

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateArrows();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [islands]);

  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = 320; // px
    const gap = 16; // px
    const amount = (cardWidth + gap) * getCardsToShow();
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10 text-center">🏝️ Most visited Islands</h2>

        {/* Left Arrow */}
        <button
          aria-label="Scroll left"
          onClick={() => scrollByAmount('left')}
          disabled={!canLeft}
          className={[
            'absolute left-2 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-gray-200 shadow-lg text-black',
            'flex items-center justify-center transition text-3xl',
            !canLeft ? 'opacity-50 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-gray-50 cursor-pointer',
          ].join(' ')}
          style={{ display: 'block', pointerEvents: canLeft ? 'auto' : 'none' }}
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          aria-label="Scroll right"
          onClick={() => scrollByAmount('right')}
          disabled={!canRight}
          className={[
            'absolute right-2 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-gray-200 shadow-lg text-black',
            'flex items-center justify-center transition text-3xl',
            !canRight ? 'opacity-50 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-gray-50 cursor-pointer',
          ].join(' ')}
          style={{ display: 'block', pointerEvents: canRight ? 'auto' : 'none' }}
        >
          ›
        </button>

        {/* Slider */}
        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          className="overflow-x-auto flex gap-4 pb-2 scroll-smooth relative"
          style={{
            scrollBehavior: 'smooth',
            maxWidth: '100%',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            width: '100%',
            justifyContent: 'flex-start',
            boxSizing: 'border-box',
          }}
        >
          {(selectedIslands as IslandCard[]).map((island: IslandCard) => (
            <article
              key={island.id}
              className="min-w-[320px] max-w-[320px] rounded-2xl border border-gray-100 bg-white shadow-md overflow-hidden flex flex-col transition hover:-translate-y-1 hover:shadow-xl"
              style={{ height: 'auto', minHeight: 420, maxHeight: 520, display: 'flex', flexDirection: 'column' }}
            >
              <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100" style={{ minHeight: 200, maxHeight: 250 }}>
                <Image
                  width={400}
                  height={300}
                  src={island.image}
                  alt={island.name}
                  className="object-cover p-2 rounded-xl"
                  style={{ height: '100%' }}
                  unoptimized
                  priority={false}
                />
                {typeof island.rating === 'number' && (
                  <div className="absolute top-3 right-3 bg-orange-500/90 backdrop-blur text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                    ⭐ {island.rating}
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between p-5" style={{ flexBasis: '40%', minHeight: 180, maxHeight: 260 }}>
                <div>
                  <h4 className="text-lg font-extrabold text-blue-800 mb-1 line-clamp-1 tracking-tight">{island.name}</h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-3" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{island.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(island.highlights?.slice(0, 3) || []).map((h: string, i: number) => (
                      <span key={i} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-full">{h}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(island.activities?.slice(0, 3) || []).map((a: string, i: number) => (
                      <span key={i} className="bg-orange-50 text-orange-600 text-[10px] px-2 py-0.5 rounded-full">{a}</span>
                    ))}
                  </div>
                  {island.bestTime && <div className="text-xs text-blue-600 mb-1">Best Time: <span className="font-semibold">{island.bestTime}</span></div>}
                </div>
                <Link href={island.url} className="mt-3 inline-block bg-blue-600 hover:bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-center shadow-sm">
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IslandSection;
