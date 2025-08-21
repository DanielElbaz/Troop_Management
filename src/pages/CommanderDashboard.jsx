import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";

export default function CommanderDashboard() {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
                <h4 className="mb-4">ראשי</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="add-solider" className="nav-link text-white">
                            הוספת חייל
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link text-white">
                            Reports
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link text-white">
                            Analytics
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link text-white">
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-grow-1">
                {/* Topbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        <span className="navbar-brand">המפקד __</span>
                        <button className="btn btn-outline-primary">יציאה</button>
                    </div>
                </nav>

                {/* Content */}
                <div className="container-fluid p-4">
                     <Outlet/>
                </div>
            </div>
        </div>
    );
}
