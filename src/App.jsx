/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import './App.css';
import Footer from "./components/Footer";
import PageViewTracker from "./facbook/PageViewTracker";
import ContactFloating from "./facbook/ContactFloating";



function App() {


  return (
    <>
     
     <PageViewTracker />
       <ContactFloating />
      <Navbar/>
   <main className="min-h-screen">
     <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default App

