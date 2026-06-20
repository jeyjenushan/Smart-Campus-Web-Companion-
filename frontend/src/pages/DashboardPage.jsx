import { WifiOff } from 'lucide-react';

import { TopHeader } from '@/components/layout/TopHeader';

import { WeatherWidget } from '@/components/dashboard/WeatherWidget';
import { DashboardGreeting } from '@/components/dashboard/DashboardGreeting';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { WeeklySchedule } from '@/components/dashboard/WeeklySchedule';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { CourseAnnouncements } from '@/components/dashboard/CourseAnnouncements';

import {
  useDashboardData,
  useWeather,
  useAnnouncements,
  useOnlineStatus,
} from '@/hooks/dashboard';

export default function DashboardPage() {
  const onlineStatus = useOnlineStatus();

  const {
    profile,
    stats,
    today,
    greeting,
    upcoming,
    selectedDay,
    setSelectedDay,
    selectedSchedule,
  } = useDashboardData();

  const {
    weather,
    weatherLoad,
    weatherError,
    loadWeather,
  } = useWeather();

  const {
    announcements,
    annLoad,
  } = useAnnouncements();

  return (
    <div className="animate-in">
      <TopHeader
        actions={
          !onlineStatus && (
            <div className="flex items-center gap-1 text-xs text-warning font-medium">
              <WifiOff className="w-3.5 h-3.5" /> Offline
            </div>
          )
        }
      />

      <div className="px-4 py-4 space-y-5 pb-6">
        <DashboardGreeting
          greeting={greeting}
          profile={profile}
          today={today}
        />

        <WeatherWidget
          weather={weather}
          loading={weatherLoad}
          error={weatherError}
          onRefresh={loadWeather}
        />

        <DashboardStats
          stats={stats}
          profile={profile}
        />

        <WeeklySchedule
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedSchedule={selectedSchedule}
        />

        <UpcomingDeadlines
          upcoming={upcoming}
          today={today}
        />

        <CourseAnnouncements
          announcements={announcements}
          loading={annLoad}
        />
      </div>
    </div>
  );
}