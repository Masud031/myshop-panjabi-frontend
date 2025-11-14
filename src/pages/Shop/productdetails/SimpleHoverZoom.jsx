/* eslint-disable react/prop-types */
/* SimpleHoverZoom.jsx */
const SimpleHoverZoom = ({ image, alt }) => (
  <div className="hover-zoom-wrapper overflow-hidden rounded-md">
    <img src={image} alt={alt} className="w-full object-cover transform transition-transform duration-500 hover:scale-110" />
  </div>
);

export default SimpleHoverZoom;
