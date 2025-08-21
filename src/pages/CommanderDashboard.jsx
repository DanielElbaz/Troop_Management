import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CommanderDashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
           <div className="d-flex flex-column flex-md-row vh-100">

      {/* Mobile toggle button */}
      <div className="d-md-none p-2 bg-dark text-white d-flex justify-content-between align-items-center">
        <span className="fw-bold">המפקד __</span>
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
        style={{ width: "250px", zIndex: 1000 }}
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
            <Link className="nav-link text-white" onClick={() => setIsSidebarOpen(false)}>
              משימות
            </Link>
          </li>
           <li className="nav-item">
            <Link to="/" className="nav-link text-white" >
              יציאה
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link to="test-user-store" className="nav-link text-white" >
              טסט
            </Link>
          </li> */}
        </ul>
      </div>

      {/* Main content */}
      <div
        className="flex-grow-1 ms-md-3"
        style={{ marginLeft: isSidebarOpen ? "250px" : "0", transition: "margin 0.3s" }}
      >
        {/* Topbar for desktop */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom d-none d-md-flex">
          <div className="container-fluid">
            <span style={{marginRight:"250px"}} className="navbar-brand">שם המפקד</span>
          </div>
        </nav>

        {/* Content */}
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>
    </div>
    );
}
