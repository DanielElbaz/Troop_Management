import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./pages/SignIn";
import SoldierHomePage from "./pages/SoldierHomePage";
import AddSolider from "./pages/AddSolider";
//import TestUsers from "./data/TestUsers"
import TestUnitStore from "./stores/TestUnitStore";
import CommanderDashboard from "./pages/CommanderDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SoldiersTable from "./pages/SoldiersTable";
import MissionsTable from "./pages/MissionsTable";
import { useState } from "react";
import AddMission from "./pages/AddMission";
// import TestUserStore from './stores/TestUserStore';


function App() {
  const [user_id , setUser_id] = useState(0);

function handleUserIdChange(newId) {
  setUser_id(newId);
}
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn onChange ={handleUserIdChange} />} />
          <Route path="/commander-dash" element={<CommanderDashboard userId = {user_id} />}>
            <Route path="add-solider" element={<AddSolider />} />
            <Route path="soliders-table" element={<SoldiersTable />} />
            <Route path="mission-table" element={<MissionsTable />} />
            <Route path="mission-add" element={<AddMission />} />
          </Route>
          <Route path="/soldierHomePage" element={<SoldierHomePage />} />

          {/* <Route path="test-user-store" element={<TestUserStore/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
