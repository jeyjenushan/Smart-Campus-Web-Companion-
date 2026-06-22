import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNotesStore } from '@/store/useNotesStore';
import { getFilteredNotes, downloadNoteImage } from '@/lib/camera';

export function useCameraNotes() {
  const loadNotes = useNotesStore(s => s.loadNotes);
  const notes = useNotesStore(s => s.notes);
  const loading = useNotesStore(s => s.loading);
  const addNote = useNotesStore(s => s.addNote);
  const removeNote = useNotesStore(s => s.removeNote);
  const [showCamera, setShowCamera] = useState(false);
  const [viewNote, setViewNote] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterCourse, setFilterCourse] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleCapture(data) {
    await addNote(data);
    setShowCamera(false);
    toast.success('Note saved!');
  }

  function handleDeleteNote() {
    removeNote(deleteTarget?.id);
    setDeleteTarget(null);
    toast.success('Note deleted');
  }

  function downloadNote(note) {
    downloadNoteImage(note);
  }

  const filtered = getFilteredNotes(notes, filterCourse);

  return {
    notes,
    loading,
    filtered,
    showCamera,
    setShowCamera,
    viewNote,
    setViewNote,
    deleteTarget,
    setDeleteTarget,
    filterCourse,
    setFilterCourse,
    handleCapture,
    handleDeleteNote,
    downloadNote,
  };
}