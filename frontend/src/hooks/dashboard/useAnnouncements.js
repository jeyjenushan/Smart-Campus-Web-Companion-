import { useEffect, useState } from 'react';
import { fetchCourseAnnouncements } from '../../lib/api';


export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [annLoad, setAnnLoad] = useState(true);

  useEffect(() => {
    fetchCourseAnnouncements()
      .then(setAnnouncements)
      .catch(() => {})
      .finally(() => setAnnLoad(false));
  }, []);

  return {
    announcements,
    annLoad,
  };
}