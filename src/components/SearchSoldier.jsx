// SearchSoldier.jsx
import { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { supabase } from "./supabase";
import { useDebouncedValue } from "./hooks/bouncing";

/**
 * Props:
 * - onPick?: (soldier) => void   // called when user clicks "Add"
 */
export default function SearchSoldier({ onPick }) {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 900);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simple immediate search on button submit (optional)
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

  // Debounced auto-search
  useEffect(() => {
    runSearch(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div dir="rtl">
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
          placeholder="חיפוש חייל לפי שם"
          aria-label="Search soldier"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          חיפוש
        </button>
      </form>

      {loading && <div className="text-muted">טוען…</div>}

      {!loading && rows.length > 0 && (
        <ul className="list-group">
          {rows.map((s) => (
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
                onClick={() => onPick?.(s)}
              >
                הוסף
              </button>
            </li>
          ))}
        </ul>
      )}

      {!loading && q.trim().length >= 2 && rows.length === 0 && (
        <div className="text-muted">לא נמצאו תוצאות</div>
      )}
    </div>
  );
}
