import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import { observer } from "mobx-react-lite";

const CommanderDashboard = observer(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = userStore.GetCurrentUser();


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

      {/* Main content */}
      <div
        className="flex-grow-1 ms-md-3"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          transition: "margin 0.3s",
        }}
      >
        {/* Topbar for desktop */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom d-none d-md-flex">
          <div className="container-fluid">
            <span style={{ marginRight: "250px" }} className="navbar-brand">
              {" "}
              {user?.first_name} המפקד
            </span>
          </div>
        </nav>
        <div
          className="card shadow-sm p-4 mb-4 mx-auto"
          style={{ maxWidth: "500px" }}
        >
          <h4 className="card-title mb-3">פרטי המפקד</h4>
          <div className="row mb-2">
            <div className="col-4 fw-bold">שם פרטי:</div>
            <div className="col-8">{user?.first_name || "-"}</div>
          </div>
          <div className="row mb-2">
            <div className="col-4 fw-bold">שם משפחה:</div>
            <div className="col-8">{user?.last_name || "-"}</div>
          </div>
          <div className="row mb-2">
            <div className="col-4 fw-bold">מספר אישי:</div>
            <div className="col-8">{user?.service_id || "-"}</div>
          </div>
          <div className="row mb-2">
            <div className="col-4 fw-bold">טלפון:</div>
            <div className="col-8">{user?.phone || "-"}</div>
          </div>
          <div className="row mb-2">
            <div className="col-4 fw-bold">תפקיד:</div>
            <div className="col-8">{user?.role || "-"}</div>
          </div>
        </div>
        {/* Content */}
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
});
export default CommanderDashboard;
