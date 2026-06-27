import { Plus } from 'lucide-react';

import { TopHeader } from '@/components/layout/TopHeader';
import { Button } from '@/components/ui';

import { AssignmentSearch } from '@/components/assignments/AssignmentSearch';
import { AssignmentFilters } from '@/components/assignments/AssignmentFilters';
import { AssignmentList } from '@/components/assignments/AssignmentList';
import { AssignmentModals } from '@/components/assignments/AssignmentModals';

import { useAssignmentsPage } from '@/hooks/assignments/useAssignmentsPage';

export default function AssignmentsPage() {
  const {
    loading,
    saving,
    search,
    setSearch,
    filter,
    setFilter,
    stats,
    filtered,
    showAdd,
    setShowAdd,
    editTarget,
    setEditTarget,
    deleteTarget,
    setDeleteTarget,
    toggleComplete,
    handleAdd,
    handleEdit,
    handleDelete,
  } = useAssignmentsPage();

  return (
    <div className="animate-in pt-14">
      <TopHeader
        title="Assignments"
        subtitle={`${stats.pending} pending · ${stats.completed} done`}
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAdd(true)}
            className="gap-1 h-9 px-3"
          >
            <Plus className="w-4 h-4" /> Add
          </Button>
        }
      />

      <div className="px-4 pt-4 space-y-4 pb-6">
        <AssignmentSearch search={search} setSearch={setSearch} />

        <AssignmentFilters
          filter={filter}
          setFilter={setFilter}
          stats={stats}
        />

        <AssignmentList
          loading={loading}
          filtered={filtered}
          search={search}
          setShowAdd={setShowAdd}
          toggleComplete={toggleComplete}
          setEditTarget={setEditTarget}
          setDeleteTarget={setDeleteTarget}
        />
      </div>

      <AssignmentModals
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        editTarget={editTarget}
        setEditTarget={setEditTarget}
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
        saving={saving}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}