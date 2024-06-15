import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Comment from "./Comment";
import AdminComment from "./AdminComment";
import TourDay from "./TourDay.jsx";
import Admin from "./Admin.jsx";
import Enquiry from "./EnquiryForm";
import AdminEnquiry from "./AdminEnquiry";
import LandingPage from "./LandingPage";
import Batafsil from "./Batafsil.jsx";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/comment" element={<Comment />} />
                <Route path="/comment/admin" element={<AdminComment />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/tour/:uuid" element={<TourDay />} />
                <Route path="/enquiry" element={<Enquiry />} />
                <Route path="/batafsil/:tourId" element={<Batafsil />} />
                <Route path="/enquiry/list" element={<AdminEnquiry />} />
                <Route path="/" element={<LandingPage />} />

            </Routes>
        </div>
    );
}

export default App;
