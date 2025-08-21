import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { UserStore } from './UserStore';

function TestUserStoreView() {
  const userStore = useMemo(() => new UserStore(), []);

  useEffect(() => {
    userStore.loadUsers();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-3">Users – Demo</h3>

      <div className="card">
        <div className="card-header">
          <div className="row g-2">
            <div className="col-sm">
              <input
                className="form-control"
                placeholder="Search name or service ID"
                value={userStore.query}
                onChange={(e) => {
                  userStore.setQuery(e.target.value);
                  userStore.loadUsers(); 
                }}
              />
            </div>

            <div className="col-auto d-flex align-items-center gap-2">
              <div className="form-check">
                <input
                  id="activeOnly"
                  className="form-check-input"
                  type="checkbox"
                  checked={userStore.activeOnly}
                  onChange={(e) => {
                    userStore.setActiveOnly(e.target.checked); 
                  }}
                />
                <label className="form-check-label" htmlFor="activeOnly">
                  Active only
                </label>
              </div>

              <button
                className="btn btn-outline-secondary"
                onClick={() => userStore.loadUsers()}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Service ID</th>
                <th>First</th>
                <th>Last</th>
                <th>Role</th>
                <th>Unit ID</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {userStore.filtered.map((u) => (
                <tr key={u.service_id}>
                  <td>{u.service_id}</td>
                  <td>{u.first_name}</td>
                  <td>{u.last_name}</td>
                  <td className="text-capitalize">{u.role}</td>
                  <td>{u.unit_id || '-'}</td>
                  <td>{u.is_active ? 'Yes' : 'No'}</td>
                </tr>
              ))}

              {userStore.filtered.length === 0 && !userStore.loading && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No users
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {userStore.loading && <div className="p-3 text-muted">Loading…</div>}
          {userStore.error && (
            <div className="alert alert-danger m-2">{userStore.error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

const TestUserStore = observer(TestUserStoreView);
export default TestUserStore;
