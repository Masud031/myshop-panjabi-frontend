// import {  } from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import 'remixicon/fonts/remixicon.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import router from './routs/router'
import { useEffect } from 'react'
import { initFacebookPixel } from '../../backend/src/lib/facebookPixel'
import "./i18n";
// import Authprovider from './provider/Authprovider'


// Simple wrapper to init the pixel once
const PageViewTracker = () => {
  useEffect(() => {
    initFacebookPixel("1312717463506664"); // your Pixel ID
  }, []);
  return null;
};

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PageViewTracker />
    <RouterProvider router={router} />
  </Provider>,
)
