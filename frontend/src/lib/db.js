import { openDB } from 'idb';

const DB_NAME    = 'campus-sync-db';
const DB_VERSION = 2;
let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('assignments')) {
          const as = db.createObjectStore('assignments', { keyPath: 'id' });
          as.createIndex('status',   'status');
          as.createIndex('course',   'course');
          as.createIndex('dueDate',  'dueDate');
          as.createIndex('priority', 'priority');
        }
        if (!db.objectStoreNames.contains('lectureNotes')) {
          const ln = db.createObjectStore('lectureNotes', { keyPath: 'id' });
          ln.createIndex('course',    'course');
          ln.createIndex('createdAt', 'createdAt');
        }
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile');
        }
        if (!db.objectStoreNames.contains('schedule')) {
          const ss = db.createObjectStore('schedule', { keyPath: 'id' });
          ss.createIndex('day', 'day');
        }
      },
    });
  }
  return dbPromise;
}

export async function getAllAssignments()        { return (await getDB()).getAll('assignments'); }
export async function putAssignment(a)           { return (await getDB()).put('assignments', a); }
export async function deleteAssignment(id)       { return (await getDB()).delete('assignments', id); }
export async function getAllLectureNotes()        { return (await getDB()).getAll('lectureNotes'); }
export async function putLectureNote(n)          { return (await getDB()).put('lectureNotes', n); }
export async function deleteLectureNote(id)      { return (await getDB()).delete('lectureNotes', id); }
export async function getProfile()               { return (await getDB()).get('profile', 'data'); }
export async function saveProfile(data)          { return (await getDB()).put('profile', data, 'data'); }
export async function getAllSchedule()            { return (await getDB()).getAll('schedule'); }
export async function putScheduleItem(item)      { return (await getDB()).put('schedule', item); }
export async function deleteScheduleItem(id)     { return (await getDB()).delete('schedule', id); }
