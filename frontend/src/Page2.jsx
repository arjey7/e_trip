import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import moment from 'moment';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import EnquiryForm from "./EnquiryForm.jsx";
import { closeModals, openModals } from "./redux/reducer/tourReducer.js";

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
    const [destinations, setDestinations] = useState([]);
    const [aboutData, setAboutData] = useState([]);
    const [aboutDatas, setAboutDatas] = useState([]);
    const { modals } = useSelector(state => state.tour);
    const [context,setContext] = useState([])
    const [items, setItems] = useState([]);
    useEffect(() => {
        getAll();
        getTour();
        getDestination();
        getAll(tourId);
        getTour(tourId);
        getAbout(tourId);
        getText(tourId);
        getAbouts();
        getContext(tourId)
    }, [tourId]);

    function getAbout() {
        console.log(tourId);
        axios.get(`http://localhost:8081/api/about/${tourId}`).then(res => {
            setAboutData(res.data);
            console.log(res.data);
        });
    }
function getContext(){
        axios.get(`http://localhost:8081/api/context/${tourId}`).then(res=>{
            setContext(res.data)
        })
}
    function getAbouts() {
        axios.get("http://localhost:8081/api/about/ab").then(res => {
            setAboutDatas(res.data);
            console.log(res.data);
        });
    }

    function getDestination() {
        axios.get("http://localhost:8081/api/destination/dest").then(res => {
            const parsedData = res.data.map(item => ({
                day: item.day,
                destinations: JSON.parse(item.destinations)
            }));
            setDestinations(parsedData);
        }).catch(err => console.error("Failed to fetch destinations: ", err));
    }

    function getTour() {
        console.log();
        axios.get(`http://localhost:8081/api/destination/${tourId}`).then(res => {
            setDestination(res.data);
        });
    }

    function getText() {
        axios.get(`http://localhost:8081/api/texts/${tourId}`).then(res => {
            setItems(res.data);
            console.log(res.data);
        });
    }

    function getAll() {
        axios.get(`http://localhost:8081/api/tourDay/${tourId}`).then(res => {
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
                        <div style={{width:"1440px"}}>
                            <p className={"obshiy"}>
                                Общее описание тура, буквально несколько абзацев про то как все круто,
                                красиво и еще много всякой полезной информации, которую пользователи прочитают в первую
                                очередь.
                                Seamlessly drive extensible platforms without cooperative vortals. Conveniently drive
                                professional results
                                with multimedia based bandwidth. Completely expedite enterprise leadership and
                                transparent
                                meta-services.
                                Continually synthesize state of the art e-services before client-based technology.
                                Conveniently plagiarize
                                accurate ideas without bleeding-edge channels.
                                <br/>
                                <br/>
                                Distinctively syndicate excellent intellectual capital whereas professional
                                partnerships.
                                Interactively syndicate
                                best-of-breed niche markets after an expanded array of collaboration and idea-sharing.
                                Competently conceptualize
                                multifunctional processes after strategic quality vectors. Authoritatively evisculate
                                interactive partnerships
                                whereas unique value. Dynamically reconceptualize leveraged outsourcing after
                                inexpensive
                                best practices.
                            </p>
                        </div>

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
            <p className={"programma"}>Itinerary</p>
            <hr width={900}/>
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
            <div className="chiziq4"></div>
            <div ref={destinationsRef} className="dest">Destinations</div>
            <hr width={900}/>
            <div className="day-content">
                {destinations.map((item, dayIndex) => (
                    <div className="day-wrapper" key={dayIndex}>
                        <div className="daylar">
                            <p className="den-1">
                                {item.day} день
                            </p>
                        </div>
                        {item.destinations.map((destination, destIndex) => (
                            <div className="day-data" key={destIndex}>
                                <p className="day-text">{destination.data}</p>
                                <p className="den-com">{destination.text.includes('(доп оплата)') ? (
                                    <React.Fragment>
                                        {destination.text.split('(доп оплата)').map((part, idx, arr) => (
                                            idx < arr.length - 1 ? (
                                                <React.Fragment key={idx}>
                                                    {part}
                                                    <span style={{color: '#DF7021'}}>(доп оплата)</span>
                                                </React.Fragment>
                                            ) : part
                                        ))}
                                    </React.Fragment>
                                ) : (
                                    destination.text
                                )}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <p className="prib">ПРИБЫТИЕ В МИНСК В 00:30-02:30м</p>

            <div ref={inspirationRef} className="chiziq5"></div>
            <p className="dest">О туре (Ближайшие выезды)</p>
            <hr width={900}/>
            <div className="cardcha">
                {aboutDatas.map((item, index) => (
                    <div className="dess" key={index}>
                        {JSON.parse(item.abouts).map((about, aboutIndex) => (
                            <React.Fragment key={aboutIndex}>
                                <div className="about-wrapper">
                                    <div>
                                        <span className="ccha">с</span>{moment(about.start_time).format('YYYY.MM.DD')}
                                        <span className="cchac">по</span>{moment(about.end_time).format('YYYY.MM.DD')}
                                        <p className="cchas">(+ Завтрак + Шоу-программа тигров)</p>
                                    </div>
                                    <div className={"abouts"}>
                                        <span className="ccha">от</span>
                                        <p className="byn">{about.price} BYN</p>
                                        <span>(~130 EUR)</span>
                                    </div>
                                    <button onClick={() => dispatch(openModals())} className="zab">Забронировать
                                    </button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>


            <div className={"chiziq5"}></div>
            <p className={"dest"}>О туре (<span className={"v"}>В стоимость тура входит:</span>)</p>
            <hr width={900}/>
            <ul className={"comments"}>
                {items.map((ite, index) => (
                    <li className={"ro"} key={index}>- {ite.text}</li>
                ))}
            </ul>

            <div className={"chiziq5"}></div>
            <p className={"dest"}>О туре (<span className={"v"}>Дополнительно можно приобрести:</span>) </p>
            <hr width={900}/>
            {context.map((item,index)=>(
                <div style={{marginTop:'-25px'}}>
                    <p style={{display: "flex"}} className={"textcha"}>- {item.text} <p className={"byna"}> {item.priceByn} BYN</p><p
                        className={"eur"}>(~{item.priceEur}
                        EUR)</p></p>
                </div>
            ))}

            <div className={"chiziq6"}></div>
            <div ref={contactUsRef} className={"footer-page"}>
                <img className={"footer-img-page"} src={a} alt=""/>
                <div className={"header2"}>
                    <p onClick={() => scrollToSection(aboutUsRef)}>Aboutus</p>
                    <p onClick={() => scrollToSection(destinationsRef)}>Destinations</p>
                    <p onClick={() => scrollToSection(inspirationRef)}>Inspiration</p>
                    <p onClick={() => scrollToSection(contactUsRef)}>Contactus</p>
                </div>
                <p className={"content"}>© 2018, All rights reserved. VR Lines - Авиабилеты, Туры, Круизы, Автобусы,
                    Паромы, Визы</p>
                <div className={"footer-number"}>
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
            <Rodal height={400} width={700} visible={modals} onClose={() => dispatch(closeModals())}>
                <EnquiryForm/>
            </Rodal>
        </div>
    );
}

export default Page2;
