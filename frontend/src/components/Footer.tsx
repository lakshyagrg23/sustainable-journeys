'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaChevronRight, FaWhatsapp, FaHeadset } from 'react-icons/fa';
import Link from 'next/link';

// interface Window {
//   dataLayer: Array<Record<string, any>>;
// }

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (k: string) => setOpen(prev => (prev === k ? null : k));

  const handleSocialIconClick = (platform: string, link: string) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'social_icon_click',
        platform: platform,
        link: link,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // Shared lists for desktop and mobile
  const services = [
    { name: 'Tour', path: '/packages' },
    { name: 'Hotel', path: '/hotel' },
    { name: 'Water Sports', path: '/activities' },
    { name: 'Cab', path: '/cab' },
    { name: 'Bike', path: '/bike' },
    { name: 'Terms And Conditions', path: '/termsAndConditions' }
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Reviews', path: '/' },
    { name: 'FAQs', path: '/packages' },
    { name: 'Blog', path: '/blog' }
  ];

  const destinations = [
    { name: 'Port Blair', path: '/islands/port-blair' },
    { name: 'Havelock', path: '/islands/havelock' },
    { name: 'Mayabunder', path: '/islands/mayabunder' },
    { name: 'Baratang', path: '/islands/baratang' },
    { name: 'Diglipur', path: '/islands/diglipur' },
    { name: 'Rangat', path: '/islands/rangat' },
    { name: 'Neil Island', path: '/islands/neil' },
    { name: 'Long Island', path: '/islands/long-island' },
    { name: 'Barren', path: '/islands/barren-island' },
    { name: 'Little Andaman', path: '/islands/little-andaman' }
  ];

  return (
    <footer className="relative bg-[#0a2540] text-gray-300 pt-12 pb-6 font-inter">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop / Large */}
        <div className="hidden lg:grid grid-cols-12 gap-10">
          {/* Brand */}
          <div className="col-span-3 flex flex-col">
            <div className="flex items-center mb-4">
              <Image
                width={100}
                height={100}
                src="/Logo/SA-Logo.png"
                alt="Saarthi Andaman Logo"
                className="h-24 w-24 rounded-full object-contain bg-white p-2 shadow-lg mr-4 border-4 border-blue-200"
                loading="eager"
                priority
              />
              <span className="text-3xl font-extrabold text-white leading-tight drop-shadow-lg">
                Saarthi Andaman
              </span>
            </div>



            <p className="text-sm mb-4 leading-relaxed">
              We are Saarthi Andaman, your local experts for unforgettable adventures in the Andaman & Nicobar Islands. From island-hopping and customizable itineraries to unique tours and travel services.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mr-2 mt-1" size={30} />
                <span>
                  Office : Shop No.22, Municipal Commercial Complex Building, Beside Island Arched, Junglighat, Sri Vijaya Puram (erstwhile Port Blair), 744103
                </span>
              </div>
              <div className="w-full min-w-[420px] max-w-full overflow-x-auto">
                <div className="flex items-center gap-4" style={{ minWidth: 420 }}>
                  <FaWhatsapp className="text-green-400" size={16} />
                  <div className="hover:text-blue-400 transition whitespace-nowrap flex items-center gap-2">
                    <a href="tel:+918944999448">8944999448</a>
                    <a href="https://wa.me/918944999448" target="_blank" rel="noreferrer" className="text-green-400 hover:opacity-80" aria-label="WhatsApp">

                    </a>
                  </div>

                  <FaPhone className="text-blue-400" size={16} />
                  <a href="tel:+919476017072" className="hover:text-blue-400 whitespace-nowrap">
                    9476017072
                  </a>

                  <FaHeadset className="text-blue-400" size={16} />
                  <div className="hover:text-blue-400 whitespace-nowrap flex items-center gap-2">
                    <a href="tel:+913192-223022">+913192223022</a>
                    <a href="tel:+913192223022" className="text-yellow-300 hover:opacity-90" title="Telecaller" aria-label="Telecaller">

                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-2" />
                <a href="mailto:info@saarthiandaman.com" className="hover:text-blue-400 transition">
                  info@saarthiandaman.com
                </a>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <a
                aria-label="Facebook"
                href="https://www.facebook.com/share/1F2EhHytDU/?mibextid=wwXIfr"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3b5998] hover:bg-blue-700 transition"
                onClick={() => handleSocialIconClick('Facebook', 'https://www.facebook.com/share/1F2EhHytDU/?mibextid=wwXIfr')}
              >
                <FaFacebookF />
              </a>
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/saarthi_andaman?igsh=MWxqaGtlZHFndmg0MQ=="
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-300 via-pink-500 to-purple-600 hover:opacity-80 transition"
                onClick={() => handleSocialIconClick('Instagram', 'https://www.instagram.com/saarthi_andaman?igsh=MWxqaGtlZHFndmg0MQ==')}
              >
                <FaInstagram />
              </a>
              <a
                aria-label="Twitter"
                href="https://x.com/saarthiandaman?s=21"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#00acee] hover:bg-blue-400 transition"
                onClick={() => handleSocialIconClick('Twitter', 'https://x.com/saarthiandaman?s=21')}
              >
                <FaTwitter />
              </a>
              <a
                aria-label="LinkedIn"
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0077b5] hover:bg-blue-600 transition"
                onClick={() => handleSocialIconClick('LinkedIn', '#')}
              >
                <FaLinkedinIn />
              </a>
              <a
                aria-label="YouTube"
                href="https://youtube.com/@saarthiandaman?si=FftPryFqC-PsyuSE"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#c4302b] hover:bg-red-700 transition"
                onClick={() => handleSocialIconClick('YouTube', 'https://youtube.com/@saarthiandaman?si=FftPryFqC-PsyuSE')}
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Services + Quick Links */}
          <div className="col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { name: 'Tour', path: '/packages' },
                  { name: 'Hotel', path: '/hotel' },
                  { name: 'Water Sports', path: '/activities' },
                  { name: 'Cab', path: '/cab' },
                  { name: 'Bike', path: '/bike' },
                  { name: 'Terms And Conditions', path: '/termsAndConditions' }
                ].map(item => (
                  <li key={item.path}>
                    <Link href={item.path} className="group flex items-center hover:text-blue-400 transition">
                      <FaChevronRight className="text-blue-400 mr-2 group-hover:translate-x-1 transition" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {['About Us', 'Contact Us', 'Reviews', 'FAQs', 'Blog'].map(item => (
                  <li key={item}>
                    <a href="#" className="group flex items-center hover:text-blue-400 transition">
                      <FaChevronRight className="text-blue-400 mr-2 group-hover:translate-x-1 transition" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Destinations & Payment */}
          <div className="col-span-4 flex flex-col">
            <h3 className="text-white font-bold text-lg mb-3">Popular Destinations</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {/* Show only the 6 main islands from navbar dropdown, with their correct paths */}
              {[
                { name: 'Port Blair', path: '/islands/port-blair' },
                { name: 'Havelock', path: '/islands/havelock' },
                { name: 'Mayabunder', path: '/islands/mayabunder' },
                { name: 'Baratang', path: '/islands/baratang' },
                { name: 'Diglipur', path: '/islands/diglipur' },
                { name: 'Rangat', path: '/islands/rangat' },
                { name: 'Neil Island', path: '/islands/neil' },
                { name: 'Long Island', path: '/islands/long-island' },
                { name: 'Barren', path: '/islands/barren-island' },
                { name: 'Little Andaman', path: '/islands/little-andaman' },
              ].map((island) => (
                <Link
                  key={island.path}
                  href={island.path}
                  className="bg-[#1e3a5f] border border-blue-400 text-gray-200 rounded-full px-4 py-1 text-[11px] tracking-wide hover:bg-blue-500 hover:text-white transition capitalize"
                >
                  {island.name}
                </Link>
              ))}
            </div>

            {/* Saarthi group photo shown only on desktop under Popular Destinations */}
            <div className="hidden lg:flex mt-4 flex-col items-center">
              <a href="/group.png" target="_blank" rel="noreferrer" className="flex flex-col items-center">
                <div className="w-full max-w-xs rounded-lg overflow-hidden mx-auto relative">
                  <p className='text-xl text-center'>A Part of</p>
                  <Image
                    width={360}
                    height={200}
                    src="/group.png"
                    alt="Saarthi Group Photo"
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />

                </div>
              </a>
            </div>

          </div>
        </div>

        {/* Mobile / Tablet Accordion */}
        <div className="lg:hidden space-y-10">
          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center mb-4">
              <Image
                width={100}
                height={100}
                src="/Logo/SA-Logo.png"
                alt="Saarthi Andaman Logo"
                className="h-16 w-16 rounded-full object-contain bg-white p-2 shadow-lg mr-4 border-4 border-blue-200"
                loading="eager"
                priority
              />
              <span className="text-xl font-bold text-white">
                Saarthi Andaman
              </span>
            </div>

            {/* Saarthi group photo (mobile) */}
            <div className="mt-3 flex flex-col items-center">
              <p className='text-sm'>A Part of</p>
              <a href="/group.png" target="_blank" rel="noreferrer" className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-lg overflow-hidden relative mb-2">
                  <Image
                    width={280}
                    height={168}
                    src="/group.png"
                    alt="Saarthi Group Photo"
                    className="w-full h-full object-cover "
                    loading="lazy"
                  />

                </div>
              </a>
            </div>
            <p className="text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              We are Saarthi Andaman, your local experts for unforgettable adventures in the Andaman & Nicobar Islands. From island-hopping and customizable itineraries to unique tours and travel services, we craft never-before experiences to make your journey truly extraordinary.
            </p>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start justify-center">
                <FaMapMarkerAlt className="text-blue-400 mr-2 mt-1" size={20} />
                <span>
                  Office : Shop No.22, Municipal Commercial Complex Building, Beside Island Arched, Junglighat, Sri Vijaya Puram (erstwhile Port Blair), 744103
                </span>
              </div>
              <div className="flex items-center justify-center">
                <FaWhatsapp className="text-green-400 mr-2" />
                <div className="hover:text-blue-400 flex items-center gap-2">
                  <a href="tel:+918944999448">8944999448</a>
                  <a href="https://wa.me/918944999448" target="_blank" rel="noreferrer" className="text-green-400" aria-label="WhatsApp">

                  </a>
                </div>
                <FaPhone className="text-blue-400 m-2" />
                <a href="tel:+919476017072" className="hover:text-blue-400">
                  9476017072
                </a>
                <FaHeadset className="text-blue-400 m-2" />

                <div className="hover:text-blue-400 flex items-center gap-2">
                  <a href="tel:+913192-223022">913192223022</a>
                  <a href="tel:+913192223022" className="text-yellow-300" title="Telecaller" aria-label="Telecaller">

                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <FaEnvelope className="text-blue-400 mr-2" />
                <a
                  href="mailto:info@saarthiandaman.com"
                  className="hover:text-blue-400"
                >
                  info@saarthiandaman.com
                </a>
              </div>
            </div>
            <div className="flex gap-3 mt-5 flex-wrap justify-center">
              {[
                {
                  aria: 'Facebook',
                  cls: 'bg-[#3b5998] hover:bg-blue-700',
                  icon: <FaFacebookF />,
                  href:
                    'https://www.facebook.com/share/1F2EhHytDU/?mibextid=wwXIfr'
                },
                {
                  aria: 'Instagram',
                  cls:
                    'bg-gradient-to-tr from-yellow-300 via-pink-500 to-purple-600 hover:opacity-80',
                  icon: <FaInstagram />,
                  href:
                    'https://www.instagram.com/saarthi_andaman?igsh=MWxqaGtlZHFndmg0MQ=='
                },
                {
                  aria: 'Twitter',
                  cls: 'bg-[#00acee] hover:bg-blue-400',
                  icon: <FaTwitter />,
                  href: 'https://x.com/saarthiandaman?s=21'
                },
                {
                  aria: 'LinkedIn',
                  cls: 'bg-[#0077b5] hover:bg-blue-600',
                  icon: <FaLinkedinIn />,
                  href: 'https://www.linkedin.com/in/saarthi-andaman-98a08137b/'
                },
                {
                  aria: 'YouTube',
                  cls: 'bg-[#c4302b] hover:bg-red-700',
                  icon: <FaYoutube />,
                  href: 'https://youtube.com/@saarthiandaman?si=FftPryFqC-PsyuSE'
                }
              ].map(s => (
                <a
                  key={s.aria}
                  aria-label={s.aria}
                  href={s.href}
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm ${s.cls} transition`}
                  onClick={() => handleSocialIconClick(s.aria, s.href)}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            {/* Services */}
            <div className="border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => toggle('services')}
                className="w-full flex justify-between items-center px-4 py-3 bg-white/5"
              >
                <span className="font-semibold text-sm">Our Services</span>
                <span
                  className={`text-lg transition-transform ${open === 'services' ? 'rotate-45' : ''
                    }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${open === 'services'
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
                  }`}
              >
                <ul className="overflow-hidden px-5 py-3 text-xs space-y-2">
                  {services.map(it => (
                    <li key={it.path}>
                      <Link
                        href={it.path}
                        className="flex items-center hover:text-blue-400 transition"
                      >
                        <FaChevronRight className="text-blue-400 mr-2" size={10} />
                        {it.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => toggle('links')}
                className="w-full flex justify-between items-center px-4 py-3 bg-white/5"
              >
                <span className="font-semibold text-sm">Quick Links</span>
                <span
                  className={`text-lg transition-transform ${open === 'links' ? 'rotate-45' : ''
                    }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${open === 'links'
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
                  }`}
              >
                <ul className="overflow-hidden px-5 py-3 text-xs space-y-2">
                  {quickLinks.map(it => (
                    <li key={it.path}>
                      <Link
                        href={it.path}
                        className="flex items-center hover:text-blue-400 transition"
                      >
                        <FaChevronRight className="text-blue-400 mr-2" size={10} />
                        {it.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Destinations */}
            <div className="border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => toggle('destinations')}
                className="w-full flex justify-between items-center px-4 py-3 bg-white/5"
              >
                <span className="font-semibold text-sm">
                  Popular Destinations
                </span>
                <span
                  className={`text-lg transition-transform ${open === 'destinations' ? 'rotate-45' : ''
                    }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${open === 'destinations'
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
                  }`}
              >
                <div className="overflow-hidden px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {destinations.map(d => (
                      <Link
                        key={d.path}
                        href={d.path}
                        className="bg-[#1e3a5f] border border-blue-400 text-gray-200 rounded-full px-3 py-1 text-[10px] hover:bg-blue-500 hover:text-white transition"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Certifications */}
          <div className="border-y border-gray-600 py-6 bg-white/5 rounded-xl">
            <h3 className="text-center text-white font-bold text-base mb-4">
              Our Certifications
            </h3>
            <div className="flex justify-center items-center gap-4">
              {["/certificates/4.jpg", "/certificates/5.jpg"].map((src, i) => (
                <a key={i} href={src} target="_blank" rel="noreferrer" className="group">
                  {/* fixed box so image can fully cover on mobile */}
                  <div className="h-20 w-28 rounded-lg overflow-hidden shadow-lg border border-white/10 transform transition hover:scale-105">
                    <Image
                      width={240}
                      height={240}
                      src={src}
                      alt={`Certificate ${i + 1}`}
                      className="w-full h-full object-cover bg-transparent"
                      loading="lazy"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Desktop */}
        <div className="hidden lg:block border border-gray-600 my-12 py-10 rounded-xl">
          <div className="text-center">
            <h3 className="text-white font-bold text-xl mb-8">
              Our Certifications
            </h3>
            <div className="flex justify-center items-center gap-8">
              {["/certificates/4.jpg", "/certificates/5.jpg"].map((src, i) => (
                <a key={i} href={src} target="_blank" rel="noreferrer" className="group">
                  <div className="h-32 w-auto rounded-xl overflow-hidden shadow-xl border border-white/10 transform transition hover:scale-105  ">
                    <Image
                      width={300}
                      height={180}
                      src={src}
                      alt={`Certificate ${i + 1}`}
                      className="h-32 w-auto object-contain bg-transparent"
                      loading="lazy"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-400 text-[11px] sm:text-xs space-y-3 mt-10">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {['Terms & Conditions', 'Privacy Policy', 'Cancellation Policy'].map(x => (
              <Link key={x} href="/termsAndConditions" className="hover:text-white transition">
                {x}
              </Link>
            ))}
          </div>
          <p>&copy; {year} Saarthi andaman, All rights reserved.</p>
          <p className="max-w-4xl mx-auto leading-relaxed">
            Registered Establishment under A & N Administration, Licence no. 22336/LC/2025
          </p>
          <p className="max-w-4xl mx-auto leading-relaxed">
            MSME Registered: UDYAM-AN-01-0013848
          </p>
          <p className="max-w-4xl mx-auto leading-relaxed">
            All claims, disputes and litigation relating to online booking through this website
            shall be subject to jurisdiction of Courts of Andaman only. Images shown are for
            representation purpose only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;