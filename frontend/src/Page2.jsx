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

function Page2() {

    const dispatch = useDispatch();
    const page = useSelector((state) => state.tourDays.data);
    const tourDays = useSelector(state => state.tourDay.tourDays);
    const [expandedDays, setExpandedDays] = useState([]);
    const aboutUsRef = useRef(null);
    const destinationsRef = useRef(null);
    const inspirationRef = useRef(null);
    const contactUsRef = useRef(null);
    const {uuid} = useParams()

    useEffect(() => {
        dispatch(fetchTourDaysRequest());
        dispatch(fetchTourDaysRequest(uuid));
    }, [dispatch,uuid]);

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
                {page.length > 0 && (
                    <>
                    <p className={"title"}>Uzbekistan : food tour</p>
                    <p className={"obshiy"}>Общее описание тура, буквально несколько абзацев про то как все круто,
                        красиво и еще
                        много всякой полезной информации, которую пользователи прочитают в первую очередь. Seamlessly
                        drive
                        extensible platforms without cooperative vortals. Conveniently drive professional results with
                        multimedia based bandwidth. Completely expedite enterprise leadership and transparent
                        meta-services.
                        Continually synthesize state of the art e-services before client-based technology. Conveniently
                        plagiarize accurate ideas without bleeding-edge channels.
                        <br/>
                        <br/>
                        Distinctively syndicate excellent intellectual capital whereas professional partnerships.
                        Interactively
                        syndicate best-of-breed niche markets after an expanded array of collaboration and idea-sharing.
                        Competently conceptualize multifunctional processes after strategic quality vectors.
                        Authoritatively
                        evisculate interactive partnerships whereas unique value. Dynamically reconceptualize leveraged
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
            {filteredDays.map((itm, index) => (
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
                <p className={"den-1"}>1 ДЕНЬ</p>
                <ul className={"den-1s"}>
                    <li>4:00</li>
                    <li>8:00</li>
                    <li>13:00</li>
                    <li>16:00</li>
                    <li>17:30</li>
                    <li>17:30</li>
                </ul>
                <ul className={"den-com"}>
                    <li>ПЛОЩАДЬ КАЛИНИНА, ОТПРАВЛЕНИЕ В РИГУ</li>
                    <li className={"lijon"}>ПЕРЕСЕЧЕНИЕ ГРАНИЦЫ (БЕЛАРУСЬ-ЛИТВА)</li>
                    <li className={"lijon2"}>ПРИБЫТИЕ В РИГУ, ЭКСКУРСИЯ ПО ГОРОДУ</li>
                    <li className={"lijon3"}>ВЫЕЗД В ПОРТ, ПОГРУЗКА НА КОРАБЛЬ</li>
                    <li className={"lijon4"}>ОТПРАВЛЕНИЕ В СТОКГОЛЬМ</li>
                    <li className={"lijon5"}> УЖИН НА КОРАБЛЕ <li className={"lijon6"}>(доп оплата).</li></li>
                </ul>
            </div>

            <div className={"day-content"}>
                <p className={"den-2"}>2 ДЕНЬ</p>
                <ul className={"den-2s"}>
                    <li>7:00</li>
                    <li>10:30</li>
                    <li>11:00</li>
                    <li>14:00</li>
                    <li>17:30</li>
                    <li>19:30</li>
                    <li>19:00</li>
                </ul>
                <p className={"zavt"}>ЗАВТРАК НА КОРАБЛЕ <li className={"lijon7"}>(доп оплата).</li></p>
                <ul className={"den2-com"}>
                    <li className={"den2-li"}>ПРИБЫТИЕ В СТОКГОЛЬМ</li>
                    <li className={"lijon2"}>ОБЗОРНАЯ ЭКСКУРСИЯ ПО СТОКГОЛЬМУ</li>
                    <li className={"lijon3"}>ПРЕЕЗД НА ДЮРГОРДН — ОСТРОВ МУЗЕЕВ</li>
                    <li className={"lijon4"}>ВЫЕЗД В ПОРТ, ПОГРУЗКА НА КОРАБЛЬ</li>
                    <li className={"lijon5"}>ОТПРАВЛЕНИЕ В ТУРКУ</li>
                    <li className={"lijon2"}> УЖИН НА КОРАБЛЕ <li className={"lijon6"}>(доп оплата).</li></li>
                </ul>
            </div>
            <div className={"day-content"}><p className={"den-3"}>3 ДЕНЬ</p>
                <ul className={"den-3s"}>
                    <li>6:00</li>
                    <li>7:00</li>
                    <li>7:30</li>
                    <li>9:00</li>
                    <li>11:30</li>
                    <li>13:00</li>
                    <li>17:30</li>
                    <li>18:30</li>
                    <li>21:00</li>
                </ul>
                <ul className={"den3-com"}>
                    <li className={"den3-li"}>ЗАВТРАК НА КОРАБЛЕ</li>
                    <li className={"lijon2"}>ПРИБЫТИЕ В ТУРКУ</li>
                    <li className={"lijon3"}>ЭКСКУРСИЯ ПО ГОРОДУ</li>
                    <li className={"lijon4"}>ПЕРЕЕЗД В ХЕЛЬСИНКИ</li>
                    <li className={"lijon5"}>ЭКСКУРСИЯ ПО ГОРОДУ</li>
                    <li className={"lijon2"}>СВОБОДНОЕ ВРЕМЯ (ПОСЕЩЕНИЕ ПАРКОВ, МУЗЕЕВ
                        <li className={"lijon8"}>(доп. оплата))</li>
                    </li>
                    <li className={"lijon2"}>ВЫЕЗД В ПОРТ, ПОГРУЗКА НА КОРАБЛЬ</li>
                    <li className={"lijon2"}>ОТПРАВЛЕНИЕ В ТАЛЛИНН</li>
                    <li className={"lijon2"}>УЖИН НА КОРАБЛЕ</li>
                </ul>
            </div>
            <div className={"day-content"}><p className={"den-4"}>4 ДЕНЬ</p>
                <ul className={"den-4s"}>
                    <li>7:00</li>
                    <li>8:00</li>
                    <li>11:30</li>
                </ul>
                <ul className={"den4-com"}>
                    <li className={"den2-li"}>ЗАВТРАК НА КОРАБЛЕ <li className={"lijon7"}>(доп. оплата)</li></li>
                    <li className={"lijon2"}>ОБЗОРНАЯ ЭКСКУРСИЯ ПО ГОРОДУ</li>
                    <li className={"lijon3"}> ОТПРАВЛЕНИЕ В МИНСК</li>
                </ul>
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
                {
                    tourDays.map((item)=>{
                        <li>{item.text}</li>
                    })
                }
                {/*<li>- проезд на комфортабельном автобусе компании VRLines</li>*/}
                {/*<li>- обзорные экскурсии по всем городам</li>*/}
                {/*<li>- ночевка на круизном лайнере</li>*/}
                {/*<li>- завтрак на круизном найнере</li>*/}
                {/*<li>- массаж головы при проезде в автобусе</li>*/}
                {/*<li>- гарнитура на время проведения экскурсий</li>*/}
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
