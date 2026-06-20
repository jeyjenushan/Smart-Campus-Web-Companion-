import { format } from 'date-fns';
import { Clock, Trash2, ZoomIn } from 'lucide-react';

import { Badge } from '@/components/ui';

export function NoteCard({ note, onDelete, onView }) {
  return (
    <div className="card p-0 overflow-hidden">
      <button
        onClick={() => onView(note)}
        className="w-full text-left active:scale-[0.99] transition-transform"
      >
        <img
          src={note.imageData}
          alt="Lecture note"
          className="w-full h-36 object-cover bg-surface-muted"
        />
      </button>

      <div className="p-2.5">
        <div className="flex items-center justify-between gap-1 mb-1">
          <Badge color="blue" className="text-[10px] px-1.5 py-0.5 shrink-0">
            {note.course}
          </Badge>

          <div className="flex gap-0.5 flex-shrink-0">
            <button
              onClick={() => onView(note)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-muted"
              aria-label="View"
            >
              <ZoomIn className="w-3.5 h-3.5 text-ink-muted" />
            </button>

            <button
              onClick={() => onDelete(note)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-danger/10"
              aria-label="Delete"
            >
              <Trash2 className="w-3.5 h-3.5 text-danger" />
            </button>
          </div>
        </div>

        {note.note && (
          <p className="text-[11px] text-ink leading-tight truncate mb-1">
            {note.note}
          </p>
        )}

        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-ink-faint flex-shrink-0" />
          <span className="text-[10px] text-ink-faint truncate">
            {format(new Date(note.createdAt), 'MMM d · h:mm a')}
          </span>
        </div>
      </div>
    </div>
  );
}