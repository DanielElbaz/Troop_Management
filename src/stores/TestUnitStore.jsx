/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { UnitStore } from "./UnitStore";

function TestUnitStore() {
  const unitStore = useMemo(() => new UnitStore(), []);

  useEffect(() => {
    unitStore.loadUnits(); // Make sure this method exists
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-3">Mock Mode Demo</h3>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <strong>Units</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => unitStore.fetchUnits()}
              >
                Refresh
              </button>
            </div>
            <ul className="list-group list-group-flush">
              {unitStore.units.map((u) => (
                <li className="list-group-item" key={u.unit_id}>
                  {u.unit_id} — {u.name}
                </li>
              ))}
              {unitStore.units.length === 0 && (
                <li className="list-group-item text-muted">No units</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(TestUnitStore);
