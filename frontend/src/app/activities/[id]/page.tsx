'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import useActivityStore from '../../../../store/activityStore';
import Image from 'next/image';
// import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/Contact';
import Link from 'next/link';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

// Helper to render **starred** segments with bold/color
const renderWithHighlights = (text: string) => {
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
// console.log('testing');;
// Helper to render markdown-formatted text
// const renderMarkdown = (text: string) => {
//   if (!text) return null;

//   // Split by double newlines to get paragraphs
//   const paragraphs = text.split(/\n\n+/);

//   return paragraphs.map((paragraph, idx) => {
//     const trimmed = paragraph.trim();
//     if (!trimmed) return null;

//     // Handle headings (lines starting with #)
//     if (trimmed.startsWith('# ')) {
//       const content = trimmed.slice(2);
//       return (
//         <h2 key={idx} className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">
//           {renderWithHighlights(content)}
//         </h2>
//       );
//     }

//     if (trimmed.startsWith('## ')) {
//       const content = trimmed.slice(3);
//       return (
//         <h3 key={idx} className="text-xl font-bold text-gray-800 mb-3 mt-5">
//           {renderWithHighlights(content)}
//         </h3>
//       );
//     }

//     // Handle bullet points (lines starting with -)
//     if (trimmed.startsWith('- ')) {
//       const content = trimmed.slice(2);
//       return (
//         <li key={idx} className="mb-2 text-gray-700">
//           {renderWithHighlights(content)}
//         </li>
//       );
//     }

//     // Handle bold text patterns like **Duration:** or **Route:**
//     if (trimmed.includes('**') && trimmed.includes(':')) {
//       const parts = trimmed.split(/(\*\*[^*]+:\*\*)/g);
//       return (
//         <p key={idx} className="mb-3 text-gray-700">
//           {parts.map((part, partIdx) => {
//             if (/^\*\*[^*]+:\*\*$/.test(part)) {
//               const inner = part.slice(2, -2);
//               return (
//                 <span key={partIdx} className="font-semibold text-gray-900">{inner}</span>
//               );
//             }
//             return <span key={partIdx}>{part}</span>;
//           })}
//         </p>
//       );
//     }

//     // Regular paragraphs
//     return (
//       <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
//         {renderWithHighlights(trimmed)}
//       </p>
//     );
//   }).filter(Boolean);
// };

// Helper to render markdown lists properly
// const renderMarkdownWithLists = (text: string) => {
//   if (!text) return null;

//   // Split by double newlines to get sections
//   const sections = text.split(/\n\n+/);
//   const result: React.ReactElement[] = [];
//   let currentList: string[] = [];

//   sections.forEach((section, idx) => {
//     const trimmed = section.trim();
//     if (!trimmed) return;

//     // If we have accumulated list items, render them
//     if (currentList.length > 0 && !trimmed.startsWith('- ')) {
//       result.push(
//         <ul key={`list-${idx}`} className="list-disc list-inside mb-4 space-y-2">
//           {currentList.map((item, itemIdx) => (
//             <li key={itemIdx} className="text-gray-700">
//               {renderWithHighlights(item)}
//             </li>
//           ))}
//         </ul>
//       );
//       currentList = [];
//     }

//     // Handle headings
//     if (trimmed.startsWith('# ')) {
//       const content = trimmed.slice(2);
//       result.push(
//         <h2 key={idx} className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">
//           {renderWithHighlights(content)}
//         </h2>
//       );
//     } else if (trimmed.startsWith('## ')) {
//       const content = trimmed.slice(3);
//       result.push(
//         <h3 key={idx} className="text-xl font-bold text-gray-800 mb-3 mt-5">
//           {renderWithHighlights(content)}
//         </h3>
//       );
//     } else if (trimmed.startsWith('- ')) {
//       // Accumulate list items
//       currentList.push(trimmed.slice(2));
//     } else if (trimmed.includes('**') && trimmed.includes(':')) {
//       // Handle bold text patterns
//       const parts = trimmed.split(/(\*\*[^*]+:\*\*)/g);
//       result.push(
//         <p key={idx} className="mb-3 text-gray-700">
//           {parts.map((part, partIdx) => {
//             if (/^\*\*[^*]+:\*\*$/.test(part)) {
//               const inner = part.slice(2, -2);
//               return (
//                 <span key={partIdx} className="font-semibold text-gray-900">{inner}</span>
//               );
//             }
//             return <span key={partIdx}>{part}</span>;
//           })}
//         </p>
//       );
//     } else {
//       // Regular paragraphs
//       result.push(
//         <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
//           {renderWithHighlights(trimmed)}
//         </p>
//       );
//     }
//   });

//   // Handle any remaining list items
//   if (currentList.length > 0) {
//     result.push(
//       <ul key="final-list" className="list-disc list-inside mb-4 space-y-2">
//         {currentList.map((item, itemIdx) => (
//           <li key={itemIdx} className="text-gray-700">
//             {renderWithHighlights(item)}
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   return result;
// };

// Media & Rich Text Types
interface RichTextLeaf { text: string }
interface RichTextNode { type?: string; children?: RichTextLeaf[] }
interface ImageFormat { url: string; width?: number; height?: number }
interface MediaFormats { large?: ImageFormat; medium?: ImageFormat; small?: ImageFormat; thumbnail?: ImageFormat }
interface Media { url: string; formats?: MediaFormats }
interface ActivityAttributes {
  title?: string;
  detailed_description?: string;
  short_description?: RichTextNode[];
  location?: string;
  duration?: string;
  price?: number;
  tags?: string;
  image?: Media;
  gallery?: Media[] | Media;
}
// Add types for API-driven sections
interface WhatsIncludedItem { id: number; item: string; description?: string }
interface ItineraryItem { id: number; Day?: string; description?: string }

const extractPlainText = (input: unknown): string => {
  const walk = (val: unknown): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.map(walk).join(' ');

    if (typeof val === 'object') {
      const obj: Record<string, unknown> = val as Record<string, unknown>;
      const parts: string[] = [];

      if (typeof obj.text === 'string') parts.push(obj.text);
      if (Array.isArray(obj.children)) parts.push(walk(obj.children));
      if (Array.isArray(obj.content)) parts.push(walk(obj.content));
      if (Array.isArray(obj.blocks)) parts.push(walk(obj.blocks));

      if (parts.length === 0) {
        for (const key of Object.keys(obj)) {
          const v = obj[key];
          if (typeof v === 'string' || Array.isArray(v) || (v && typeof v === 'object')) {
            parts.push(walk(v));
          }
        }
      }

      return parts.join(' ');
    }

    return '';
  };

  return walk(input).replace(/\s+/g, ' ').trim();
};

const buildAssetUrl = (u?: string) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  return `${API_BASE_URL}${u.startsWith('/') ? u : '/' + u}`;
};

// Type guards
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const hasAttributes = (v: unknown): v is { attributes: ActivityAttributes } =>
  isRecord(v) && 'attributes' in v && isRecord((v as { attributes: unknown }).attributes);

function Page() {
  // Make params typed to avoid any
  const params = useParams() as { id?: string | string[] };
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { selectedActivity, loading, error, getActivityById, fetchActivityById, clearSelectedActivity, setSelectedPlace } = useActivityStore();
  const [filters, setFilters] = useState({ type: '', island_name: '', place_name: '', price_range: '' });
  // console.log('testing', selectedActivity);

  useEffect(() => {
    const loadActivity = async () => {
      if (rawId !== undefined && rawId !== null && rawId !== '') {
        // Try to get from state first, with fallback to API
        const activity = await getActivityById(rawId);

        // If still not found, try direct API call as final fallback
        if (!activity) {
          console.log('Activity not found in state or via fetchActivities, trying direct API call...');
          await fetchActivityById(rawId);
        }
      }
    };

    loadActivity();

    return () => {
      clearSelectedActivity();
    };
  }, [rawId, getActivityById, fetchActivityById, clearSelectedActivity]);

  // Normalize for either flattened or attributes-wrapped Strapi entities
  const activityData = useMemo<ActivityAttributes | undefined>(() => {
    const sa = selectedActivity as unknown;
    if (hasAttributes(sa)) return sa.attributes;
    if (isRecord(sa)) return sa as ActivityAttributes;
    return undefined;
  }, [selectedActivity]);

  const shortDesc = useMemo(
    () => (activityData?.short_description ? extractPlainText(activityData.short_description) : ''),
    [activityData]
  );

  // Define the type for sub_activites
  interface SubActivity {
    type: string;
    island_name: string;
    place_name: string;
    title: string;
    short_description: string;
    price: string; // Added price as a string
    person: string;
  }

  // Update the filter options to include price ranges dynamically
  const filterOptions = useMemo(() => {
    const types = [...new Set(selectedActivity?.sub_activites.map((sub: SubActivity) => sub.type))];
    const islands = [...new Set(selectedActivity?.sub_activites.map((sub: SubActivity) => sub.island_name))];
    const places = [...new Set(selectedActivity?.sub_activites.map((sub: SubActivity) => sub.place_name))];
    const priceRanges = ['0-50', '50-100', '100-500', '500+'];
    return { types, islands, places, priceRanges };
  }, [selectedActivity]);

  // Filter logic
  const filteredSubActivities = useMemo(() => {
    return selectedActivity?.sub_activites.filter((sub: SubActivity) => {
      const price = parseFloat(sub.price);
      const [minPrice, maxPrice] = filters.price_range.split('-').map(Number);
      const isPriceInRange = !filters.price_range || (price >= minPrice && (!maxPrice || price <= maxPrice));

      return (
        (!filters.type || sub.type === filters.type) &&
        (!filters.island_name || sub.island_name === filters.island_name) &&
        (!filters.place_name || sub.place_name === filters.place_name) && // Ensure place_name is filtered
        isPriceInRange
      );
    });
  }, [selectedActivity, filters]);

  // Handle filter changes
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Update browser title and meta description when activity data loads
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const title = activityData?.title;
    const short_description = shortDesc || activityData?.detailed_description;
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
  }, [activityData, shortDesc]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!selectedActivity) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Activity Not Found</h2>
          <p>The activity you&apos;re looking for could not be found.</p>
        </div>
      </div>
    );
  }

  const {
    title,
    // detailed_description,

    // price,
    // tags,
    image,
    // gallery,
    // pull API arrays
    // WhatsIncludedItem: whatsIncluded,
    // itinerary,
  } = (activityData ?? {}) as ActivityAttributes & {
    WhatsIncludedItem?: WhatsIncludedItem[];
    itinerary?: ItineraryItem[];
  };

  const heroImageUrl = image?.formats?.large?.url || image?.formats?.medium?.url || image?.formats?.small?.url || image?.url;
  // const galleryImages: Media[] = Array.isArray(gallery) ? gallery : gallery ? [gallery] : [];

  return (<>
    <Navbar />
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden animate-fadein">
        <div className="hidden md:flex absolute inset-0 w-full h-full bg-[url('https://www.andamanisland.in/assets/andamanisland/images/default_common_banner.jpg')] bg-cover bg-center bg-no-repeat ">
          {/* Image Left 60% - show activity image clearly (no dark background) */}
          <div className="w-[60%] h-full flex items-center justify-center">
            <div className="w-[95%] h-[88%] rounded-2xl shadow-2xl relative overflow-hidden">
              {heroImageUrl ? (
                <Image
                  src={buildAssetUrl(heroImageUrl)}
                  alt={title || 'Activity image'}
                  fill
                  priority
                  sizes="60vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
          </div>
          {/* Text Right 40% */}
          <div className="w-[40%] h-full flex items-center justify-center p-10 ">
            <div className="text-white max-w-lg rounded-xl p-8" style={{ background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }}>
              <h1 className="text-4xl lg:text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-green-300" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                {title}
              </h1>
              {shortDesc && (
                <p className="text-base lg:text-sm mb-4 text-blue-100" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                  {renderWithHighlights(shortDesc)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: Full image with text overlay */}
        <div className="md:hidden absolute inset-0 z-10">
          {heroImageUrl && (
            <Image
              src={buildAssetUrl(heroImageUrl)}
              alt={title || 'Activity image'}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-green-300" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                {title}
              </h1>
              {shortDesc && (
                <p className="text-sm mb-3 max-w-3xl text-blue-100" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                  {renderWithHighlights(shortDesc)}
                </p>
              )}
            </div>
          </div>
        </div>

      </section>
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

      {/* Filtration Section */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Filter Activities</h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={e => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">All Types</option>
                  {filterOptions.types.map(type => (
                    <option key={String(type)} value={String(type)}>{String(type)}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Price Range</label>
                <select
                  value={filters.price_range}
                  onChange={e => handleFilterChange('price_range', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">All Prices</option>
                  {filterOptions.priceRanges.map(range => (
                    <option key={String(range)} value={String(range)}>{String(range)}</option>
                  ))}
                </select>
              </div>

              {/* Island Filter */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Island</label>
                <select
                  value={filters.island_name}
                  onChange={e => handleFilterChange('island_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">All Islands</option>
                  {filterOptions.islands.map(island => (
                    <option key={String(island)} value={String(island)}>{String(island)}</option>
                  ))}
                </select>
              </div>

              {/* Place Filter */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Place</label>
                <select
                  value={filters.place_name}
                  onChange={e => handleFilterChange('place_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">All Places</option>
                  {filterOptions.places.map(place => (
                    <option key={String(place)} value={String(place)}>{String(place)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Places Cards Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Available Places</h2>

        {/* Check if activity has sub_activites data */}
        {selectedActivity?.sub_activites && selectedActivity.sub_activites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubActivities.map((place: Place) => (
              <div key={place.documentId} className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Left-side person tag (from backend) */}
                {(place.person || String(place.person) === '0') && String(place.person).trim() !== '' && (
                  <div className="absolute -left-2 top-6 bg-blue-600 text-white px-3 py-1 rounded-r-lg text-xs font-semibold z-10">
                    {String(place.person)}
                  </div>
                )}
                {/* Card Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-cyan-600">
                  {place.hero_section?.url && (
                    <Image
                      src={buildAssetUrl(place.hero_section.url)}
                      alt={place.place_name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      {place.type}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{place.place_name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {place.short_description}
                  </p>

                  {/* Price and Type */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{place.price}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      Type: {place.type}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    href={`/activities/${rawId}/${place.documentId}`}
                    className="block w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                    onClick={() => setSelectedPlace(place)}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Places Available</h3>
              <p className="text-gray-600">Places for this activity will be available soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
    <ContactSection />
    {/* <Footer /> */}
  </>
  );
}

export default Page;

// Define the Place type at the top of the file
interface Place {
  documentId: string;
  hero_section?: {
    url?: string;
  };
  place_name: string;
  short_description: string;
  price: number;
  type: string;
  person?: string;
}
