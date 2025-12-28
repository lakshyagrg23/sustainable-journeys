import { create } from 'zustand';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const useCapStore = create((set) => ({
  caps: [],
  cap: null,
  loading: false,
  error: null,

  // Fetch all caps
  fetchCaps: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE_URL}/api/caps?populate=*`);
      if (!res.ok) throw new Error('Failed to fetch caps');
      const data = await res.json();
      console.log('Fetched caps:', data);
      set({ caps: data?.data || [], loading: false });
    } catch (err) {
      set({ error: err.message || 'Unknown error', loading: false });
    }
  },




  clearCap: () => set({ cap: null }),
}));

export default useCapStore;
