import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import { observer } from "mobx-react-lite";
import Navbar from "../components/Navbar";
import SearchSoldier from "../components/SearchSoldier";

const CommanderDashboard = observer(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = userStore.GetCurrentUser();


  return (
    <div className="d-flex flex-column flex-md-row vh-100">
       <Navbar user= {user}/>
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
