import { create } from "zustand";
import qs from "qs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const useRegionStore = create((set) => ({
  regions: [],
  singleRegion: null,
  loading: false,
  error: null,

  fetchRegions: async () => {
    set({ loading: true, error: null });
    try {
      const query = qs.stringify(
        { populate: { heroImage: true }, sort: ["name:asc"] },
        { encodeValuesOnly: true }
      );
      const res = await fetch(`${API_BASE_URL}/api/regions?${query}`);
      if (!res.ok) throw new Error("Failed to fetch regions");
      const data = await res.json();
      set({ regions: data?.data || [], loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  fetchRegionBySlug: async (slug) => {
    set({ loading: true, error: null, singleRegion: null });
    try {
      const query = qs.stringify(
        {
          filters: { slug: { $eq: slug } },
          populate: { heroImage: true },
        },
        { encodeValuesOnly: true }
      );
      const res = await fetch(`${API_BASE_URL}/api/regions?${query}`);
      if (!res.ok) throw new Error("Failed to fetch region");
      const data = await res.json();
      set({ singleRegion: data?.data?.[0] || null, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },
}));

export default useRegionStore;
