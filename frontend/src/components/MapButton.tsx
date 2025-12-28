"use client";

import { useState } from "react";
import { MapPinned, X } from "lucide-react"; // use MapPinned for a better map icon
import Image from "next/image";
// import { FaMap } from "react-icons/fa";

const MapButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Circular Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-25 right-5 z-50 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-green-600 text-white border-2 border-green-600 shadow-xl hover:bg-green-600 hover:text-white transition-all duration-200 group"
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)' }}
        aria-label="Open Map"
      >
        <MapPinned className="w-5 h-5 md:w-8 md:h-8 transition-transform duration-200 group-hover:scale-110" />
      </button>

      {/* Fullscreen Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-8 text-blue-700 bg-white hover:bg-blue-600 hover:text-white rounded-full p-2 shadow-lg border-2 border-blue-600 transition-all duration-200"
            aria-label="Close Map"
          >
            <X size={28} />
          </button>

          {/* Map Image */}
          <div className="max-w-4xl w-full p-4 flex items-center justify-center">
            <Image
              width={1920}
              height={1080}
              src="/map/Sarthi.png"
              alt="Andaman Map"
              className="w-full h-auto max-h-[80vh] rounded-2xl border-4 border-white shadow-2xl object-contain bg-blue-200"
              style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.22)' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MapButton;
