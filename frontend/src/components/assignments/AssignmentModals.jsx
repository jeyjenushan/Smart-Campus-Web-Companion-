import { Modal, ConfirmModal } from '@/components/ui/Modal';
import { AssignmentForm } from './AssignmentForm';

export function AssignmentModals({
  showAdd,
  setShowAdd,

  editTarget,
  setEditTarget,

  deleteTarget,
  setDeleteTarget,

  saving,

  handleAdd,
  handleEdit,
  handleDelete,
}) {
  return (
    <>
      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="New Assignment"
        description="Fill in the assignment details"
      >
        <AssignmentForm
          onSave={handleAdd}
          onCancel={() => setShowAdd(false)}
          loading={saving}
        />
      </Modal>

      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Assignment"
      >
        {editTarget && (
          <AssignmentForm
            initial={editTarget}
            onSave={handleEdit}
            onCancel={() => setEditTarget(null)}
            loading={saving}
          />
        )}
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Assignment"
        description={`Delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        danger
      />
    </>
  );
}