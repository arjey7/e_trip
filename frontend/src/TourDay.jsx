import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    fetchTourDaysRequest,
    addTourDayRequest,
    updateTourDayRequest,
    deleteTourDayRequest
} from './redux/reducer/tourDayReducer';
import Account from "./files/Account.png";
import { fetchToursRequest } from "./redux/reducer/userReducer.js";
import axios from "axios";
import logo from "./logo.svg"

function TourDay() {
    const dispatch = useDispatch();
    const { uuid } = useParams(); // Get the id from the URL
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    // Redux state selectors
    const tourDays = useSelector(state => state.tourDay.tourDays);
    const loading = useSelector(state => state.tourDay.loading);
    const error = useSelector(state => state.tourDay.error);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        photo: '',
        tourId: uuid // Set the tourId to the id from the URL
    });

    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [current, setCurrent] = useState(null);
    const [displayImg, setDisplayImg] = useState("")

    // Fetch initial data
    useEffect(() => {
        dispatch(fetchToursRequest());
        dispatch(fetchTourDaysRequest(uuid));
    }, [dispatch, uuid]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle photo file selection
    const handlePhotoChange = (e) => {
        setCurrent(null);
        const file = e.target.files[0];
        const img=new FileReader();
        img.readAsDataURL(file)
        img.onloadend=()=>{
            setDisplayImg(img.result)
        }
        setFormData(prevState => ({
            ...prevState,
            photo: file
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(formData)

        e.preventDefault();
        if (current!==null) {
            dispatch(updateTourDayRequest({ ...formData, id: current.id }));
        } else {
            dispatch(addTourDayRequest(formData));
        }
        resetForm();
        setCurrent(null);
    };

    // Reset form fields after submission
    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            photo: '',
            tourId: uuid
        });
        setIsEditing(false);
       setCurrent(null)
    };

    // Handle editing a tour day entry
    const handleEdit = (tourDay) => {


        setCurrent(tourDay)
       if (current!=null){
           setFormData({
               title: tourDay.title,
               description: tourDay.description,
               photo: current.photo, // Assuming you don't want to change the photo during editing
               tourId: uuid
           });
       }else{
           setFormData({
               title: tourDay.title,
               description: tourDay.description,
               photo: formData.photo, // Assuming you don't want to change the photo during editing
               tourId: uuid
           });
       }

    };
    function edittt(){
        console.log("ssssss")
    }

    // Handle deleting a tour day entry
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this tour day?")) {
            dispatch(deleteTourDayRequest(id));
        }
    };

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    // Navigation handlers
    const handleNavigate = () => {
        navigate('/');
    };

    const handleNavigate1 = () => {
        navigate('/');
    };

    const handleNavigate2 = () => {
        navigate('/comment');
    };

    const handleNavigate3 = () => {
        navigate('/admin');
    };

    return (
        <div className="">
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "320px",
                marginTop: "50px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <img src={Account} alt="" />
                    <h1 className={"h0"}>{username}</h1>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <p className={"asd"} onClick={handleNavigate3}>Add Tour</p>
                    <p onClick={handleNavigate} className={"asd"}>Enquiry</p>
                    <p onClick={handleNavigate1} className={"asd"}>Available Tours</p>
                    <p onClick={handleNavigate2} className={"asd"}>Comments</p>
                </div>
                <div>
                    <button onClick={handleLogout}
                            style={{ backgroundColor: "red", width: "135px", height: "36px", borderRadius: "20px", borderColor: "red" }}>Log
                        out
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "50px"
                }}>
                    <div className="mb-3">
                        <input placeholder={"Title"} style={{ width: "400px" }} type="text" className="form-control"
                               name="title"
                               value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <input placeholder={"Description"} style={{ width: "400px" }} type="text" className="form-control"
                               name="description"
                               value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>
                            <img style={{width:"200px"}} src={current?`http://localhost:8082/files/tourDay?name=${current.photo}`:displayImg?displayImg:logo}/>
                            <input style={{width: "400px"}} type="file" className="form-control" name="photo"
                                   onChange={handlePhotoChange}/>
                        </label>
                    </div>
                    <button style={{backgroundColor: "red", borderColor: "red", marginTop: "-15px"}} type="submit"
                            className="btn btn-primary">{isEditing ? 'Update' : 'Add'} Tour Day
                    </button>
                </div>
            </form>
                <table style={{ marginTop: "40px", width: "1370px", marginLeft: "90px" }}
                       className="table table-striped">
                    <thead>
                    <tr className={"op"}>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Photo</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tourDays.map((tourDay, index) => (
                        <tr className={"op"} key={index}>
                            <td>{tourDay.title}</td>
                            <td>{tourDay.description}</td>
                            <td><img src={`http://localhost:8082/files/tourDay?name=${tourDay.photo}`} alt="Tour"
                                     style={{ width: '100px', height: '100px' }} /></td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(tourDay)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(tourDay.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default TourDay;
