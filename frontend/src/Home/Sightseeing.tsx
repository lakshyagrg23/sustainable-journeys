import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const sightseeingData = [
  {
    id: 1,
    title: 'Cellular Jail',
    description: 'A historic colonial prison and now a national memorial, famous for its light and sound show.',
    image: '/map/andamanmap.jpg',
    location: 'Port Blair',
  },
  {
    id: 2,
    title: 'Radhanagar Beach',
    description: 'One of Asia’s best beaches, known for its white sand and turquoise waters.',
    image: '/map/Sarthi.png',
    location: 'Havelock Island',
  },
  {
    id: 3,
    title: 'Ross Island',
    description: 'Ruins of the British administrative headquarters, now a scenic island with deer and peacocks.',
    image: '/globe.svg',
    location: 'Near Port Blair',
  },
  {
    id: 4,
    title: 'Chidiya Tapu',
    description: 'A birdwatcher’s paradise with beautiful sunset views.',
    image: '/window.svg',
    location: 'South Andaman',
  },
  {
    id: 5,
    title: 'Chidiya Tapu',
    description: 'A birdwatcher’s paradise with beautiful sunset views.',
    image: '/window.svg',
    location: 'South Andaman',
  },
];


function Sightseeing() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // Responsive: 4 cards desktop, 1 card mobile
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
  }, []);

  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = 320; // px
    const gap = 16; // px
    const amount = (cardWidth + gap) * getCardsToShow();
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-2 px-4 sm:px-6 lg:px-8" aria-label="Sightseeing Spots">
      <div className="mb-3">
        <h2 className="m-0 text-xl font-bold text-center text-black">Sightseeing</h2>
      </div>

      {/* Left Arrow */}
      <button
        aria-label="Scroll left"
        onClick={() => scrollByAmount('left')}
        disabled={!canLeft}
        className={[
          'absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-gray-200 shadow',
          'flex items-center justify-center transition',
          canLeft
            ? 'bg-white text-gray-900 hover:bg-gray-50 cursor-pointer'
            : 'bg-gray-50 text-gray-400 cursor-default',
        ].join(' ')}
        style={{ display: 'block' }}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        aria-label="Scroll right"
        onClick={() => scrollByAmount('right')}
        disabled={!canRight}
        className={[
          'absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-gray-200 shadow',
          'flex items-center justify-center transition',
          canRight
            ? 'bg-white text-gray-900 hover:bg-gray-50 cursor-pointer'
            : 'bg-gray-50 text-gray-400 cursor-default',
        ].join(' ')}
        style={{ display: 'block' }}
      >
        ›
      </button>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="overflow-x-auto flex gap-4 pb-2 scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {sightseeingData.map((spot) => (
          <article
            key={spot.id}
            className="min-w-[320px] max-w-[320px] rounded-xl border border-gray-200 bg-white shadow overflow-hidden flex flex-col transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative w-full aspect-square bg-white">
              <Image
                src={spot.image}
                alt={spot.title}
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-cover p-2"
                unoptimized
                priority={false}
              />
            </div>
            <div className="p-3 flex flex-col gap-1.5">
              <h3 className="m-0 text-base font-bold text-gray-900 leading-tight">
                {spot.title}
              </h3>
              <p className="m-0 text-sm text-gray-700 leading-snug line-clamp-3">
                {spot.description}
              </p>
              <span className="mt-1.5 text-xs text-gray-500">{spot.location}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Sightseeing;