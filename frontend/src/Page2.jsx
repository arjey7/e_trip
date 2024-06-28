import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTourDaysRequest } from './redux/actions/PageAction.js';
import "./css/Page2.css";
import a from "./pageimg/barlass 5.png"
import q from "./pageimg/Group 7.svg"
import w from "./pageimg/Group 3.svg"
import e from "./pageimg/Group 10.svg"
import r from "./pageimg/Group 9.svg"
import t from "./pageimg/Group 2.svg"
import y from "./pageimg/Group 8.svg"
import {useParams} from "react-router-dom";
import axios from "axios";

function Page2() {
    const dispatch = useDispatch();
    const [page,setPage] = useState([])
    const [expandedDays, setExpandedDays] = useState([]);
    const aboutUsRef = useRef(null);
    const destinationsRef = useRef(null);
    const inspirationRef = useRef(null);
    const contactUsRef = useRef(null);
    const { tourId } = useParams();
    const [destination,setDestination] = useState([])
    useEffect(() => {

    }, [ tourId]);
    useEffect(() => {
getAll()
        getTour(tourId)
    }, [dispatch]);
    function getTour(){
        axios.get(`http://localhost:8081/api/destination/${tourId}`).then(res=>{
            setDestination(res.data)
        })
    }
    function getAll(){
        axios.get("http://localhost:8081/api/tourDay/"+tourId).then(res=>{
            setPage(res.data)
        })
    }
    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleExpand = (day) => {
        setExpandedDays(prevState =>
            prevState.includes(day) ? prevState.filter(d => d !== day) : [...prevState, day]
        );
    };

    const filteredDays = page.filter(itm => itm.day >= 1 && itm.day <= 10);
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
                        <p className={"obshiy"}>Общее описание тура, буквально несколько абзацев про то как все круто,
                            красиво и еще
                            много всякой полезной информации, которую пользователи прочитают в первую очередь.
                            Seamlessly
                            drive
                            extensible platforms without cooperative vortals. Conveniently drive professional results
                            with
                            multimedia based bandwidth. Completely expedite enterprise leadership and transparent
                            meta-services.
                            Continually synthesize state of the art e-services before client-based technology.
                            Conveniently
                            plagiarize accurate ideas without bleeding-edge channels.
                            <br/>
                            <br/>
                            Distinctively syndicate excellent intellectual capital whereas professional partnerships.
                            Interactively
                            syndicate best-of-breed niche markets after an expanded array of collaboration and
                            idea-sharing.
                            Competently conceptualize multifunctional processes after strategic quality vectors.
                            Authoritatively
                            evisculate interactive partnerships whereas unique value. Dynamically reconceptualize
                            leveraged
                            outsourcing after inexpensive best practices.</p>
                        {page[0].video && (
                            <video
                                src={`http://localhost:8081/api/files/video?name=${page[0].video}`}
                                controls
                                className="vide2"
                            />
                        )}
                    </>
                )}

            </div>

            <div className={"chiziq3"}></div>
            <p className={"programma"}>Itinerary </p>
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
                                        src={`http://localhost:8081/api/files/img?name=${itm.photo}`}
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
                {destination && destination.length > 0 && (
                    <div key={destination[0].id}>
                        <p className="den-1">{destination[0].day} день</p>
                    </div>
                )}
                <div>
                    {destination.slice(0, 6).map((itm, index) => (
                        <ul key={index + 6} className="den-1s">
                            <li>
                                {itm.data}
                                <li className="den-com">
                                    {itm.text.split('(доп оплата)').map((part, idx, arr) =>
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
                    ))}
                </div>


            </div>

            <div className="day-content">
                {destination.slice(0, 7).length > 6 && (
                    <div key={destination[6].id}>
                        <p className="den-2">{destination[6].day} день</p>
                    </div>
                )}
                {destination.slice(6, 13).map((itm, index) => (
                    <ul key={index + 6} className="den-2s">
                        <li>
                            {itm.data}
                            <li className="den2-com">
                                {itm.text.split('(доп оплата)').map((part, idx, arr) =>
                                    idx < arr.length - 1 ? (
                                        <>
                                            {part}
                                            <span style={{ color: 'rgb(223, 112, 33)' }}>(доп оплата)</span>
                                        </>
                                    ) : (
                                        part
                                    )
                                )}
                            </li>
                        </li>
                    </ul>
                ))}
            </div>

            <div className="day-content">
                {destination.slice(0, 8).length > 6 && (
                    <div key={destination[14].id}>
                        <p className="den-3">{destination[14].day} день</p>
                    </div>
                )}
                {destination.slice(13, 22).map((itm, index) => (
                    <ul key={index + 14} className="den-3s">
                        <li>
                            {itm.data}
                            <li className="den3-com">
                                {itm.text.split('(доп оплата)').map((part, idx, arr) =>
                                    idx < arr.length - 1 ? (
                                        <>
                                            {part}
                                            <span style={{ color: 'rgb(223, 112, 33)' }}>(доп оплата)</span>
                                        </>
                                    ) : (
                                        part
                                    )
                                )}
                            </li>
                        </li>
                    </ul>
                ))}
            </div>

            {destination.slice(0, 22).length > 6 && (
                <div key={destination[22].id}>
                    <p className="den-4">{destination[22].day} день</p>
                </div>
            )}
            {destination.slice(19).map((itm, index) => (
                <ul key={index + 22} className="den-4s">
                    <li>
                        {itm.data}
                        <li className="den4-com">
                            {itm.text.split('(доп оплата)').map((part, idx, arr) =>
                                idx < arr.length - 1 ? (
                                    <>
                                        {part}
                                        <span style={{ color: 'rgb(223, 112, 33)' }}>(доп оплата)</span>
                                    </>
                                ) : (
                                    part
                                )
                            )}
                        </li>
                    </li>
                </ul>
            ))}

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
                <li>- проезд на комфортабельном автобусе компании VRLines</li>
                <li>- обзорные экскурсии по всем городам</li>
                <li>- ночевка на круизном лайнере</li>
                <li>- завтрак на круизном найнере</li>
                <li>- массаж головы при проезде в автобусе</li>
                <li>- гарнитура на время проведения экскурсий</li>
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
