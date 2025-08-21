// fetchUnits.jsx
// import { supabase } from './supabase'

export async function fetchUnits() {
  try {
    const { data, error } = await supabase.from('units').select('*');
    return { data: data || [], error };
  } catch (err) {
    console.error('Error fetching units:', err);
    return { data: [], error: err };
  }
}
