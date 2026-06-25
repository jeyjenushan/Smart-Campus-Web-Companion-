
//idb is a wrapper around indexedDB that makes it easier to use with async/await.
import { openDB } from 'idb';

const DB_NAME    = 'campus-sync-db';
const DB_VERSION = 2;
//It stores the database connection
let dbPromise = null;

//Returns a connection to the indexedDB database
function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      //Mainly used to create the tables
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

export { getDB };

