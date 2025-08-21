import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from './pages/SignIn';

import AddSolider from './pages/AddSolider';

//import TestUsers from "./data/TestUsers"
import TestUnitStore from './stores/TestUnitStore';
function App() {
  return (
    <div className="App">
      <AddSolider />
    </div>
  );
}

export default App;
