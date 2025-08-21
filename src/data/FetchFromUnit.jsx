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

export function MockUnit(){
  return [
    { id: 1, name: 'פלוגה 1' },
    { id: 2, name: 'פלוגה 2' },
    { id: 3, name: 'פלוגה 3' }
  ];
}