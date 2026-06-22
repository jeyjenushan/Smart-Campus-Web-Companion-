import { create } from 'zustand';
import { getProfile, saveProfile } from '@/lib/db';
import { PROFILE_SEED, COURSES, DEGREES } from '@/data/seedData';
import { useAuthStore } from './useAuthStore';

export const useProfileStore = create((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  loadProfile: async () => {
    set({ loading: true, error: null });
    try {
      const user = useAuthStore.getState().user;

      if (!user) {
        set({ profile: null, loading: false });
        return;
      }

      // Load profile for current user from localStorage
      let p = null;
      const userProfiles = JSON.parse(localStorage.getItem('campus-sync-user-profiles') || '{}');
      
      if (userProfiles[user.id]) {
        p = userProfiles[user.id];
      } else {
        // Create default profile if not exists - EMPTY for user to fill in
        p = {
          userId: user.id,
          name: user.name,
          regNumber: user.regNumber,
          avatar: user.avatar,
          faculty: '',
          degree: '',
          year: 1,
          semester: 1,
          gpa: 0,
          completedCredits: 0,
          totalCredits: 120,
          courses: [],
          completedCourses: [],
          notificationsEnabled: false,
          theme: 'light',
          createdAt: new Date().toISOString(),
        };
        
        // Save default profile
        userProfiles[user.id] = p;
        localStorage.setItem('campus-sync-user-profiles', JSON.stringify(userProfiles));
      }

      // Ensure profile has courses array based on degree
      if (!p.courses) {
        p.courses = [];
      }
      if (!p.completedCourses) {
        p.completedCourses = [];
      }

      // If degree is set, populate courses from that degree
      if (p.degree) {
        const degreeInfo = DEGREES.find(d => d.name === p.degree);
        if (degreeInfo) {
          p.courses = degreeInfo.courses
            .map(code => COURSES.find(c => c.code === code))
            .filter(Boolean);
        }
      }

      set({ profile: p, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  updateProfile: async (changes) => {
    const current = get().profile;
    const user = useAuthStore.getState().user;

    if (!current || !user) {
      set({ error: 'No profile or user', loading: false });
      return;
    }

    const updated = { ...current, ...changes };

    // If degree is being updated, also update courses for that degree
    if (changes.degree && changes.degree !== current.degree) {
      const degreeInfo = DEGREES.find(d => d.name === changes.degree);
      if (degreeInfo) {
        updated.courses = degreeInfo.courses
          .map(code => COURSES.find(c => c.code === code))
          .filter(Boolean);
      }
    }

    // Save to localStorage
    const userProfiles = JSON.parse(localStorage.getItem('campus-sync-user-profiles') || '{}');
    userProfiles[user.id] = updated;
    localStorage.setItem('campus-sync-user-profiles', JSON.stringify(userProfiles));

    set({ profile: updated });
    return updated;
  },

  setAvatar: async (dataUrl) => {
    await get().updateProfile({ avatar: dataUrl });
  },

  getProgressPct: () => {
    const p = get().profile;
    if (!p) return 0;
    return Math.round((p.completedCredits / p.totalCredits) * 100);
  },

  getCurrentSemesterCredits: () => {
    const p = get().profile;
    if (!p) return 0;
    return p.courses.reduce((sum, c) => sum + c.credits, 0);
  },
}));
