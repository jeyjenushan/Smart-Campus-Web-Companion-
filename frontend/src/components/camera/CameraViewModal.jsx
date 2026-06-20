import { format } from 'date-fns';
import { Download } from 'lucide-react';

import { Button, Badge } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';

export function CameraViewModal({ note, onClose, onDownload }) {
  return (
    <Modal
      open={!!note}
      onClose={onClose}
      title={note?.note || note?.course || 'Lecture Note'}
    >
      {note && (
        <div className="space-y-3">
          <img
            src={note.imageData}
            alt="Note"
            className="w-full rounded-xl object-contain max-h-80"
          />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-muted">Course</span>
              <Badge color="blue">{note.course}</Badge>
            </div>

            {note.note && (
              <div className="flex justify-between gap-4">
                <span className="text-ink-muted">Label</span>
                <span className="text-ink font-medium text-right">
                  {note.note}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-ink-muted">Captured</span>
              <span className="text-ink">
                {format(new Date(note.createdAt), 'MMM d, yyyy · h:mm a')}
              </span>
            </div>
          </div>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => onDownload(note)}
          >
            <Download className="w-4 h-4" /> Download Image
          </Button>
        </div>
      )}
    </Modal>
  );
}