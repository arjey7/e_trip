import {Route, Routes} from "react-router-dom";
import Admin from "./Admin";
import TourDay from "./TourDay";


function App() {
  return (
      <div>
          <Routes>
              <Route path={"/admin"} element={<Admin/>}/>
              <Route path={"/tour/:uuid"} element={<TourDay/>}/>
          </Routes>
      </div>
  );
}

export default App;
