export function getFilteredNotes(notes, filterCourse) {
  return filterCourse ? notes.filter(n => n.course === filterCourse) : notes;
}

export function downloadNoteImage(note) {
  const a = document.createElement('a');
  a.href = note.imageData;
  a.download = `note-${note.course}-${Date.now()}.jpg`;
  a.click();
}