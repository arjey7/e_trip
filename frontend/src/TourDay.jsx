import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TourDay() {
    const [tourDays, setTourDays] = useState([]);
    const { uuid } = useParams(); // Get the id from the URL

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        photo: '',
        tourId: uuid // Set the tourId to the id from the URL
    });

    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchTourDays();
    }, []);

    const fetchTourDays = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/tourDay/${uuid}`);
            setTourDays(response.data);
        } catch (error) {
            console.error('Error fetching tour days:', error);
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
        if (isEditing) {
            await handleUpdate();
        } else {
            await handleAdd();
        }
    };

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/tourDay', formData);
            setTourDays(prevTourDays => [...prevTourDays, response.data]);
            setFormData({
                title: '',
                description: '',
                photo: '',
                tourId: uuid
            });
        } catch (error) {
            console.error('Error adding tour day:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/tourDay/${currentId}`, formData);
            setTourDays(prevTourDays => prevTourDays.map(tourDay =>
                tourDay.id === currentId ? response.data : tourDay
            ));
            setFormData({
                title: '',
                description: '',
                photo: '',
                tourId: uuid
            });
            setIsEditing(false);
            setCurrentId(null);
        } catch (error) {
            console.error('Error updating tour day:', error);
        }
    };

    const handleEdit = (tourDay) => {
        setFormData({
            title: tourDay.title,
            description: tourDay.description,
            photo: '',
            tourId: uuid
        });
        setIsEditing(true);
        setCurrentId(tourDay.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/tourDay/${id}`);
            setTourDays(prevTourDays => prevTourDays.filter(tourDay => tourDay.id !== id));
        } catch (error) {
            console.error('Error deleting tour day:', error);
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
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'} Tour Day</button>
            </form>
            <h2>Tour Days</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Photo</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tourDays.map((tourDay, index) => (
                    <tr key={index}>
                        <td>{tourDay.title}</td>
                        <td>{tourDay.description}</td>
                        <td><img src={`http://localhost:8080/files/img?name=${tourDay.photo}`} style={{ width: '100px', height: '100px' }} /></td>
                        <td>
                            <button className="btn btn-warning" onClick={() => handleEdit(tourDay)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(tourDay.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TourDay;
