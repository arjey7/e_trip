import React, { useEffect, useState } from 'react';
import './styles/LandingPage.css';
import Logo from './files/tourlogo.jpg';
import Facebook from './files/facebook2.jpg';
import Insta from './files/free-icon-instagram-174855.png';
import YouTube from './files/free-icon-youtube-3820291.png';
import Uzb from './files/free-icon-map-13651062.png';
import Phone from './files/free-icon-phone-call-5585562.png';
import Img from "./files/mansion-house-pool-interior-wallpaper-preview.jpg";
import Time from "./files/free-icon-sand-timer-8330912.png";
import {useNavigate} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import EnquiryForm from './EnquiryForm';
import Email from "./files/free-icon-new-email-filled-envelope-60467.png"
import Location from "./files/free-icon-location-pin-7302427.png"

const LandingPage = () => {
    const [tours, setTours] = useState([]);
    const bukharaCoordinates = [39.7748, 64.4286];

    function scrollToGroupElement () {
        const specificGroupArea = document.getElementById('specificGroupArea');
        specificGroupArea.scrollIntoView({ behavior: 'smooth' });
    };

    function scrollToAboutElement () {
        const specificAboutArea = document.getElementById('specificAboutArea');
        specificAboutArea.scrollIntoView({ behavior: 'smooth' });
    };

    function scrollToContactElement () {
        const specificContactArea = document.getElementById('specificContactArea');
        specificContactArea.scrollIntoView({ behavior: 'smooth' });
    };

    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:8080/api/tour/getAll')
            .then(response => response.json())
            .then(data => setTours(data))
            .catch(error => console.error('Error fetching tour data:', error));
    }, []);

    const handleDetailsClick = (tourId) => {
        navigate(`/batafsil/${tourId}`);
    };

    return (
        <div className="container">
            <div className="navbar">
                <img className="img1" src={Logo} alt="Logo" />
                <p onClick={scrollToGroupElement} className={"p"}>Group Tours</p>
                <p onClick={scrollToAboutElement} className={"p"}>About Us</p>
                <p onClick={scrollToContactElement} className={"p"}>Contact Us</p>
                <div className="navbar2">
                    <img className="img2" src={Facebook} alt="Facebook" />
                    <img className="img3" src={Insta} alt="Instagram" />
                    <img className="img4" src={YouTube} alt="YouTube" />
                    <img className="img5" src={Uzb} alt="Map" />
                    <img className="img6" src={Phone} alt="Phone" />
                    <h5>+998977777777</h5>
                </div>
            </div>

            <div className={"div1"}>
                <h1 className={"text1"}>Never stop</h1>
                <h1 className={"text2"}>Exploring</h1>
                <p className={"text3"}>Their house is a museum where people come to see `em. They really are a scream</p>
                <p className={"text4"}>the Addams Family. These days are all Happy and Free. These days are all share</p>
                <p className={"text5"}>them with me oh baby.</p>
            </div>

            <div className="tour-list" id="specificGroupArea">
                <p className={"p5"}>Group Tours</p>
                {tours.map((tour, index) => (
                    <div key={index} className="tour-item">
                        <img  src={`http://localhost:8080/files/img?name=${tour.photo}`} alt={tour.title}
                             className="tour-img"/>
                        <div className="tour-details">
                            <h2>{tour.title}</h2>
                            <p>{tour.description}</p>
                            <p><img className={"img8"} src={Time} alt=""/><strong>Duration:</strong> {tour.day}</p>
                        </div>
                        <div className="tour-right">
                            <div className="tour-price">
                                <p>{tour.cost}$ dan</p>
                            </div>
                            <div className="tour-buttons">
                                <button className="details-btn" onClick={() => handleDetailsClick(tour.id)}>Batafsil</button>
                                <button className="order-btn">Order</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div id="specificAboutArea">
                <p className={"p2"}>About Us</p>
                <img className={"img9"} src={Img} alt=""/>
                <h4 className={"h4"}>Bizning tour haqida</h4>
                <p className={"text6"}>Biz yuqori darajadagi xizmat ko'rsatish va har bir mijozga individual</p>
                <p className={"text7"}>yondashish bilan hamyonbop narxlarda keng doiradagi turlarni taklif qiluvchi</p>
                <p className={"text8"}>professional sayyohlik kompaniyasimiz. Bizning kompaniyamiz sayohat</p>
                <p className={"text9"}>hamma uchun ochiq bo'lish kerak degan g'oya asosida tashkil etilgan</p>
            </div>

            <div id="specificContactArea">
                <p className={"p3"}>Contact Us</p>
                <MapContainer
                    center={bukharaCoordinates}
                    zoom={13}
                    style={{ height: '450px', width: '97%', left:'330px', top:'70px'}}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={bukharaCoordinates}>
                        <Popup>
                            This is Tashkent. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>

                <div className={"div2"}>
                    <img className={"img10"} src={Phone} alt=""/>
                    <p className={"text10"}>Telefon: +(998) 97777-77-77</p>
                </div>
                <div className={"div3"}>
                    <img className={"img11"} src={Email} alt=""/>
                    <p className={"text11"}>E-mail: info@nimadir.uz</p>
                </div>
                <div className={"div4"}>
                    <img className={"img12"} src={Location} alt=""/>
                    <p className={"text12"}>Manzil: Toshkent shahri...</p>
                </div>
            </div>

            <div>
                <p className={"p4"}>Enquiry</p>
                <EnquiryForm/>
            </div>
        </div>
    );
}

export default LandingPage;



