import { ConfirmModal } from '@/components/ui/Modal';

export function CameraDeleteModal({ target, onClose, onConfirm }) {
  return (
    <ConfirmModal
      open={!!target}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Note"
      description="This photo will be permanently deleted from your device."
      confirmLabel="Delete"
      danger
    />
  );
}