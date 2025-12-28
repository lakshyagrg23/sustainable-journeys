import React from 'react';
import Image from 'next/image';
import { MapPin, Heart, Compass, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/Contact';

export const metadata = {
  title: 'About - Saarthi Andaman',
  description: 'Learn about Saarthi Andaman — local experts for Andaman travel.'
}


const AboutPage = () => {
  const features = [
    {
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
      title: "Local Expertise",
      description: "We are islanders who know every secret of these pristine islands."
    },
    {

      icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
      title: "Custom Itineraries",
      description: "Every trip is crafted to match your style and preferences."
    },
    {
      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
      title: "Adventure & Comfort",
      description: "Perfect blend of thrilling activities and relaxing moments."
    },
    {
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
      title: "Complete Support",
      description: "24/7 support from booking to departure and beyond."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Compact Hero Section ,*/}
        <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/port-blair/Corbyns1.jpeg"
              alt="Pristine Andaman Beach"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25"
            />
          </div>
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-teal-700/85"></div> */}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="text-center">
              <div className="inline-block mb-2 sm:mb-3">
                <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 backdrop-blur-sm">
                  <span className="mr-1">🏝️</span>
                  Trusted Partner Since 2018
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                Discover <span className="text-yellow-400">Andaman</span><br />
                <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light">with Saarthi</span>
              </h1>
              <p className="text-xs sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed opacity-90">
                We craft unforgettable island experiences that connect you with the pristine beauty of the Andaman Islands
              </p>

              {/* Ultra Compact Hero Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-yellow-400">4.9★</div>
                  <div className="text-xs text-white/80">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-yellow-400">1000+</div>
                  <div className="text-xs text-white/80">Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-yellow-400">6+</div>
                  <div className="text-xs text-white/80">Years</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="bg-yellow-400 text-gray-900 px-5 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-xs sm:text-base hover:bg-yellow-300 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                  Explore Packages
                </button>
                <button className="border-2 border-white/30 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-xs sm:text-base hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                  Watch Tour
                </button>
              </div>
            </div>
          </div>

          {/* Compact Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-6 sm:h-8 lg:h-12 fill-current text-blue-50">
              <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
            </svg>
          </div>
        </section>        {/* Main Content - Ultra Compact Version */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Ultra Compact Story Section */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block mb-2 sm:mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Our Story
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  Born from a <span className="text-blue-600">Love</span> for the Islands
                </h2>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  <p className="text-xs sm:text-sm md:text-base text-gray-800 font-medium">
                    Founded in 2018 by passionate islanders, Saarthi Andaman was born from a simple belief: every traveler deserves to experience the true magic of these pristine islands.
                  </p>
                  <p className="text-xs sm:text-sm">
                    We specialize in creating personalized adventures that showcase hidden gems, local culture, and authentic experiences beyond typical tourist spots.
                  </p>
                  <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border-l-4 border-blue-400 italic text-xs sm:text-sm">
                    &quot;Let us be your Saarthi — your guide to discovering not just the Andamans, but a part of yourself.&quot;
                  </div>
                </div>

                {/* Ultra Compact Stats */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-sm sm:text-lg md:text-xl font-bold text-blue-600 mb-1">1000+</div>
                    <div className="text-xs text-gray-600">Travelers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm sm:text-lg md:text-xl font-bold text-blue-600 mb-1">75+</div>
                    <div className="text-xs text-gray-600">Packages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm sm:text-lg md:text-xl font-bold text-blue-600 mb-1">25+</div>
                    <div className="text-xs text-gray-600">Islands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm sm:text-lg md:text-xl font-bold text-blue-600 mb-1">6+</div>
                    <div className="text-xs text-gray-600">Years</div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative">
                {/* Simple Clean Photo Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 h-64 sm:h-72 lg:h-80">
                  {/* Top left */}
                  <div className="relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Beautiful Andaman Beach"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Top right */}
                  <div className="relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/mayabunder/Butlerbay1.jpeg"
                      alt="Crystal Clear Waters"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Bottom left */}
                  <div className="relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/rajiv-gandhi3.jpeg"
                      alt="Scuba Diving Adventure"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Bottom right */}
                  <div className="relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/rangat/natural-rock1.webp"
                      alt="Water Sports"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Why Choose Us Section - 4 Cards Only */}
          <div className="mb-8 sm:mb-12">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block mb-2 sm:mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                What Makes Us <span className="text-blue-600">Special</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
                Local expertise, personalized service, and genuine care for extraordinary experiences
              </p>
            </div>

            {/* Grid: 2x2 on mobile, 1x4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl mb-2 sm:mb-3 lg:mb-4 mx-auto group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 mb-1 sm:mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-xs lg:text-sm text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Compact Image Gallery Section */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-teal-100 text-teal-800">
                  <span className="mr-1 sm:mr-2">📸</span>
                  Visual Journey
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Glimpses of <span className="text-teal-600">Paradise</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Experience the diverse beauty of the Andaman Islands
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              {/* Feature image */}
              <div className="col-span-2 row-span-2">
                <div className="relative h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <Image
                    src="/mayabunder/Kalapathar4.jpg"
                    alt="Radhanagar Beach"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <p className="text-xs sm:text-sm opacity-90">World&apos;s Best Beach</p>
                  </div>
                </div>
              </div>

              {/* Smaller images */}
              <div className="relative h-20 sm:h-24 md:h-32 rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Image
                  src="/kalipur-beach3.png"
                  alt="Scuba Diving"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 left-1 text-white">

                </div>
              </div>

              <div className="relative h-20 sm:h-24 md:h-32 rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Image
                  src="/ross-island.jpg"
                  alt="Sunset"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 left-1 text-white">

                </div>
              </div>

              <div className="relative h-20 sm:h-24 md:h-32 rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Image
                  src="/cellular1.jpeg"
                  alt="Water Sports"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 left-1 text-white">

                </div>
              </div>

              <div className="relative h-20 sm:h-24 md:h-32 rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Image
                  src="/ross2.jpeg"
                  alt="Island Hopping"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 left-1 text-white">

                </div>
              </div>
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full font-semibold text-sm sm:text-base hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="mr-2">📱</span>
                View Gallery
              </button>
            </div>
          </div>

          {/* Compact Mission & Testimonials */}
          <div className="mb-12 sm:mb-16">
            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white relative overflow-hidden mb-8 sm:mb-12">
              <div className="absolute inset-0 opacity-10">
                <Image
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Background"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="relative z-10">
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                    <span className="mr-1 sm:mr-2">🎯</span>
                    Our Mission
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                  Creating Memories, One Island at a Time
                </h2>
                <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed max-w-3xl mx-auto opacity-90">
                  We don&apos;t just want you to see the islands — we want you to <span className="text-yellow-400 font-semibold">feel them</span>, <span className="text-yellow-400 font-semibold">live them</span>, and <span className="text-yellow-400 font-semibold">treasure them</span> forever.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="inline-flex items-center space-x-2 bg-yellow-400 text-gray-900 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-yellow-300 transition-colors cursor-pointer">
                    <span>🌊</span>
                    <span>Start Adventure</span>
                  </div>
                  <div className="flex items-center text-white/80 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>Watch Story</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Testimonials */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-amber-100 text-amber-800">
                  <span className="mr-1 sm:mr-2">💬</span>
                  Traveler Stories
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Stories from the <span className="text-amber-600">Heart</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 relative group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs sm:text-sm text-gray-500">5.0</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed">
                  &quot;Saarthi transformed our honeymoon into a fairy tale. Every moment was crafted with love and attention to detail.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white font-bold text-xs sm:text-sm">RK</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Rahul & Kavya</h4>
                    <p className="text-xs text-gray-500">Honeymoon • Mumbai</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 relative group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs sm:text-sm text-gray-500">5.0</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed">
                  &quot;As a solo female traveler, the team ensured my safety and connected me with amazing experiences. Truly empowering!&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white font-bold text-xs sm:text-sm">AS</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Ananya Sharma</h4>
                    <p className="text-xs text-gray-500">Solo • Bangalore</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 relative group hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs sm:text-sm text-gray-500">5.0</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed">
                  &quot;Perfect family service with activities for all ages. The cultural tours were educational and engaging for everyone.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white font-bold text-xs sm:text-sm">MF</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Mehta Family</h4>
                    <p className="text-xs text-gray-500">Family • Delhi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Trusted by Travelers Worldwide</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">4.9/5</div>
                  <div className="text-xs sm:text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">98%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Satisfied</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">95%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Repeat</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">1000+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Contact CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl max-w-4xl mx-auto border border-blue-200 relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-2xl"></div>
              <div className="absolute top-5 right-0 w-24 h-24 sm:w-40 sm:h-40 bg-yellow-400/20 rounded-full translate-x-10 -translate-y-10 blur-2xl"></div>

              <div className="relative z-10 text-white">
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                    <span className="mr-1 sm:mr-2">🤝</span>
                    Ready to Explore?
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                  Your Island Adventure
                  <br />
                  <span className="text-yellow-300">Starts Here</span>
                </h3>
                <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
                  From pristine beaches to underwater wonders — let our experts craft your perfect Andaman experience.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
                  <button className="group bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 shadow-xl hover:shadow-yellow-400/25 transform hover:-translate-y-1 flex items-center">
                    <span className="mr-2">🏝️</span>
                    Plan My Trip
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <a
                    href="tel:+91-8944999448"
                    className="group border-2 border-white/40 text-white hover:bg-white/10 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 backdrop-blur-sm flex items-center"
                  >
                    <span className="mr-2">📞</span>
                    Call Experts: +91-8944999448
                  </a>
                </div>

                {/* Compact contact methods */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
                  <div className="flex flex-col items-center space-y-1 sm:space-y-2 text-white/90">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-xs sm:text-sm">Email</div>
                      <div className="text-xs opacity-80">24/7</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-1 sm:space-y-2 text-white/90">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-xs sm:text-sm">Call</div>
                      <div className="text-xs opacity-80">Instant</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-1 sm:space-y-2 text-white/90">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-xs sm:text-sm">WhatsApp</div>
                      <div className="text-xs opacity-80">Quick</div>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/80">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Free Consultation</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Best Price</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ContactSection />

    </>
  );
};

export default AboutPage;