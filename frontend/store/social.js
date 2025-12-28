// filepath: /Users/himanshusingh/Desktop/Harsh_singh/Sarthi/frontend/store/social.js
import { create } from 'zustand';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const useSocialStore = create((set) => ({
  posts: [],
  post: null,
  loading: false,
  error: null,

  // Fetch all social posts
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts?populate=*`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      // console.log('Fetched posts:', data);
      set({ posts: data?.data || [], loading: false });
    } catch (err) {
      set({ error: err.message || 'Unknown error', loading: false });
    }
  },

  // // Fetch single post by Strapi documentId
  // fetchPostById: async (id) => {
  //   set({ loading: true, error: null, post: null });
  //   try {
  //     const res = await fetch(`${API_BASE_URL}/api/posts?filters[documentId][$eq]=${id}&populate=*`);
  //     if (!res.ok) throw new Error('Failed to fetch post');
  //     const data = await res.json();

  //     if (Array.isArray(data?.data) && data.data.length > 0) {
  //       set({ post: data.data[0], loading: false });
  //     } else if (data?.data) {
  //       set({ post: data.data, loading: false });
  //     } else {
  //       throw new Error('Post not found');
  //     }
  //   } catch (err) {
  //     set({ error: err.message || 'Unknown error', loading: false });
  //   }
  // },

  clearPost: () => set({ post: null }),
}));

export default useSocialStore;
