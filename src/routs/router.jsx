import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/home";
import CategoryPage from "../pages/Home/categorypage/CategoryPage";
import Errorpage from "../components/Errorpage";
import Login from "../components/Login";
import Register from "../components/Register";
import Pages from "../pages/pages";
import ShopPage from "../pages/Shop/Shop page";
import SingleProduct from "../pages/Shop/productdetails/singelProducts";
import PaymentSuccess from "../components/paymentSuccess";

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
        element:<ShopPage/>
        },
        {path:'/shop/:id',
        element:<SingleProduct/>
        },
        {path:'/pages',
          element:<Pages/>
          },
        {path:'/confirm-payment',
          element:<PaymentSuccess/>
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
  
  