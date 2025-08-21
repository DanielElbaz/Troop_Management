import { supabase } from './supabase'

export async function fetchAllMissions() {
  const { data, error } = await supabase
    .from('missions')
    .select('*')

  if (error) {
    console.error('Error fetching all missions:', error)
    return []
  }
  return data
}

// export async function insertMission(mission,users_ids) {
//     //check if the refernce to the user is right before creating the mission
//     const { data: userData, error: userError } = await supabase
//       .from('users')
//       .select('id')
//       .in('id', users_ids)

//     if (userError) {
//       console.error('Error fetching users:', userError)
//       return null
//     }

//     if (userData.length !== users_ids.length) {
//       console.error('User reference is not valid')
//       return null
//     }

//     const { data, error } = await supabase
//       .from('missions')
//       .insert([
//         {
//           title: mission.title,
//           description: mission.description,
//           status: mission.status,
//           start_at: mission.start_at,
//           end_at: mission.end_at,
//           users_referance: users_referance
//         }
//       ])

//     if (error) {
//       console.error('Error inserting mission:', error)
//       return null
//     }

//     return data
// }