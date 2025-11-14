/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";

const ProductZoom = ({ image }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full relative overflow-visible">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Product image",
            isFluidWidth: true,
            src: image,
          },
          largeImage: {
            src: image,
            width: 800,
            height: 1000,
          },
          // ✅ Lens-style zoom directly under cursor
          shouldUsePositiveSpaceLens: true,
          enlargedImagePosition: "over",
          enlargedImageContainerDimensions: {
            width: "200px",
            height: "200px",
          },
          enlargedImageContainerStyle: {
            border: "1px solid rgba(0,0,0,0.3)",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            overflow: "hidden",
            zIndex: 9999,
          },
          lensStyle: {
            backgroundColor: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(0,0,0,0.3)",
          },
          isHintEnabled: false,
          hoverDelayInMs: 0,
        }}
        className="rounded-md"
      />
    </div>
  );
};

export default ProductZoom;
