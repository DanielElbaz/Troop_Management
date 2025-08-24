import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { unitStore } from "../stores/UnitStore";
import "../pages/CommanderDashboard.css"
import { userStore } from "../stores/UserStore";

const AddSolider = observer(() => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [service_id, setService_id] = useState("");
  const [phone, setPhone] = useState("");
  const [validated, setValidated] = useState(false);
  const [unit_id, setUnit_id] = useState(0);
  const [role, setRole] = useState("");
  const [speciality_array, setSpeciality] = useState([]);
  const [is_active, setIs_active] = useState(false);
  const [missions, setMissions] = useState([]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    // כאן אפשר להוסיף קריאה ל-API ליצירת משתמש
    try {
      const speciality ={skills:speciality_array}
      let newSoldier = { service_id, first_name, last_name, role, phone, unit_id,speciality, is_active, missions };
      userStore.addSoldier(newSoldier);
      alert("משתמש נוצר בהצלחה!"); 
    } catch (error) {
      // Error is already set in userStore.error
      console.error("Error adding soldier:", error.message);
    }
    setValidated(true);
  };

  const handleSelect = (e) => {
    const value = e.target.value;

    // בודק אם כבר קיים במערך, כדי לא להוסיף פעמיים
    if (!speciality_array.includes(value)) {
      setSpeciality((prev) => [...prev, value]);
    }
  };

  return (

    <div className="container d-flex align-items-center justify-content-center vh-100  constainer-sold ">
      {console.log(speciality_array)}
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className="text-center mb-4">יצירת חייל חדש</h3>

        <form noValidate className={validated ? "was-validated" : ""} onSubmit={handleSubmit}>

          {/* שם פרטי */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">שם פרטי</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              required
            />
            <div className="invalid-feedback">אנא הכנס שם פרטי</div>
          </div>

          {/* שם משפחה */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">שם משפחה</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              required
            />
            <div className="invalid-feedback">אנא הכנס שם משפחה</div>
          </div>

          {/* מ.א */}
          <div className="mb-3">
            <label htmlFor="numSolider" className="form-label">מ.א</label>
            <input
              type="text"
              className="form-control"
              id="numSolider"
              value={service_id}
              onChange={(e) => setService_id(e.target.value)}
              pattern="\d{7}"
              required
            />
            <div className="invalid-feedback">אנא הכנס מספר אישי בן 7 ספרות</div>
          </div>

          {/* אימייל */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">פלאפון</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              pattern="\d{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <div className="invalid-feedback">אנא הכנס מספר בן 10 ספרות</div>
          </div>
          {/* פלוגה */}
          <div className="mb-3">
            <label htmlFor="unit_id" className="form-label">פלוגה</label>
            <select
              className="form-select"
              id="unit_id"
              value={unit_id}
              onChange={(e) => setUnit_id(e.target.value)}
              placeholder="בחר פלוגה"
              required
            >

              <option value="">בחר פלוגה</option>
              
              {unitStore.getNames.map((obj) => (
                <option  value={obj.unit_id}>
                  {obj.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">אנא בחר יחידה</div>
          </div>

          {/* סטטוס */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">סטטוס</label>
            <select
              className="form-select"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">בחר סטטוס</option>
              <option value="commander">חייל</option>
              <option value="soldier">מפקד</option>

            </select>
            <div className="invalid-feedback">אנא בחר סטטוס</div>
          </div>

          {/* תפקיד */}
          <div className="mb-3">
            <label htmlFor="speciality" className="form-label">התמחות</label>
            <select
              className="form-select"
              id="speciality"
              value={speciality_array[speciality_array.length - 1] || ""} // אופציה אחרונה נראית במקום הדיפולט
              onChange={(e) => {
                const value = e.target.value;
                if (value && !speciality_array.includes(value)) {
                  setSpeciality((prev) => [...prev, value]); // מוסיף למערך
                }
              }}
              required
            >
              <option value="">בחר התמחות</option>
              <option value="קלע">קלע</option>
              <option value="נהג">נהג</option>
              <option value="מגיסט">מגיסט</option>
              <option value="נגביסט">נגביסט</option>
            </select>

            {/* מציג את כל הנבחרות */}
            {speciality_array.length > 0 && (
              <div className="mt-2">
                נבחרו: {speciality_array.join(", ")}
              </div>
            )}

            <div className="invalid-feedback">אנא בחר התמחות</div>
          </div>


          {/* כפתור */}
          <button type="submit" className="btn btn-primary w-100">צור משתמש</button>

        </form>
      </div>

    </div>

  );
})

// first_name: 'יוסי',
//         last_name: 'מזרחי',
//         role: 'soldier',
//         phone: '052-1122334',
//         unit_id: 1,
//         speciality: ['נהג', 'חובש'],
// service_id: 1004,

export default AddSolider;