/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFetchProductbyIdQuery } from '../../../redux/features/products/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import RatingStars from '../../../components/RatingStars';
import ReviewsCard from '../reviewsCard/reviewCard';
import Loading from '../../../components/loading';
import { useTranslation } from 'react-i18next';
import ProductZoom from './ProductZoom';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const from = location.state?.from || '/';
  const [selectedSize, setSelectedSize] = useState(null);
    const { t } = useTranslation(); 

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
      navigate('/register', { state: { from: `/shop/${id}` } });
      return;
    }

    if (!selectedSize) {
      alert('Please select a size!');
      return;
    }

    dispatch(addToCart({ ...product, selectedSize }));
  };

  // ✅ Discount Calculation (only if oldPrice exists and > price)
  const hasDiscount =
    product?.oldPrice && Number(product.oldPrice) > Number(product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <>
      {/* Banner */}
      <section className="section__container rounded bg-primary-light">
        <h2 className="section__header">Single Product Page</h2>
        <div className="section__subheader space-x-2">
  <Link to="/" className="hover:text-primary">
    {t("home")}
  </Link>
  <i className="ri-arrow-right-s-line" />
  <Link to="/shop" className="hover:text-primary">
    {t("shop")}
  </Link>
  <i className="ri-arrow-right-s-line" />
  {product?.category ? (
    <Link
      to={`/category/${product.category}`}
      className="hover:text-primary capitalize"
    >
      {product?.name}
    </Link>
  ) : (
    <span className="hover:text-primary">{product?.name}</span>
  )}
</div>
      </section>

      {/* Product Container */}
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* Product Image */}
         <div className="w-full md:w-1/2">
  <ProductZoom image={product?.image} />
</div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            {/* Product Name */}
            <h3 className="text-2xl font-semibold mb-2">{product?.name}</h3>

            {/* ✅ Product Code */}
            <p className="text-gray-600 mb-4">
              <strong>{t("product_code")}:</strong> {product?.productCode}
            </p>

           {/* ✅ Price section with optional old price & discount */}
<div className="mb-4">
  <strong>Price:</strong>

  {/* ✅ New / Current Price */}
  <div className="text-xl font-bold text-primary mt-1">
   Tk: {product?.price}
  </div>

  {/* ✅ Old Price + Discount below, if available */}
  {hasDiscount && (
    <div className="mt-1 flex items-center gap-2">
      <s className="text-gray-500">Tk:{product?.oldPrice}</s>
      <span className="text-sm bg-red-500 text-white px-2 py-0.5 rounded">
        -{discountPercent}%
      </span>
    </div>
  )}
</div>

            {/* Category, Color, Rating */}
            <div className="flex flex-col space-y-2 mb-4">
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
                          ${
                            !isAvailable
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-primary-light'
                          }
                        `}
                        title={
                          !isAvailable
                            ? 'Product is out of stock'
                            : `Size ${size} available`
                        }
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

            {/* ✅ Product Description */}
            <p className="text-gray-700 mt-6">{product?.description}</p>
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
