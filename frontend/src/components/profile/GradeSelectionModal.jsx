import { X } from 'lucide-react';
import { GRADE_POINTS } from '@/data/seedData';
import { Modal } from '@/components/ui';

export function GradeSelectionModal({ isOpen, courseCode, courseName, onClose, onConfirm }) {
  const grades = Object.keys(GRADE_POINTS).sort((a, b) => GRADE_POINTS[b] - GRADE_POINTS[a]);

  const handleSelectGrade = (grade) => {
    onConfirm(grade);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="card p-6 max-w-sm w-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-ink">Select Grade</h3>
            <p className="text-sm text-ink-muted mt-1">{courseCode}: {courseName}</p>
          </div>
          <button
            onClick={onClose}
            className="touch-target w-8 h-8 flex items-center justify-center rounded hover:bg-surface-muted"
          >
            <X className="w-4 h-4 text-ink-muted" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {grades.map(grade => (
            <button
              key={grade}
              onClick={() => handleSelectGrade(grade)}
              className="py-3 px-3 rounded-lg font-semibold text-sm transition-all
                bg-surface-muted hover:bg-brand-600 hover:text-white
                text-ink hover:text-white border border-surface-border hover:border-transparent"
            >
              <span>{grade}</span>
              <span className="text-xs block text-ink-muted group-hover:text-white/80 mt-0.5">
                {GRADE_POINTS[grade].toFixed(1)} GP
              </span>
            </button>
          ))}
        </div>

        <p className="text-xs text-ink-muted text-center mt-4">
          Select a grade to mark this course as completed
        </p>
      </div>
    </Modal>
  );
}
