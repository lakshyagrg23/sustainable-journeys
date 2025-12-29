'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useIslandPageStore } from '../../store/island';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeout = React.useRef<number | null>(null);

  // const { islandPages, fetchAllPages } = useIslandPageStore();

  // Fetch islands on component mount
  // useEffect(() => {
  //   fetchAllPages();
  // }, [fetchAllPages]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const cancelClose = () => {
    if (closeTimeout.current) {
      window.clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const scheduleClose = (delay = 150) => {
    cancelClose();
    closeTimeout.current = window.setTimeout(() => {
      setActiveDropdown(null);
      closeTimeout.current = null;
    }, delay) as unknown as number;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  useEffect(() => {
    return () => {
      // cleanup timeout on unmount
      if (closeTimeout.current) {
        window.clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  // Type definitions
  // interface Island {
  //   id: number;
  //   documentId: string;
  //   name: string;
  //   duration?: string;
  //   best_time?: string;
  //   short_description?: string;
  // }

  interface DropdownItem {
    label: string;
    href: string;
  }

  // Islands data with all locations and attractions
  const islandsData = [
    {
      name: "Port Blair",
      attractions: [
        "Jolly Buoy Island",
        "Cellular Jail",
        "North Bay Island",
        "Ross Island",
        "Chidiya-Tapu",
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
        // "Laxmanpur Beach",
        // "Bharatpur Beach",
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
      name: "Barren Island",
      attractions: [
        'Barren Island',
        // "Volcano",
        // "Diving",
        // "Snorkeling"
      ]
    },
    {
      name: "Mayabunder",
      attractions: [
        "Karmatang Beach",
        "Avis Island",
        "German Jetty",
        // "Butler Bay Beach",
        // "Kalapathar Limestone Caves",
        // "White Surf Waterfall",
        // "Light House"
      ]
    },
    // {
    //   name: "Baratang",
    //   attractions: [
    //     "Lime Stone Caves",
    //     "Mud Volcano",
    //     "Parrot Island",
    //     // "Long Island",
    //     // "Lalaji Bay Beach",
    //     // "Guitar Island",
    //     // "Merk Bay Beach"
    //   ]
    // },
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
      name: "Long Island",
      attractions: [
        "Lalaji Bay Beach",
        "Guitar Island",
        "Merk Bay Beach"
      ]
    },

    // {
    //   name: "Mayabunder",
    //   attractions: [
    //     "Karmatang Beach",
    //     "Avis Island",
    //     "German Jetty",
    //     // "Butler Bay Beach",
    //     // "Kalapathar Limestone Caves",
    //     // "White Surf Waterfall",
    //     // "Light House"
    //   ]
    // },

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
      name: "Little Andaman",
      attractions: [
        "Butler Bay Beach",
        "Kalapathar Limestone caves",
        "White Surf Waterfall",
        "Light House"
      ]
    }

  ];

  // Create dynamic destinations dropdown from islands
  // const destinationsDropdown: DropdownItem[] = islandPages?.map((island: Island) => ({
  //   label: island.name,
  //   href: `/${island.documentId}` // Use documentId directly
  // })) || [];

const navLinks = [
  { href: "/treks", label: "Treks", hasDropdown: false },
  { href: "/tours", label: "Tours", hasDropdown: false },
  { href: "/regions", label: "Regions", hasDropdown: false },
  { href: "/packages", label: "All Trips", hasDropdown: false },
  { href: "/blog", label: "Travel Guide", hasDropdown: false },
  { href: "/about", label: "About", hasDropdown: false },
  { href: "/contact", label: "Contact", hasDropdown: false },
];


  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 
        ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/90 backdrop-blur-sm'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  width={60}
                  height={30}
                  src="/Logo/SJ-Logo.jpeg"
                  alt="Sustainable Journeys Logo"
                  className="rounded-lg object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item) => (
                <div key={item.label} className="relative"
                  onMouseEnter={() => { if (item.hasDropdown) { cancelClose(); setActiveDropdown(item.label); } }}
                  onMouseLeave={() => { if (item.hasDropdown) scheduleClose(200); }}
                >
                  {item.hasDropdown ? (
                    <div className="group">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDropdown(item.label);
                        }}
                        className={`inline-flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium 
                          transition-colors duration-200 ${activeDropdown === item.label ? 'text-blue-600 bg-blue-50' : ''}`}
                      >
                        {item.label}
                        <svg
                          className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Regular Dropdown */}
                      {activeDropdown === item.label && !item.isIslandsDropdown && (
                        <div
                          onMouseEnter={() => cancelClose()}
                          onMouseLeave={() => scheduleClose(150)}
                          className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
                        >
                          <div className="py-2">
                            {item.dropdown?.map((dropItem: DropdownItem) => (
                              <Link
                                key={dropItem.label}
                                href={dropItem.href}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 capitalize"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {dropItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <a
                href="tel:+918944999448"
                className="mr-4 inline-flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                aria-label="Call us"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>

              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none p-2 rounded-lg transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 border-t border-gray-200 mt-2 bg-white/90 backdrop-blur-sm rounded-b-xl">
              {navLinks.map((item) => (
                <div key={item.label} className="block">
                  {item.hasDropdown ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => handleDropdown(item.label)}
                        className="flex w-full justify-between items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg text-base font-medium transition-colors duration-200"
                      >
                        {item.label}
                        <svg
                          className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${activeDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                      >
                        {item.isIslandsDropdown ? (
                          // Mobile Islands dropdown
                          <div className="pl-4 border-l-2 border-blue-200 ml-3 space-y-3">
                            {islandsData.map((island) => (
                              <div key={island.name} className="space-y-2">
                                <h4 className="font-semibold text-gray-900 text-sm pt-2">
                                  {island.name}
                                </h4>
                                <div className="pl-2 space-y-1">
                                  {island.attractions.map((attraction) => (
                                    <Link
                                      key={attraction}
                                      href={`/islands/${island.name.toLowerCase().replace(/\s+/g, '-')}/${attraction.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setActiveDropdown(null);
                                      }}
                                    >
                                      {attraction}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Regular mobile dropdown
                          <div className="pl-4 border-l-2 border-blue-200 ml-3 space-y-1">
                            {item.dropdown?.map((dropItem: DropdownItem) => (
                              <Link
                                key={dropItem.label}
                                href={dropItem.href}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 capitalize"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                {dropItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile-only quick link (left-aligned like other links) */}
              <div className="block mt-3">
                <Link
                  href="/"
                  className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Back to Home
                </Link>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-200 ">
                <a
                  href="tel:+918944999448"
                  className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm "
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us: +91-8944999448
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Islands Dropdown - Outside nav container */}
        {activeDropdown === "Islands & Sightseeing" && (
          <div
            onMouseEnter={() => cancelClose()}
            onMouseLeave={() => scheduleClose(150)}
            className="absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40 animate-in fade-in slide-in-from-top-1 duration-200"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Desktop: 5 columns per row */}
              <div className="hidden lg:block">
                {/* 5 columns, each column stacks two islands (index i and i+5) */}
                <div className="grid grid-cols-5 gap-x-6 gap-y-4 items-stretch" style={{ gridAutoRows: '1fr' }}>
                  {Array.from({ length: 5 }).map((_, colIndex) => {
                    const first = islandsData[colIndex];
                    const second = islandsData[colIndex + 5];
                    return (
                      <div key={colIndex} className="flex flex-col h-full min-h-0">
                        {/* First island in column */}
                        {first && (
                          <div className="mb-4">
                            <h3 className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-1 mb-2">
                              {first.name}
                            </h3>
                            <ul className="space-y-1">
                              {first.attractions.map((attraction) => (
                                <li key={first.name + '-' + attraction}>
                                  <Link
                                    href={`/islands/${first.name.toLowerCase().replace(/\s+/g, '-')}/${attraction.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-150 block"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {attraction}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Second island in column (stacked below) */}
                        {second && (
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-1 mb-2">
                              {second.name}
                            </h3>
                            <ul className="space-y-1">
                              {second.attractions.map((attraction) => (
                                <li key={second.name + '-' + attraction}>
                                  <Link
                                    href={`/islands/${second.name.toLowerCase().replace(/\s+/g, '-')}/${attraction.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-150 block"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {attraction}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile / Tablet */}
              <div className="lg:hidden">
                <div className="max-h-80 overflow-y-auto -mx-4 px-4">
                  <div className="grid grid-cols-2 gap-3">
                    {islandsData.slice(0, 10).map((island) => (
                      <div key={island.name} className="bg-white rounded-lg p-3 shadow-sm">
                        <h3 className="font-semibold text-blue-600 text-sm mb-2">
                          {island.name}
                        </h3>
                        <ul className="space-y-1 text-xs text-gray-600">
                          {island.attractions.map((attraction) => (
                            <li key={attraction}>
                              <Link
                                href={`/islands/${island.name.toLowerCase().replace(/\s+/g, '-')}/${attraction.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {attraction}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
};

export default Navbar;

// TODO: Update Islands dropdown to 5-column desktop grid and mobile scroll