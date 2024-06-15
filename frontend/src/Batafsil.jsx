import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import './css/Batafsil.css';
import Comment from "./Comment.jsx";
import a from "./batafilimg/Group 1.png"
import q from "./batafilimg/Whatsaap.png"
import w from "./batafilimg/Group 94.png"
import e from "./batafilimg/Facebook.png"
import r from "./batafilimg/instagram.jpg"
import t from "./batafilimg/🇬🇧.png"
import y from "./batafilimg/Vector.png"
import u from "./batafilimg/rasm.png"
import i from "./batafilimg/Vector (1).png"
import o from "./batafilimg/Union.png"
function Batafsil() {
    const { tourId } = useParams();
    const [batafsil, setBatafsil] = useState([]);
    const [tourTitle, setTourTitle] = useState('');
    const [videoSrc, setVideoSrc] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [tourDescription, setTourDescription] = useState('');
    const [day, setDay] = useState(0);
    const initialTop = 680;
    const increment = 200;
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8082/api/tourDay/${tourId}`)
            .then(res => {
                setBatafsil(res.data);
                if(res.data.length > 0) {
                    setTourTitle(res.data[0].tour.title);
                    setVideoSrc(`http://localhost:8082/files/video?name=${res.data[0].video}`);
                    setImageSrc(`http://localhost:8082/files/img?name=${res.data[0].photo}`);

                    setTotalCost(res.data[0].tour.cost);
                    setTourDescription(res.data[0].tour.description);

                    setDay(res.data[0].tour.day);
                }
            })
            .catch(error => {
                console.error("Error fetching tour details:", error);
            });
    }, [tourId]);
    function toOrder() {
        navigate("/enquiry")
    }
    return (
        <div className={"all-2"}>
            <div className={"header-batafsil"}>
                <img className={"header-img"} src={a} alt=""/>
                <p className={"group-tours"}>Group Tours</p>
                <p className={"about"}>About Us</p>
                <p className={"contact"}>Contact Us</p>
                <img className={"what"} src={q} alt=""/>
                <img className={"teleg"} src={w} alt=""/>
                <img className={"face"} src={e} alt=""/>
                <img className={"ins"} src={r} alt=""/>
                <img className={"black"} src={t} alt=""/>
                <p className={"eng"}>ENG</p>
                <img className={"tel"} src={y} alt=""/>
                <p className={"number"}>+998901234567</p>
            </div>
            <p className={"tour"}>{tourTitle}ga sayohat</p>
                <p className={"sayohat"}>Sayohat qiling mazza qilib</p>
                <p className={"desc"}>{tourDescription}</p>
                <p className={"day"}>Day: {day}</p>
                <p className={"price"}>Price: {totalCost}</p>
                <button onClick={toOrder} className={"order-batafsil"}>Order</button>

            <div className={"groups"}>
                {videoSrc && <video src={videoSrc} controls={true} className="video"/>}
                {imageSrc && <img src={imageSrc} className="image-batafsil" alt="Tour Image"/>}
            </div>

            {batafsil.map((item, index) => (
                <div
                    key={index}
                    className="batafsil-item"
                    style={{top: `${initialTop + index * increment}px`}}
                >
                    <img src={`http://localhost:8082/files/img?name=${item.photo}`} className="image-batafsil2"/>
                    <div className="batafsil-details">
                        <p className="batafsil-title">Day: {item.day}</p>
                        <h3 className="batafsil-subtitle">{item.title}</h3>
                        <p className="batafsil-description">{item.description}</p>
                        <p className="batafsil-description2">{item.tour.description2}</p>
                    </div>
                </div>
            ))}
            <p className={"add"}>Additional Information</p>
            <p className={"lorem"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
                commodo sagittis, sapien dui mattis dui, non pulvinar
                lorem felis nec erat Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar
                lorem felis nec eratLorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar
                lorem felis nec eratLorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc maximu </p>
            <p className={"comment-batafsil"}>Comment</p>
            <Comment/>
            <footer className="footer-batafsil">
                <div className="footer-container">
                    <div className="contact-info">
                        <div className="you">You can dream, create, design, and buildsa the most wonderful place.</div>
                        <div className="footer-item">
                            <img className="footer-img" src={u} alt="Phone Icon"/>
                            <span className="num2">+0123 456 987, +0123 456 987</span>
                        </div>
                        <div className="footer-item">
                            <img className="footer-img2" src={i} alt="Email Icon"/>
                            <span className="email">info@example.com</span>
                        </div>
                        <div className="footer-item">
                            <img className="footer-img3" src={o} alt="Web Icon"/>
                            <span className="www">www.example.com</span>
                        </div>
                    </div>
                    <div className="support-info">
                        <div className="support">Support:</div>
                        <div className="footer-group">Group Us</div>
                        <div className="footer-group2">About Us</div>
                        <div className="footer-group3">Connection</div>
                        <div className="footer-group4">Comment</div>
                    </div>
                    <div className="social-media">
                        <div className="social-icon teleg2"><img src={q} alt="Telegram"/></div>
                        <div className="social-icon what2"><img src={w} alt="WhatsApp"/></div>
                        <div className="social-icon face3"><img src={e} alt="Facebook"/></div>
                        <div className="social-icon ins3"><img src={r} alt="Instagram"/></div>
                    </div>
                </div>
            </footer>

        </div>

    );
}

export default Batafsil;
