// eslint-disable-next-line react/prop-types
const Ratings = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`ri-star${i <= rating ? '-fill' : '-line'}`} // Toggle class based on rating
      ></span>
    );
  }

  return <div className="product__rating">{stars}</div>;
};

export default Ratings;
