import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/home";
import Shop from "../pages/Shop/Shop";
import CategoryPage from "../pages/Home/categorypage/CategoryPage";
import Errorpage from "../components/Errorpage";
import Login from "../components/Login";
import Register from "../components/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement:<Errorpage/>,
      children:[
        {path:'/',
        element:<Home/>
        },
        {path:'/shop',
        element:<Shop/>
        },
        {path: "/category/:categoryName",
        element:<CategoryPage/>
        },
       
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    }
  ]);
  export default router;
  