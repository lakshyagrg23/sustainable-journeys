'use client';

import React, { useState } from 'react';
import { FaHotel } from 'react-icons/fa'; // Importing the map icon from react-icons FaCar
//import { FaFerry } from "react-icons/fa6";
// import { RiMotorbikeFill } from "react-icons/ri";
import { GiIsland } from "react-icons/gi";
// import { TicketsPlane } from 'lucide-react';

interface TabSystemProps {
  onTabChange?: (tab: string) => void;
}

const TabSystem: React.FC<TabSystemProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('package');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="relative -mt-16 z-20 max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-full p-3 shadow-2xl border-2 border-gray-200">
        <div className="flex justify-center">
          {/* Mobile: horizontal scroll, compact tabs */}

          <div className="flex bg-gray-100 rounded-full p-1 flex-nowrap gap-1 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent md:flex-wrap md:overflow-visible md:whitespace-normal">
            <button
              onClick={() => handleTabChange('package')}
              className={`flex items-center px-3 py-2 rounded-full font-bold transition-all duration-300 text-sm ${activeTab === 'package'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
                }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Package
            </button>
            <button
              onClick={() => handleTabChange('hotel')}
              className={`flex items-center px-3 py-2 rounded-full font-bold transition-all duration-300 text-sm ${activeTab === 'hotel'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
                }`}
            >

              <FaHotel className="w-4 h-4 mr-1" />
              Hotel
            </button>
            <button
              onClick={() => handleTabChange('activity')}
              className={`flex items-center px-3 py-2 rounded-full font-bold transition-all duration-300 text-sm ${activeTab === 'activity'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
                }`}
            >

              <GiIsland className="w-4 h-4 mr-1" />
              {/* Using GiIsland icon for Island tab */}
              Activity
            </button>
            {/* <button
              onClick={() => handleTabChange('bike')}
              className={`flex items-center px-3 py-2 rounded-full font-bold transition-all duration-300 text-sm ${activeTab === 'bike'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
                }`}
            >
              {/* Using FaHotel icon for Bike tab */}
            {/* <RiMotorbikeFill className="w-4 h-4 mr-1" /> */}
            {/* Using RiMotorbikeFill icon for Bike tab */}
            {/* Bike
            </button> */}
            {/* <button
              onClick={() => handleTabChange('Tickets')}
              className={`flex items-center px-3 py-2 rounded-full font-bold transition-all duration-300 text-sm ${activeTab === 'Tickets'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
                }`}
            >
              <TicketsPlane className="w-4 h-4 mr-1" />
              {/* Using FaFerry icon for Ferry tab */}
            {/* Tickets
            </button> * */}
            {/* <button
              onClick={() => handleTabChange('curious')}
              className={`flex items-center px-3 py-2 rounded-full font-bold transition-all duration-300 text-sm ${activeTab === 'curious'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
                }`}
            > */}

            {/* <GiCruiser className="w-4 h-4 mr-1" />
              {/* Using GiCruiser icon for Curious tab */}
            {/* Cruises */}
            {/* </button> *
            {/* <button
              onClick={() => handleTabChange('cap')}
              className={`flex items-center px-3 py-2 rounded-full font-bold transition-all duration-300 text-sm ${activeTab === 'cap'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
                }`}
            >

              <FaCar className="w-4 h-4 mr-1" />
              
              Cap
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSystem;
