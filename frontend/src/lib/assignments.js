import { isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';

export function priorityColor(priority) {
  return {
    urgent: 'red',
    high: 'yellow',
    medium: 'blue',
    low: 'green',
  }[priority] ?? 'gray';
}

export function statusColor(status) {
  return {
    pending: 'yellow',
    'in-progress': 'blue',
    completed: 'green',
  }[status] ?? 'gray';
}

export function getDueLabel(dateStr) {
  if (!dateStr) return { text: '—', cls: 'text-ink-faint' };

  const date = new Date(dateStr);
  const now = new Date();

  if (isPast(date) && !isToday(date)) {
    return { text: 'Overdue!', cls: 'text-danger font-bold' };
  }

  if (isToday(date)) {
    return { text: 'Due today', cls: 'text-danger' };
  }

  if (isTomorrow(date)) {
    return { text: 'Due tomorrow', cls: 'text-warning' };
  }

  const days = differenceInDays(date, now);

  return {
    text: `${days}d left`,
    cls: days <= 3 ? 'text-warning' : 'text-ink-muted',
  };
}

export function searchAssignments(assignments, search) {
  if (!search) return assignments;

  const keyword = search.toLowerCase();

  return assignments.filter(
    assignment =>
      assignment.title.toLowerCase().includes(keyword) ||
      assignment.course.toLowerCase().includes(keyword)
  );
}