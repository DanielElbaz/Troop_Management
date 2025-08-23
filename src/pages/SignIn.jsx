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

  function SignInClicked(e) {
    e.preventDefault();
    const user = userStore.findUserById(Number(service_id));
    if (!user) {
      navigate("/");
      return;
    } else {
      const role = userStore.roleById(Number(service_id));
      if (role === null) {
        navigate("/");
        return;
      }
      userStore.SetCurrentUser(Number(service_id));
      role === "commander"
        ? navigate("/commander-dash")
        : navigate("/soldierHomePage");
    }
  }

  const isValid = /^\d{7}$/.test(service_id);

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 sign-bg">
       <div className="text-center mb-3 img-container">
          <img className="sign-logo"
            src="/troop.png" // שים כאן את התמונה של סמל צה"ל בתיקיית public/assets
            alt="IDF Logo"
            style={{ width: "280px", marginBottom: "10px" }}
          />
        </div>
      <div className="card shadow p-4 custom-card">
        {/* לוגו צה"ל */}
    

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
              onInvalid={(e) =>
                e.target.setCustomValidity("אנא הכנס מספר אישי בן 7 ספרות")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-dark fw-bold">
              סיסמא
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="הקלד סיסמא"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label text-dark" htmlFor="rememberMe">
              זכור אותי
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-idf w-100"
            onClick={SignInClicked}
          >
            {loading ? "מתחבר..." : "התחבר"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <a href="#" className="link-gold">שכחת סיסמא?</a> <br />
          <a href="#" className="link-gold">צור חשבון</a>
        </div>
      </div>
    </div>
  );
});

export default SignIn;
