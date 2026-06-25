import { getDB } from '@/lib/db';

export async function putLectureNote(note){ 
  return (await getDB()).put('lectureNotes', note); 
}
export async function deleteLectureNote(id){ 
  return (await getDB()).delete('lectureNotes', id); 
}
export async function getAllLectureNotes(){
  return (await getDB()).get('lectureNotes');
}