import { create } from "zustand";
import { persist } from "zustand/middleware";
import qs from 'qs';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const useHotelStore = create(
  persist(
    (set, get) => ({
      hotels: [],
      filteredHotels: [],
      selectedCategory: 'All',
      singleHotel: null,
      loading: false,
      error: null,

      fetchHotels: async () => {
        set({ loading: true, error: null });
        try {
          // const query = qs.stringify(
          //   {
          //     populate: {
          //       photo: true,
          //       hotel_rooms: {
          //         populate: ["photo", "gallery"], // Ensure valid keys
          //       },
          //     },
          //   },
          //   { encodeValuesOnly: true }
          // );

          const query = qs.stringify(
            {
              populate: {
                photo: true,
                hotel_rooms: {
                  populate: {
                    photo: true,
                    // gallery: true,
                    Amenities: true, // repeatable component at 1st level inside hotel_rooms
                    // If the component contains nested relations/media, use:
                    // Amenities: { populate: ['someNestedField'] },
                  },
                },
              },
            },
            { encodeValuesOnly: true }
          );

          const res = await fetch(`${API_BASE_URL}/api/hotels?${query}`);
          const data = await res.json();
          console.log("Fetched hotels:", data);
          set({ hotels: data.data, filteredHotels: data.data, loading: false });
        } catch (error) {
          console.error("Error fetching hotels:", error);
          set({ error: error.message, loading: false });
        }
      },


      filterHotels: (category) => {
        const { hotels } = get();
        if (category === 'All') {
          set({ filteredHotels: hotels, selectedCategory: category });
          return;
        }

        const filtered = hotels.filter((hotel) => {
          const price = hotel.price || 0;
          if (category === 'Luxury' && price >= 15000) return true;
          if (category === 'Premium' && price >= 8000 && price < 15000) return true;
          if (category === 'Budget' && price < 8000) return true;
          if (category === 'Standard' || category === 'Deluxe') return hotel.category === category;
          return false;
        });

        set({ filteredHotels: filtered, selectedCategory: category });
      },



      fetchHotelByDocumentId: async (documentId) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(`${API_BASE_URL}/api/hotels?filters[documentId][$eq]=${documentId}&populate=*`);
          const data = await res.json();
          console.log("Fetched hotel by documentId:", data.data[0]);
          if (data.data && data.data.length > 0) {
            set({ singleHotel: data.data[0], loading: false });
          } else {
            set({ error: 'Hotel not found', loading: false });
          }
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: "hotel-storage", // storage key
      partialize: (state) => ({ hotels: state.hotels }), // only persist hotels array
    }
  )
);

export default useHotelStore;
