import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { userStore } from "../stores/UserStore"; 
import { observer } from "mobx-react-lite";


// רשימת חיילים לדוגמה

const SoldiersTable = observer(() => {
  return (
         <div className="container mt-4">
      <h2 className="mb-3">רשימת חיילים</h2>

      {/* טבלה ל-Desktop */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-hover table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>מ.א</th>
              <th>שם פרטי</th>
              <th>שם משפחה</th>
              <th>טלפון</th>
              <th>פלוגה</th>
              <th>סטטוס</th>
              <th>התמחות</th>
              <th>פעיל</th>
            </tr>
          </thead>
          <tbody>
            {userStore.getAllUsers.map((s, index) => (
              <tr key={index}>
                <td>{s?.service_id}</td>
                <td>{s?.first_name}</td>
                <td>{s?.last_name}</td>
                <td>{s?.phone}</td>
                <td>{s?.unit_id}</td>
                <td>
                  <span
                    className={`badge ${
                      s?.role === "מפקד" ? "bg-success" : "bg-primary"
                    }`}
                  >
                    {s?.role}
                  </span>
                </td>
                
                <td>{s?.speciality?.skills?.join(", ") || "-"}</td>
                <td>
                  <span
                    className={`badge ${
                      s?.is_active ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {s?.is_active ? "פעיל" : "לא פעיל"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards למובייל */}
      <div className="d-block d-md-none">
        {userStore.getAllUsers.map((s, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p>
                <strong>מ.א:</strong> {s?.service_id}
              </p>
              <p>
                <strong>שם:</strong> {s?.first_name} {s?.last_name}
              </p>
              <p>
                <strong>טלפון:</strong> {s?.phone}
              </p>
              <p>
                <strong>פלוגה:</strong> {s?.unit_id}
              </p>
              <p>
                <strong>סטטוס:</strong>{" "}
                <span
                  className={`badge ${
                    s?.role === "מפקד" ? "bg-success" : "bg-primary"
                  }`}
                >
                  {s?.role}
                </span>
              </p>
              <p>
                <strong>התמחות:</strong> {s?.speciality?.skills?.join(", ") || "-"}
              </p>
              <p>
                <strong>פעיל:</strong>{" "}
                <span
                  className={`badge ${
                    s?.is_active ? "bg-success" : "bg-danger"
                  }`}
                >
                  {s?.is_active ? "✔️" : "❌"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
})

export default SoldiersTable;
