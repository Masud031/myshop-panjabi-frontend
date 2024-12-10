import card_1 from '../../assets/card-1.png'
import card_2 from '../../assets/card-2.png'
import card_3 from '../../assets/card-3.png'


const Trands = () => {
    return (
        <section className="section__container hero__container">
        <div className="hero__card">
          <img src={card_1} alt="Womens Shirt" />
          <div className="hero__content">
            <p>2023 Trend</p>
            <h4>Womens Shirt</h4>
            <a href="#">Discover More +</a>
          </div>
        </div>
        <div className="hero__card">
          <img src={card_2} alt="Womens Dresses" />
          <div className="hero__content">
            <p>2023 Trend</p>
            <h4>Womens Dresses</h4>
            <a href="#">Discover More +</a>
          </div>
        </div>
        <div className="hero__card">
          <img src={card_3} alt="Womens Casuals" />
          <div className="hero__content">
            <p>2023 Trend</p>
            <h4>Womens Casuals</h4>
            <a href="#">Discover More +</a>
          </div>
        </div>
      </section>
    );
};

export default Trands;
