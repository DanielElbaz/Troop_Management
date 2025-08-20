import { supabase } from './supabase'

/**
 * Adds a new user to the services table.
 * @param {Object} user - User object
 * @param {number} user.service_id - Unique personal ID
 * @param {string} user.first_name
 * @param {string} user.last_name
 * @param {string} user.role - 'soldier' or 'commandar'
 * @param {string} user.phone
 * @param {number} user.unit_id - ID of the unit
 * @param {Array} user.speciality - Array of strings
 * @param {boolean} user.is_active
 * @param {Array} user.missions - Array of strings
 */
export async function addUser(user) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          service_id: user.service_id,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          phone: user.phone,
          unit_id: user.unit_id,
          speciality: user.speciality,
          is_active: user.is_active,
          missions: user.missions
        }
      ])

    if (error) {
      console.error('Insert error:', error)
      return null
    }

    console.log('Inserted:', data)
    return data
  } catch (err) {
    console.error('Unexpected error:', err)
    return null
  }
}


// Get all users
export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')

  if (error) {
    console.error('Error fetching all users:', error)
    return []
  }
  return data
}

// Get all soldiers
export async function getAllSoldiers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'soldier')

  if (error) {
    console.error('Error fetching soldiers:', error)
    return []
  }
  return data
}

// Get all commanders
export async function getAllCommanders() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'commandar')

  if (error) {
    console.error('Error fetching commanders:', error)
    return []
  }
  return data
}

// Search users by first or last name
export async function searchUsers(keyword) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`first_name.ilike.%${keyword}%,last_name.ilike.%${keyword}%`)

  if (error) {
    console.error('Error searching users:', error)
    return []
  }
  return data
}
