import React from 'react';
import Comment from "./Comment";
import AdminComment from "./AdminComment";
import TourDay from "./TourDay.jsx";
import Admin from "./Admin.jsx";
import {Route, Routes} from "react-router-dom";
import Enquiry from "./EnquiryForm";
import AdminEnquiry from "./AdminEnquiry";
import LandingPage from "./LandingPage";

function App(props) {
    return (
        <div>
            <Routes>
                <Route path="/comment" element={<Comment/>} />
                <Route path={"/comment/admin"} element={<AdminComment/>}/>
                <Route path={"/admin"} element={<Admin/>}/>
                <Route path={"/tour/:uuid"} element={<TourDay/>}/>
                <Route path={"/enquiry"} element={<Enquiry/>}/>
                <Route path={"/enquiry/list"} element={<AdminEnquiry/>}/>
                <Route path={"/"} element={<LandingPage/>}/>
            </Routes>
        </div>
    );
}

export default App;