import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { userStore } from "../stores/UserStore"; 
import { observer } from "mobx-react-lite";




const MissionsTable = observer(() => {

    let missions = [
    {
      id: "11111111-1111-1111-1111-111111111111",
      title: "משימת סיור יומי",
      description: "סיור בשטח הצפוני",
      status: "planned",
      start_at: "2025-08-25T05:00:00+00:00",
      end_at: "2025-08-25T09:00:00+00:00",
      created_by: null,
      notes: ["בדיקת ציוד", "בדיקת קשר"],
      comments: ["אין הערות"],
      unit_id: 1,
      inserted_at: "2025-08-21T12:00:00+00:00"
    },
    {
      id: "22222222-2222-2222-2222-222222222222",
      title: "משימת אבטחה",
      description: "שמירה על נקודות אסטרטגיות",
      status: "active",
      start_at: "2025-08-25T06:00:00+00:00",
      end_at: "2025-08-25T14:00:00+00:00",
      created_by: null,
      notes: ["קבלת מיפוי", "בדיקת גדרות"],
      comments: ["תגובה ראשונה"],
      unit_id: 2,
      inserted_at: "2025-08-21T12:10:00+00:00"
    },
    {
      id: "33333333-3333-3333-3333-333333333333",
      title: "משימת מודיעין",
      description: "איסוף מידע על פעילות חשודה",
      status: "planned",
      start_at: "2025-08-26T07:00:00+00:00",
      end_at: "2025-08-26T12:00:00+00:00",
      created_by: null,
      notes: ["קבלת מיפוי", "ראיית שטח"],
      comments: ["דווח ראשוני"],
      unit_id: 3,
      inserted_at: "2025-08-21T12:20:00+00:00"
    },
    {
      id: "44444444-4444-4444-4444-444444444444",
      title: "משימת לוגיסטיקה",
      description: "העברת ציוד ליחידה",
      status: "planned",
      start_at: "2025-08-27T04:00:00+00:00",
      end_at: "2025-08-27T08:00:00+00:00",
      created_by: null,
      notes: ["העמסת ציוד"],
      comments: ["בדיקה ראשונה"],
      unit_id: 1,
      inserted_at: "2025-08-21T12:30:00+00:00"
    }
  ];
  return (
         <div className="container mt-4">
      <h2 className="mb-3">רשימת משימות</h2>

      {/* טבלה ל-Desktop */}
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
      {missions.map((m, index) => (
        <tr key={index}>
          <td>{m.title}</td>
          <td>{m.description}</td>
          <td>
            <span
              className={`badge ${
                m.status === "active"
                  ? "bg-success"
                  : m.status === "planned"
                  ? "bg-primary"
                  : "bg-secondary"
              }`}
            >
              {m.status}
            </span>
          </td>
          <td>{new Date(m.start_at).toLocaleString()}</td>
          <td>{new Date(m.end_at).toLocaleString()}</td>
          <td>{m.unit_id}</td>
          <td>{m.notes?.join(", ") || "-"}</td>
          <td>{m.comments?.join(", ") || "-"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Cards למובייל */}
<div className="d-block d-md-none">
  {missions.map((m, index) => (
    <div key={index} className="card mb-3 shadow-sm">
      <div className="card-body">
        <p>
          <strong>כותרת:</strong> {m.title}
        </p>
        <p>
          <strong>תיאור:</strong> {m.description}
        </p>
        <p>
          <strong>סטטוס:</strong>{" "}
          <span
            className={`badge ${
              m.status === "active"
                ? "bg-success"
                : m.status === "planned"
                ? "bg-primary"
                : "bg-secondary"
            }`}
          >
            {m.status}
          </span>
        </p>
        <p>
          <strong>תאריך התחלה:</strong> {new Date(m.start_at).toLocaleString()}
        </p>
        <p>
          <strong>תאריך סיום:</strong> {new Date(m.end_at).toLocaleString()}
        </p>
        <p>
          <strong>פלוגה:</strong> {m.unit_id}
        </p>
        <p>
          <strong>הערות:</strong> {m.notes?.join(", ") || "-"}
        </p>
        <p>
          <strong>תגובות:</strong> {m.comments?.join(", ") || "-"}
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
})

export default MissionsTable;
