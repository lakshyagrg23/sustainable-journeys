"use client";

import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Islands data with all locations and attractions
const islandsData = [
  {
    name: "Port Blair",
    description: "The capital city of Andaman and Nicobar Islands, known for its historical significance and beautiful beaches.",
    attractions: [
      "Jolly Buoy Island",
      "Cellular Jail",
      "North Bay Island",
      "Ross Island",
      "Chidiatapu",
      "Corbyns Cove",
      "Museums",
      "Flag Point",
      "Rajiv Gandhi Water Sports Complex"
    ]
  },
  {
    name: "Havelock",
    description: "Famous for its pristine beaches, crystal clear waters, and vibrant coral reefs.",
    attractions: [
      "Radhanagar Beach",
      "Elephant Beach",
      "Kalapathar Beach",
      "Neil (Shaheed Dweep)",
      "Laxmanpur Beach",
      "Bharatpur Beach",
      "Natural Rock",
      "Sitapur Beach",
      "Barren Island"
    ]
  },
  {
    name: "Mayabunder",
    description: "A serene island known for its beautiful beaches, waterfalls, and limestone caves.",
    attractions: [
      "Karmatang Beach",
      "Avis Island",
      "German Jetty",
      "Little Andaman",
      "Butler Bay Beach",
      "Kalapathar Limestone Caves",
      "White Surf Waterfall",
      "Whisper Wave Waterfall",
      "Red Palm Oil Plantation",
      "Light House"
    ]
  },
  {
    name: "Baratang",
    description: "Home to unique natural wonders including limestone caves and mud volcanoes.",
    attractions: [
      "Lime Stone Caves",
      "Mud Volcano",
      "Parrot Island",
      "Long Island",
      "Lalaji Bay Beach",
      "Guitar Island",
      "Merk Bay Beach"
    ]
  },
  {
    name: "Diglipur",
    description: "The northernmost island known for its diverse landscapes and adventure activities.",
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
    description: "A peaceful island with beautiful beaches, mangroves, and waterfalls.",
    attractions: [
      "Dhaninallah Mangrove Walkway",
      "Morrice Dera Beach",
      "Yeratta Creek",
      "Ambkunj Beach",
      "Panchavati Waterfalls",
      "Cuthbert Bay Beach"
    ]
  },
];

const IslandsPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 ">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Explore Andaman Islands
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Discover the breathtaking beauty of the Andaman and Nicobar Islands.
                From pristine beaches to historical landmarks, each island offers a unique experience.
              </p>
            </div>
          </div>
        </div>

        {/* Islands Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Islands to Visit
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated list of the most beautiful and exciting islands in the Andaman archipelago.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {islandsData.map((island) => (
              <div key={island.name} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Island Header */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🏝️</div>
                    <h3 className="text-2xl font-bold">{island.name}</h3>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      {island.attractions.length} Attractions
                    </span>
                  </div>
                </div>

                {/* Island Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {island.description}
                  </p>

                  {/* Top Attractions */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Top Attractions:</h4>
                    <div className="space-y-2">
                      {island.attractions.slice(0, 4).map((attraction) => (
                        <div key={attraction} className="flex items-center text-sm text-gray-600">
                          <span className="text-blue-500 mr-2">•</span>
                          {attraction}
                        </div>
                      ))}
                      {island.attractions.length > 4 && (
                        <div className="text-sm text-blue-600 font-medium">
                          +{island.attractions.length - 4} more attractions
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/islands/${island.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    >
                      Explore Island
                    </Link>
                    <Link
                      href="/packages"
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      View Packages
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Andaman */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Andaman Islands?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the perfect blend of adventure, relaxation, and natural beauty
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏖️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pristine Beaches</h3>
                <p className="text-gray-600 text-sm">
                  Crystal clear waters and white sandy beaches perfect for relaxation
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤿</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Water Sports</h3>
                <p className="text-gray-600 text-sm">
                  Snorkeling, scuba diving, and other exciting water activities
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rich History</h3>
                <p className="text-gray-600 text-sm">
                  Historical landmarks and cultural heritage sites to explore
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌴</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Beauty</h3>
                <p className="text-gray-600 text-sm">
                  Lush greenery, waterfalls, and diverse wildlife
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Explore Andaman Islands?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Book your dream vacation to the Andaman Islands and create unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                View All Packages
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IslandsPage;
