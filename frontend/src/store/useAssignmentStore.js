import { create } from 'zustand';
import {
  getAllAssignments, putAssignment, deleteAssignment,
} from '@/lib/db';
import { ASSIGNMENT_SEED } from '@/data/seedData';
import { scheduleDeadlineReminder } from '@/lib/notifications';

const SEEDED_KEY = 'campus-sync-assignments-seeded';

export const useAssignmentStore = create((set, get) => ({
  assignments: [],
  loading: false,
  error: null,
  filter: 'all',   // all | pending | in-progress | completed | overdue

  // ── Load ────────────────────────────────────────────────────────────────────
  loadAssignments: async () => {
    set({ loading: true, error: null });
    try {
      let items = await getAllAssignments();
      if (items.length === 0 && !localStorage.getItem(SEEDED_KEY)) {
        for (const a of ASSIGNMENT_SEED) await putAssignment(a);
        localStorage.setItem(SEEDED_KEY, '1');
        items = await getAllAssignments();
      }
      set({ assignments: items, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  // ── Add ─────────────────────────────────────────────────────────────────────
  addAssignment: async (data) => {
    const assignment = {
      ...data,
      id: `assign-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString(),
      status: data.status ?? 'pending',
    };
    await putAssignment(assignment);
    set(s => ({ assignments: [...s.assignments, assignment] }));
    scheduleDeadlineReminder(assignment);
    return assignment;
  },

  // ── Update ──────────────────────────────────────────────────────────────────
  updateAssignment: async (id, changes) => {
    const assignments = get().assignments;
    const existing = assignments.find(a => a.id === id);
    if (!existing) return;
    const updated = {
      ...existing,
      ...changes,
      ...(changes.status === 'completed' && !existing.completedAt
        ? { completedAt: new Date().toISOString() }
        : {}),
    };
    await putAssignment(updated);
    set(s => ({
      assignments: s.assignments.map(a => a.id === id ? updated : a),
    }));
    return updated;
  },

  // ── Delete ──────────────────────────────────────────────────────────────────
  removeAssignment: async (id) => {
    await deleteAssignment(id);
    set(s => ({ assignments: s.assignments.filter(a => a.id !== id) }));
  },

  // ── Toggle status ───────────────────────────────────────────────────────────
  toggleComplete: async (id) => {
    const a = get().assignments.find(x => x.id === id);
    if (!a) return;
    const newStatus = a.status === 'completed' ? 'pending' : 'completed';
    await get().updateAssignment(id, { status: newStatus });
  },

  // ── Filter ──────────────────────────────────────────────────────────────────
  setFilter: (filter) => set({ filter }),

  // ── Computed ─────────────────────────────────────────────────────────────────
  getFiltered: () => {
    const { assignments, filter } = get();
    const now = new Date();
    switch (filter) {
      case 'pending':     return assignments.filter(a => a.status === 'pending');
      case 'in-progress': return assignments.filter(a => a.status === 'in-progress');
      case 'completed':   return assignments.filter(a => a.status === 'completed');
      case 'overdue':
        return assignments.filter(a =>
          a.status !== 'completed' && new Date(a.dueDate) < now
        );
      default:            return assignments;
    }
  },

  getStats: () => {
    const a = get().assignments;
    const now = new Date();
    return {
      total:      a.length,
      pending:    a.filter(x => x.status === 'pending').length,
      inProgress: a.filter(x => x.status === 'in-progress').length,
      completed:  a.filter(x => x.status === 'completed').length,
      overdue:    a.filter(x => x.status !== 'completed' && new Date(x.dueDate) < now).length,
      urgent:     a.filter(x => x.priority === 'urgent' && x.status !== 'completed').length,
    };
  },
}));
