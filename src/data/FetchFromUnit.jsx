// fetchUnits.js
import { supabase } from './supabaseClient'

export async function fetchUnits() {
  try {
    const { data, error } = await supabase
      .from('units')
      .select('*')

    if (error) throw error
    return data 
  } catch (err) {
    console.error('Error fetching units:', err)
    return [] 
  }
}
