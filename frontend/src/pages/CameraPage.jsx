import { useRef, useState } from 'react';
import { Camera, CameraOff, Image } from 'lucide-react';

import { TopHeader } from '@/components/layout/TopHeader';
import { Button, EmptyState, Spinner } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';
import { CameraCapture } from '@/components/camera/CameraCapture';
import { NoteCard } from '@/components/camera/NoteCard';
import { CameraFilters } from '@/components/camera/CameraFilters';
import { CameraViewModal } from '@/components/camera/CameraViewModal';
import { CameraDeleteModal } from '@/components/camera/CameraDeleteModal';
import { useCameraNotes } from '@/hooks/camera/useCameraNotes';
import { useCameraSupport } from '@/hooks/camera/useCameraSupport';
import { useIsMobileDevice } from '@/hooks/camera/useMobileDevice';

export default function CameraPage() {
  const hasCameraAPI = useCameraSupport();
  const isMobile = useIsMobileDevice();

  const nativeCameraInputRef = useRef(null);
  const [nativeCaptured, setNativeCaptured] = useState(null);

  const {
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
  } = useCameraNotes();

  const canCapture = hasCameraAPI || isMobile;

  function handleMainCaptureClick() {
    if (isMobile) {
      nativeCameraInputRef.current?.click();
      return;
    }

    setNativeCaptured(null);
    setShowCamera(true);
  }

  function handleNativeCameraChange(e) {
    const file = e.target.files?.[0];
    e.target.value = '';

    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();

    reader.onload = () => {
      setNativeCaptured(reader.result);
      setShowCamera(true);
    };

    reader.readAsDataURL(file);
  }

  function closeCameraModal() {
    setShowCamera(false);
    setNativeCaptured(null);
  }

  async function handleSaveCapture(payload) {
    await handleCapture(payload);
    closeCameraModal();
  }

  return (
    <div className="animate-in">
      <TopHeader
        title="Lecture Notes"
        subtitle={`${notes.length} photo${notes.length !== 1 ? 's' : ''} captured`}
        actions={
          canCapture && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleMainCaptureClick}
              className="h-9 px-3 gap-1"
            >
              <Camera className="w-4 h-4" /> Capture
            </Button>
          )
        }
      />

      <input
        ref={nativeCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleNativeCameraChange}
      />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {!canCapture && (
          <div className="card p-4 flex items-center gap-3">
            <CameraOff className="w-5 h-5 text-warning flex-shrink-0" />
            <p className="text-sm text-ink-muted">
              Camera API requires HTTPS or localhost.
            </p>
          </div>
        )}

        <CameraFilters
          notes={notes}
          filterCourse={filterCourse}
          setFilterCourse={setFilterCourse}
        />

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Image}
            title={filterCourse ? 'No notes for this course' : 'No lecture notes yet'}
            description="Tap Capture to photograph your handwritten notes"
            action={
              canCapture && (
                <Button variant="primary" onClick={handleMainCaptureClick}>
                  <Camera className="w-4 h-4" /> Capture First Note
                </Button>
              )
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={setDeleteTarget}
                onView={setViewNote}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={showCamera}
        onClose={closeCameraModal}
        title="Capture Lecture Note"
        description="Point your camera at handwritten notes"
      >
        <CameraCapture
          onCapture={handleSaveCapture}
          initialCaptured={nativeCaptured}
          onRetakeMobile={() => nativeCameraInputRef.current?.click()}
        />
      </Modal>

      <CameraViewModal
        note={viewNote}
        onClose={() => setViewNote(null)}
        onDownload={downloadNote}
      />

      <CameraDeleteModal
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteNote}
      />
    </div>
  );
}