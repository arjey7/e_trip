
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [tours, setTours] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        description2: '',
        photo: '',
        video: '',
        day: '',
        cost: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/tour')
            .then(response => {
                setTours(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/tour', formData);
            console.log('Response:', response.data);
            setTours(prevTours => [...prevTours, response.data]);
            setFormData({
                title: '',
                description: '',
                description2: '',
                photo: '',
                video: '',
                day: '',
                cost: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
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
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
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
                </tr>
                </thead>
                <tbody>
                {tours.map((tour, index) => (
                    <tr onClick={() => selectedTour(tour.id)} key={index}>
                        <td>{tour.title}</td>
                        <td>{tour.description}</td>
                        <td>{tour.description2}</td>
                        <td><img src={`http://localhost:8080/files/img?name=${tour.photo}`}
                                 style={{width: '100px', height: '100px'}}/></td>
                        <td><img src={`http://localhost:8080/files/video?name=${tour.video}`}
                                 style={{width: '100px', height: '100px'}}/></td>
                        <td>{tour.day}</td>
                        <td>{tour.cost}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
