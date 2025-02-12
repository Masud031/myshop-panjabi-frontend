import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/home";
import CategoryPage from "../pages/Home/categorypage/CategoryPage";
import Errorpage from "../components/Errorpage";
import Login from "../components/Login";
import Register from "../components/Register";
import Pages from "../pages/pages";
import ShopPage from "../pages/Shop/Shop page";
import PaymentSuccess from "../components/paymentSuccess";
import DashboardLayout from "../components/DashboarLayouts/DashboarLayout";
import UserDMain from "../components/DashboarLayouts/UserDMain";
import UserPayments from "../components/DashboarLayouts/UserPayments";
import UserProfile from "../components/DashboarLayouts/UserProfile";
import UserReviews from "../components/DashboarLayouts/UserReviews";
import AdminDMain from "../components/DashboarLayouts/adminrouts/AdminDMain";
import PrivateRoute from "../components/PrivateRoute";
// import OrderDetail from "../components/DashboarLayouts/OrderDetail";
import UserOrders from "../components/DashboarLayouts/UserOrder";
import AddProduct from "../components/DashboarLayouts/adminrouts/admin/product/AddProduct";
import ManageProducts from "../components/DashboarLayouts/adminrouts/admin/manageproduct/ManageProducts";
import UpdateProduct from "../components/DashboarLayouts/adminrouts/admin/manageproduct/UpdateProduct";
import ManageUsers from "../components/DashboarLayouts/adminrouts/users/ManageUsers";
import SingleProduct from "../pages/Shop/productdetails/singelProducts";
import ManageOrders from "../components/DashboarLayouts/adminrouts/admin/orders/ManageOrders";
import OrderDetail from "../components/DashboarLayouts/OrderDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Errorpage/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/shop",
        element: <ShopPage/>,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct/>,
      },
      {
        path: "/pages",
        element: <Pages/>,
      },
   
      // {
      //   path: "/success/",
      //   element: <Payment/>,
      // },
      {
        path: "/success",
        element: <PaymentSuccess/>,
        // loader:()=>fetch("/order.controller.js")
      },
    
      {
        path: "/category/:categoryName",
        element: <CategoryPage/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetail/>,
      },
      {
        path: "/dashboard",
    
        element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
        children: [
          //user routs
          {
            path: "",
            element: <UserDMain/>, 
          },
          {
            path: "orders",
            element: <UserOrders/>,
          },
        
          {
            path: "payments",
            element: <UserPayments/>, 
          },
          {
            path: "profile",
            element: <UserProfile/>, 
          },
          {
            path: "reviews",
            element: <UserReviews/>, 
          },
          //admin routs
          {
            path: "admin",
            element: <PrivateRoute role="admin"><AdminDMain/></PrivateRoute>, 
          },
          {
            path: "add-products",
            element: <PrivateRoute role="admin"><AddProduct/></PrivateRoute>, 
          },
          {
            path: "manage-products",
            element: <PrivateRoute role="admin"><ManageProducts/></PrivateRoute> 
          },
          {
            path: "manage-orders",
            element: <PrivateRoute role="admin"><ManageOrders/></PrivateRoute>, 
          },
          {
            path: "update-products/:id",
            element: <PrivateRoute role="admin"><UpdateProduct/></PrivateRoute>, 
          },
          {
            path: "users",
            element:<PrivateRoute role="admin"><ManageUsers/></PrivateRoute>
          }

        ],
      },
    ],
  },

]);

export default router;
