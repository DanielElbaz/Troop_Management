import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
//import { supabase } from "../data/supabaseClient";
//import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import './Sign.css'
function SignIn() {
  const [service_id, setService_id] = useState("");
  const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function SignInClicked(e) {
    //     e.preventDefault(); // prevent page reload
    //     setLoading(true);
    setValidated(true)
    //     const { data, error } = await supabase.auth.signInWithPassword({
    //       email,
    //       password,
    //     });
    setLoading(true);
    //     if (error) {
    //       alert(" Login failed: " + error.message);
    //       console.error("Login error:", error);
    setTimeout(() => {

      setLoading(false);
    }, 1000)

    //       return;
    //     }

    // if (data?.user) {
    //   // Save username (example: everything before @)
    //   //setUsername(data.user.email?.split("@")[0] || "Guest");

    //   // Redirect after login
      navigate("/commander-dash");
      // navigate("/soldierHomePage");
    // }


  }
  const isValid = /^\d{7}$/.test(service_id);
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">התחברות</h3>

        <form  >
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="service_id" className="form-label">
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
              onInvalid={(e) => e.target.setCustomValidity("אנא הכנס מספר אישי בן 7 ספרות")}
              onInput={(e) => e.target.setCustomValidity("")}  
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
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

          {/* Remember me */}
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              זכור אותי
            </label>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100" onClick={SignInClicked} >
            {loading ? "מתחבר..." : "התחבר"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-3 text-center">
          <a href="#">שכחת סיסמא?</a> <br />
          <a href="#">צור חשבון</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
