"use client";


import { FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa"; // Instagram icon

const FloatingButtons = () => {


  return (
    <>
      {/* Container for Left Side Floating Buttons */}
      <div className="fixed bottom-6 left-1 z-50 flex flex-col gap-4">

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/918944999448" // apna WhatsApp number daal
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-200"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>

        {/* Instagram Button */}
        <a
          href="https://www.instagram.com/saarthi_andaman?igsh=MWxqaGtlZHFndmg0MQ==" // apna Instagram link daalein
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 text-white shadow-lg hover:from-pink-600 hover:to-yellow-500 transition-all duration-200"
          aria-label="Instagram"
        >
          < FaInstagram className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>

        {/* Phone Button */}
        <a
          href="tel:+91-8944999448" // apna phone number daalein
          className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200"
          aria-label="Call Phone"
        >
          <FaPhone className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>
      </div>



    </>
  );
};

export default FloatingButtons;
