import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";


function Navbar({user}) {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      {/* Mobile toggle button */}
      <div className="d-md-none p-2 bg-dark text-white d-flex justify-content-between align-items-center">
        <span className="fw-bold">המפקד {user.first_name}</span>
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-dark text-white p-3 vh-100 position-md-relative position-fixed ${
          isSidebarOpen ? "d-block" : "d-none"
        } d-md-block`}
        style={{ width: "200px", zIndex: 1000 }}
      >
        <h4 className="mb-4 d-md-block d-none">ראשי</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="add-solider"
              className="nav-link text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              הוספת חייל
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="soliders-table"
              className="nav-link text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              חיילים
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="mission-table"
              className="nav-link text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              משימות
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="mission-add"
              className="nav-link text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              הוסף משימה
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-link text-white">
              יציאה
            </Link>
          </li>
        </ul>
      </div>

    
    </div>
  );
}
export default Navbar;
