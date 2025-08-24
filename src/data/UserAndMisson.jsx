import { supabase } from './supabase';

/**
 * Get all missions assigned to a user (by service_id / user_id in mission_operational_users).
 * @param {number|string} userId    users.service_id (bigint in DB)
 * @param {object} [opts]
 * @param {'planned'|'active'|'completed'|'canceled'} [opts.status]
 * @param {string} [opts.from]  ISO date (filters missions.start_at >= from)
 * @param {string} [opts.to]    ISO date (filters missions.end_at   <= to)
 * @param {'asc'|'desc'} [opts.order='desc']  order by missions.start_at
 * @returns {Promise<Array>} array of mission rows
 */
export async function getUserMissions(userId, opts = {}) {
  const { status, from, to, order = 'desc' } = opts;

  // Build base query with embedded INNER join to missions
  let query = supabase
    .from('mission_operational_users')
    .select(`
      mission_id,
      missions!inner (
        id,
        title,
        status,
        description,
        start_at,
        end_at,
        unit_id,
        notes,
        comments
      )
    `)
    .eq('user_id', userId)
    .order('start_at', {
      foreignTable: 'missions',
      ascending: order !== 'desc',
    });

  // Optional filters on the embedded table
  if (status) query = query.eq('missions.status', status);
  if (from)   query = query.gte('missions.start_at', from);
  if (to)     query = query.lte('missions.end_at', to);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching missions for user:', error);
    return [];
  }

  // data is an array of rows with { mission_id, missions: { ...mission } }
  // Flatten and filter out any null/undefined just in case
  return (data || []).map(r => r.missions).filter(Boolean);
}
