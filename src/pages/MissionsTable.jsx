import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react-lite";
import { missionsStore } from "../stores/MissionsStore";




const MissionsTable = observer(() => {
  return (
    <div className="container mt-4">


      <div className="text-center mb-4">
        <h2 className="mb-3">רשימת משימות</h2>
      </div>
      {/* כרטיסי Desktop */}
      <div className="table d-none d-md-flex">
        {missionsStore.getAllMissions().map((m, index) => (
          <div key={index} className="card mb-3 shadow-sm card-desktop">
            <div className="card-body">
              <p><strong>כותרת:</strong> {m.title}</p>
              <p><strong>תיאור:</strong> {m.description}</p>
              <p>
                <strong>סטטוס:</strong>{" "}
                <span
                  className={`badge ${m.status === "active"
                    ? "bg-success"
                    : m.status === "planned"
                      ? "bg-primary"
                      : "bg-secondary"
                    }`}
                >
                  {m.status}
                </span>
              </p>
              <p><strong>תאריך התחלה:</strong> {new Date(m.start_at).toLocaleString()}</p>
              <p><strong>תאריך סיום:</strong> {new Date(m.end_at).toLocaleString()}</p>
              <p><strong>פלוגה:</strong> {m.unit_id}</p>
              <p><strong>הערות:</strong> {m.notes?.join(", ") || "-"}</p>
              <p><strong>תגובות:</strong> {m.comments?.join(", ") || "-"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* כרטיסי Mobile */}
      <div className="d-block d-md-none">
        {missionsStore.getAllMissions().map((m, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p><strong>כותרת:</strong> {m.title}</p>
              <p><strong>תיאור:</strong> {m.description}</p>
              <p>
                <strong>סטטוס:</strong>{" "}
                <span
                  className={`badge ${m.status === "active"
                    ? "bg-success"
                    : m.status === "planned"
                      ? "bg-primary"
                      : "bg-secondary"
                    }`}
                >
                  {m.status}
                </span>
              </p>
              <p><strong>תאריך התחלה:</strong> {new Date(m.start_at).toLocaleString()}</p>
              <p><strong>תאריך סיום:</strong> {new Date(m.end_at).toLocaleString()}</p>
              <p><strong>פלוגה:</strong> {m.unit_id}</p>
              <p><strong>הערות:</strong> {m.notes?.join(", ") || "-"}</p>
              <p><strong>תגובות:</strong> {m.comments?.join(", ") || "-"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
})

export default MissionsTable;
