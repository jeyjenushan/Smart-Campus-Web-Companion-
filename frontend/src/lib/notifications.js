/**
 * Notification API service
 * Handles permission requests and scheduled deadline reminders
 */

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  const result = await Notification.requestPermission();
  return result;
}

export function sendNotification(title, options = {}) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return null;
  return new Notification(title, {
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    ...options,
  });
}

export function scheduleDeadlineReminder(assignment) {
  if (!assignment.dueDate) return;
  const due = new Date(assignment.dueDate);
  const now = new Date();
  const msUntilDue = due - now;
  const reminderMs = msUntilDue - 24 * 60 * 60 * 1000; // 24h before

  if (reminderMs > 0) {
    setTimeout(() => {
      sendNotification(`⏰ Due Tomorrow: ${assignment.title}`, {
        body: `${assignment.course} assignment is due in 24 hours.`,
        tag: `deadline-${assignment.id}`,
        requireInteraction: true,
      });
    }, reminderMs);
  } else if (msUntilDue > 0 && msUntilDue < 3600000) {
    // Due within 1 hour
    sendNotification(`🚨 Due Soon: ${assignment.title}`, {
      body: `${assignment.course} assignment is due in less than 1 hour!`,
      tag: `deadline-urgent-${assignment.id}`,
      requireInteraction: true,
    });
  }
}

export function scheduleAllReminders(assignments) {
  assignments
    .filter(a => a.status !== 'completed')
    .forEach(scheduleDeadlineReminder);
}
