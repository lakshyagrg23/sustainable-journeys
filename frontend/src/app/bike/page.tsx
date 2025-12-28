"use client";
import React, { useState, } from 'react';

import Navbar from '@/components/Navbar';
import Image from 'next/image';




const BikePage: React.FC = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Top Hero Section */}
        <section className="relative text-white bg-gradient-to-r from-black to-gray-700">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                  Discover Comfort With <span className="text-yellow-400"> Bike Rental in Andaman </span> in Andaman
                </h1>
                <p className="text-blue-100 md:text-lg">
                  Explore the islands with Saarthi Andaman. Best bikes, transparent pricing,
                  unlimited km and free helmets.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  width={900}
                  height={600}
                  src="/bike3.png"
                  alt="Andaman bike rental scooter"
                  className="w-full max-w-xl h-auto object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>

        </section>

        {/* Image Row Section - Add your images below */}


        {/* About Hero Section */}
        <section className="relative bg-white">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                  About <span className="text-orange-600">Saarthi Andaman</span> Bike Rental
                </h1>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When it comes to bike booking in Andaman, <span className="font-semibold">Saarthi Andaman</span> is your best and most reliable option. Feel the freedom of the open road and adventure when you get a <span className="font-semibold">bike rental in Andaman</span>, and you will begin to realize just what a paradise this is — the beach, nature and outdoor skill will create unforgettable adventures. With bike rental in Andaman, you can experience the beauty of the island at your own leisure. The scenic islands with stunning beaches, lush green forests and thousands of fish create a perfect backdrop for outdoor lovers and adventure seekers alike.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This guide offers a complete overview on how to book the right <span className="font-semibold">bike rental in Andaman</span>. When booking your Andaman bike rental, this guide is perfect.
                </p>
                <div className="mt-6">
                  <a href="#why-choose" className="inline-block text-blue-600 font-semibold">Read more</a>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  width={900}
                  height={600}
                  src="/Honda-Activa.jpg"
                  alt="Scooter for bike rental"
                  className="w-full max-w-xl h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="why-choose" className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8">
              Why Choose Bike Rentals In Andaman From <span className="text-orange-500">Saarthi Andaman</span>:
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
                <div className="text-4xl mb-3">👍</div>
                <h3 className="font-semibold text-gray-900 mb-2">We Are Reliable</h3>
                <p className="text-gray-600 text-sm">We never run out of rental bikes. You won’t miss a thing on your trip — time is of the essence!</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
                <div className="text-4xl mb-3">₹</div>
                <h3 className="font-semibold text-gray-900 mb-2">Inexpensive</h3>
                <p className="text-gray-600 text-sm">Clear, transparent pricing with no hidden or extra charges.</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
                <div className="text-4xl mb-3">😊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Experienced Comfort</h3>
                <p className="text-gray-600 text-sm">Explore the beauty of Andaman Islands at your own pace — relaxed and worry-free.</p>
              </div>
            </div>
          </div>
        </section>


        <section className="py-8">
          <div className="container mx-auto ">
            <div className="flex flex-row gap-4 justify-center items-center">
              <div className="flex-1 flex justify-center">
                <div className="w-full  aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center">
                  {/* Replace src with your image */}
                  <Image src="/bike4.png" alt="Bike Rental 1" width={400} height={300} className="object-cover w-full h-full" />
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-full aspect-[4/3]  rounded-xl overflow-hidden flex items-center justify-center">
                  {/* Replace src with your image */}
                  <Image src="/bike5.png" alt="Bike Rental 2" width={400} height={300} className="object-cover w-full h-full" />
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center">
                  {/* Replace src with your image */}
                  <Image src="/bike3.png" alt="Bike Rental 3" width={400} height={300} className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bike cards and search removed as requested */}

        {/* Map Section */}
        <section className="py-10 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">Andaman Bike Rental Map</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Find your bike rental locations and popular routes across Andaman. Use the map below to plan your ride and explore the islands with ease.</p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-200 flex items-center justify-center cursor-pointer" onClick={() => setIsMapOpen(true)}>
                <Image
                  width={1920}
                  height={1080}
                  src="/map/Sarthi.png"
                  alt="Andaman Bike Rental Map"
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>
          </div>
          {/* Modal for fullscreen map */}
          {isMapOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setIsMapOpen(false)}>
              <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
                <button
                  className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow-lg z-10 hover:bg-blue-600 hover:text-white transition-colors"
                  onClick={() => setIsMapOpen(false)}
                  aria-label="Close"
                >
                  &#10005;
                </button>
                <Image
                  width={1920}
                  height={1080}
                  src="/map/Sarthi.png"
                  alt="Andaman Bike Rental Map Fullscreen"
                  className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-xl shadow-2xl border-4 border-white bg-white"
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default BikePage;