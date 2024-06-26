import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminComment from "./AdminComment";
import TourDay from "./TourDay.jsx";
import Admin from "./Admin.jsx";
import AdminEnquiry from "./AdminEnquiry";
import LandingPage from "./LandingPage";

import Login from "./Login.jsx";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admincomment" element={<AdminComment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tour/:uuid" element={<TourDay />} />
                <Route path="/enquiry/list" element={<AdminEnquiry />} />
                <Route path="/" element={<LandingPage />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;