import React, { useEffect, useState } from 'react';
import './css/Page.css';
import './styles/LandingPage.css';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import {useLocation, useNavigate} from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import EnquiryForm from './EnquiryForm';
import {closeModal, fetchTourRequest, openModal} from "./redux/reducer/tourReducer.js";
import { useDispatch, useSelector } from "react-redux";
import NavImage from "./files/barlass 2.png";
import Logo from './files/left side.png';
import Ethernet from './files/ethernet.png';
import Naushnik from './files/naushnik.png';
import Vector from './files/vector.png';
import Apacha from './files/portrait-call-center-woman 1.png';
import today from './files/Rectangle 3.png';
import nul from "./files/asd.png";
import p from "./files/ppp.png";
import m from "./files/m.png";
import Carousel from "react-multi-carousel";
import axios from 'axios';
import 'react-multi-carousel/lib/styles.css';
import ReactStars from 'react-rating-stars-component';
import Tgg from "./files/Paper Plane.svg"
import Footer from "./Footer.jsx";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "./index.css"

import Comment from "./Comment.jsx";

const LandingPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [centerIndex, setCenterIndex] = useState(0);
    const [page, setPage] = useState([]);
    const navigate = useNavigate();
    const [ setModalVisible] = useState(false);
    const [ setSelectedTourTitle] = useState('');
    const {modal}=useSelector(state => state.tour)

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
            items: 3
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

    useEffect(() => {
        const initialCenterIndex = Math.floor(page.length / 3);
        setCenterIndex(initialCenterIndex);
    }, [page.length]);

    const onSlideChanged = (previousSlide, { currentSlide, slidesToShow }) => {
        setCenterIndex(currentSlide + Math.floor(slidesToShow / 2));
    };

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

    const handleShowFlightClick = (tourId) => {
        navigate(`/page/${tourId}`);
    };

    return (
        <div>
            <div className={"wrapper"}>
                <div className='main-img'>
                    <div className='navbar'>
                        <img className='img1' src={NavImage} alt=""/>
                        <div className='nav-body'>
                            <p className='montserrat' onClick={scrollToGroupElement}>About us</p>
                            <p className='montserrat'>Destinations</p>
                            <p className='montserrat'>Inspiration</p>
                            <p className='montserrat'>Contact us</p>
                            <p className='montserrat-font'>ENG</p>
                        </div>
                    <div className={"linear"}></div>
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
                            <div className={"info-div-item"}>
                                <img src={Vector} alt="" className='icons'/>
                            </div>
                            <div className='text-content'>
                                <h2>Discover Islamic Central Asia with our expert guides.</h2>
                                <p>Experience the rich cultural heritage of Islamic Central Asia with our expert guides.
                                    Embark on a journey through ancient cities, stunning architecture, and vibrant
                                    markets.
                                    Learn about the intricate art of calligraphy, the mystical world of Sufism, and the
                                    historical significance of Silk Road trade routes. Immerse yourself in the beauty
                                    and
                                    spirituality of this fascinating region. Join us for an unforgettable adventure
                                    through
                                    Islamic Central Asia.</p>
                            </div>
                        </div>
                        <div className='info-item2'>
                            <div className={"info-div-item"}>
                                <img src={Ethernet} alt="" className='icon'/>
                            </div>
                            <div className='text-content2'>
                                <h2>Our Commitment to World-Class Service</h2>
                                <p>Our dedicated team is here to ensure that your experience with us exceeds your
                                    expectations. Your satisfaction is our top priority.</p>
                            </div>
                        </div>
                        <div className='info-item3'>
                            <div className={"info-div-item"}>
                                <img src={Naushnik} alt="" className='icones'/>
                            </div>
                            <div className='text-content3'>
                                <h2>24/7 Strong Customer Support</h2>
                                <p>Great customer support is crucial for our success. We have a dedicated team that
                                    provides
                                    prompt and effective solutions to any customer queries or concerns. Our goal is to
                                    exceed your expectations and ensure your satisfaction. We're here to support you
                                    every
                                    step of the way.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="you2">---- Trip ideas in Uzbekistan</p>
                <div className="cd">
                    {tours.map((tour, index) => (
                        <div key={index} className="we">
                            <div className="image-containerr">
                                <img className="cm" src={`http://localhost:8081/api/files/img?name=${tour.photo}`}
                                     alt=""/>
                                <div className="ms">
                                    <div className={"divcha"}>
                                        <h2 className={"vbn"}>{tour.title}</h2>
                                        <p className={"olo"}>{tour.description}</p>
                                        <p className={"pepe"}>{tour.day} days from ${tour.cost}</p>
                                    </div>
                                    <div className={"mn"}>
                                        <button style={{borderRadius:'5px'}} className="button12" onClick={() => handleShowFlightClick(tour.id)}>
                                            <img src={Tgg} alt=""/>
                                            Show Flight
                                        </button>
                                    </div>
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
                                placeholder='name'
                                defaultValue={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                {...register("fullName", {
                                    required: 'Name is required!'
                                })}
                            />

                            <input
                                placeholder="+44 7459 382384"
                                className={"input1"}
                                {...register('phoneNumber', {
                                    required: 'Phone number is required!',
                                })}
                            />


                            <button className='request-button' type='submit'>CALL ME BACK</button>
                            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                        </form>
                    </div>
                </div>
                <div>
                    <p className="you1">---- Where you can travel with us</p>
                    <div >
                        <div style={{display:"flex",alignItems:"center",gap:"20px", maxWidth:'1930px', margin:'0 auto', justifyContent:'space-between'}}>
                            <p className="you">Immerse yourself in the beauty and spirituality of fascinating places.
                                Join
                                us
                                for an
                                unforgettable adventure through Islamic Central Asia.
                            </p>
                            <button className={"be"}>See All</button>
                        </div>
                    </div>
                </div>
                    <div className={"kl"}>
                        <div className={"me"}>
                            <p className={"me2"}>Bu yerda video bo'ladi</p>
                        </div>
                        <div className={"d"}>
                            <div className={"img-card"}>
                            <img className={"wit"} width={100} src={today} alt=""/>
                                <img className={"wit"} src={nul} alt=""/>
                            </div>
                            <div style={{display: "flex",}}>
                                <img className={"wit"} src={p} alt=""/>
                                <img className={"wit"} src={m} alt=""/>
                            </div>
                        </div>


                    </div>


                <h1 className="us">What our clients say about us</h1>
                <div className="page-container">
                    <Carousel

                        responsive={responsive}
                        afterChange={(previousSlide, {currentSlide, slidesToShow}) =>
                            onSlideChanged(previousSlide, {currentSlide, slidesToShow})
                        }
                    >
                        {page.map((comment, index) => (
                            <div
                                key={index}
                                className={`comment-container ${index === centerIndex ? 'center-card' : ''}`}
                            >
                                <div className="m">
                                    <div className="op"></div>
                                    <p className="comment-name">{comment.firstName} {comment.lastName}</p>
                                    <div style={{height:"160px"}}>
                                        <p className="comment-text">{comment.text}</p>
                                    </div>

                                    <ReactStars

                                        count={5}
                                        value={comment.rate}
                                        size={40}
                                        activeColor="#ffd700"
                                        edit={false}
                                    />
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>

                <button className={"buttin"} onClick={() => dispatch(openModal())}>Написать отзыв</button>
                <Footer/>
                <Rodal visible={modal} onClose={() => dispatch(closeModal())} height={500} width={700}>

                        <Comment/>
                </Rodal>
            </div>
        </div>
    );
}

export default LandingPage;
