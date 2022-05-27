import "./App.css";
import Navigation from "./components/navigation/Navigation";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 navigation ">
            <Navigation />
          </div>
          <div className="col-12 pt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
