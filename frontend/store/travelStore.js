import { create } from "zustand";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
import qs from 'qs';

const useTravelStore = create((set) => ({
  activities: [], // (if unused can remove later)
  packages: [],
  singlePackage: null,
  loading: false,
  error: null,

  fetchPackages: async () => {
  set({ loading: true, error: null });
  try {
    const query = qs.stringify(
      {
        populate: {
          images: true,
          gallery: true,
          region: true,
          Whats_Included: true,
          itinerary: { populate: { photo: true } },
        },
        sort: ["createdAt:desc"],
      },
      { encodeValuesOnly: true }
    );

    const res = await fetch(`${API_BASE_URL}/api/packages?${query}`);
    if (!res.ok) throw new Error("Failed to fetch packages");
    const data = await res.json();
    set({ packages: data?.data || [], loading: false });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},


  // fetchPackageById: async (id) => {
  //   if (!id) return;
  //   set({ loading: true, error: null, singlePackage: null });
  //   try {
  //     // console.log('Fetching package by ID/documentId:', id);
  //     const isNumeric = /^\d+$/.test(id);
  //     const filterKey = isNumeric ? 'id' : 'documentId';
  //     const url = `${API_BASE_URL}/api/packages?filters[${filterKey}][$eq]=${encodeURIComponent(id)}&populate=*`;
  //     // const res = await fetch(`${API_BASE_URL}/api/packages?populate[0]=itinerary&populate[1]=itinerary.photo`);
  //     const res = await fetch(url);
  //     if (!res.ok) throw new Error('Failed to fetch package');
  //     const data = await res.json();
  //     const first = data?.data?.[0] || null;
  //     console.log('Fetched package record:', first);
  //     set({ singlePackage: first, loading: false });
  //   } catch (err) {
  //     set({ error: err.message, loading: false });
  //   }
  // },


  // fetchPackageById: async (id) => {
  //   if (!id) return;
  //   set({ loading: true, error: null, singlePackage: null });
  //   try {
  //     const isNumeric = /^\d+$/.test(id);
  //     const filterKey = isNumeric ? 'id' : 'documentId';
  //     // /api/packages?filters[id][$eq]=8&populate[0]=images&populate[1]=gallery&populate[itinerary][populate][0]=photo 
  //     const params =
  //       `filters[${filterKey}][$eq]=${encodeURIComponent(id)}` +
  //       `&populate[0]=images` +                  // first-level media
  //       `&populate[1]=gallery` +                 // first-level media (multiple)
  //       `&populate[itinerary][populate][0]=photo`; // nested media in repeatable component

  //     const url = `${API_BASE_URL}/api/packages?${params}`;
  //     const res = await fetch(url);
  //     if (!res.ok) throw new Error('Failed to fetch package');

  //     const data = await res.json();
  //     const first = data?.data?.[0] || null;
  //     set({ singlePackage: first, loading: false });
  //   } catch (err) {
  //     set({ error: err.message, loading: false });
  //   }
  // },


  fetchPackageById: async (id) => {
    if (!id) return;
    set({ loading: true, error: null, singlePackage: null });

    try {
      const isNumeric = /^\d+$/.test(id);
      const filterKey = isNumeric ? 'id' : 'documentId';

      const query = qs.stringify(
        {
          filters: {
            [filterKey]: { $eq: id },
          },
          populate: {
            images: true,      // first-level media
            gallery: true,     // first-level media (multiple)
            Whats_Included: true, // first-level repeatable component
            itinerary: {       // repeatable component
              populate: { photo: true }, // nested media
            },
          },
        },
        { encodeValuesOnly: true }
      );

      const url = `${API_BASE_URL}/api/packages?${query}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch package');

      const data = await res.json();
      const first = data?.data?.[0] || null;
      set({ singlePackage: first, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchPackageBySlug: async (slug) => {
  if (!slug) return;
  set({ loading: true, error: null, singlePackage: null });

  try {
    const query = qs.stringify(
      {
        filters: {
          slug: { $eq: slug },
        },
        populate: {
          images: true,
          gallery: true,
          region: true,
          Whats_Included: true,
          itinerary: { populate: { photo: true } },
        },
      },
      { encodeValuesOnly: true }
    );

    const url = `${API_BASE_URL}/api/packages?${query}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch package by slug");

    const data = await res.json();
    const first = data?.data?.[0] || null;
    set({ singlePackage: first, loading: false });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
}




}));

export default useTravelStore;
