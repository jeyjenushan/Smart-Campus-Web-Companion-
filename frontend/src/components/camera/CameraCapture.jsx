import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, CameraOff, Check, FlipHorizontal, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button, Input, Spinner } from '@/components/ui';
import { CustomSelect } from '@/components/ui/Select';
import { COURSES } from '@/data/seedData';
import { cn } from '@/lib/cn';
import { useIsMobileDevice } from '../../hooks/camera/useMobileDevice';

const COURSE_OPTS = [
  { value: '', label: 'Select course…' },
  ...COURSES.map(c => ({ value: c.code, label: c.code })),
];

export function CameraCapture({ onCapture }) {
  const isMobile = useIsMobileDevice();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const nativeCameraRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [camError, setCamError] = useState(null);
  const [facing, setFacing] = useState('environment');
  const [captured, setCaptured] = useState(null);
  const [course, setCourse] = useState('');
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(
    async facingMode => {
      stopStream();
      setReady(false);
      setCamError(null);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => setReady(true);
        }
      } catch (err) {
        const msg =
          err.name === 'NotAllowedError'
            ? 'Camera permission denied. Enable it in browser settings.'
            : err.name === 'NotFoundError'
              ? 'No camera found on this device.'
              : err.name === 'NotReadableError'
                ? 'Camera is being used by another app.'
                : `Camera error: ${err.message}`;

        setCamError(msg);
      }
    },
    [stopStream]
  );

  useEffect(() => {
    if (isMobile) return;

    startCamera('environment');
    return stopStream;
  }, [isMobile, startCamera, stopStream]);

  function openNativeCamera() {
    nativeCameraRef.current?.click();
  }

  function handleNativeCapture(e) {
    const file = e.target.files?.[0];
    e.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please capture an image.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setCaptured(reader.result);
    };

    reader.onerror = () => {
      toast.error('Could not read captured image.');
    };

    reader.readAsDataURL(file);
  }

  function flipCamera() {
    const next = facing === 'environment' ? 'user' : 'environment';
    setFacing(next);
    startCamera(next);
  }

  function capture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');

    if (facing === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);
    setCaptured(canvas.toDataURL('image/jpeg', 0.85));
    stopStream();
  }

  function retake() {
    setCaptured(null);

    if (isMobile) {
      openNativeCamera();
    } else {
      startCamera(facing);
    }
  }

  async function saveNote() {
    if (!course) {
      toast.error('Please select a course');
      return;
    }

    if (!captured) {
      toast.error('No image captured');
      return;
    }

    setSaving(true);

    try {
      await onCapture({
        imageData: captured,
        course,
        note: noteText,
      });
    } catch {
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  }

  const nativeCameraInput = (
    <input
      ref={nativeCameraRef}
      type="file"
      accept="image/*"
      capture="environment"
      className="hidden"
      onChange={handleNativeCapture}
    />
  );

  if (captured) {
    return (
      <div className="space-y-3 px-0.5">
        <img
          src={captured}
          alt="Captured note"
          className="w-full rounded-2xl object-contain max-h-64 bg-black dark:bg-slate-900 border border-slate-800 dark:border-slate-700"
        />

        <CustomSelect
          label="Course *"
          value={course}
          onValueChange={setCourse}
          options={COURSE_OPTS}
        />

        <Input
          label="Note label (optional)"
          placeholder="e.g. Lecture 5 – Sorting algorithms"
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
        />

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={retake}>
            {isMobile && <RotateCcw className="w-4 h-4" />}
            Retake
          </Button>

          <Button
            variant="primary"
            className="flex-1"
            loading={saving}
            onClick={saveNote}
          >
            <Check className="w-4 h-4" />
            Save Note
          </Button>
        </div>

        {isMobile && nativeCameraInput}
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl bg-ink/5 dark:bg-slate-800/50 border border-ink/10 dark:border-slate-700 p-8 text-center">
          <Camera className="w-10 h-10 text-brand-600 dark:text-brand-400 mx-auto mb-3" />

          <p className="text-sm font-semibold text-ink dark:text-slate-100">
            Ready to capture
          </p>

          <p className="text-xs text-ink-muted dark:text-slate-400 mt-1">
            Tap below to open your camera
          </p>
        </div>

        {nativeCameraInput}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={openNativeCamera}
            className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-700 bg-white dark:bg-slate-800 shadow-card-lg dark:shadow-lg active:scale-95 transition-all"
            aria-label="Open camera"
          >
            <div className="w-full h-full rounded-full bg-brand-600 dark:bg-brand-500 flex items-center justify-center">
              <Camera className="w-7 h-7 text-white dark:text-white" />
            </div>
          </button>
        </div>

        <p className="text-xs text-ink-faint dark:text-slate-400 text-center">
          Point camera at handwritten notes and tap to capture
        </p>
      </div>
    );
  }

  if (camError) {
    return (
      <div className="rounded-2xl bg-danger/10 dark:bg-red-900/20 border border-danger/30 dark:border-red-800 p-6 text-center">
        <CameraOff className="w-10 h-10 text-danger dark:text-red-400 mx-auto mb-3" />

        <p className="text-sm font-semibold text-danger dark:text-red-400">
          {camError}
        </p>

        <p className="text-xs text-ink-muted dark:text-slate-400 mt-1">
          Check browser permissions and try again
        </p>

        <Button
          variant="secondary"
          className="mt-4 mx-auto"
          onClick={() => startCamera(facing)}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={cn(
            'w-full h-full object-cover',
            facing === 'user' && 'scale-x-[-1]'
          )}
        />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="lg" className="text-white" />
          </div>
        )}

        <button
          type="button"
          onClick={flipCamera}
          className="absolute top-3 right-3 w-10 h-10 bg-black/50 dark:bg-black/70 text-white dark:text-slate-200 rounded-full flex items-center justify-center hover:bg-black/70 dark:hover:bg-black/80 transition-colors"
          aria-label="Flip camera"
        >
          <FlipHorizontal className="w-5 h-5" />
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex justify-center">
        <button
          type="button"
          onClick={capture}
          disabled={!ready}
          className={cn(
            'w-16 h-16 rounded-full border-4 border-white dark:border-slate-700 bg-white dark:bg-slate-800 shadow-card-lg dark:shadow-lg active:scale-95 transition-all',
            !ready && 'opacity-50 cursor-not-allowed'
          )}
          aria-label="Capture photo"
        >
          <div className="w-full h-full rounded-full bg-brand-600 dark:bg-brand-500 flex items-center justify-center">
            <Camera className="w-7 h-7 text-white dark:text-white" />
          </div>
        </button>
      </div>

      <p className="text-xs text-ink-faint dark:text-slate-400 text-center">
        Point camera at handwritten notes and tap to capture
      </p>
    </div>
  );
}