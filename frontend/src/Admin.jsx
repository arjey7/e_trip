import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import {
    fetchToursRequest,
    addTourRequest,
    updateTourRequest,
    deleteTourRequest
} from './redux/reducer/userReducer.js';

function Admin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tours = useSelector(state => state.user.tours);
    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        description2: '',
        photo: '',
        video: '',
        day: '',
        cost: ''
    });

    useEffect(() => {
        dispatch(fetchToursRequest());
    }, [dispatch]);

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

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData(prevState => ({
                ...prevState,
                video: reader.result
            }));
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            dispatch(updateTourRequest(formData));
        } else {
            dispatch(addTourRequest(formData));
        }
        setFormData({
            id: '',
            title: '',
            description: '',
            description2: '',
            photo: '',
            video: '',
            day: '',
            cost: ''
        });
    };

    const handleEdit = (tour, e) => {
        e.stopPropagation();
        setFormData(tour);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        dispatch(deleteTourRequest(id));
    };

    const selectedTour = (uuid) => {
        navigate(`/tour/${uuid}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Tours</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description2">Description2:</label>
                    <input type="text" className="form-control" id="description2" name="description2" value={formData.description2} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo:</label>
                    <input type="file" className="form-control-file" id="photo" name="photo" onChange={handlePhotoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="video">Video:</label>
                    <input type="file" className="form-control-file" id="video" name="video" onChange={handleVideoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="day">Day:</label>
                    <input type="number" className="form-control" id="day" name="day" value={formData.day} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="cost">Cost:</label>
                    <input type="number" className="form-control" id="cost" name="cost" value={formData.cost} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">{formData.id ? 'Update' : 'Add'}</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <table className="table table-striped mt-4">
                <thead className="thead-dark">
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Description2</th>
                    <th>Photo</th>
                    <th>Video</th>
                    <th>Day</th>
                    <th>Cost</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tours.map((tour, index) => (
                    <tr onClick={() => selectedTour(tour.id)} key={index}>
                        <td>{tour.title}</td>
                        <td>{tour.description}</td>
                        <td>{tour.description2}</td>
                        <td><img src={`http://localhost:8080/files/img?name=${tour.photo}`} style={{ width: '100px', height: '100px' }} /></td>
                        <td><img src={`http://localhost:8080/files/video?name=${tour.video}`} style={{ width: '100px', height: '100px' }} /></td>
                        <td>{tour.day}</td>
                        <td>{tour.cost}</td>
                        <td>
                            <button className="btn btn-warning mr-2" onClick={(e) => handleEdit(tour, e)}>Edit</button>
                            <button className="btn btn-danger" onClick={(e) => handleDelete(tour.id, e)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
