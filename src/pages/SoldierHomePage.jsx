import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Props:
 * - soldier?: { name?: string, rank?: string }
 * - missions: Array<{ id, title, location?, start?, end?, status? }>
 * - onSubmitComment?: (text: string) => void
 * - onSignOut?: () => void
 */
export default function SoldierHomePage({
  soldier,
  missions = [],
  onSubmitComment,
  onSignOut,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [view, setView] = useState("missions"); // "missions" | "comment"
  const [comment, setComment] = useState("");

  const fmtTime = (d) => {
    if (!d) return "";
    const date = typeof d === "string" ? new Date(d) : d;
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmitComment?.(comment.trim());
    setComment("");
  };

  const soldierLabel =
    [soldier?.rank, soldier?.name].filter(Boolean).join(" ") || "חייל";

  return (
    <div
      className={`soldier-layout d-flex flex-column flex-md-row min-vh-100 ${isSidebarOpen ? "is-open" : ""}`}
      dir="rtl"
    >
      {/* פס עליון במובייל */}
      <div className="d-md-none p-2 bg-dark text-white d-flex justify-content-between align-items-center">
        <span className="fw-bold">{soldierLabel}</span>
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => setIsSidebarOpen((v) => !v)}
          aria-label="תפריט"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`soldier-sidebar bg-dark text-white p-3 position-fixed d-md-block ${
          isSidebarOpen ? "d-block" : "d-none"
        }`}
        style={{ right: 0, top: 0, bottom: 0, zIndex: 1000, overflowY: "auto" }}
        aria-label="סרגל צד"
      >
        <h4 className="mb-4 d-none d-md-block">דף הבית</h4>
        <ul className="nav flex-column gap-1">
          <li className="nav-item">
            <button
              className={`nav-link w-100 text-end ${view === "missions" ? "active" : ""}`}
              onClick={() => {
                setView("missions");
                setIsSidebarOpen(false);
              }}
              type="button"
            >
              המשימות שלי
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link w-100 text-end ${view === "comment" ? "active" : ""}`}
              onClick={() => {
                setView("comment");
                setIsSidebarOpen(false);
              }}
              type="button"
            >
              שליחת הודעה
            </button>
          </li>
          <li className="nav-item mt-2">
            {onSignOut ? (
              <button className="nav-link w-100 text-end" onClick={onSignOut}>
                התנתקות
              </button>
            ) : (
              <Link to="/" className="nav-link w-100 text-end">
                התנתקות
              </Link>
            )}
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className="soldier-main flex-grow-1">
        {/* טופ־בר לדסקטופ */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom d-none d-md-flex">
          <div className="container-fluid">
            <span className="navbar-brand">{soldierLabel}</span>
          </div>
        </nav>

        <div className="container-fluid p-4">
          {view === "missions" && (
            <section>
              <h5 className="mb-3">המשימות שלי</h5>
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">שם</th>
                      <th scope="col">מיקום</th>
                      <th scope="col">התחלה</th>
                      <th scope="col">סוף</th>
                      <th scope="col">סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missions.map((m) => (
                      <tr key={m.id}>
                        <td className="fw-medium">{m.title}</td>
                        <td>{m.location || "-"}</td>
                        <td className="text-nowrap">{fmtTime(m.start)}</td>
                        <td className="text-nowrap">{fmtTime(m.end)}</td>
                        <td>
                          <span className="badge bg-secondary">{m.status || "—"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {missions.length === 0 && (
                  <div className="card">
                    <div className="card-body text-muted">אין משימות כרגע.</div>
                  </div>
                )}
              </div>
            </section>
          )}

          {view === "comment" && (
            <section>
              <h5 className="mb-3">שליחת הודעה למפקד</h5>
              <form onSubmit={handleSend} className="card" style={{ maxWidth: 900 }}>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">הודעה</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="מה תרצה לכתוב?"
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      שליחה
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setComment("")}
                    >
                      ניקוי
                    </button>
                  </div>
                </div>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
