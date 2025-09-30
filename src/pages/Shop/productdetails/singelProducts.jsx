import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchProductbyIdQuery } from '../../../redux/features/products/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import RatingStars from '../../../components/RatingStars';
import Loading from '../../../components/Loading';
import ReviewsCard from '../reviewsCard/reviewCard';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [selectedSize, setSelectedSize] = useState(null);

  const {
    data: { data: productDetails } = {},
    isLoading,
    isError,
  } = useFetchProductbyIdQuery(id);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="flex items-center justify-center h-96">
        Error loading product details
      </div>
    );

  const { product, reviews } = productDetails || {};

  const availableSizes = Object.entries(product?.stock || {}).filter(
    ([, qty]) => qty > 0
  );

  const handleAddToCart = () => {
    if (!user) {
      alert('You must register to purchase a product!');
      navigate('/register');
      return;
    }

    if (!selectedSize) {
      alert('Please select a size!');
      return;
    }

    dispatch(addToCart({ ...product, selectedSize }));
  };

  return (
    <>
      {/* Banner */}
      <section className="section__container rounded bg-primary-light">
        <h2 className="section__header">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <Link to="/" className="hover:text-primary">home</Link>
          <i className="ri-arrow-right-s-line" />
          <Link to="/shop" className="hover:text-primary">shop</Link>
          <i className="ri-arrow-right-s-line" />
          <span className="hover:text-primary">{product?.name}</span>
        </div>
      </section>

      {/* Product Container */}
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={product?.image}
              alt={product?.name || 'product image'}
              className="rounded-md w-full h-auto"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">{product?.name}</h3>
            <p className="text-xl text-primary mb-4">
              ${product?.price}{' '}
              {product?.oldPrice && <s>${product?.oldPrice}</s>}
            </p>
            <p className="text-gray-700 mb-4">{product?.description}</p>

            <div className="flex flex-col space-y-2">
              <p className="capitalize">
                <strong>Category:</strong> {product?.category}
              </p>
              <p className="capitalize">
                <strong>Color:</strong> {product?.color}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating: </strong>
                <RatingStars rating={product?.rating} />
              </div>
            </div>

            {/* Size Selector */}
            {availableSizes.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Select Size:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(product.stock).map(([size, qty]) => {
                    const isAvailable = qty > 0;
                    return (
                      <button
                        key={size}
                        disabled={!isAvailable}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        className={`
                          px-4 py-2 border rounded-md
                          ${selectedSize === size ? 'bg-primary text-white' : 'bg-white'}
                          ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-light'}
                        `}
                        title={!isAvailable ? 'Product is out of stock' : `Size ${size} available`}
                      >
                        Size {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section__container mt-8">
        <ReviewsCard productReviews={reviews} />
      </section>
    </>
  );
};

export default SingleProduct;
