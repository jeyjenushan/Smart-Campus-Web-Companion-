import { getDB } from '@/lib/db';
export async function getAllSchedule(){ 
  return (await getDB()).getAll('schedule'); 
}
export async function putScheduleItem(item){ 
  return (await getDB()).put('schedule', item); 
}
export async function deleteScheduleItem(id){ 
  return (await getDB()).delete('schedule', id); }
