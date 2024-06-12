
import {Route, Routes} from "react-router-dom";
import Admin from "./Admin";
import TourDay from "./TourDay";
import Comment from "./Comment.jsx";
import AdminComment from "./AdminComment.jsx";


function App() {
    return (
        <div>
            <Routes>
                <Route path={"/admin"} element={<Admin/>}/>
                <Route path={"/tour/:uuid"} element={<TourDay/>}/>
                <Route path={"/comment"} element={<Comment/>}/>
                <Route path={"/comment/admin"} element={<AdminComment/>}/>
            </Routes>
        </div>
    );
}

export default App;
