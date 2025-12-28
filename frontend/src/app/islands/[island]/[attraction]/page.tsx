'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Islands data with all locations and attractions (kept for validation/navigation)..
const islandsData = [
  {
    name: "Port Blair",
    attractions: [
      "Jolly Buoy Island",
      "Cellular Jail",
      "North Bay Island",
      "Ross Island",
      "Chidiya Tapu",
      "Corbyns Cove",
      "Museums",
      "Flag Point",
      "Rajiv Gandhi Water Sports Complex"
    ]
  },
  {
    name: "Neil",//(Shaheed Dweep)
    attractions: [
      "Bharatpur Beach",
      "Natural Rock",
      "Sitapur Beach",
      "Laxmanpur Beach",
    ]
  },
  {
    name: "Barren Island",
    attractions: [
      'Barren Island',
      // "Volcano",
      // "Diving",
      // "Snorkeling"
    ]
  },
  {
    name: "Long Island",
    attractions: [
      "Lalaji Bay Beach",
      "Guitar Island",
      "Merk Bay Beach"
    ]
  },
  {
    name: "Little Andaman",
    attractions: [
      "Butler Bay Beach",
      "Kalapathar Limestone Caves",
      "White Surf Waterfall",
      "Light House"
    ]
  },
  {
    name: "Havelock",
    attractions: [
      "Radhanagar Beach",
      "Elephant Beach",
      "Kalapathar Beach",
      // "Neil (Shaheed Dweep)",
      // "Laxmanpur Beach",
      // "Bharatpur Beach",
      // "Natural Rock",
      // "Sitapur Beach",
      // "Barren Island"
    ]
  },
  {
    name: "Mayabunder",
    attractions: [
      "Karmatang Beach",
      "Avis Island",
      "German Jetty",
      // "Little Andaman",
      // "Butler Bay Beach",
      // "Kalapathar Limestone Caves",
      // "White Surf Waterfall",
      // "Whisper Wave Waterfall",
      // "Red Palm Oil Plantation",
      // "Light House"
    ]
  },
  {
    name: "Baratang",
    attractions: [
      "Lime Stone Caves",
      "Mud Volcano",
      "Parrot Island",
      // "Long Island",
      // "Lalaji Bay Beach",
      // "Guitar Island",
      // "Merk Bay Beach"
    ]
  },
  {
    name: "Diglipur",
    attractions: [
      "Ross and Smith Island",
      "Saddle Peak",
      "Kalipur Beach",
      "Ramnagar Beach",
      // "Mud Volcanoes of Shyam Nagar",
      // "Alfred Caves",
      "Lamiya Bay Beach",
      "Aerial Bay",
      "Patti Level"
    ]
  },
  {
    name: "Rangat",
    attractions: [
      "Dhaninallah Mangrove Walkway",
      "Morrice Dera Beach",
      "Yeratta Creek",
      "Ambkunj Beach",
      "Panchavati Waterfalls",
      "Cuthbert Bay Beach"
    ]
  }
];

interface PageProps {
  params: Promise<{
    island: string;
    attraction: string;
  }>;
}

interface SectionContent {
  title?: string;
  description?: string;
  image?: string; // URL or path
}

interface AttractionContent {
  title?: string;
  subtitle?: string;
  heroImage?: string;
  sectionOne?: SectionContent;
  sectionTwo?: SectionContent;
}

const AttractionPage = ({ params }: PageProps) => {
  const resolvedParams = React.use(params);

  const formatTitle = (slug: string) =>
    slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  // const islandName = formatTitle(resolvedParams.island);
  const attractionName = formatTitle(resolvedParams.attraction);

  const islandData = islandsData.find(island =>
    island.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.island
  );
  const attractionExists = islandData?.attractions.some(attraction =>
    attraction.toLowerCase().replace(/\s+/g, '-') === resolvedParams.attraction
  );

  // local slugify to normalize attraction/island slugs and remove trailing hyphens
  const slugify = (s?: string) => {
    if (!s) return '';
    return String(s)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // spaces to hyphens
      .replace(/[^a-z0-9-]/g, '')      // remove invalid chars
      .replace(/-+/g, '-')            // collapse multiple hyphens
      .replace(/^-+|-+$/g, '');       // trim leading/trailing hyphens
  };

  const islandSlug = slugify(resolvedParams.island);
  const attractionSlug = slugify(resolvedParams.attraction);

  const [content, setContent] = React.useState<AttractionContent | null>(null);
  const [relatedImages, setRelatedImages] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const mod = await import(`@/Data/${islandSlug}/${attractionSlug}/data`);
        const data: AttractionContent = (mod.default ?? mod) as AttractionContent;
        if (mounted) setContent(data);
      } catch (e) {
        // No data file yet; keep placeholders
        console.error('Failed to load attraction data for', islandSlug, attractionSlug, e);
        if (mounted) setContent({});
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [islandSlug, attractionSlug]);

  // Load related attraction images
  React.useEffect(() => {
    const loadRelatedImages = async () => {
      const images: Record<string, string> = {};
      for (const attraction of islandData?.attractions || []) {
        try {
          const aSlug = slugify(attraction);
          const mod = await import(`@/Data/${islandSlug}/${aSlug}/data`);
          images[attraction] = mod.default?.heroImage || '';
        } catch {
          images[attraction] = '';
        }
      }
      setRelatedImages(images);
    };
    loadRelatedImages();
  }, [islandSlug, islandData?.attractions]);

  if (!islandData || !attractionExists) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Attraction Not Found</h1>
              <p className="text-gray-600 mb-8">The attraction you&apos;re looking for doesn&apos;t exist.</p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const heroImage = content?.heroImage ?? '';
  const s1: SectionContent = content?.sectionOne ?? {};
  const s2: SectionContent = content?.sectionTwo ?? {};

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={attractionName}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="relative z-10 h-full flex items-end">
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-8">
              <div className="max-w-7xl mx-auto text-white">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs sm:text-sm">
                    {islandData.name}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/80 text-xs sm:text-sm">
                    Attraction
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow">
                  {content?.title ?? attractionName}
                </h1>
                {content?.subtitle ? (
                  <p className="mt-3 text-sm sm:text-base md:text-lg max-w-2xl text-gray-200">
                    {content.subtitle}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Text left, Image right (description only) */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-['Poppins'] tracking-tight">
                {s1.title}
              </h2>
              <div className="bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 rounded-2xl p-8 shadow-xl border border-blue-100/50 backdrop-blur-sm">
                <div className="prose prose-lg max-w-none">
                  {/* Mobile: Truncated text with Read More */}
                  <div className="lg:hidden">
                    <div id="mobile-text-1" className="text-gray-500 leading-relaxed mb-4 font-['Inter'] text-base line-clamp-4">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="text-gray-500 leading-relaxed mb-4 font-['Inter'] text-base">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-purple-600 font-semibold">
                              {children}
                            </em>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6 font-['Poppins']">
                              {children}
                            </h3>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-2 text-gray-500 font-['Inter']">
                              {children}
                            </ul>
                          ),
                          li: ({ children }) => (
                            <li className="text-gray-500 leading-relaxed">
                              {children}
                            </li>
                          )
                        }}
                      >
                        {s1.description ?? `Coming soon: details for ${attractionName}.`}
                      </ReactMarkdown>
                    </div>
                    <button
                      onClick={() => {
                        const textElement = document.getElementById('mobile-text-1');
                        const button = document.getElementById('read-more-btn-1');
                        if (textElement && button) {
                          if (textElement.classList.contains('line-clamp-4')) {
                            textElement.classList.remove('line-clamp-4');
                            textElement.classList.add('line-clamp-none');
                            button.textContent = 'Read Less';
                          } else {
                            textElement.classList.remove('line-clamp-none');
                            textElement.classList.add('line-clamp-4');
                            button.textContent = 'Read More';
                          }
                        }
                      }}
                      id="read-more-btn-1"
                      className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                    >
                      Read More
                    </button>
                  </div>

                  {/* Desktop: Full text */}
                  <div className="hidden lg:block">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="text-gray-500 leading-relaxed mb-4 font-['Inter'] text-base md:text-lg">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-purple-600 font-semibold">
                            {children}
                          </em>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6 font-['Poppins']">
                            {children}
                          </h3>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-2 text-gray-500 font-['Inter']">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-500 leading-relaxed">
                            {children}
                          </li>
                        )
                      }}
                    >
                      {s1.description ?? `Coming soon: details for ${attractionName}.`}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                {s1.image ? (
                  <Image
                    src={s1.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Image left, Text right (description only) */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-1 lg:order-none">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                {s2.image ? (
                  <Image
                    src={s2.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-['Poppins'] tracking-tight">
                {s2.title}
              </h2>
              <div className="bg-gradient-to-br from-white via-purple-50/50 to-pink-50/30 rounded-2xl p-8 shadow-xl border border-purple-100/50 backdrop-blur-sm">
                <div className="prose prose-lg max-w-none">
                  {/* Mobile: Truncated text with Read More */}
                  <div className="lg:hidden">
                    <div id="mobile-text-2" className="text-gray-500 leading-relaxed mb-4 font-['Inter'] text-base line-clamp-4">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="text-gray-500 leading-relaxed mb-4 font-['Inter'] text-base">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-pink-600 font-semibold">
                              {children}
                            </em>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6 font-['Poppins']">
                              {children}
                            </h3>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-2 text-gray-500 font-['Inter']">
                              {children}
                            </ul>
                          ),
                          li: ({ children }) => (
                            <li className="text-gray-500 leading-relaxed">
                              {children}
                            </li>
                          )
                        }}
                      >
                        {s2.description ?? `More information about ${attractionName} will be added here.`}
                      </ReactMarkdown>
                    </div>
                    <button
                      onClick={() => {
                        const textElement = document.getElementById('mobile-text-2');
                        const button = document.getElementById('read-more-btn-2');
                        if (textElement && button) {
                          if (textElement.classList.contains('line-clamp-4')) {
                            textElement.classList.remove('line-clamp-4');
                            textElement.classList.add('line-clamp-none');
                            button.textContent = 'Read Less';
                          } else {
                            textElement.classList.remove('line-clamp-none');
                            textElement.classList.add('line-clamp-4');
                            button.textContent = 'Read More';
                          }
                        }
                      }}
                      id="read-more-btn-2"
                      className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                    >
                      Read More
                    </button>
                  </div>

                  {/* Desktop: Full text */}
                  <div className="hidden lg:block">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="text-gray-500 leading-relaxed mb-4 font-['Inter'] text-base md:text-lg">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-pink-600 font-semibold">
                            {children}
                          </em>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6 font-['Poppins']">
                            {children}
                          </h3>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-2 text-gray-500 font-['Inter']">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-500 leading-relaxed">
                            {children}
                          </li>
                        )
                      }}
                    >
                      {s2.description ?? `More information about ${attractionName} will be added here.`}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related attractions */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h4 className="text-2xl font-bold text-gray-800 mb-8 font-['Poppins'] text-center">
            Other Attractions in <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{islandData.name}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {islandData.attractions
              .filter(a => a.toLowerCase().replace(/\s+/g, '-') !== resolvedParams.attraction)
              .slice(0, 6)
              .map((a) => {
                const heroImage = relatedImages[a] || '';
                return (
                  <Link
                    key={a}
                    href={`/islands/${resolvedParams.island}/${a.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group rounded-2xl overflow-hidden border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white"
                  >
                    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                      {heroImage ? (
                        <Image
                          src={heroImage}
                          alt={a}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-4xl text-gray-400">🏝️</span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex flex-col items-center text-center">
                      <div className="font-bold text-lg md:text-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-indigo-600 transition-all duration-300 mb-2 font-['Poppins']">
                        {a}
                      </div>
                      <div className="text-xs md:text-sm font-medium text-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full px-4 py-2 inline-block shadow-sm border border-indigo-100 group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-all duration-300 font-['Inter']">
                        Explore this attraction
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AttractionPage;
