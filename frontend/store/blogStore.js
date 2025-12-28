import { create } from 'zustand';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const useBlogStore = create((set) => ({
  blogs: [],
  blog: null,
  loading: false,
  error: null,

  // Fetch all blogs
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/blogs?populate=*` // populate=* to get all relations & media
      );
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      // console.log('Fetched blogs:', data);
      set({ blogs: data.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch single blog by ID
  fetchBlogById: async (id) => {
    set({ loading: true, error: null, blog: null });
    try {
      // Fixed URL - changed second ? to & for correct query parameter syntax
      const res = await fetch(
        `${API_BASE_URL}/api/blogs?filters[documentId][$eq]=${id}&populate=*`
      );
      if (!res.ok) throw new Error('Failed to fetch blog');
      const data = await res.json();

      // Check if we got data back and use the first item if it's an array
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        set({ blog: data.data[0], loading: false });
      } else if (data.data) {
        set({ blog: data.data, loading: false });
      } else {
        throw new Error('Blog not found');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      set({ error: err.message, loading: false });
    }
  },
}));

export default useBlogStore;