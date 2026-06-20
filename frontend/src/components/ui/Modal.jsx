import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Modal({ open, onClose, title, description, children, className }) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose?.()}>
      <Dialog.Portal>
        <Dialog.Overlay   className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in" />

        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50',
            '-translate-x-1/2 -translate-y-1/2',
            'bg-surface rounded-3xl shadow-card-lg',
            'w-[calc(100vw-2rem)] max-w-lg',
            'p-6 max-h-[90dvh]',
            'overflow-visible',
            'animate-modal',
            className
          )}
          onPointerDownOutside={(e)=>e.preventDefault()}

        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              {title && (
                <Dialog.Title className="text-lg font-bold text-ink">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="text-sm text-ink-muted mt-0.5">
                  {description}
                </Dialog.Description>
              )}
            </div>

            <Dialog.Close asChild>
              <button
                className="touch-target text-ink-faint hover:text-ink transition-colors rounded-xl hover:bg-surface-muted flex-shrink-0 w-9 h-9"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="max-h-[calc(90dvh-6rem)] overflow-y-auto overflow-x-visible pr-1">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ConfirmModal({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', danger }) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description}>
      <div className="flex gap-3 mt-2">
        <button onClick={onClose}  className="btn btn-secondary flex-1">Cancel</button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          className={cn('btn flex-1', danger ? 'btn-danger' : 'btn-primary')}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
