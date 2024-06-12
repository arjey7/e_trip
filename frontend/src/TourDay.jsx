import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TourDay() {
    const [tourDays, setTourDays] = useState([]);
    const [tours, setTours] = useState([]);
    const { id } = useParams(); // Get the id from the URL
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        photo: '',
        tourId: id // Set the tourId to the id from the URL
    });

    useEffect(() => {
        fetchTourDays();
        fetchTours();
    }, []);

    const fetchTourDays = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tourDay');
            setTourDays(response.data);
        } catch (error) {
            console.error('Error fetching tour days:', error);
        }
    };

    const fetchTours = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tour');
            setTours(response.data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData(prevState => ({
                ...prevState,
                photo: reader.result
            }));
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/tourDay', formData);
            console.log('Response:', response.data);
            setTourDays(prevTourDays => [...prevTourDays, response.data]);
            setFormData({
                title: '',
                description: '',
                photo: '',
                tourId: id // Reset tourId to the id from the URL
            });
        } catch (error) {
            console.error('Error adding tour day:', error);
        }
    };

    return (
        <div className="container">
            <h1>Tour Day</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Photo</label>
                    <input type="file" className="form-control" name="photo" onChange={handlePhotoChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add Tour Day</button>
            </form>
            <h2>Tour Days</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Photo</th>
                </tr>
                </thead>
                <tbody>
                {tourDays.map((tourDay, index) => (
                    <tr key={index}>
                        <td>{tourDay.title}</td>
                        <td>{tourDay.description}</td>
                        <td><img src={`http://localhost:8080/files/img?name=${tourDay.photo}`} style={{ width: '100px', height: '100px' }} alt={tourDay.title} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TourDay;
