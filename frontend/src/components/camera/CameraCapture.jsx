import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, Check, FlipHorizontal, RotateCcw } from 'lucide-react';
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

export function CameraCapture({ onCapture, externalCapturedImage, onRetake }) {
  const isMobile = useIsMobileDevice();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [camError, setCamError] = useState(null);
  const [facing, setFacing] = useState('environment');
  const [captured, setCaptured] = useState(null);
  const [course, setCourse] = useState('');
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  // Sync with image captured from native camera
  useEffect(() => {
    if (externalCapturedImage) {
      setCaptured(externalCapturedImage);
    }
  }, [externalCapturedImage]);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async (facingMode) => {
    if (isMobile) return; // Don't start stream if mobile (using native camera)
    
    stopStream();
    setReady(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => setReady(true);
      }
    } catch (err) {
      setCamError("Camera access denied or unavailable.");
    }
  }, [isMobile, stopStream]);

  useEffect(() => {
    if (!captured && !isMobile) {
      startCamera(facing);
    }
    return stopStream;
  }, [captured, isMobile, facing, startCamera, stopStream]);

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

  async function saveNote() {
    if (!course) return toast.error('Select a course');
    setSaving(true);
    try {
      await onCapture({ imageData: captured, course, note: noteText });
    } finally {
      setSaving(false);
    }
  }

  // --- RENDER PREVIEW / FORM ---
  if (captured) {
    return (
      <div className="space-y-3 px-0.5">
        <img src={captured} alt="Captured" className="w-full rounded-2xl object-contain max-h-64 bg-black" />
        <CustomSelect label="Course *" value={course} onValueChange={setCourse} options={COURSE_OPTS} />
        <Input label="Label (optional)" value={noteText} onChange={e => setNoteText(e.target.value)} />
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => {
            setCaptured(null);
            onRetake?.();
          }}>
            <RotateCcw className="w-4 h-4 mr-2" /> Retake
          </Button>
          <Button variant="primary" className="flex-1" loading={saving} onClick={saveNote}>
            <Check className="w-4 h-4 mr-2" /> Save Note
          </Button>
        </div>
      </div>
    );
  }

  // --- RENDER LIVE STREAM (Desktop only) ---
  return (
    <div className="space-y-3">
      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
        <video
          ref={videoRef}
          autoPlay playsInline muted
          className={cn('w-full h-full object-cover', facing === 'user' && 'scale-x-[-1]')}
        />
        {!ready && <div className="absolute inset-0 flex items-center justify-center"><Spinner className="text-white" /></div>}
        <button onClick={() => { const f = facing === 'environment' ? 'user' : 'environment'; setFacing(f); startCamera(f); }} className="absolute top-3 right-3 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center">
          <FlipHorizontal className="w-5 h-5" />
        </button>
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <div className="flex justify-center">
        <button onClick={capture} disabled={!ready} className="w-16 h-16 rounded-full border-4 border-white bg-brand-600 flex items-center justify-center shadow-lg active:scale-95 transition-all">
          <Camera className="w-7 h-7 text-white" />
        </button>
      </div>
    </div>
  );
}