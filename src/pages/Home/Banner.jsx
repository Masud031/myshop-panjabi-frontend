import header__image  from '../../assets/hero.png';

const Banner = () => {
    return (
      <section className="section__container header__container">
      <div className="header__content z-30">
        <h4>UP TO 20% DISCOUNT ON</h4>
        <h1>Girls Fashion</h1>
        <p>
          Discover the latest trends and express your unique style with our
          Women Fashion website. Explore a curated collection of clothing,
          accessories, and footwear that caters to every taste and occasion.
        </p>
        <button className="btn"><a href="/shop">EXPLORE NOW</a></button>
      </div>
      <div className="header__image">
        <img src={header__image } alt="header" />
      </div>
    </section>

      
    );
};

export default Banner;