import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    fetchTourDaysRequest,
    addTourDayRequest,
    updateTourDayRequest,
    deleteTourDayRequest
} from './redux/reducer/tourDayReducer';
import Account from "./files/Account.png";
import {fetchToursRequest} from "./redux/reducer/userReducer.js";

function TourDay() {
    const dispatch = useDispatch();
    const { uuid } = useParams(); // Get the id from the URL
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const tourDays = useSelector(state => state.tourDay.tourDays);
    // const tours = useSelector(state => state.user.tours);
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
        dispatch(fetchToursRequest());
    }, [dispatch]);
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
        // reader.onloadend = () => {
        //     setFormData(prevState => ({
        //         ...prevState,
        //         photo: reader.result
        //     }));
        // };
        setFormData({...formData,photo: file})

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
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        navigate('/login');
    };
    function handleNavigate(){
        navigate('/');
    }

    function handleNavigate1(){
        navigate('/');
    }

    function handleNavigate2(){
        navigate('/comment');
    }

    function handleNavigate3(){
        navigate('/admin')
    }
    return (
        <div className="">
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "320px",
                marginTop: "50px"
            }}>
                <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                    <img src={Account} alt=""/>
                    <h1 className={"h0"}>{username}</h1>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                    <p className={"asd"} onClick={handleNavigate3}>Add Tour</p>
                    <p onClick={handleNavigate} className={"asd"}>Enquiry</p>
                    <p onClick={handleNavigate1} className={"asd"}>Available Tours</p>
                    <p onClick={handleNavigate2} className={"asd"}>Comments</p>
                </div>
                <div>
                    <button onClick={handleLogout}
                            style={{backgroundColor: "red", width: "135px", height: "36", borderRadius: "20px"}}>Log
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
                        <input placeholder={"Title"} style={{width: "400px"}} type="text" className="form-control"
                               name="title"
                               value={formData.title} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input placeholder={"Description"} style={{width: "400px"}} type="text" className="form-control"
                               name="description"
                               value={formData.description} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input style={{width: "400px"}} type="file" className="form-control" name="photo"
                               onChange={handlePhotoChange}/>
                    </div>
                    <button style={{backgroundColor: "red", borderColor: "red", marginTop: "-15px"}} type="submit"
                            className="btn btn-primary">{isEditing ? 'Update' : 'Add'} Tour Day
                    </button>

                </div>
                <table style={{marginTop: "40px", width: "1370px", marginLeft: "90px"}}
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
                                     style={{width: '100px', height: '100px'}}/></td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(tourDay)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(tourDay.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {/*<table style={{marginTop: "40px", width: "1540px", marginLeft: "83px"}}>*/}
            {/*    <thead>*/}
            {/*    <tr className={"op"}>*/}
            {/*        <th>Title</th>*/}
            {/*        <th>Description</th>*/}
            {/*        <th>Description2</th>*/}
            {/*        <th>Text</th>*/}
            {/*        <th>Photo</th>*/}
            {/*        <th>Video</th>*/}
            {/*        <th>Day</th>*/}
            {/*        <th>Price</th>*/}
            {/*        <th>Actions</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {tours.map((tour, index) => (*/}
            {/*        <tr className={"op"} onClick={() => selectedTour(tour.id)} key={index}>*/}
            {/*            <td>{tour.title}</td>*/}
            {/*            <td>{tour.description}</td>*/}
            {/*            <td>{tour.description2}</td>*/}
            {/*            <td>{tour.text}</td>*/}
            {/*            <td><img src={`http://localhost:8080/files/img?name=${tour.photo}`} alt="Tour"*/}
            {/*                     style={{width: '100px', height: '100px'}}/></td>*/}
            {/*            <td>*/}
            {/*                <video width="320" height="240" controls>*/}
            {/*                    <source src={`http://localhost:8080/files/video?name=${tour.video}`} type="video/mp4"/>*/}
            {/*                    Your browser does not support the video tag.*/}
            {/*                </video>*/}
            {/*            </td>*/}
            {/*            <td>{tour.day}</td>*/}
            {/*            <td>{tour.cost}</td>*/}
            {/*            <td>*/}
            {/*                <button className="btn btn-warning w-50" onClick={(e) => handleEdit(tour, e)}>Edit</button>*/}
            {/*                <button className="btn btn-danger" onClick={(e) => handleDelete(tour.id, e)}>Delete</button>*/}
            {/*            </td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

        </div>
    );
}

export default TourDay;
