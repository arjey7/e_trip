import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/TourDay.css";
import {
    fetchTourDaysRequest,
    addTourDayRequest,
    updateTourDayRequest,
    deleteTourDayRequest
} from './redux/reducer/tourDayReducer';
import Account from "./files/Account.png";
import { fetchToursRequest } from "./redux/reducer/userReducer.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function TourDay() {
    const dispatch = useDispatch();
    const { uuid } = useParams();
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const [items, setItems] = useState([])

    const tourDays = useSelector(state => state.tourDay.tourDays);
    const loading = useSelector(state => state.tourDay.loading);
    const error = useSelector(state => state.tourDay.error);
    const [destination, setDestination] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        photo: '',
        tourId: uuid
    });
    const [newDestination, setNewDestination] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [current, setCurrent] = useState(null);
    const [displayImg, setDisplayImg] = useState("");
    const [destinationFormData, setDestinationFormData] = useState({
        day: '',
        data: '',
        text: '',
        tourId: uuid
    });
    const [context,setContext] = useState([])
    const [lastDay, setLastDay] = useState('');
    const [inputValue, setInputValue] = useState("")
    const [aboutData, setAboutData] = useState({
        startTime: '',
        endTime: '',
        price: '',
        tourId: uuid  // Assuming you have a way to retrieve or set the tourId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAboutData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        dispatch(fetchToursRequest());
        dispatch(fetchTourDaysRequest(uuid));

    }, [dispatch, uuid]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/destination/${uuid}`);
                setDestination(response.data);
            } catch (error) {
                console.error('Error fetching destinations', error);
            }
        };
        fetchDestinations();
    }, [uuid]);

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDestinationChange = (e) => {
        const { name, value } = e.target;
        setDestinationFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const img = new FileReader();
        img.readAsDataURL(file);
        img.onloadend = () => {
            setDisplayImg(img.result);
        };
        setFormData(prevState => ({
            ...prevState,
            photo: file
        }));
    };

    const handleTourDaySubmit = (e) => {
        e.preventDefault();
        if (current !== null) {
            dispatch(updateTourDayRequest({ ...formData, id: current.id }));
        } else {
            dispatch(addTourDayRequest(formData));
        }
        resetTourDayForm();
    };

    const resetTourDayForm = () => {
        setFormData({
            title: '',
            description: '',
            photo: '',
            tourId: uuid
        });
        setIsEditing(false);
        setCurrent(null);
        setDisplayImg('');
    };

    const handleEdit = (tourDay) => {
        setCurrent(tourDay);
        setFormData({
            title: tourDay.title,
            description: tourDay.description,
            photo: '',
            tourId: uuid
        });
        setDisplayImg(`http://localhost:8081/api/files/tourDay?name=${tourDay.photo}`);
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

    const handleNavigate = () => {
        navigate('/enquiry/list');
    };

    const handleNavigate2 = () => {
        navigate('/admincomment');
    };

    const handleNavigate3 = () => {
        navigate('/admin');
    };

    const handleDestinationSubmit = async (e) => {
        e.preventDefault();

        try {
            await Promise.all(newDestination.map(async (dest) => {
                const newDestinationData = {
                    day: dest.day,
                    data: dest.data,
                    text: dest.text,
                    tourId: uuid
                };

                const response = await axios.post(
                    `http://localhost:8081/api/destination/${uuid}`,
                    newDestinationData
                );
                const newDestinationItem = response.data;

                toast.success(`Destination for Day ${newDestinationItem.day} added successfully!`);
            }));

            setNewDestination([]);

        } catch (err) {
            toast.error("Error adding Destination!");
            console.error(err);
        }
        document.querySelector('input[name="day"]').disabled = false;
        handleClear();
    };

    const resetDestinationForm = () => {
        setDestinationFormData({
            day: '',
            data: '',
            text: '',
            tourId: uuid
        });
        document.querySelector('input[name="day"]').disabled = false;
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            const dayValue = e.target.form.elements.day.disabled ? lastDay : destinationFormData.day;

            setNewDestination(prevDestination => [
                ...prevDestination,
                {
                    day: dayValue,
                    data: destinationFormData.data,
                    text: destinationFormData.text
                }
            ]);
            resetDestinationForm();
            setLastDay(dayValue);
            e.target.form.elements.day.disabled = true;
        }
    };

    const handleClear = () => {
        setNewDestination([]);
    };

    const handleAboutSubmit = async (e) => {
        e.preventDefault();
        console.log(uuid)
        console.log(aboutData)
        try {
            axios({
                url:`http://localhost:8081/api/about/${uuid}`,
                method:"POST",
                data:aboutData
            })
            console.log(aboutData)
            // const response = await axios.post(`http://localhost:8081/api/about/${uuid}`, aboutData);
            // console.log('About created:', response.data);
        } catch (error) {
            console.error('Error creating about:', error);
        }
    };
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (inputValue.trim() !== '') {
                try {
                    const response = await axios.post(`http://localhost:8081/api/texts/${uuid}`, { text: inputValue });
                    setItems([...items, response.data]);
                    setInputValue('');
                } catch (error) {
                    console.error('Error adding text:', error);
                }
            }
        }
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
                <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                    <img src={Account} alt=""/>
                    <h1 className={"h0"}>{username}</h1>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                    <p className={"asd"} onClick={handleNavigate3}>Add Tour</p>
                    <p onClick={handleNavigate} className={"asd"}>Enquiry</p>
                    <p className={"asd"}>Available Tours</p>
                    <p onClick={handleNavigate2} className={"asd"}>Comments</p>
                </div>
                <div>
                    <button onClick={handleLogout}
                            style={{
                                backgroundColor: "red",
                                width: "135px",
                                height: "36px",
                                borderRadius: "20px",
                                borderColor: "red"
                            }}>Log out
                    </button>
                </div>
            </div>
            <ToastContainer/>
            <form onSubmit={handleTourDaySubmit}>
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
                               value={formData.title} onChange={handleFormDataChange}/>
                    </div>
                    <div className="mb-3">
                        <input placeholder={"Description"} style={{width: "400px"}} type="text" className="form-control"
                               name="description"
                               value={formData.description} onChange={handleFormDataChange}/>
                    </div>
                    <div className="mb-3">
                        <label>
                            <input style={{width: "400px"}} type="file" className="form-control" name="photo"
                                   onChange={handlePhotoChange}/>
                        </label>
                    </div>
                    <button style={{backgroundColor: "red", borderColor: "red", marginTop: "-15px"}} type="submit"
                            className="btn btn-primary">{isEditing ? 'Update' : 'Add'} Tour Day
                    </button>
                </div>
            </form>

            <form onSubmit={handleAboutSubmit}>
                <div className="mb-3">
                    <label>Start Time:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="startTime"
                        value={aboutData.startTime}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className="mb-3">
                    <label>End Time:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="endTime"
                        value={aboutData.endTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={aboutData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Assuming tourId is preset or fetched earlier */}
                <button type="submit" className="btn btn-primary">Add About</button>
            </form>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "50px"
            }}>
                <div>
                    <table style={{marginTop: "40px"}} className="table table-striped">
                        <thead>
                        <tr>
                            <th>Day</th>
                            <th>Data</th>
                            <th>Text</th>
                        </tr>
                        </thead>
                        <tbody>
                        {newDestination.map((dest, index) => (
                            <tr key={index}>
                                <td><h3>{dest.day}</h3></td>
                                <td><h3>{dest.data}</h3></td>
                                <td><h3>{dest.text}</h3></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <form onSubmit={handleDestinationSubmit}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "50px"
                }}>

                    <div style={{display: "flex", gap: "10px"}}>
                        <div className="mb-3">
                            <input
                                placeholder={"Day"}
                                style={{width: "200px"}}
                                type="text"
                                className="form-control"
                                name="day"
                                value={destinationFormData.day}
                                onChange={handleDestinationChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder={"Data"}
                                style={{width: "100px"}}
                                type="time"
                                className="form-control"
                                name="data"
                                value={destinationFormData.data}
                                onChange={handleDestinationChange}
                            />
                        </div>
                        <div className="mb-3">

                            <textarea
                                placeholder={"Text"}
                                style={{width: "900px", height: "100px"}}
                                className="text-area form-control"
                                name="text"
                                value={destinationFormData.text}
                                onChange={handleDestinationChange}
                                onKeyDown={handleKey}
                            />
                        </div>
                    </div>
+

                    <button
                        style={{backgroundColor: "blue", borderColor: "blue", marginTop: "-15px"}}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Add Destination
                    </button>

                </div>
            </form>
            <input
                style={{width: "1380px", marginLeft: "90px",marginTop:"20px"}}
                className={"form-control"}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add an item and press Enter"
            />

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "50px"
            }}>
                <table style={{marginTop: "40px", width: "1370px", marginLeft: "10px"}}
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
                            <td>
                                <img src={`http://localhost:8081/api/files/tourDay?name=${tourDay.photo}`} alt="Tour"
                                     style={{width: '100px', height: '100px'}}/>
                            </td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(tourDay)}>Edit</button>
                                <button className="btn btn-danger m-2" onClick={() => handleDelete(tourDay.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default TourDay;
