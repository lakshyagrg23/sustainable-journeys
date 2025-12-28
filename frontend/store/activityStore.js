import { create } from 'zustand';
import qs from 'qs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const useActivityStore = create((set, get) => ({
  activities: [],
  selectedActivity: null,
  selectedPlace: null,
  loading: false,
  error: null,

  // Fetch all activities and store in state
  fetchActivities: async () => {
    set({ loading: true, error: null });

    try {
      const query = qs.stringify(
        {
          populate: {
            image: true, // main activity image
            sub_activites: {
              populate: ["hero_section", "gallery"] // nested images
            }
          }
        },
        { encodeValuesOnly: true }
      );

      const res = await fetch(`${API_BASE_URL}/api/activities?${query}`);
      // const res = await fetch(`${API_BASE_URL}/api/activities?populate=*`);
      const data = await res.json();
      // console.log('Fetched all activities with deep populate:', data);
      set({ activities: data.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Get single activity from state by documentId with fallback to API
  getActivityById: async (documentId) => {
    const { activities, fetchActivities } = get();

    // First try to find in existing state
    let activity = activities.find(act => act.documentId === documentId);

    // If not found and activities array is empty, fetch all activities first
    if (!activity && activities.length === 0) {
      //console.log('Activities not loaded, fetching all activities first...');
      await fetchActivities();

      // After fetching, try to find the activity again
      const { activities: newActivities } = get();
      activity = newActivities.find(act => act.documentId === documentId);
    }

    set({ selectedActivity: activity });
    return activity;
  },

  // Fetch single activity by ID as fallback
  fetchActivityById: async (documentId) => {
    set({ loading: true, error: null });
    try {
      // console.log('Fetching single activity by documentId:', documentId);
      const query = qs.stringify(
        {
          populate: {
            image: true,
            sub_activites: {
              populate: ["hero_section", "gallery"]
            }
          }
        },
        { encodeValuesOnly: true }
      );

      const res = await fetch(`${API_BASE_URL}/api/activities?filters[documentId][$eq]=${documentId}&${query}`);
      const data = await res.json();
      //console.log('Fetched single activity:', data.data[0]);
      set({ selectedActivity: data.data[0], loading: false });
      return data.data[0];
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  // Fetch specific sub_activity by id
  fetchSubActivityById: async (subActivityId) => {
    set({ loading: true, error: null });
    try {
      // console.log('Fetching sub_activity by ID:', subActivityId);
      const res = await fetch(`${API_BASE_URL}/api/sub-activites?filters[documentId][$eq]=${subActivityId}&populate=*`);
      const data = await res.json();
      // console.log('Fetched sub_activity:', data.data[0]);
      set({ selectedPlace: data.data[0], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  setSelectedPlace: (place) => set({ selectedPlace: place }),

  clearSelectedActivity: () => set({ selectedActivity: null }),
}));

export default useActivityStore;
