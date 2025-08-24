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
export async function createMissionWithAssignees(mission, soldierServiceIds = []) {
  // 1) create mission
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
  if (mErr) throw mErr;

  // 2) link soldiers (pivot: mission_operational_users; user_id = service_id)
  if (soldierServiceIds.length) {
    const rows = soldierServiceIds.map((sid) => ({
      mission_id: created.id,
      user_id: sid,
    }));
    const { error: linkErr } = await supabase
      .from('mission_operational_users')
      .insert(rows);
    if (linkErr) throw linkErr;
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

  return created.id;
}

