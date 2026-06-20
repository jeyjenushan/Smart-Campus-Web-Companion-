import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useAssignmentStore } from '@/store/useAssignmentStore';
import { searchAssignments } from '@/lib/assignments';

export function useAssignmentsPage() {
  const loadAssignments = useAssignmentStore(s => s.loadAssignments);
  const filter = useAssignmentStore(s => s.filter);
  const setFilter = useAssignmentStore(s => s.setFilter);
  const addAssignment = useAssignmentStore(s => s.addAssignment);
  const updateAssignment = useAssignmentStore(s => s.updateAssignment);
  const removeAssignment = useAssignmentStore(s => s.removeAssignment);
  const toggleComplete = useAssignmentStore(s => s.toggleComplete);
  const getFiltered = useAssignmentStore(s => s.getFiltered);
  const getStats = useAssignmentStore(s => s.getStats);
  const loading = useAssignmentStore(s => s.loading);

  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = searchAssignments(getFiltered(), search);
  const stats = getStats();

  async function handleAdd(data) {
    setSaving(true);

    try {
      await addAssignment(data);
      setShowAdd(false);
      toast.success('Assignment added!');
    } catch {
      toast.error('Failed to add assignment');
    } finally {
      setSaving(false);
    }
  }

  async function handleEdit(data) {
    setSaving(true);

    try {
      await updateAssignment(editTarget.id, data);
      setEditTarget(null);
      toast.success('Assignment updated!');
    } catch {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await removeAssignment(deleteTarget.id);
      toast.success('Assignment deleted');
    } catch {
      toast.error('Failed to delete');
    }

    setDeleteTarget(null);
  }

  return {
    loading,
    saving,

    search,
    setSearch,

    filter,
    setFilter,

    stats,
    filtered,

    showAdd,
    setShowAdd,

    editTarget,
    setEditTarget,

    deleteTarget,
    setDeleteTarget,

    toggleComplete,

    handleAdd,
    handleEdit,
    handleDelete,
  };
}