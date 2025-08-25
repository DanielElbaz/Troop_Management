import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react-lite";
import { missionsStore } from "../stores/MissionsStore";
import { unitStore } from "../stores/UnitStore";
import { useSearchParams } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import SearchSoldier from "../components/SearchSoldier";
import CommanderDashboard from "./CommanderDashboard"; "../pages/CommanderDashboard.css"


const AddMissionForm = observer(() => {
  const [assigneeIds, setAssigneeIds] = useState([]);
  const [searchParams] = useSearchParams();
  const created_by = searchParams.get("commanderId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("planned");
  const [start_at, setStartAt] = useState("");
  const [end_at, setEndAt] = useState("");
  const [unit_id, setUnitId] = useState(0);
  const [notes, setNotes] = useState("");
  const [comments, setComments] = useState("");
  const [validated, setValidated] = useState(false);

  

  const handleSubmit =  (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    const inserted_at = new Date().toISOString(); //2025-08-21 10:48:03.385404+00

    try {
      const newMission = {
        title,
        description,
        status,
        start_at,
        end_at,
        created_by,
        notes: notes ? notes.split(",") : [],
        unit_id,
        inserted_at
      };

      console.log(assigneeIds)
       missionsStore.addMission(newMission, assigneeIds); // ממש כמו addSoldier

      alert("משימה נוצרה בהצלחה!");

      // איפוס השדות
      setTitle("");
      setDescription("");
      setStatus("planned");
      setStartAt("");
      setEndAt("");
      setUnitId(0);
      setNotes("");
      setComments("");
      setValidated(false);
    } catch (error) {
      console.error("Error adding mission:", error.message);
    }
  };

  return (


    <div className="container d-flex align-items-center justify-content-center vh-100  constainer-fluid ">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>

        <h3 className="text-center mb-4">יצירת משימה חדשה</h3>
        <form
          noValidate
          className={validated ? "was-validated" : ""}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="form-label">כותרת</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="invalid-feedback">אנא הכנס כותרת</div>
          </div>
          <div className="mb-3">
            <label className="form-label">תיאור</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="invalid-feedback">אנא הכנס תיאור</div>
          </div>
          <div className="mb-3">
            <label className="form-label">סטטוס</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="planned">מתוכנן</option>
              <option value="active">פעיל</option>
              <option value="completed">הושלם</option>
            </select>
            <div className="invalid-feedback">אנא בחר סטטוס</div>
          </div>
          <div className="mb-3">
            <label className="form-label">תאריך התחלה</label>
            <input
              type="datetime-local"
              className="form-control"
              value={start_at}
              onChange={(e) => setStartAt(e.target.value)}
              required
            />
            <div className="invalid-feedback">אנא בחר תאריך התחלה</div>
          </div>
          <div className="mb-3">
            <label className="form-label">תאריך סיום</label>
            <input
              type="datetime-local"
              className="form-control"
              value={end_at}
              onChange={(e) => setEndAt(e.target.value)}
              required
            />
            <div className="invalid-feedback">אנא בחר תאריך סיום</div>
          </div>
          <div className="mb-3">
            <label className="form-label">פלוגה</label>
            <select
              className="form-select"
              value={unit_id}
              onChange={(e) => setUnitId(Number(e.target.value))}
              required
            >
              <option value="">בחר פלוגה</option>
              {unitStore.getNames.map((unit) => (
                <option key={unit.unit_id} value={unit.unit_id}>
                  {unit.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">אנא בחר חייל</div>
          </div>
          <div className="mb-3">

            <label className="form-label">חייל</label>
            
             <SearchSoldier onChangeIds={setAssigneeIds} />
            
          </div>
        
          <button type="submit" className="btn btn-primary w-100">צור משימה</button>

        </form>
      </div>
    </div>
  );
});

export default AddMissionForm;
