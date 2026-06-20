import { create } from 'zustand';
import { getAllLectureNotes, putLectureNote, deleteLectureNote } from '@/lib/db';

export const useNotesStore = create((set, get) => ({
  notes:   [],
  loading: false,
  error:   null,

  loadNotes: async () => {
    set({ loading: true, error: null });
    try {
      const items = await getAllLectureNotes();
      set({ notes: items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  addNote: async (data) => {
    const note = {
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString(),
      ...data,
    };
    await putLectureNote(note);
    set(s => ({ notes: [note, ...s.notes] }));
    return note;
  },

  updateNote: async (id, changes) => {
    const existing = get().notes.find(n => n.id === id);
    if (!existing) return;
    const updated = { ...existing, ...changes };
    await putLectureNote(updated);
    set(s => ({ notes: s.notes.map(n => n.id === id ? updated : n) }));
  },

  removeNote: async (id) => {
    await deleteLectureNote(id);
    set(s => ({ notes: s.notes.filter(n => n.id !== id) }));
  },
}));
