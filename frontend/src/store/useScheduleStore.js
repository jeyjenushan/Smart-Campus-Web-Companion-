import { create } from 'zustand';
import { getAllSchedule, putScheduleItem, deleteScheduleItem } from '@/services/schedule';
import { SCHEDULE_SEED } from '@/data/seedData';

const SEEDED_KEY = 'campus-sync-schedule-seeded';

export const useScheduleStore = create((set, get) => ({
  schedule: [],
  loading:  false,
  error:    null,

  loadSchedule: async () => {
    set({ loading: true, error: null });
    try {
      let items = await getAllSchedule();
      if (items.length === 0 && !localStorage.getItem(SEEDED_KEY)) {
        for (const s of SCHEDULE_SEED) await putScheduleItem(s);
        localStorage.setItem(SEEDED_KEY, '1');
        items = await getAllSchedule();
      }
      set({ schedule: items, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  addScheduleItem: async (data) => {
    const item = {
      ...data,
      id: `schedule-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };
    await putScheduleItem(item);
    set(s => ({ schedule: [...s.schedule, item] }));
    return item;
  },

  updateScheduleItem: async (id, changes) => {
    const items = get().schedule;
    const existing = items.find(i => i.id === id);
    if (!existing) return;
    const updated = { ...existing, ...changes };
    await putScheduleItem(updated);
    set(s => ({ schedule: s.schedule.map(i => i.id === id ? updated : i) }));
  },

  removeScheduleItem: async (id) => {
    await deleteScheduleItem(id);
    set(s => ({ schedule: s.schedule.filter(i => i.id !== id) }));
  },

  getTodaySchedule: () => {
    const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const today = DAYS[new Date().getDay()];
    return get().schedule
      .filter(s => s.day === today)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  },

  getScheduleForDay: (day) => {
    return get().schedule
      .filter(s => s.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  },
}));
