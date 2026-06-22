import { useRef } from 'react';
import { Camera, CameraOff, Image } from 'lucide-react';
import toast from 'react-hot-toast';

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

/**
 * CameraPage Component
 * Manages lecture note capture using device camera
 * Supports both web camera API and native mobile camera
 * Theme-aware with dark/light mode support
 */
export default function CameraPage() {
  const hasCameraAPI = useCameraSupport();
  const isMobile = useIsMobileDevice();
  const nativeCameraRef = useRef(null);

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

  /**
   * Opens camera - uses native camera on mobile, web API on desktop
   */
  function openCapture() {
    if (isMobile) {
      nativeCameraRef.current?.click();
      return;
    }

    setShowCamera(true);
  }

  /**
   * Handles file capture from native mobile camera
   * Converts to base64 and passes to capture handler
   */
  function handleNativeCapture(e) {
    const file = e.target.files?.[0];
    e.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please capture an image.');
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        await handleCapture({
          imageData: reader.result,
          course: '',
          note: '',
        });
      } catch {
        toast.error('Failed to save note');
      }
    };

    reader.onerror = () => {
      toast.error('Could not read captured image.');
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="animate-in pt-14">
      {/* Mobile native camera input - works on iOS and Android */}
      <input
        ref={nativeCameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleNativeCapture}
      />

      <TopHeader
        title="Lecture Notes"
        subtitle={`${notes.length} photo${notes.length !== 1 ? 's' : ''} captured`}
        actions={
          hasCameraAPI && (
            <Button
              variant="primary"
              size="sm"
              onClick={openCapture}
              className="h-9 px-3 gap-1"
            >
              <Camera className="w-4 h-4" />
              Capture
            </Button>
          )
        }
      />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {!hasCameraAPI && (
          <div className="card p-4 flex items-center gap-3 bg-warning-light dark:bg-red-900/20 border border-warning dark:border-red-800">
            <CameraOff className="w-5 h-5 text-warning dark:text-red-400 flex-shrink-0" />
            <p className="text-sm text-ink-muted dark:text-slate-400">
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
              hasCameraAPI && (
                <Button variant="primary" onClick={openCapture}>
                  <Camera className="w-4 h-4" />
                  Capture First Note
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

      {!isMobile && (
        <Modal
          open={showCamera}
          onClose={() => setShowCamera(false)}
          title="Capture Lecture Note"
          description="Point your camera at handwritten notes"
        >
          <CameraCapture onCapture={handleCapture} />
        </Modal>
      )}

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