/* eslint-disable no-undef */
// src/PageViewTracker.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// Assuming initFacebookPixel is correctly imported
import { initFacebookPixel } from "./facebookPixel"; 

export default function PageViewTracker() {
  const location = useLocation();
  const PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

  // Define the production check once for clarity
  const isProduction = import.meta.env.PROD || process.env.NODE_ENV === "production";

  // 1. Initialization (Runs once on mount)
  useEffect(() => {
    // Only initialize if it is a production build AND the PIXEL_ID is available
    if (isProduction && PIXEL_ID) { 
      initFacebookPixel(PIXEL_ID);
      console.log("[Meta Pixel] Initialized in Production mode.");
    }
  }, [PIXEL_ID, isProduction]); // Added isProduction to the dependency array

  // 2. Tracking Page Views (Runs on mount and whenever the route changes)
  useEffect(() => {
    // Check if the fbq object exists before attempting to track
    if (window.fbq) {
      window.fbq("track", "PageView");
      console.log(`[Meta Pixel] PageView tracked: ${location.pathname}`);
    } else if (!isProduction) {
       // Only log a warning if NOT in production, to avoid cluttering production console
      console.warn("[Meta Pixel] Tracking skipped. Pixel not initialized (Running in Development).");
    }
  }, [location.pathname, isProduction]);

  return null;
}