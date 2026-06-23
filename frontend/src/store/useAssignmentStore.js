import { create } from 'zustand';
import {
  getAllAssignments,
  putAssignment,
  deleteAssignment,
} from '@/services/assignment';
import { scheduleDeadlineReminder } from '@/lib/notifications';


//It is used to create the store called useAssignmentStore
//set means used to update the store state
//get means used to read the store state
export const useAssignmentStore = create((set, get) => ({
  assignments: [],
  loading: false,
  error: null,
  filter: 'all',

  loadAssignments: async () => {
    set({ loading: true, error: null });

    try {
      const items = await getAllAssignments();

      set({
        assignments: items,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  addAssignment: async data => {
    const assignment = {
      ...data,
      id: `assign-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: data.status ?? 'pending',
    };

    // Immediate UI update
    set(state => ({
      assignments: [assignment, ...state.assignments],
    }));

    try {
      await putAssignment(assignment);
      scheduleDeadlineReminder(assignment);
      return assignment;
    } catch (error) {
      // Rollback if DB save fails
      set(state => ({
        assignments: state.assignments.filter(item => item.id !== assignment.id),
        error: error.message,
      }));

      throw error;
    }
  },

  updateAssignment: async (id, changes) => {
    const existing = get().assignments.find(item => item.id === id);

    if (!existing) return null;

    const updated = {
      ...existing,
      ...changes,
      updatedAt: new Date().toISOString(),
      ...(changes.status === 'completed' && !existing.completedAt
        ? { completedAt: new Date().toISOString() }
        : {}),
      ...(changes.status !== 'completed'
        ? { completedAt: null }
        : {}),
    };

    // Immediate UI update
    set(state => ({
      assignments: state.assignments.map(item =>
        item.id === id ? updated : item
      ),
    }));

    try {
      await putAssignment(updated);
      return updated;
    } catch (error) {
      // Rollback if DB update fails
      set(state => ({
        assignments: state.assignments.map(item =>
          item.id === id ? existing : item
        ),
        error: error.message,
      }));

      throw error;
    }
  },

  removeAssignment: async id => {
    const existing = get().assignments.find(item => item.id === id);

    if (!existing) return;

    // Immediate UI update
    set(state => ({
      assignments: state.assignments.filter(item => item.id !== id),
    }));

    try {
      await deleteAssignment(id);
    } catch (error) {
      // Rollback if DB delete fails
      set(state => ({
        assignments: [existing, ...state.assignments],
        error: error.message,
      }));

      throw error;
    }
  },

  toggleComplete: async id => {
    const assignment = get().assignments.find(item => item.id === id);

    if (!assignment) return;

    const newStatus =
      assignment.status === 'completed' ? 'pending' : 'completed';

    return get().updateAssignment(id, {
      status: newStatus,
    });
  },

  setFilter: filter => set({ filter }),

  getFiltered: () => {
    const { assignments, filter } = get();
    const now = new Date();

    switch (filter) {
      case 'pending':
        return assignments.filter(item => item.status === 'pending');

      case 'in-progress':
        return assignments.filter(item => item.status === 'in-progress');

      case 'completed':
        return assignments.filter(item => item.status === 'completed');

      case 'overdue':
        return assignments.filter(
          item =>
            item.status !== 'completed' &&
            item.dueDate &&
            new Date(item.dueDate) < now
        );

      default:
        return assignments;
    }
  },

  getStats: () => {
    const assignments = get().assignments;
    const now = new Date();

    return {
      total: assignments.length,

      pending: assignments.filter(item => item.status === 'pending').length,

      inProgress: assignments.filter(
        item => item.status === 'in-progress'
      ).length,

      completed: assignments.filter(
        item => item.status === 'completed'
      ).length,

      overdue: assignments.filter(
        item =>
          item.status !== 'completed' &&
          item.dueDate &&
          new Date(item.dueDate) < now
      ).length,

      urgent: assignments.filter(
        item =>
          item.priority === 'urgent' &&
          item.status !== 'completed'
      ).length,
    };
  },
}));