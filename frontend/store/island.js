// src/store/islandPageStore.js
import { create } from 'zustand';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const useIslandPageStore = create((set) => ({
  islandPages: [],
  singlePage: null,
  loading: false,
  error: null,

  // Fetch all pages
  // fetchAllPages: async () => {
  //   set({ loading: true, error: null });
  //   try {
  //     const res = await fetch(`${API_BASE_URL}/api/islands?populate=*`);
  //     if (!res.ok) throw new Error('Failed to fetch pages');
  //     const data = await res.json();
  //     set({ islandPages: data.data, loading: false });
  //   } catch (err) {
  //     set({ error: err.message, loading: false });
  //   }
  // },

  // Fetch one page by ID
  // fetchPageById: async (id) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const res = await fetch(`${API_BASE_URL}/api/islands?filters[documentId][$eq]=${id}&populate=*`);
  //     if (!res.ok) throw new Error('Failed to fetch page');
  //     const data = await res.json();

  //     if (data.data && data.data.length > 0) {
  //       set({ singlePage: data.data[0], loading: false });
  //     } else {
  //       throw new Error('Island not found');
  //     }
  //   } catch (err) {
  //     set({ error: err.message, loading: false });
  //   }
  // },

  // Fetch page by documentId directly
  // fetchPageByDocumentId: async (documentId) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const res = await fetch(`${API_BASE_URL}/api/islands?filters[documentId][$eq]=${documentId}&populate=*`);
  //     if (!res.ok) throw new Error('Failed to fetch page');
  //     const data = await res.json();

  //     if (data.data && data.data.length > 0) {
  //       set({ singlePage: data.data[0], loading: false });
  //     } else {
  //       throw new Error('Island not found');
  //     }
  //   } catch (err) {
  //     set({ error: err.message, loading: false });
  //   }
  // },
}));
