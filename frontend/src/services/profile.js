export async function getProfile(){ 
  return (await getDB()).get('profile', 'data'); 
}
export async function saveProfile(data){ 
  return (await getDB()).put('profile', data, 'data'); 
}