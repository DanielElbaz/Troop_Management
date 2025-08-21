import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from './pages/SignIn';

import AddSolider from './pages/AddSolider';

//import TestUsers from "./data/TestUsers"
import TestUnitStore from './stores/TestUnitStore';
import CommanderDashboard from './pages/CommanderDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/commander-dash" element={<CommanderDashboard />} >
        <Route path="add-solider" element={<AddSolider />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
