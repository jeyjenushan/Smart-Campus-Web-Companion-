import { Edit2, X } from 'lucide-react';

import { TopHeader } from '@/components/layout/TopHeader';
import { Spinner } from '@/components/ui';

import { ProfileHeaderCard } from '@/components/profile/ProfileHeaderCard';
import { DegreeProgressCard } from '@/components/profile/DegreeProgressCard';
import { CourseTabsCard } from '@/components/profile/CourseTabsCard';
import { NotificationCard } from '@/components/profile/NotificationCard';
import { AppInfoCard } from '@/components/profile/AppInfoCard';

import { useProfilePage } from '@/hooks/profile/useProfilePage';

export default function ProfilePage() {
  const {
    profile,
    loading,

    editing,
    setEditing,

    saving,
    form,
    setForm,

    tab,
    setTab,

    notifStatus,
    fileRef,

    progressPct,
    semCredits,
    completedCourses,
    cgpa,
    totalCreditsDone,

    handleSave,
    handleAvatarChange,
    toggleNotifications,
  } = useProfilePage();

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="animate-in">
      <TopHeader
        title="My Profile"
        subtitle={profile.regNumber}
        actions={
          editing ? (
            <button
              onClick={() => setEditing(false)}
              className="touch-target w-9 h-9 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-ink-muted" />
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="touch-target w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-muted"
            >
              <Edit2 className="w-4 h-4 text-ink-muted" />
            </button>
          )
        }
      />

      <div className="px-4 pt-4 pb-6 space-y-5">
        <ProfileHeaderCard
          profile={profile}
          editing={editing}
          form={form}
          setForm={setForm}
          saving={saving}
          fileRef={fileRef}
          handleSave={handleSave}
          handleAvatarChange={handleAvatarChange}
          cgpa={cgpa}
        />

        <DegreeProgressCard
          profile={profile}
          progressPct={progressPct}
          semCredits={semCredits}
        />

        <CourseTabsCard
          profile={profile}
          tab={tab}
          setTab={setTab}
          completedCourses={completedCourses}
          cgpa={cgpa}
          totalCreditsDone={totalCreditsDone}
        />

        <NotificationCard
          notifStatus={notifStatus}
          toggleNotifications={toggleNotifications}
        />

        <AppInfoCard />
      </div>
    </div>
  );
}