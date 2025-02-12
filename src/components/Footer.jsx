
import instra_image2 from '../assets/instagram-2.jpg';
import instra_image5 from '../assets/instagram-5.jpg'; 
import instra_image6 from '../assets/instagram-6.jpg';

const Footer = () => {
    return (
        <>
            <footer className="section__container footer__container">
                <div className="footer__col">
                    <h4>CONTACT INFO</h4>
                    <p>
                        <span><i className="ri-map-pin-2-fill"></i></span>
                        123, London Bridge Street, London
                    </p>
                    <p>
                        <span><i className="ri-mail-fill"></i></span>
                        support@Lebaba.com
                    </p>
                    <p>
                        <span><i className="ri-phone-fill"></i></span>
                        (+012) 3456 789
                    </p>
                </div>
                <div className="footer__col">
                    <h4>COMPANY</h4>
                    <a href="#">Home</a>
                    <a href="#">About Us</a>
                    <a href="#">Work With Us</a>
                    <a href="#">Our Blog</a>
                    <a href="#">Terms &amp; Conditions</a>
                </div>
                <div className="footer__col">
                    <h4>USEFUL LINK</h4>
                    <a href="#">Help</a>
                    <a href="#">Track My Order</a>
                    <a href="#">Men</a>
                    <a href="#">Women</a>
                    <a href="#">Dresses</a>
                </div>
                <div className="footer__col">
                    <h4>INSTAGRAM</h4>
                    <div className="instagram__grid">
                        <img src={instra_image2 } alt="instagram" />
                        <img src={instra_image2 } alt="instagram" />
                        <img src={instra_image2} alt="instagram" />
                        <img src={instra_image5}alt="instagram" />
                        <img src={instra_image5} alt="instagram" />
                        <img src={instra_image6} alt="instagram" />
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;