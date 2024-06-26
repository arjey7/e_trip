import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./css/Page2.css";
import a from "./pageimg/barlass 5.png";
import q from "./pageimg/Group 7.svg";
import w from "./pageimg/Group 3.svg";
import e from "./pageimg/Group 10.svg";
import r from "./pageimg/Group 9.svg";
import t from "./pageimg/Group 2.svg";
import y from "./pageimg/Group 8.svg";

function Page2() {
    const dispatch = useDispatch();
    const [page, setPage] = useState([]);
    const [expandedDays, setExpandedDays] = useState([]);
    const aboutUsRef = useRef(null);
    const destinationsRef = useRef(null);
    const inspirationRef = useRef(null);
    const contactUsRef = useRef(null);
    const { tourId } = useParams();
    const [destination, setDestination] = useState([]);
    const [items, setItems] = useState([]);
    useEffect(() => {
        getAll(tourId);
        getTour(tourId);
        getText(tourId)
    }, [tourId]);

    function getTour() {
        console.log()
        axios.get(`http://localhost:1111/api/destination/${tourId}`).then(res => {
            setDestination(res.data);

        });
    }
    function getText() {
        axios.get(`http://localhost:1111/api/texts/${tourId}`).then(res => {
            setItems(res.data);
            console.log(res.data)
        });
    }


    function getAll() {
        axios.get(`http://localhost:1111/api/tourDay/${tourId}`).then(res => {
            setPage(res.data);
        });
    }

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleExpand = (day) => {
        setExpandedDays(prevState =>
            prevState.includes(day) ? prevState.filter(d => d !== day) : [...prevState, day]
        );
    };

    return (
        <div className={"all"}>
            <div className={"header"}>
                <p onClick={() => scrollToSection(aboutUsRef)}>About us</p>
                <p onClick={() => scrollToSection(destinationsRef)}>Destinations</p>
                <p onClick={() => scrollToSection(inspirationRef)}>Inspiration</p>
                <p onClick={() => scrollToSection(contactUsRef)}>Contact us</p>
            </div>
            <div ref={aboutUsRef}>
                {page && page.length > 0 && (
                    <>
                        <p className={"title"}>Uzbekistan : food tour</p>
                        <p className={"obshiy"}>
                            Общее описание тура, буквально несколько абзацев про то как все круто,
                            красиво и еще много всякой полезной информации, которую пользователи прочитают в первую
                            очередь.
                            Seamlessly drive extensible platforms without cooperative vortals. Conveniently drive
                            professional results
                            with multimedia based bandwidth. Completely expedite enterprise leadership and transparent
                            meta-services.
                            Continually synthesize state of the art e-services before client-based technology.
                            Conveniently plagiarize
                            accurate ideas without bleeding-edge channels.
                            <br/>
                            <br/>
                            Distinctively syndicate excellent intellectual capital whereas professional partnerships.
                            Interactively syndicate
                            best-of-breed niche markets after an expanded array of collaboration and idea-sharing.
                            Competently conceptualize
                            multifunctional processes after strategic quality vectors. Authoritatively evisculate
                            interactive partnerships
                            whereas unique value. Dynamically reconceptualize leveraged outsourcing after inexpensive
                            best practices.
                        </p>
                        {page[0].video && (
                            <video
                                src={`http://localhost:1111/api/files/video?name=${page[0].video}`}
                                controls
                                className="vide2"
                            />
                        )}
                    </>
                )}
            </div>

            <div className={"chiziq3"}></div>
            <p className={"programma"}>Itinerary</p>
            {page.map((itm, index) => (
                <div className="day-container" key={index}>
                    <p className="day">Day {itm.day}</p>
                    <div className={`desc-card ${expandedDays.includes(itm.day) ? 'expanded' : ''}`}>
                        <div className="desc-page">
                            {!expandedDays.includes(itm.day) && (
                                <div className="initial-description">
                                    {itm.description}
                                </div>
                            )}
                            {expandedDays.includes(itm.day) && (
                                <div className="expanded-content">
                                    <img
                                        className="expanded-image"
                                        width={328}
                                        height={246}
                                        src={`http://localhost:8082/api/files/img?name=${itm.photo}`}
                                        alt=""
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                    <div className="expanded-info">
                                        <p className="days">Day {itm.day}</p>
                                        <p className="tours">Tour starts in {itm.tour.title}</p>
                                        <span className="expanded-description">
                                            {itm.description}
                                            <br/>
                                            Садимся на наш комфортабельный автобус и отправляемся в Таллинн.
                                            Дорога до границы занимает лишь 2 часа. Границу мы пересекаем без очередей.
                                        </span>
                                        <div className="city"></div>
                                        <p className="citys">City Palace Hotel or similar</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {expandedDays.includes(itm.day) ? (
                        <button className="btn-page-minus" onClick={() => handleExpand(itm.day)}>
                            -
                        </button>
                    ) : (
                        <button className="btn-page" onClick={() => handleExpand(itm.day)}>
                            +
                        </button>
                    )}
                </div>
            ))}

            <div ref={destinationsRef} className={"chiziq4"}></div>
            <p className={"dest"}>Destinations</p>
            <div className={"day-content"}>
                {destination.map((item, index) => (
                    <div key={index}>
                        {index === 0 || destination[index - 1].day !== item.day ? (
                            <p className="den-1">{item.day} день</p>
                        ) : null}
                        <ul className="den-1s">
                            <li>
                                {item.data}
                                <li className="den-com">
                                    {item.text.split('(доп оплата)').map((part, idx, arr) =>
                                        idx < arr.length - 1 ? (
                                            <>
                                                {part}
                                                <span style={{color: 'rgb(223, 112, 33)'}}>(доп оплата)</span>
                                            </>
                                        ) : (
                                            part
                                        )
                                    )}
                                </li>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>


            <p className={"prib"}>ПРИБЫТИЕ В МИНСК В 00:30-02:30м</p>
            <div ref={inspirationRef} className={"chiziq5"}></div>
            <p className={"dest"}>О туре (Ближайшие выезды)</p>
            <div className="cardcha">
                <div className="dess">

                    <span className="ccha">с</span> 20.08.2018
                    <p className="ccha">по</p> 25.08.2018
                    <span className="ccha">(+ Завтрак + Шоу-программа тигров)</span>
                    <span className="ccha">от</span>
                    <p className={"byn"}>380 BYN</p>
                    <p className={"eur"}>(~130 EUR)</p>
                    <button className={"zab"}>Забронировать</button>
                </div>
            </div>
            <div className="cardcha">
                <div className="dess">
                    <span className="ccha">с</span> 20.08.2018
                    <p className="ccha">по</p> 25.08.2018
                    <span className="ccha">(+ Завтрак + Шоу-программа тигров)</span>
                    <span className="ccha">от</span>
                    <p className={"byn"}>380 BYN</p>
                    <p className={"eur"}>(~130 EUR)</p>
                    <button className={"zab"}>Забронировать</button>
                </div>
            </div>
            <div className="cardcha">
                <div className="dess">
                    <span className="ccha">с</span> 20.08.2018
                    <p className="ccha">по</p> 25.08.2018
                    <span className="ccha">(+ Завтрак + Шоу-программа тигров)</span>
                    <span className="ccha">от</span>
                    <p className={"byn"}>380 BYN</p>
                    <p className={"eur"}>(~130 EUR)</p>
                    <button className={"zab"}>Забронировать</button>
                </div>
            </div>
            <div className="cardcha">
                <div className="dess">
                    <span className="ccha">с</span> 20.08.2018
                    <p className="ccha">по</p> 25.08.2018
                    <span className="ccha">(+ Завтрак + Шоу-программа тигров)</span>
                    <span className="ccha">от</span>
                    <p className={"byn"}>380 BYN</p>
                    <p className={"eur"}>(~130 EUR)</p>
                    <button className={"zab"}>Забронировать</button>
                </div>
            </div>
            <div className="cardcha">
                <div className="dess">
                    <span className="ccha">с</span> 20.08.2018
                    <p className="ccha">по</p> 25.08.2018
                    <span className="ccha">(+ Завтрак + Шоу-программа тигров)</span>
                    <span className="ccha">от</span>
                    <p className={"byn"}>380 BYN</p>
                    <p className={"eur"}>(~130 EUR)</p>
                    <button className={"zab"}>Забронировать</button>
                </div>
            </div>
            <div className={"chiziq5"}></div>
            <p className={"dest"}>О туре (В стоимость тура входит:)</p>
            <ul className={"comments"}>
                {items.map((ite, index) => (
                    <li className={"ro"} key={index}>- {ite.text}</li>
                ))}
            </ul>

            <div className={"chiziq5"}></div>

            <p className={"dest"}>О туре (Дополнительно можно приобрести:) </p>
            <p style={{display: "flex"}}>- посещение музея <p className={"byn"}> 380 BYN</p><p className={"eur"}>(~153
                EUR)</p></p>
            <p style={{display: "flex"}}>- проезд на велорикше <p className={"byn"}> 380 BYN</p><p
                className={"eur"}>(~153 EUR)</p></p>
            <p style={{display: "flex"}}>- фото со звездой <p className={"byn"}> 380 BYN</p> <p className={"eur"}>(~153
                EUR)</p></p>
            <p style={{display: "flex"}}>- ужин в ресторане Buffet <p className={"byn"}> 380 BYN</p> <p
                className={"eur"}>(~153 EUR)</p></p>
            <p style={{display: "flex"}}>- посещение спа на борту лайнера <p className={"byn"}> 380 BYN</p> <p
                className={"eur"}>(~153 EUR)</p></p>
            <p style={{display: "flex"}}>- фотография с обезьянкой <p className={"byn"}>380 BYN</p> <p
                className={"eur"}>(~153 EUR)</p></p>
            <div ref={contactUsRef} className={"footer-page"}>
                <img className={"footer-img-page"} src={a} alt=""/>
                <div className={"header2"}>
                    <p onClick={() => scrollToSection(aboutUsRef)}>About us</p>
                    <p onClick={() => scrollToSection(destinationsRef)}>Destinations</p>
                    <p onClick={() => scrollToSection(inspirationRef)}>Inspiration</p>
                    <p onClick={() => scrollToSection(contactUsRef)}>Contact us</p>
                </div>
                <p className={"content"}>© 2018, All rights reserved. VR Lines - Авиабилеты, Туры, Круизы, Автобусы,
                    Паромы, Визы</p>
                <p className={"number-3"}>+44 7884 610140</p>
                <p className={"number-4"}>+44 7459 382384</p>
                <div className={"footer-imgs"}>
                    <img src={q} alt=""/>
                    <img src={w} alt=""/>
                    <img src={e} alt=""/>
                    <img src={r} alt=""/>
                    <img src={t} alt=""/>
                    <img src={y} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Page2;
