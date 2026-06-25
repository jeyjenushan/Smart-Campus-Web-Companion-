import { getDB } from '@/lib/db';
export async function getAllAssignments(){ 
  return (await getDB()).getAll('assignments');
}

export async function putAssignment(assignment){ 
  return (await getDB()).put('assignments', assignment); 
}

export async function deleteAssignment(id){ 
  return (await getDB()).delete('assignments', id); 
}

export async function getAllLectureNotes(){ 
  return (await getDB()).getAll('lectureNotes'); 
}