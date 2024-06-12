import React, { useEffect, useState } from 'react';
import axios from "axios";
import './css/Page.css';

function Page() {
    const [page, setPage] = useState([]);

    useEffect(() => {
        getAll();
    }, []);

    function getAll() {
        axios.get("http://localhost:8082/api/comment/approved")
            .then(res => {
                setPage(res.data);
            })
            .catch(error => {
                console.error("Error fetching approved comments:", error);
            });
    }

    return (
        <div className="page-container">
            {page.map((comment, index) => (
                <div key={index} className="comment-container">
                    <h3 className="comment-name">{comment.firstName} {comment.lastName}</h3>
                    <p className="comment-text">{comment.text}</p>
                </div>
            ))}
        </div>
    );
}

export default Page;
