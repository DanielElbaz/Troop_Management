import "bootstrap/dist/css/bootstrap.min.css";
//import React, { useState} from "react";
//import { supabase } from "../data/supabaseClient";
//import UserContext from "../context/UserContext";
//import { useNavigate } from "react-router-dom";

function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   async function SignInClicked(e) {
//     e.preventDefault(); // prevent page reload
//     setLoading(true);

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       alert(" Login failed: " + error.message);
//       console.error("Login error:", error);
//       setLoading(false);
//       return;
//     }

    // if (data?.user) {
    //   // Save username (example: everything before @)
    //   //setUsername(data.user.email?.split("@")[0] || "Guest");

    //   // Redirect after login
    //   navigate("/tweet");
    // }

//     setLoading(false);
//   }

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Sign In</h3>

        <form >
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember me */}
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100" >
            {/* {loading ? "Signing in..." : "Sign In"} */}
          </button>
        </form>

        {/* Links */}
        <div className="mt-3 text-center">
          <a href="#">Forgot password?</a> <br />
          <a href="#">Create an account</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
