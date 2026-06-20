import { create } from 'zustand';
import { getProfile, saveProfile } from '@/lib/db';
import { PROFILE_SEED } from '@/data/seedData';

export const useProfileStore = create((set, get) => ({
  profile: null,
  loading: false,
  error:   null,

  loadProfile: async () => {
    set({ loading: true, error: null });
    try {
      let p = await getProfile();
      if (!p) {
        p = PROFILE_SEED;
        await saveProfile(p);
      }
      set({ profile: p, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  updateProfile: async (changes) => {
    const current = get().profile ?? PROFILE_SEED;
    const updated = { ...current, ...changes };
    await saveProfile(updated);
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
