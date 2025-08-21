import { supabase } from './supabase'

export async function getUserMissions(userId) {
  const { data, error } = await supabase
    .from('mission_operational_users')
    .select(`
      mission_id,
      missions (
        id,
        title,
        status,
        description,
        start_at,
        end_at
      )
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching missions:', error)
    return []
  }

  // data מכיל את כל המשימות של המשתמש
  return data.map(item => item.missions)
}



// שימוש
// getUserMissions(1001).then(missions => {
//   console.log('Missions for user 1001:', missions)
// })