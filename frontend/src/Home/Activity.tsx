'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useActivityStore from '../../store/activityStore';


// interface ApiRichTextNode {
//   type: string;
//   children?: { type: string; text: string }[];
// }

interface ApiImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ApiImage {
  url: string;
  formats?: {
    thumbnail?: ApiImageFormat;
    small?: ApiImageFormat;
    medium?: ApiImageFormat;
    large?: ApiImageFormat;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Add small type-guards to avoid any
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const getAttrFromActivity = (raw: unknown): {
  documentId?: string;
  title?: string;
  slug?: string;
  short_description?: unknown;
  detailed_description?: string;
  duration?: string;
  image?: ApiImage;
} => {
  if (isRecord(raw) && isRecord(raw.attributes)) {
    const a = raw.attributes as Record<string, unknown>;
    return {
      documentId: (a.documentId as string | undefined),
      title: (a.title as string | undefined),
      slug: (a.slug as string | undefined),
      short_description: a.short_description,
      detailed_description: (a.detailed_description as string | undefined),
      duration: (a.duration as string | undefined),
      image: (a.image as ApiImage | undefined),
    };
  }
  if (isRecord(raw)) {
    return {
      documentId: (raw.documentId as string | undefined),
      title: (raw.title as string | undefined),
      slug: (raw.slug as string | undefined),
      short_description: raw.short_description,
      detailed_description: (raw.detailed_description as string | undefined),
      duration: (raw.duration as string | undefined),
      image: (raw.image as ApiImage | undefined),
    };
  }
  return {};
};

// Safer, typed plain-text extractor (no any)
const extractPlainText = (input: unknown): string => {
  const normalize = (val: unknown): string => {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);

    if (Array.isArray(val)) {
      return (val as unknown[]).map(normalize).filter(Boolean).join(' ');
    }

    if (isRecord(val)) {
      const parts: string[] = [];

      if (typeof val.text === 'string') parts.push(val.text);

      const children = val.children as unknown;
      if (Array.isArray(children)) parts.push(normalize(children));

      const content = val.content as unknown;
      if (Array.isArray(content)) parts.push(normalize(content));

      const blocks = val.blocks as unknown;
      if (Array.isArray(blocks)) parts.push(normalize(blocks));

      if (parts.length === 0) {
        for (const v of Object.values(val)) {
          parts.push(normalize(v));
        }
      }
      return parts.filter(Boolean).join(' ');
    }

    return '';
  };

  return normalize(input).trim().replace(/\s+/g, ' ');
};

const ActivitySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [difficultyLevel, setDifficultyLevel] = useState('All');
  const { activities, loading, error, fetchActivities } = useActivityStore();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Reset slide when filters change
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCategory, difficultyLevel]);

  const normalizedActivities = useMemo(() => {
    const list: unknown[] = Array.isArray(activities) ? (activities as unknown[]) : [];
    return list.map((raw) => {
      const attr = getAttrFromActivity(raw);

      const rawId =
        (isRecord(raw) && (raw.documentId as string | undefined)) ||
        (isRecord(raw) && typeof raw.id !== 'undefined' ? String(raw.id) : undefined) ||
        attr.documentId ||
        '';

      const img = attr.image;
      const imgUrl =
        img?.formats?.medium?.url ||
        img?.formats?.small?.url ||
        img?.url ||
        '';

      return {
        id: String(rawId),
        name: attr.title || '',
        slug: attr.slug,
        image: imgUrl.startsWith('http') ? imgUrl : `${API_BASE_URL}${imgUrl}`,
        description:
          extractPlainText(attr.short_description) ||
          (attr.detailed_description ? String(attr.detailed_description).slice(0, 140) : ''),
        duration: attr.duration || '—',
        difficulty: 'Info',
      };
    });
  }, [activities]);

  // Filter activities based on category and difficulty
  const filteredActivities = useMemo(() => {
    let filtered = normalizedActivities;

    // Filter by category (based on activity type/name keywords)
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(activity => {
        const name = activity.name.toLowerCase();
        const description = activity.description.toLowerCase();

        if (selectedCategory === 'Water Sports' && (name.includes('water') || name.includes('diving') || name.includes('snorkeling') || description.includes('water'))) return true;
        if (selectedCategory === 'Adventure' && (name.includes('trek') || name.includes('climb') || name.includes('adventure') || description.includes('adventure'))) return true;
        if (selectedCategory === 'Cultural' && (name.includes('tour') || name.includes('visit') || name.includes('cultural') || description.includes('cultural'))) return true;
        if (selectedCategory === 'Nature' && (name.includes('nature') || name.includes('wildlife') || name.includes('forest') || description.includes('nature'))) return true;
        return false;
      });
    }

    // Filter by difficulty level
    if (difficultyLevel !== 'All') {
      filtered = filtered.filter(activity => activity.difficulty === difficultyLevel);
    }

    return filtered;
  }, [normalizedActivities, selectedCategory, difficultyLevel]);

  const totalSlides = filteredActivities.length;

  useEffect(() => {
    if (currentSlide >= totalSlides && totalSlides > 0) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  if (loading) return <p className=' text-black text-xl text-center mt-5'>Loading activities...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!normalizedActivities.length) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Activities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exciting adventures and unforgettable experiences.
            </p>
          </div>

          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Activities Coming Soon</h3>
              <p className="text-gray-600 mb-6">We&apos;re preparing exciting activities for you.</p>
              <Link
                href="/packages"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Beginner':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibleCards = (count: number = 4) => {
    if (totalSlides === 0) return [] as typeof filteredActivities;
    // Do not duplicate when items are fewer than requested count
    if (totalSlides <= count) return filteredActivities;

    const cards = [] as typeof filteredActivities;
    for (let i = 0; i < count; i++) {
      const index = (currentSlide + i) % totalSlides;
      cards.push(filteredActivities[index]);
    }
    return cards;
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Smart Header + Filters Combo */}
        <div className="mb-6">
          {/* Main Header Row with Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            {/* Left: Title - Centered on mobile */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Popular Activities
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Discover exciting adventures and experiences
              </p>
            </div>

            {/* Right: Smart Filters Layout - Centered on mobile */}
            <div className="flex flex-col items-center gap-3 w-full lg:w-auto lg:flex-row lg:justify-end">
              {/* Category Filter Pills - Centered on mobile */}
              <div className="flex items-center justify-center gap-1">
                {['All', 'Water Sports', 'Adventure', 'Cultural', 'Nature'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Secondary Controls - Centered on mobile */}
              <div className="flex items-center justify-center gap-2">
                {/* Difficulty Dropdown */}
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="border border-gray-300 rounded-md px-2.5 py-1 text-xs focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white min-w-[90px] text-black"
                >
                  <option value="All">Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Medium</option>
                  <option value="Advanced">Advanced</option>
                </select>

                {/* View All */}
                <Link
                  href="/activities"
                  className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
                >
                  View All
                </Link>

                {/* Clear if filters active */}
                {(selectedCategory !== 'All' || difficultyLevel !== 'All') && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setDifficultyLevel('All');
                    }}
                    className="text-red-600 hover:text-red-700 text-xs font-medium w-5 h-5 flex items-center justify-center"
                    title="Clear filters"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Compact Results Summary */}
          {filteredActivities.length !== normalizedActivities.length && (
            <div className="text-center lg:text-right">
              <p className="text-xs text-gray-500">
                {filteredActivities.length} of {normalizedActivities.length} activities
                {selectedCategory !== 'All' && ` • ${selectedCategory}`}
                {difficultyLevel !== 'All' && ` • ${difficultyLevel}`}
              </p>
            </div>
          )}
        </div>

        {/* Show message when no activities found after filtering */}
        {totalSlides === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500">
              <p className="text-sm">
                No activities found matching your filters.
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setDifficultyLevel('All');
                  }}
                  className="text-green-600 hover:text-green-700 underline ml-1"
                >
                  Clear filters
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 border border-gray-200"
              aria-label="Previous activities"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 border border-gray-200"
              aria-label="Next activities"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="overflow-hidden">
              {/* Desktop */}
              <div className="hidden lg:grid lg:grid-cols-4 gap-6">
                {getVisibleCards(4).map((activity, idx) => (
                  <div
                    key={`${activity.id}-${idx}-${currentSlide}`}
                    className="relative rounded-xl shadow-lg overflow-hidden hover:shadow-xl border border-gray-100 h-80"
                  >
                    <Image
                      src={activity.image || '/placeholder.png'}
                      alt={activity.name}
                      fill
                      sizes="(max-width:1280px) 25vw, 300px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)} bg-white/90 backdrop-blur text-gray-900`}>
                        {activity.difficulty}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-1 drop-shadow">{activity.name}</h3>
                      <p className="text-gray-100 text-sm mb-3 line-clamp-2">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-200">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{activity.duration}</span>
                        </div>
                        <Link
                          href={`/activities/${activity.id}`}
                          className="inline-block bg-white/95 hover:bg-white text-gray-900 py-2 px-3 rounded-md text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet */}
              <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
                {getVisibleCards(2).map((activity, idx) => (
                  <div
                    key={`${activity.id}-${idx}-${currentSlide}`}
                    className="relative rounded-xl shadow-lg overflow-hidden hover:shadow-xl border border-gray-100 h-72"
                  >
                    <Image
                      src={activity.image || '/placeholder.png'}
                      alt={activity.name}
                      fill
                      sizes="(max-width:1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)} bg-white/90 backdrop-blur text-gray-900`}>
                        {activity.difficulty}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-1 drop-shadow">{activity.name}</h3>
                      <p className="text-gray-100 text-sm mb-3 line-clamp-2">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-200">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{activity.duration}</span>
                        </div>
                        <Link
                          href={`/activities/${activity.id}`}
                          className="inline-block bg-white/95 hover:bg-white text-gray-900 py-2 px-3 rounded-md text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile */}
              <div className="md:hidden">
                {filteredActivities[currentSlide] && (
                  <div className="relative rounded-xl shadow-lg overflow-hidden border border-gray-100 h-72">
                    <Image
                      src={filteredActivities[currentSlide].image || '/placeholder.png'}
                      alt={filteredActivities[currentSlide].name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(filteredActivities[currentSlide].difficulty)} bg-white/90 backdrop-blur text-gray-900`}>
                        {filteredActivities[currentSlide].difficulty}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-1 drop-shadow">
                        {filteredActivities[currentSlide].name}
                      </h3>
                      <p className="text-gray-100 text-sm mb-3 line-clamp-2">
                        {filteredActivities[currentSlide].description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-200">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{filteredActivities[currentSlide].duration}</span>
                        </div>
                        <Link
                          href={`/activities/${filteredActivities[currentSlide].id}`}
                          className="inline-block bg-white/95 hover:bg-white text-gray-900 py-2 px-3 rounded-md text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {filteredActivities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-green-500' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitySection;