import React, { useRef } from 'react';
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
import toast from 'react-hot-toast';

export default function CameraPage() {
  const isMobile = useIsMobileDevice();
  const hasCameraAPI = useCameraSupport();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // We add a way to set a pre-captured image from the native camera
    setCapturedImage, 
    capturedImage 
  } = useCameraNotes();

  // 1. Logic to handle the "Capture" button click
  const handleCaptureClick = () => {
    if (isMobile) {
      // Trigger native camera immediately
      fileInputRef.current?.click();
    } else {
      // Open modal for live web-cam stream
      setShowCamera(true);
    }
  };

  // 2. Logic to handle the file returned by native camera
  const handleNativeFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // Open the modal and pass the captured image to show the "Save Note" form
      setCapturedImage(reader.result);
      setShowCamera(true);
    };
    reader.onerror = () => toast.error("Failed to read image");
    reader.readAsDataURL(file);
    
    // Reset input so same file can be picked again
    e.target.value = '';
  };

  return (
    <div className="animate-in">
      <TopHeader
        title="Lecture Notes"
        subtitle={`${notes.length} note${notes.length !== 1 ? 's' : ''}`}
        actions={
          hasCameraAPI && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleCaptureClick}
              className="h-9 px-3 gap-1"
            >
              <Camera className="w-4 h-4" /> Capture
            </Button>
          )
        }
      />

      {/* Hidden Native Camera Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleNativeFileChange}
      />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {!hasCameraAPI && !isMobile && (
          <div className="card p-4 flex items-center gap-3">
            <CameraOff className="w-5 h-5 text-warning flex-shrink-0" />
            <p className="text-sm text-ink-muted">Camera requires HTTPS.</p>
          </div>
        )}

        <CameraFilters
          notes={notes}
          filterCourse={filterCourse}
          setFilterCourse={setFilterCourse}
        />

        {loading ? (
          <div className="flex items-center justify-center py-16"><Spinner size="lg" /></div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Image}
            title="No lecture notes yet"
            action={
              <Button variant="primary" onClick={handleCaptureClick}>
                <Camera className="w-4 h-4" /> Capture First Note
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(note => (
              <NoteCard key={note.id} note={note} onDelete={setDeleteTarget} onView={setViewNote} />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={showCamera}
        onClose={() => {
          setShowCamera(false);
          setCapturedImage(null); // Clean up on close
        }}
        title={capturedImage ? "Save Note" : "Capture Note"}
      >
        <CameraCapture 
          onCapture={handleCapture} 
          externalCapturedImage={capturedImage} // Pass native photo if exists
          onRetake={() => {
            if (isMobile) fileInputRef.current?.click();
          }}
        />
      </Modal>

      <CameraViewModal note={viewNote} onClose={() => setViewNote(null)} onDownload={downloadNote} />
      <CameraDeleteModal target={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteNote} />
    </div>
  );
}