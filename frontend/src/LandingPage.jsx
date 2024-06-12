import { useEffect, useState } from 'react';
import './styles/LandingPage.css';
import Logo from './files/tourlogo.jpg';
import Facebook from './files/facebook2.jpg';
import Insta from './files/free-icon-instagram-174855.png';
import YouTube from './files/free-icon-youtube-3820291.png';
import Uzb from './files/free-icon-map-13651062.png';
import Phone from './files/free-icon-phone-call-5585562.png';
import Img from "./files/Без названия (1).jpg"
import Time from "./files/free-icon-sand-timer-8330912.png"

const LandingPage = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/tour/getAll')
            .then(response => response.json())
            .then(data => setTours(data))
            .catch(error => console.error('Error fetching tour data:', error));
    }, []);

    return (
        <div className="container">
            <div className="navbar">
                <img className="img1" src={Logo} alt="Logo" />
                <p className={"p"}>Group Tours</p>
                <p className={"p"}>About Us</p>
                <p className={"p"}>Contact Us</p>
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
                <img className={"img7"} src={Img} alt=""/>
            </div>

            <div className="tour-list">
                {tours.map((tour, index) => (
                    <div key={index} className="tour-item">
                        <img src={`http://localhost:8080/files/img?name=${tour.photo}`} alt={tour.title}
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
                                <button className="details-btn">Batafsil</button>
                                <button className="order-btn">Order</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;
