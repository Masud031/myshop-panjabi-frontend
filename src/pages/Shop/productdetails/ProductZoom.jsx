/* eslint-disable react/prop-types */
import { useState, useRef } from "react";

const ProductZoom = ({ image }) => {
  const [zoom, setZoom] = useState({ x: 0, y: 0, show: false });
  const imgRef = useRef(null);

  const updateZoomPos = (clientX, clientY) => {
    const rect = imgRef.current.getBoundingClientRect();

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    // Only show zoom if inside image bounds
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
      setZoom({ x, y, show: true });
    } else {
      setZoom({ ...zoom, show: false });
    }
  };

  const handleMouseMove = (e) => {
    updateZoomPos(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    updateZoomPos(touch.clientX, touch.clientY);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-md"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setZoom({ ...zoom, show: false })}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setZoom({ ...zoom, show: false })}
    >
      {/* Base image */}
      <img
        ref={imgRef}
        src={image}
        alt="Product"
        className="w-full block select-none pointer-events-none"
      />

      {/* Zoom overlay INSIDE the image */}
      {zoom.show && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "250%",
            backgroundPosition: `${zoom.x}% ${zoom.y}%`,
          }}
        ></div>
      )}
    </div>
  );
};

export default ProductZoom;
