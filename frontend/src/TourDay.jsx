import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    fetchTourDaysRequest,
    addTourDayRequest,
    updateTourDayRequest,
    deleteTourDayRequest
} from './redux/reducer/tourDayReducer';

function TourDay() {
    const dispatch = useDispatch();
    const { uuid } = useParams(); // Get the id from the URL

    const tourDays = useSelector(state => state.tourDay.tourDays);
    const loading = useSelector(state => state.tourDay.loading);
    const error = useSelector(state => state.tourDay.error);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        photo: '',
        tourId: uuid // Set the tourId to the id from the URL
    });

    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(fetchTourDaysRequest(uuid));
    }, [dispatch, uuid]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateTourDayRequest({ ...formData, id: currentId }));
        } else {
            dispatch(addTourDayRequest(formData));
        }
        setFormData({
            title: '',
            description: '',
            photo: '',
            tourId: uuid
        });
        setIsEditing(false);
        setCurrentId(null);
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

    const handleDelete = (id) => {
        dispatch(deleteTourDayRequest(id));
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
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
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
                        <td>
                            <img src={`http://localhost:8080/files/img?name=${tourDay.photo}`} style={{ width: '100px', height: '100px' }} />

                        </td>
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
