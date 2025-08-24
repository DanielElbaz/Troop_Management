// src/components/Missions.jsx
import React, { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// If your file is named "UserAndMisson.jsx" change the import line:
import { getUserMissions } from '../data/UserAndMisson';

function statusBadgeClass(status) {
  switch (status) {
    case 'active': return 'bg-success';
    case 'planned': return 'bg-primary';
    case 'completed': return 'bg-secondary';
    case 'canceled': return 'bg-danger';
    default: return 'bg-dark';
  }
}

function safeDate(ts) {
  if (!ts) return '-';
  const d = new Date(ts);
  return isNaN(d.getTime()) ? '-' : d.toLocaleString();
}

/**
 * Soldier Missions — shows only missions for the given user (serviceId)
 * Usage: <Missions serviceId={currentUser.service_id} />
 * Optional props: status, from, to for filtering on the server.
 */
export default function Missions({ serviceId, status, from, to }) {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const title = useMemo(() => 'המשימות שלי', []);

  async function load() {
    if (!serviceId) return;
    setLoading(true);
    setErr(null);
    try {
      const rows = await getUserMissions(serviceId, { status, from, to, order: 'desc' });
      setMissions(rows || []);
    } catch (e) {
      setErr(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [serviceId, status, from, to]);

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">{title}</h2>
        <button className="btn btn-sm btn-outline-secondary" onClick={load}>רענן</button>
      </div>

      {err && <div className="alert alert-danger">שגיאה: {err}</div>}

      {/* Desktop table */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-hover table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>כותרת</th>
              <th>תיאור</th>
              <th>סטטוס</th>
              <th>תאריך התחלה</th>
              <th>תאריך סיום</th>
              <th>פלוגה</th>
              <th>הערות</th>
              <th>תגובות</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((m) => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.description || '-'}</td>
                <td><span className={`badge ${statusBadgeClass(m.status)}`}>{m.status}</span></td>
                <td>{safeDate(m.start_at)}</td>
                <td>{safeDate(m.end_at)}</td>
                <td>{m.unit_id ?? '-'}</td>
                <td>{Array.isArray(m.notes) ? m.notes.join(', ') : '-'}</td>
                <td>{Array.isArray(m.comments) ? m.comments.join(', ') : '-'}</td>
              </tr>
            ))}
            {!loading && missions.length === 0 && (
              <tr><td colSpan={8} className="text-muted">אין משימות להצגה</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="d-block d-md-none">
        {missions.map((m) => (
          <div key={m.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p><strong>כותרת:</strong> {m.title}</p>
              <p><strong>תיאור:</strong> {m.description || '-'}</p>
              <p><strong>סטטוס:</strong> <span className={`badge ${statusBadgeClass(m.status)}`}>{m.status}</span></p>
              <p><strong>תאריך התחלה:</strong> {safeDate(m.start_at)}</p>
              <p><strong>תאריך סיום:</strong> {safeDate(m.end_at)}</p>
              <p><strong>פלוגה:</strong> {m.unit_id ?? '-'}</p>
              <p><strong>הערות:</strong> {Array.isArray(m.notes) ? m.notes.join(', ') : '-'}</p>
              <p><strong>תגובות:</strong> {Array.isArray(m.comments) ? m.comments.join(', ') : '-'}</p>
            </div>
          </div>
        ))}
        {!loading && missions.length === 0 && (
          <div className="alert alert-info">אין משימות להצגה</div>
        )}
      </div>

      {loading && <div className="p-3 text-muted">טוען…</div>}
    </div>
  );
}
