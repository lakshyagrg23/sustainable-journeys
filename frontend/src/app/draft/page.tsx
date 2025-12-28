'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock, Search, Eye } from 'lucide-react';

type Mode = 'solo' | 'couple' | 'family' | 'group';
type ActivityType = 'adventure' | 'water' | 'beach' | 'tour' | 'sightseeing';

interface DraftActivity {
  id: number;
  title: string;
  short: string;
  location: string;
  duration?: string;
  price?: number;
  type: ActivityType;
  mode: Mode[];
  image: string;
}

const DUMMY_ACTIVITIES: DraftActivity[] = [
  {
    id: 1,
    title: 'Scuba Diving at Havelock',
    short: 'Explore vibrant coral reefs with certified instructors.',
    location: 'Havelock Island',
    duration: '2-3 hrs',
    price: 3500,
    type: 'water',
    mode: ['solo', 'couple', 'group'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1826&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Radhanagar Beach Sunset',
    short: 'Unwind at Asia’s best beach with a stunning sunset.',
    location: 'Havelock Island',
    duration: '1-2 hrs',
    price: 0,
    type: 'beach',
    mode: ['family', 'couple', 'group'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1887&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Port Blair City Tour',
    short: 'Cellular Jail, Corbyn’s Cove, and local markets.',
    location: 'Port Blair',
    duration: '5-6 hrs',
    price: 1800,
    type: 'tour',
    mode: ['family', 'group', 'couple'],
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Snorkeling at North Bay',
    short: 'Beginner-friendly snorkeling with rich marine life.',
    location: 'Port Blair',
    duration: '2 hrs',
    price: 1200,
    type: 'water',
    mode: ['solo', 'family'],
    image: 'https://images.unsplash.com/photo-1505739694013-c243bfcf7088?q=80&w=1935&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Baratang Limestone Caves',
    short: 'Mangrove creeks, mud volcano and limestone caves.',
    location: 'Baratang',
    duration: '8-9 hrs',
    price: 3500,
    type: 'sightseeing',
    mode: ['group', 'family'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Kayaking in Havelock Mangroves',
    short: 'Guided night and sunrise kayaking through mangroves.',
    location: 'Havelock Island',
    duration: '2 hrs',
    price: 2200,
    type: 'adventure',
    mode: ['solo', 'couple'],
    image: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1974&auto=format&fit=crop'
  }
];

// const locations = ['All', 'Havelock Island', 'Port Blair', 'Baratang'];
const types: { value: ActivityType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'water', label: 'Water Sports' },
  { value: 'beach', label: 'Beach' },
  { value: 'tour', label: 'Tours' },
  { value: 'sightseeing', label: 'Sightseeing' }
];
const modes: { value: Mode; label: string }[] = [
  { value: 'solo', label: 'Solo' },
  { value: 'couple', label: 'Couple' },
  { value: 'family', label: 'Family' },
  { value: 'group', label: 'Group' }
];

export default function DraftActivitiesPage() {
  // Select one specific activity as the details subject (e.g., Scuba Diving)
  const primary = DUMMY_ACTIVITIES[0];

  // Related activities are scoped to same location (location-wise)
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<ActivityType | 'all'>('all');
  const [selectedModes, setSelectedModes] = useState<Mode[]>([]);
  const [sort, setSort] = useState<'popular' | 'price-low' | 'price-high' | 'name'>('popular');


  const relatedBase = useMemo(() => DUMMY_ACTIVITIES.filter((a) => a.id !== primary.id && a.location === primary.location), [primary.id, primary.location]);

  const filtered = useMemo(() => {
    const list = relatedBase.filter((a) => {
      const matchType = selectedType === 'all' || a.type === selectedType;
      const matchMode = selectedModes.length === 0 || selectedModes.some((m) => a.mode.includes(m));
      const terms = search.trim().toLowerCase();
      const matchSearch = !terms || a.title.toLowerCase().includes(terms) || a.short.toLowerCase().includes(terms);
      return matchType && matchMode && matchSearch;
    });

    return list.sort((a, b) => {
      if (sort === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sort === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sort === 'name') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [search, selectedType, selectedModes, sort, relatedBase]);

  const toggleMode = (m: Mode) => {
    setSelectedModes((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  };

  return (
    <>
      <Navbar />

      {/* Activity Details Hero */}
      <div className="relative w-full overflow-hidden">
        <div className="relative h-[44vh] md:h-[52vh]">
          <Image
            src={primary.image}
            alt={primary.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          <div className="relative z-10 h-full flex flex-col justify-end text-white px-4 pb-6">
            <div className="max-w-5xl mx-auto w-full">
              <p className="text-xs md:text-sm opacity-80">{primary.location}</p>
              <h1 className="text-2xl md:text-4xl font-extrabold drop-shadow mt-1">{primary.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/90">{primary.type}</span>
                {primary.mode.map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/90 text-gray-900">{m}</span>
                ))}
                {typeof primary.price === 'number' && (
                  <span className="ml-auto bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold text-xs">{primary.price > 0 ? `₹${primary.price}` : 'Free'}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left: Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Overview</h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {primary.short} Dive into crystal-clear waters and witness vibrant coral reefs and diverse marine life. This
                  experience is ideal for beginners and enthusiasts alike with safety-first guidance.
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center text-sm text-gray-700"><MapPin className="w-4 h-4 mr-2 text-blue-600" /> {primary.location}</div>
                  {primary.duration && (
                    <div className="flex items-center text-sm text-gray-700"><Clock className="w-4 h-4 mr-2 text-blue-600" /> {primary.duration}</div>
                  )}
                </div>

                {/* Highlights */}
                <div className="mt-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Highlights</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>Professional instructors and brief training</li>
                    <li>Underwater photos/videos available</li>
                    <li>Safety equipment included</li>
                    <li>Best visibility during early mornings</li>
                  </ul>
                </div>

                {/* Includes */}
                <div className="mt-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">What’s Included</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Equipment', 'Guide', 'Safety Gear', 'Drinking Water'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm sticky top-4">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-extrabold text-gray-900">{typeof primary.price === 'number' && primary.price > 0 ? `₹${primary.price}` : 'On request'}</span>
                  {typeof primary.price === 'number' && primary.price > 0 && <span className="text-xs text-gray-500">per person</span>}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm">Book Now</button>
                <button className="w-full mt-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-lg font-semibold text-sm">Enquire</button>

                <div className="mt-4 text-xs text-gray-600">
                  Free cancellation up to 24 hours before the experience starts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Activities (Location-wise) */}
      <div className="bg-gray-50 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">More in {primary.location}</h2>
            <p className="text-sm text-gray-600">Filter by type and mode. Location fixed to this activity.</p>
          </div>

          <div className="bg-white rounded-xl shadow p-3 md:p-4 mb-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search related activities..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <div className="px-2.5 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200">
                  Location: <span className="font-semibold">{primary.location}</span>
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as ActivityType | 'all')}
                  className="px-2.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 min-w-[150px]"
                >
                  {types.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="px-2.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 min-w-[140px]"
                >
                  <option value="popular">Popular</option>
                  <option value="price-low">Price: Low</option>
                  <option value="price-high">Price: High</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Mobile extra controls */}
            <div className="lg:hidden grid grid-cols-2 gap-2 mt-3">
              <div className="px-2.5 py-2 text-xs text-gray-700 bg-gray-50 rounded-lg border border-gray-200">Location: <span className="font-semibold">{primary.location}</span></div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ActivityType | 'all')}
                className="px-2.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                {types.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="px-2.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 col-span-2"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          <div className="mb-4 flex gap-2 flex-wrap">
            {modes.map((m) => (
              <button
                key={m.value}
                onClick={() => toggleMode(m.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${selectedModes.includes(m.value) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filtered.map((a) => (
                <div key={a.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-44 md:h-52 overflow-hidden">
                    <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    {typeof a.price === 'number' && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold text-xs">{a.price > 0 ? `₹${a.price}` : 'Free'}</div>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1.5 line-clamp-2">{a.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">{a.short}</p>
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center text-xs text-gray-500"><MapPin className="w-3 h-3 mr-1.5" /><span className="truncate">{a.location}</span></div>
                      {a.duration && (
                        <div className="flex items-center text-xs text-gray-500"><Clock className="w-3 h-3 mr-1.5" /><span>{a.duration}</span></div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700">{a.type}</span>
                        {a.mode.map((m) => (
                          <span key={m} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700">{m}</span>
                        ))}
                      </div>
                      <Link href="#" className="px-2.5 md:px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1">
                        <Eye className="w-3 h-3" /> View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">No related activities</h3>
              <p className="text-sm text-gray-600 mb-3">Try changing type or mode filters</p>
              <button
                onClick={() => { setSearch(''); setSelectedType('all'); setSelectedModes([]); setSort('popular'); }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}


