import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useProfileStore } from '@/store/useProfileStore';
import { requestNotificationPermission, sendNotification } from '@/lib/notifications';
import { calculateCgpa } from '@/lib/profile';

export function useProfilePage() {
  const loadProfile = useProfileStore(s => s.loadProfile);
  const profile = useProfileStore(s => s.profile);
  const loading = useProfileStore(s => s.loading);
  const updateProfile = useProfileStore(s => s.updateProfile);
  const setAvatar = useProfileStore(s => s.setAvatar);
  const getProgressPct = useProfileStore(s => s.getProgressPct);
  const getCurrentSemesterCredits = useProfileStore(s => s.getCurrentSemesterCredits);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('current');
  const [form, setForm] = useState(null);

  const [notifStatus, setNotifStatus] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  const fileRef = useRef();

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile && !form) {
      setForm({
        name: profile.name ?? '',
        regNumber: profile.regNumber ?? '',
        year: profile.year ?? 4,
        semester: profile.semester ?? 2,
        gpa: profile.gpa ?? '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  async function handleSave() {
    if (!form?.name?.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);

    try {
      await updateProfile({
        ...form,
        year: Number(form.year),
        semester: Number(form.semester),
        gpa: Number(form.gpa),
      });

      setEditing(false);
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB');
      return;
    }

    const reader = new FileReader();

    reader.onload = async ev => {
      await setAvatar(ev.target.result);
      toast.success('Avatar updated!');
    };

    reader.readAsDataURL(file);
  }

  async function toggleNotifications() {
    if (notifStatus === 'granted') {
      await updateProfile({ notificationsEnabled: false });
      setNotifStatus('default');
      toast('Notifications disabled');
      return;
    }

    const result = await requestNotificationPermission();
    setNotifStatus(result);

    if (result === 'granted') {
      await updateProfile({ notificationsEnabled: true });

      sendNotification('🎓 CampusSync Notifications Enabled', {
        body: 'You will now receive deadline reminders.',
      });

      toast.success('Notifications enabled!');
    } else if (result === 'denied') {
      toast.error('Notifications blocked. Enable in browser settings.');
    }
  }

  const progressPct = profile ? getProgressPct() : 0;
  const semCredits = profile ? getCurrentSemesterCredits() : 0;
  const completedCourses = profile?.completedCourses ?? [];

  const { cgpa, totalCreditsDone } = calculateCgpa(
    completedCourses,
    profile?.gpa ?? '—'
  );

  return {
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
  };
}