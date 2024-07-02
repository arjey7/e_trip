import React from 'react';
import MainImg from "./footer/barlass 4.png";
import GYG from "./footer/Kachel_Get_Your_Guide 1.png";
import Evns from './footer/Kachel_Get_Your_Guide 3.png';
import Ggl from './footer/b2ee03870807203bccfae85f973dc2a4 1.png';
import Trdr from './footer/Kachel_Get_Your_Guide 4.png';
// import Unnamed from './footer/unnamed 1.png';
import Sbl from './footer/sabeel-travels-favicon-1-512x460 1.png';
import Tg from './footer/tg.svg'
import Fcbk from './footer/fcbk.svg'
import Vk from './footer/vk.svg'
import Insta from './footer/insta.svg'
import WhatsUp from './footer/whatsup.svg'
import Google from './footer/ggl.svg'
import "./styles/Footer.css";

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <img className='footer-logo' src={MainImg} alt="BARLAS VOYAGE" />
                </div>
                <div className="footer-section">
                    <h4>ABOUT US</h4>
                    <img className='footer-icon' src={GYG} alt="Get Your Guide" />
                    <img className='footer-icon' src={Evns} alt="Evaneos" />
                </div>
                <div className="footer-section">
                    <h4>DESTINATION</h4>
                    <img className='footer-icon-ggl' src={Ggl} alt="Google My Business" />
                    <img className='footer-icon' src={Trdr} alt="Tour Radar" />
                </div>
                <div className="footer-section2">
                    <h4>INSPIRATION</h4>
                    <img className='footer-icon' src={Sbl} alt="Sabeel Travels" />
                    {/*<img className='footer-icon2' src={Unnamed} alt="Ayman Tour" />*/}
                </div>
                <div className="footer-section">
                    <h4>CONTACT US</h4>
                    <p>+44 7884 610140</p>
                    <p>yourmailaddress@gmail.com</p>
                    <p>www.yourwebsitename.com</p>
                    <h4>LET'S BE SOCIAL</h4>
                    <div className="social-icons">
                        <img src={Tg} alt="" />
                        <img src={Fcbk} alt="" />
                        <img src={Vk} alt="" />
                        <img src={Insta} alt="" />
                        <img src={WhatsUp} alt="" />
                        <img src={Google} alt="" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;