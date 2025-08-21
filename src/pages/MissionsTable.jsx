import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { observer } from "mobx-react-lite";
import { missionsStore } from "../stores/MissionsStore"; 




const MissionsTable = observer(() => {
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
      {missionsStore.getAllMissions().map((m, index) => (
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
  {missionsStore.getAllMissions().map((m, index) => (
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
