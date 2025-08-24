// FetchFromMission.jsx
import { supabase } from './supabase';

export async function fetchAllMissions() {
  const { data, error } = await supabase.from('missions').select('*');
  if (error) {
    console.error('Error fetching all missions:', error);
    return [];
  }
  return data;
}

/**
 * Creates a mission and assigns soldiers in the junction table.
 * @param {Object} mission  - {title, description, status, start_at, end_at, unit_id, notes?, comments?}
 * @param {number[]} soldierServiceIds - array of service_id (users.service_id)
 * @returns {number|null} mission id
 */
export async function createMissionWithAssignees(mission, soldierServiceIds = []) {
  // Insert mission
  const { data: created, error: mErr } = await supabase
    .from('missions')
    .insert([{
      title: mission.title,
      description: mission.description,
      status: mission.status,
      start_at: mission.start_at,
      end_at: mission.end_at,
      unit_id: mission.unit_id,
      notes: mission.notes ?? [],
      comments: mission.comments ?? [],
    }])
    .select('id')
    .single();

  if (mErr) {
    console.error('Error inserting mission:', mErr);
    return null;
  }

  // Link soldiers (assumes mission_operational_users.user_id stores service_id)
  if (soldierServiceIds.length > 0) {
    const rows = soldierServiceIds.map((sid) => ({
      mission_id: created.id,
      user_id: sid,
    }));
    const { error: linkErr } = await supabase
      .from('mission_operational_users')
      .insert(rows);

    if (linkErr) {
      console.error('Error linking soldiers to mission:', linkErr);
      // You might want to rollback the mission insert in a RPC; omitted here.
    }
  }

  return created.id;
}
