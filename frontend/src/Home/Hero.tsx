'use client';

import React from 'react';

const Hero = () => {

  return (
    <section className="relative min-h-[45vh] lg:min-h-[50vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover transform rotate-270 origin-center"
        >
          <source src="/saarthi.mp4" type="video/mp4" />
          {/* <source src="/hero.mp4" type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>
        {/* Black overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-[1]"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-20 lg:py-32">
        <div className="space-y-6 lg:space-y-8">
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Welcome to the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse">
              Saarthi Andaman
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;