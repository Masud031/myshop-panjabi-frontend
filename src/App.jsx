/* eslint-disable no-unused-vars */
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import './App.css';
import Footer from "./components/Footer";
import { useEffect } from "react";
import { initFacebookPixel, trackPageView } from "../../backend/src/lib/facebookPixel";
import PageViewTracker from "../../backend/src/lib/PageViewTracker";
import { useTranslation } from "react-i18next";


function App() {

    const { t } = useTranslation();
  const location = useLocation();

    useEffect(() => {
    // Initialize pixel once (replace with your real Pixel ID)
    initFacebookPixel("VITE_FACEBOOK_PIXEL_ID");
  }, []);

    useEffect(() => {
    // Track page views on every route change
    trackPageView();
  }, [location]);

  return (
    <>
     <PageViewTracker />
    <Navbar/>
   <main className="min-h-screen">
     <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default App

