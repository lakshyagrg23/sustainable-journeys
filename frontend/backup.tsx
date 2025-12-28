"use client"
import Footer from '@/components/Footer';
import React, { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';


// --- SVG Icons ---
// Using inline SVGs for icons to avoid external dependencies and ensure they always load.
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14 text-blue-600 mb-4">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const EasyBookingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14 text-orange-500 mb-4">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const BestPriceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14 text-blue-600 mb-4">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />
    <path d="M12 12l-2-2" />
    <path d="M12 12l2 2" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);


// --- Main App Component ---
export default function App() {
  // --- Data for Bike Slider ---
  // Using an array of objects makes the slider dynamic and easy to update.
  const popularBikes = [
    {
      name: 'Honda Activa',
      description: 'Perfect for city rides and solo travelers.',
      price: 400,
      image: 'https://placehold.co/600x400/3498db/ffffff?text=Activa',
    },
    {
      name: 'Royal Enfield Classic',
      description: 'For the adventurer who loves power and comfort.',
      price: 900,
      image: 'https://placehold.co/600x400/e67e22/ffffff?text=Enfield',
    },
    {
      name: 'Vespa',
      description: 'Stylish and easy to handle for all ages.',
      price: 500,
      image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Vespa',
    },
    {
      name: 'Bajaj Avenger',
      description: 'A comfortable cruiser for long coastal roads.',
      price: 750,
      image: 'https://placehold.co/600x400/9b59b6/ffffff?text=Avenger',
    },
    {
      name: 'TVS Jupiter',
      description: 'A reliable and fuel-efficient scooter choice.',
      price: 450,
      image: 'https://placehold.co/600x400/f1c40f/ffffff?text=Jupiter',
    },
  ];

  // --- Slider Logic ---
  // useRef is used to get a direct reference to the slider's scroll container.
  const sliderRef = useRef<HTMLDivElement>(null);

  // Function to scroll the slider to the left
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  // Function to scroll the slider to the right
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const [inquire, setInquire] = useState({ name: '', phone: '', dates: '', bike: '' });
  const [inquireSuccess, setInquireSuccess] = useState(false);
  const handleInquireChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInquire({ ...inquire, [e.target.name]: e.target.value });
  };
  const handleInquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquireSuccess(true);
    setTimeout(() => setInquireSuccess(false), 3000);
    setInquire({ name: '', phone: '', dates: '', bike: '' });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 font-sans">
        {/* --- Hero Section --- */}
        <section className="relative flex flex-col items-center justify-center min-h-[60vh] w-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full z-0">
            <img
              src="https://png.pngtree.com/thumb_back/fh260/background/20220210/pngtree-couple-kissing-on-motorcycle-together-nature-motorbike-photo-image_21363614.jpg"
              alt="Andaman coastline with a winding road"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://placehold.co/1920x1080/e2e8f0/334155?text=Image+Error';
              }}
            />
            <div className="absolute inset-0 bg-black/50 z-10" />
          </div>
          {/* Inquire Form - smart, compact, floating on hero */}
          <form onSubmit={handleInquireSubmit} className="absolute z-20 top-8 right-4 sm:right-12  backdrop-blur-md rounded-xl shadow-xl p-4 sm:p-6 flex flex-col gap-3 w-[90vw] max-w-xs border border-blue-100">
            <h3 className="text-lg font-bold white-text mb-1">Quick Inquiry</h3>
            <input name="name" value={inquire.name} onChange={handleInquireChange} required placeholder="Your Name" className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-sm" />
            <input name="phone" value={inquire.phone} onChange={handleInquireChange} required placeholder="Phone Number" className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-sm" />
            <input name="dates" value={inquire.dates} onChange={handleInquireChange} required placeholder="Travel Dates" className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-sm" />
            <select name="bike" value={inquire.bike} onChange={handleInquireChange} required className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-sm">
              <option value="">Select Bike</option>
              {popularBikes.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
            </select>
            <button type="submit" className="bg-orange-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 mt-1 transition-all">Inquire Now</button>
            {inquireSuccess && <div className="text-green-600 text-sm font-semibold mt-1">Inquiry sent!</div>}
          </form>
          {/* Hero Text */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28 w-full max-w-2xl mx-auto ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
              Explore Andaman on Two Wheels
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6 font-medium drop-shadow">
              Sarthi Andaman Bike Rentals – Discover the islands with freedom, comfort, and style.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-orange-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 text-base sm:text-lg"
            >
              contact
            </Link>
          </div>
        </section>

        {/* --- Why Sarthi Andaman Section --- */}
        <section id="why-sarthi" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Why Choose <span className="text-blue-600">Sarthi Andaman?</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">Your trusted partner for island adventures.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                <GlobeIcon />
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Wide Range of Bikes</h3>
                <p className="text-gray-600">From scooters to Royal Enfields, we have the perfect ride for every traveler and every terrain.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                <EasyBookingIcon />
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Easy Booking & Support</h3>
                <p className="text-gray-600">Book online in minutes. Our team is always ready to help you with your journey.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                <BestPriceIcon />
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Best Prices & Quality</h3>
                <p className="text-gray-600">Transparent pricing, well-maintained bikes, and no hidden charges. Ride with confidence!</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Popular Bikes Section (Slider) --- */}
        <section id="bike-slider" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-8 text-center">Popular Bikes for Rent</h2>
            <div className="relative">
              <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-blue-100 hover:bg-blue-600 hover:text-white text-blue-700 rounded-full p-3 shadow-lg transition-all duration-300 group hidden sm:block" aria-label="Previous bikes">
                <ChevronLeftIcon />
              </button>
              <div ref={sliderRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-2 hide-scrollbar snap-x snap-mandatory">
                {popularBikes.map((bike, idx) => (
                  <div key={bike.name} className="min-w-[270px] max-w-xs bg-white rounded-2xl shadow-xl border border-blue-100 flex flex-col items-center snap-center transition-transform duration-300 hover:scale-105">
                    <img src={bike.image} alt={bike.name} className="w-full h-44 object-cover rounded-t-2xl" />
                    <div className="p-4 flex flex-col items-center w-full">
                      <h3 className="text-lg font-bold text-blue-800 mb-1 text-center">{bike.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 text-center">{bike.description}</p>
                      <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">From ₹{bike.price}/day</span>
                      <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-orange-500 text-white rounded-lg font-semibold text-sm transition-all">Inquire</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-blue-100 hover:bg-blue-600 hover:text-white text-blue-700 rounded-full p-3 shadow-lg transition-all duration-300 group hidden sm:block" aria-label="Next bikes">
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </section>

        {/* --- How It Works Section --- */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Get Your Ride in <span className="text-blue-600">3 Easy Steps</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full mb-4 text-3xl font-bold text-blue-700">1</div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Choose Your Bike</h3>
                <p className="text-gray-600">Browse our fleet and pick the perfect bike for your trip.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4 text-3xl font-bold text-orange-600">2</div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Book Instantly</h3>
                <p className="text-gray-600">Reserve online in minutes with easy payment options.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full mb-4 text-3xl font-bold text-blue-700">3</div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">Enjoy the Ride</h3>
                <p className="text-gray-600">Pick up your bike and start exploring Andaman at your own pace.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Customer Reviews Section --- */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                What Our <span className="text-orange-500">Customers Say</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">🌟🌟🌟🌟🌟</div>
                <p className="text-gray-700 italic mb-6">"Best bike rental experience in Andaman! The bikes were new and the team was super helpful."</p>
                <span className="font-bold text-blue-700">- Priya S.</span>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">🌟🌟🌟🌟🌟</div>
                <p className="text-gray-700 italic mb-6">"Easy booking, great prices, and the ride was smooth. Highly recommend Sarthi Andaman!"</p>
                <span className="font-bold text-orange-500">- Rahul K.</span>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">�🌟🌟🌟🌟</div>
                <p className="text-gray-700 italic mb-6">"Loved the service and the support. Will book again on my next trip!"</p>
                <span className="font-bold text-blue-700">- Anjali M.</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} Sarthi Andaman Bike Rentals. All Rights Reserved.</p>
          </div>
        </footer>
      </main>
      <Footer />
    </>
  );
}
