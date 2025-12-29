"use client";

import { FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";

const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

export default function FloatingButtons() {
  const telHref = phone ? `tel:${phone.replace(/\s/g, "")}` : null;

  return (
    <div className="fixed bottom-6 left-3 z-50 flex flex-col gap-3">
      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>
      ) : null}

      {instagramUrl ? (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 text-white shadow-lg hover:opacity-90 transition"
          aria-label="Instagram"
        >
          <FaInstagram className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>
      ) : null}

      {telHref ? (
        <a
          href={telHref}
          className="flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
          aria-label="Call Phone"
        >
          <FaPhone className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>
      ) : null}
    </div>
  );
}
