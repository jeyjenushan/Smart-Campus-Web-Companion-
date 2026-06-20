import { useEffect, useState } from 'react';

import { useScheduleStore } from '@/store/useScheduleStore';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { useProfileStore } from '@/store/useProfileStore';

import { WEEK_MAP } from '@/data/seedData';
import {
  getGreeting,
  getSelectedDaySchedule,
  getUpcomingAssignments,
} from '@/lib/dashboard';

export function useDashboardData() {
  const loadSchedule = useScheduleStore(s => s.loadSchedule);
  const allSchedule = useScheduleStore(s => s.schedule);

  const assignments = useAssignmentStore(s => s.assignments);
  const loadAssign = useAssignmentStore(s => s.loadAssignments);
  const getStats = useAssignmentStore(s => s.getStats);

  const profile = useProfileStore(s => s.profile);
  const loadProfile = useProfileStore(s => s.loadProfile);

  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  useEffect(() => {
    loadSchedule();
    loadAssign();
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const today = new Date();
  const greeting = getGreeting();
  const stats = getStats();

  const upcoming = getUpcomingAssignments(assignments);

  const selectedSchedule = getSelectedDaySchedule(
    allSchedule,
    WEEK_MAP,
    selectedDay
  );

  return {
    profile,
    stats,
    today,
    greeting,
    upcoming,
    selectedDay,
    setSelectedDay,
    selectedSchedule,
  };
}