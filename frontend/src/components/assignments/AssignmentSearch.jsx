import { Search, X } from 'lucide-react';

export function AssignmentSearch({ search, setSearch }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" />

      <input
        className="input pl-9"
        placeholder="Search assignments…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 touch-target w-7 h-7 flex items-center justify-center"
        >
          <X className="w-4 h-4 text-ink-faint" />
        </button>
      )}
    </div>
  );
}