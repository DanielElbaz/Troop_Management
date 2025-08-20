import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState} from "react";
//import { supabase } from "../data/supabaseClient";
//import UserContext from "../context/UserContext";
//import { useNavigate } from "react-router-dom";
import './Sign.css'
function SignIn() {
  const [numSolider, setNumSolider] = useState("");
  const [password, setPassword] = useState("");
  
//   const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function SignInClicked(e) {
//     e.preventDefault(); // prevent page reload
//     setLoading(true);

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
 setLoading(true);
//     if (error) {
//       alert(" Login failed: " + error.message);
//       console.error("Login error:", error);
   setTimeout(()=>{
       
     setLoading(false);
   },1000)
     
//       return;
//     }

    // if (data?.user) {
    //   // Save username (example: everything before @)
    //   //setUsername(data.user.email?.split("@")[0] || "Guest");

    //   // Redirect after login
    //   navigate("/tweet");
    // }

  
  }
  const isValid = /^\d{7}$/.test(numSolider);
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">התחברות</h3>
   
        <form >
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              מ.א
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={7}
              pattern="\d{7}"
              className={`form-control ${isValid  ? "valid-input" : ""}`} 
              id="email"
              placeholder="הכנס מספר אישי"
              value={numSolider}
              onChange={(e) => setNumSolider(e.target.value)}
               onInvalid={(e) => e.target.setCustomValidity("אנא הכנס מספר אישי בן 7 ספרות")}
  onInput={(e) => e.target.setCustomValidity("")}  // מנקה את ההודעה כשמתחילים להקליד
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
