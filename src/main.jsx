// import {  } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routs/router'
import { Provider } from 'react-redux'
import { store } from './redux/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <RouterProvider router={router} />
  </Provider>,
)
