import React, { useEffect, useState } from 'react';
import './css/Page.css';
import './styles/LandingPage.css';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useLocation } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import EnquiryForm from './EnquiryForm';
import { fetchTourRequest } from "./redux/reducer/tourReducer.js";
import { useDispatch, useSelector } from "react-redux";
import NavImage from "./files/barlass 2.png";
import Logo from './files/left side.png';
import Ethernet from './files/ethernet.png';
import Naushnik from './files/naushnik.png';
import Vector from './files/Vector.png';
import Apacha from './files/portrait-call-center-woman 1.png';
import today from './files/Rectangle 3.png';
import nul from "./files/asd.png";
import p from "./files/ppp.png";
import m from "./files/m.png";
import Carousel from "react-multi-carousel";
import axios from 'axios';
import 'react-multi-carousel/lib/styles.css';
import ReactStars from 'react-rating-stars-component';
import Footer from "./Footer.jsx";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import tgg from "./files/Vector.png"

const LandingPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [page, setPage] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTourTitle, setSelectedTourTitle] = useState('');

    const ratingChanged = (newRating) => {
        // Handle rating change if needed
    };

    function scrollToGroupElement() {
        const specificGroupArea = document.getElementById('specificGroupArea');
        specificGroupArea.scrollIntoView({ behavior: 'smooth' });
    }

    function scrollToFooterElement() {
        const specificFooterArea = document.getElementById('specificFooterArea');
        specificFooterArea.scrollIntoView({ behavior: 'smooth' });
    }


    const { tours, loading, error } = useSelector(state => state.tour);

    useEffect(() => {
        dispatch(fetchTourRequest());
    }, [dispatch]);

    useEffect(() => {
        getAll();
    }, []);

    function getAll() {
        axios.get('http://localhost:8081/api/comment/approved')
            .then(res => {
                setPage(res.data);
            })
            .catch(error => {
                console.error('Error fetching approved comments:', error);
            });
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('scrollTo') === 'groupTours') {
            scrollToGroupElement();
        }
    }, [location]);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 2024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    function mySubmit(params) {
            try {
                 axios.post('http://localhost:8081/api/request', params).then(()=>{
                     console.log("asd")});
                 reset()
                toast.success('Request submitted successfully, please wait for our call!');
            } catch (error) {
                console.error('Error saving request:', error);
                toast.error('Failed to submit request');
            }
    }

    return (
        <div className="container">
            <div className='main-img'>
                <div className='navbar'>
                    <img className='img1' src={NavImage} alt=""/>
                    <div className='nav-body'>
                        <p className='montserrat' onClick={scrollToGroupElement}>About us</p>
                        <p className='montserrat'>Destinations</p>
                        <p className='montserrat'>Inspiration</p>
                        <p className='montserrat'>Contact us</p>
                    </div>
                    <p className='montserrat-font'>ENG</p>
                </div>
                <div className='hero-text'>
                    <p>Travel through the land and observe how He began creation.</p>
                    <div className='hero-subtext'>
                        We are BARLAS VOYAGE and we organize group trips to Central Asia.
                        If you want to travel to learn from the past, let us be your guide.
                    </div>
                </div>
            </div>
            <div className='div-info' id="specificGroupArea">
                <div className='image-container'>
                    <img className='img2' src={Logo} alt=""/>
                </div>
                <div className='text-container'>
                    <h1>Small and big group trip through Central Asia</h1>
                    <div className='info-item'>
                        <img src={Vector} alt="" className='icon'/>
                        <div className='text-content'>
                            <h2>Discover Islamic Central Asia with our expert guides.</h2>
                            <p>Experience the rich cultural heritage of Islamic Central Asia with our expert guides.
                                Embark on a journey through ancient cities, stunning architecture, and vibrant markets.
                                Learn about the intricate art of calligraphy, the mystical world of Sufism, and the
                                historical significance of Silk Road trade routes. Immerse yourself in the beauty and
                                spirituality of this fascinating region. Join us for an unforgettable adventure through
                                Islamic Central Asia.</p>
                        </div>
                    </div>
                    <div className='info-item'>
                        <img src={Ethernet} alt="" className='icon'/>
                        <div className='text-content'>
                            <h2>Our Commitment to World-Class Service</h2>
                            <p>Our dedicated team is here to ensure that your experience with us exceeds your
                                expectations. Your satisfaction is our top priority.</p>
                        </div>
                    </div>
                    <div className='info-item'>
                        <img src={Naushnik} alt="" className='icon'/>
                        <div className='text-content'>
                            <h2>24/7 Strong Customer Support</h2>
                            <p>Great customer support is crucial for our success. We have a dedicated team that provides
                                prompt and effective solutions to any customer queries or concerns. Our goal is to
                                exceed your expectations and ensure your satisfaction. We're here to support you every
                                step of the way.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cd">
                {tours.map((tour, index) => (
                    <div key={index} className="we">
                        <div className="image-containerr">
                            <img className="cm" src={`http://localhost:8081/api/files/img?name=${tour.photo}`} alt=""/>
                            <div className="ms">
                                <h2>{tour.title}</h2>
                                <p>{tour.description}</p>
                                <p>${tour.cost}</p>
                                <button className="button12">
                                    <img src={tgg} alt=""/>
                                    Show Flight
                                </button>
                            </div>

                        </div>
                        <div className="">
                            <div className="">
                                {/* Additional buttons if needed */}
                            </div>
                            <div className="tour-buttons">
                                {/* Buttons */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className='div-request'>
                <ToastContainer/>
                <img className='girl-img' src={Apacha} alt=""/>
                <div className='request-text'>
                    <p className='text-class'>Would you like us to organize a tour tailored to your preferences?</p>
                    <p className='same-class'>Please provide your contact information, and we will </p>
                    <p className='same-class'>get in touch with you shortly</p>
                    <form className='input-container' onSubmit={handleSubmit(mySubmit)}>
                        <input
                            className='input1'
                            type="text"
                            placeholder='name...'
                            defaultValue={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            {...register("fullName", {
                                required: 'Phone number is required!'
                            })}
                        />

                        <input
                            placeholder="Phone number..."
                            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                            {...register('phoneNumber', {
                                required: 'Phone number is required!',
                                pattern: {
                                    value: /^\+998\d{9}$/,
                                    message: 'Phone number must start with +998 and be followed by exactly 9 digits',
                                }
                            })}
                        />
                        {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}


                        <button className='request-button' type='submit'>Call me back</button>
                    </form>
                </div>
            </div>
            <div>
                <p className="you1">----Where you can travel with us</p>
                <p className="you">Immerse yourself in the beauty and spirituality of fascinating places. Join us for an
                    unforgettable adventure through Islamic Central Asia.</p>
                <div className={"kl"}>
                    <div className={"me"}>
                        <p className={"me2"}>Bu yerda video bo'ladi</p>
                    </div>
                    <div className={"d"}>
                        <img className={"wit"} width={100} src={today} alt=""/>
                        <img className={"wit"} src={nul} alt=""/>
                        <div style={{display: "flex"}}>
                            <img className={"wit"} src={p} alt=""/>
                            <img className={"wit"} src={m} alt=""/>
                        </div>
                    </div>


                </div>

            </div>
            <div className="carousel-container">
                <Carousel
                    responsive={responsive}>
                    {page.map((comment, index) => (
                        <div key={index} className="comment-container">
                            <div className={"m"}>
                                <div className={"op"}></div>
                                <p className="comment-name">{comment.firstName} {comment.lastName}</p>
                                <p className="comment-text">{comment.text}</p>
                                <ReactStars
                                    count={5}
                                    value={comment.rating || 0} // Default value of 5 stars for comments
                                    onChange={ratingChanged}
                                    size={40}
                                    activeColor="#ffd700"
                                    edit={false} // Disable editing
                                />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            <button className={"buttin"}>Написать отзыв</button>
            <Footer/>
            <Rodal visible={modalVisible} onClose={handleCloseModal} height={400} width={700}>
                <div className="rodal-content">
                    <EnquiryForm selectedTourTitle={selectedTourTitle}/>
                </div>
            </Rodal>
        </div>
    );
}

export default LandingPage;
