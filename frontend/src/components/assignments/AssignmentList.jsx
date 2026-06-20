import { Plus, CheckSquare } from 'lucide-react';

import { Button, EmptyState, Spinner } from '@/components/ui';
import { AssignmentCard } from './AssignmentCard';

export function AssignmentList({
  loading,
  filtered,
  search,
  setShowAdd,
  toggleComplete,
  setEditTarget,
  setDeleteTarget,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={CheckSquare}
        title={search ? 'No results found' : 'No assignments here'}
        description={
          search
            ? `No assignments match "${search}"`
            : 'Add your first assignment to get started'
        }
        action={
          !search && (
            <Button variant="primary" onClick={() => setShowAdd(true)}>
              <Plus className="w-4 h-4" /> Add Assignment
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-ink-faint font-medium">
        {filtered.length} assignment{filtered.length !== 1 ? 's' : ''}
        {search ? ` matching "${search}"` : ''}
      </p>

      {filtered.map(assignment => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onToggle={toggleComplete}
          onEdit={setEditTarget}
          onDelete={setDeleteTarget}
        />
      ))}
    </div>
  );
}