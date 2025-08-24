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

export async function addMission(mission) {
  const { data, error } = await supabase
    .from('missions')
    .insert([mission])

  if (error) {
    console.error('Error adding mission:', error)
    return null
  }
  return data
}