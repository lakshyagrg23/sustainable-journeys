'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';


// Islands data with all locations and attractions
const islandsData = [
  {
    name: "Barren Island",
    attractions: [
      'Barren Island Beach',
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
    name: "Port Blair",
    attractions: [
      "Jolly Buoy Island",
      "Cellular Jail",
      "North Bay Island",
      "Ross Island",
      "chidiya-tapu",
      "Corbyns Cove",
      "Museums",
      "Flag Point",
      "Rajiv Gandhi Water Sports Complex"
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
    name: "Neil",//Shaheed Dweep
    attractions: [
      "Bharatpur Beach",
      "Natural Rock",
      "Sitapur Beach",
      "Laxmanpur Beach",
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
      "Mud Volcanoes of Shyam Nagar",
      "Alfred Caves",
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
  },
  {
    name: "Little Andaman",
    attractions: [
      "Butler Bay Beach",
      "Kalapathar Limestone Caves",
      "White Surf Waterfall",
      "Light House"
    ]
  }
];

interface PageProps {
  params: Promise<{
    island: string;
  }>;
}

const IslandPage = ({ params }: PageProps) => {

  const resolvedParams = React.use(params);

  const islandData = islandsData.find(island =>
    island.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.island
  );

  // Map island -> hero image in public/island
  const islandHeroMap: Record<string, string> = {
    'port-blair': '/island/island1.jpg',
    'havelock': '/island/island2.webp',
    'mayabunder': 'https://www.andamanisland.in/assets/site1/theme3/images/about-mayabunder-island/7.jpg',
    'baratang': '/island/island4.jpg',
    'diglipur': '/island/island5.jpg',
    'rangat': '/island/island6.jpg',
    'neil': '/rangat/natural-rock1.webp',
    'barren-island': '/havelock/Barren1.jpeg',
    'little-andaman': '/mayabunder/light1.jpg',
    'long-island': '/island/island6.jpg',
  };

  const heroImage = islandHeroMap[resolvedParams.island] || '/island/island1.jpg';

  // Load attraction hero images for cards
  const [attractionImages, setAttractionImages] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const images: Record<string, string> = {};
      try {
        for (const attraction of islandData?.attractions || []) {
          const slug = attraction.toLowerCase().replace(/\s+/g, '-');
          try {
            const mod = await import(`@/Data/${resolvedParams.island}/${slug}/data`);
            images[attraction] = (mod.default?.heroImage || mod.heroImage || '') as string;
          } catch {
            images[attraction] = '';
          }
        }
      } finally {
        if (mounted) setAttractionImages(images);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [resolvedParams.island, islandData?.attractions]);

  if (!islandData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Island Not Found</h1>
            <p className="text-gray-600 mb-8">The island you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 ">
        {/* Hero Section (full-height, image-based) */}
        <section className="relative w-full h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden">
          <Image src={heroImage} alt={islandData.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/20" />
          <div className="absolute inset-x-0 bottom-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow mb-3">
                {islandData.name}
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl drop-shadow-sm">
                Explore the best of {islandData.name}: beaches, nature, adventures, and serene island life.
              </p>
            </div>
          </div>
        </section>

        {/* Attractions Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Attractions in {islandData.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the most beautiful and exciting places that {islandData.name} has to offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {islandData.attractions.map((attraction) => {
              const img = attractionImages[attraction] || '';
              const href = `/islands/${resolvedParams.island}/${attraction.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <Link
                  key={attraction}
                  href={href}
                  className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow hover:shadow-xl transition-all"
                >
                  <div className="relative h-52 bg-gray-100">
                    {img ? (
                      <Image src={img} alt={attraction} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-center">
                        <div>
                          <div className="text-4xl mb-2">🏝️</div>
                          <h3 className="text-lg font-semibold tracking-tight">{attraction}</h3>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{attraction}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Experience {attraction} in {islandData.name}: scenic views, relaxing vibes, and memorable adventures.
                    </p>
                    <div className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                      Learn More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Other Islands Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore Other Islands
              </h2>
              <p className="text-lg text-gray-600">
                Discover more amazing destinations in the Andaman Islands
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {islandsData.map((island) => (
                <Link
                  key={island.name}
                  href={`/islands/${island.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`block p-4 rounded-lg text-center transition-all duration-200 ${island.name === islandData.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                  <div className="text-2xl mb-2">🏝️</div>
                  <div className="font-medium text-sm">{island.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IslandPage;
