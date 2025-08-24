import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import { observer } from "mobx-react-lite";
import "./Sign.css";

const SignIn = observer(() => {
  const [service_id, setService_id] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [opened, setOpened] = useState(false);
  const [code, setCode] = useState("");
//2122122
  function modelOpen() {
    const user = userStore.filterById(Number(service_id));
    console.log(user);
    if (user.length === 0) {
      alert("מ.א לא קיים במערכת ❌");
      setService_id("");
      return;
    }
    setOpened(true);
  }
  function closeModel() {
    setOpened(false);
    setCode("");
  }

  function handleSubmitCode() {
    if (code === "1234") {
      closeModel();
       userStore.SetCurrentUser(Number(service_id)); // ✅
      const role = userStore.roleById(Number(service_id));
      console.log(role)
      role === "commander"
        ? navigate("/commander-dash")
        : navigate("/soldierHomePage");
    } else {
      alert("קוד לא נכון ❌");
    }
  }

  const isValid = /^\d{7}$/.test(service_id);

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 sign-bg">
      <div className="text-center mb-3 img-container">
        <img
          className="sign-logo"
          src="/troop.png"
          alt="IDF Logo"
        />
      </div>

      <div className="card shadow p-4 custom-card">
        <h3 className="text-center mb-4 text-gold">התחברות</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="service_id" className="form-label text-dark fw-bold">
              מ.א
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={7}
              pattern="\d{7}"
              className={`form-control ${isValid ? "valid-input" : ""}`}
              id="service_id"
              placeholder="הכנס מספר אישי"
              value={service_id}
              onChange={(e) => setService_id(e.target.value)}
              required
            />
          </div>

          <button disabled= {service_id.length !== 7 || loading}
            type="submit"
            className="btn btn-idf w-100"
            onClick={(e) => {
              e.preventDefault();
              modelOpen();
            }}
          >
            {loading ? "מתחבר..." : "התחבר"}
          </button>
        </form>
      </div>

      {opened && (
        <div className="overlay">
          <div className="note-details">
            <div className="parent-note-update p-3 d-flex flex-column justify-content-between">
              {/* כפתור X לסגירה */}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-outline-gold"
                  onClick={closeModel}
                >
                  ✕
                </button>
              </div>

              <h4 className="text-center mb-3">הזן קוד פלוגתי</h4>

              <input
                type="text"
                className="form-control text-center mb-3"
                placeholder="הכנס קוד"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <button className="btn btn-idf w-100" onClick={handleSubmitCode}>
                אשר
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default SignIn;
