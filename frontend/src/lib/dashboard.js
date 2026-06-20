import { format, isToday, isTomorrow, differenceInHours } from 'date-fns';
import { COURSES } from '@/data/seedData';



export function getCourseColor(code) {
  return COURSES.find((c) => c.code === code)?.color ?? '#94a3b8';
}

export function getPriorityColor(priority) {
  return (
    {
      urgent: 'red',
      high: 'yellow',
      medium: 'blue',
      low: 'green',
    }[priority] ?? 'gray'
  );
}

export function getSessionTypeColor(type) {
  return (
    {
      Lecture: 'blue',
      Lab: 'green',
      Seminar: 'purple',
      Tutorial: 'yellow',
    }[type] ?? 'gray'
  );
}

export function getDueLabel(dateStr, today = new Date()) {
  const dueDate = new Date(dateStr);

  if (isToday(dueDate)) {
    return { label: 'Due today', color: 'text-danger' };
  }

  if (isTomorrow(dueDate)) {
    return { label: 'Due tomorrow', color: 'text-warning' };
  }

  const hoursLeft = differenceInHours(dueDate, today);

  if (hoursLeft < 0) {
    return { label: 'Overdue', color: 'text-danger font-bold' };
  }

  return {
    label: `Due ${format(dueDate, 'MMM d')}`,
    color: 'text-ink-muted',
  };
}

export function getGreeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
}

export function getUpcomingAssignments(assignments) {
  return assignments
    .filter(a => a.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);
}

export function getSelectedDaySchedule(allSchedule, weekMap, selectedDay) {
  return allSchedule
    .filter(s => s.day === weekMap[selectedDay])
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}