import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { userStore } from "../stores/UserStore";
import { observer } from "mobx-react-lite";
import "../pages/SoliderTable.css";

const SoldiersTable = observer(() => {
  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2>רשימת חיילים</h2>
      </div>

      {/* Desktop Cards */}
      <div className="table d-none d-md-flex">
        {userStore.getAllUsers.map((s, index) => (
          <div key={index} className="card card-desktop">
            <div className="card-body">
              <p><strong>מ.א:</strong> {s?.service_id}</p>
              <p><strong>שם:</strong> {s?.first_name} {s?.last_name}</p>
              <p><strong>טלפון:</strong> {s?.phone}</p>
              <p><strong>פלוגה:</strong> {s?.unit_id}</p>
              <p>
                <strong>סטטוס:</strong>{" "}
                <span className={`badge ${s?.role === "מפקד" ? "bg-success" : "bg-primary"}`}>
                  {s?.role}
                </span>
              </p>
              <p><strong>התמחות:</strong> {s?.speciality?.skills?.join(", ") || "-"}</p>
              <p>
                <strong>פעיל:</strong>{" "}
                <span className={`badge ${s?.is_active ? "bg-success" : "bg-danger"}`}>
                  {s?.is_active ? "✔️" : "❌"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="d-block d-md-none">
        {userStore.getAllUsers.map((s, index) => (
          <div className="card mb-3 shadow-sm card-desktop">
            <div className="card-body">
              <div className="card-title">{s?.first_name} {s?.last_name}</div>

              <div className="card-section">
                <p><strong>מ.א:</strong> <span>{s?.service_id}</span></p>
                <p><strong>סטטוס:</strong>
                  <span className={`badge ${s?.role === "מפקד" ? "bg-success" : "bg-primary"} status-icon`}>
                    {s?.role}
                  </span>
                </p>
              </div>

              <div className="card-section">
                <p><strong>טלפון:</strong> <span>{s?.phone}</span></p>
                <p><strong>פעיל:</strong>
                  <span className={`badge ${s?.is_active ? "bg-success" : "bg-danger"} status-icon`}>
                    {s?.is_active ? "✔️" : "❌"}
                  </span>
                </p>
              </div>

              <div className="card-section">
                <p><strong>פלוגה:</strong> <span>{s?.unit_id}</span></p>
                <p><strong>התמחות:</strong> <span>{s?.speciality?.skills?.join(", ") || "-"}</span></p>
              </div>
            </div>
          </div>


        ))}
      </div>
    </div>
  );
});

export default SoldiersTable;
