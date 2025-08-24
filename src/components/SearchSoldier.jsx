// SearchSoldier.jsx
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { useDebouncedValue } from "../hooks/Bouncing";
import { supabase } from "../data/supabase";


/**
 * Props:
 * - onChangeIds?: (ids: number[]) => void   // gets called after every add/remove
 * - placeholder?: string
 * - defaultSelectedIds?: number[]           // optional initial selection
 */
export default function SearchSoldier({
  onChangeIds,
  placeholder = "חיפוש חייל לפי שם",
  defaultSelectedIds = [],
}) {
  // Search state
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 900);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Selected state (we keep both ids and soldier objects for display)
  const [selectedIds, setSelectedIds] = useState(
    defaultSelectedIds.map((n) => Number(n))
  );
  const [selected, setSelected] = useState([]); // array of soldier objects

  // Fire Supabase search (debounced)
  useEffect(() => {
    runSearch(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  async function runSearch(text) {
    const term = (text ?? q).trim();
    if (term.length < 2) {
      setRows([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("service_id, first_name, last_name, unit_id, is_active, role")
      .eq("role", "soldier")
      .or(`first_name.ilike.%${term}%,last_name.ilike.%${term}%`)
      .order("first_name", { ascending: true })
      .limit(20);

    setLoading(false);
    if (error) {
      console.error(error);
      setRows([]);
      return;
    }
    setRows(data || []);
  }

  // Add a soldier to the selection
  function handleAdd(s) {
    const sid = Number(s.service_id);
    if (selectedIds.includes(sid)) return;
    const ids = [...selectedIds, sid];
    setSelectedIds(ids);
    setSelected((prev) =>
      prev.some((x) => Number(x.service_id) === sid) ? prev : [...prev, s]
    );
    onChangeIds?.(ids);
  }

  // Remove from selection
  function handleRemove(sid) {
    const nSid = Number(sid);
    const ids = selectedIds.filter((x) => x !== nSid);
    setSelectedIds(ids);
    setSelected((prev) => prev.filter((x) => Number(x.service_id) !== nSid));
    onChangeIds?.(ids);
  }

  return (
    <div dir="rtl">
      {/* Search bar */}
      <form
        className="d-flex mb-2"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(q);
        }}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder={placeholder}
          aria-label="Search soldier"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          חיפוש
        </button>
      </form>

      {/* Selected chips */}
      {selectedIds.length > 0 && (
        <div className="mb-2 d-flex flex-wrap gap-2">
          {selected.map((s) => (
            <span key={s.service_id} className="badge bg-secondary">
              {s.first_name} {s.last_name} · #{s.service_id}
              <button
                type="button"
                className="btn btn-sm btn-light ms-2"
                onClick={() => handleRemove(s.service_id)}
                aria-label="הסרה"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Results */}
      {loading && <div className="text-muted">טוען…</div>}

      {!loading && rows.length > 0 && (
        <ul className="list-group">
          {rows.map((s) => {
            const isSelected = selectedIds.includes(Number(s.service_id));
            return (
              <li
                key={s.service_id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {s.first_name} {s.last_name} · #{s.service_id}
                  {s.unit_id ? ` · יחידה ${s.unit_id}` : ""}
                  {s.is_active ? " · פעיל" : " · לא פעיל"}
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => handleAdd(s)}
                  disabled={isSelected}
                  title={isSelected ? "נוסף כבר" : "הוסף"}
                >
                  {isSelected ? "נוסף" : "הוסף"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {!loading && q.trim().length >= 2 && rows.length === 0 && (
        <div className="text-muted">לא נמצאו תוצאות</div>
      )}
    </div>
  );
}
