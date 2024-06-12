import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

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
        <div>
            {batafsil.map((item, index) => (
                <div key={index}>
                    <img src={item.tour.photo} alt=""/>
                    <h3>{item.tour.day}</h3>
                    <h6>{item.tour.title}</h6>
                    <p>{item.tour.description}</p>
                    <p>{item.tour.description2}</p>

                </div>
            ))}
        </div>
    );
}

export default Batafsil;
