import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import './css/Batafsil.css';

function Batafsil() {
    const { tourId } = useParams();
    const [batafsil, setBatafsil] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8082/api/tourDay/${tourId}`)
            .then(res => {
                setBatafsil(res.data);
            })
            .catch(error => {
                console.error("Error fetching tour details:", error);
            });
    }, [tourId]);

    return (
        <div className="batafsil-container">
            {batafsil.map((item, index) => (
                <div key={index} className="batafsil-item">
                    <img src={`http://localhost:8082/files/img?name=${item.photo}`} alt={item.photo} className="batafsil-img" />
                    <div className="batafsil-details">
                        <h3 className="batafsil-title">Day: {item.day}</h3>
                        <h3 className="batafsil-subtitle">{item.title}</h3>
                        <p className="batafsil-description">{item.description}</p>
                        <p className="batafsil-description2">{item.tour.description2}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Batafsil;
