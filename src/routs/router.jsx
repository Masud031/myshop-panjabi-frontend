import { createBrowserRouter } from "react-router-dom";
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
import DashboardLayout from "../components/DashboarLayouts/DashboarLayout";
import UserDMain from "../components/DashboarLayouts/UserDMain";
import UserPayments from "../components/DashboarLayouts/UserPayments";
import UserProfile from "../components/DashboarLayouts/UserProfile";
import UserReviews from "../components/DashboarLayouts/UserReviews";
import AdminDMain from "../components/DashboarLayouts/adminrouts/AdminDMain";
import ManageOrders from "../components/DashboarLayouts/adminrouts/ManageOrders";
import PrivateRoute from "../components/PrivateRoute";
import OrderDetail from "../components/DashboarLayouts/OrderDetail";
import UserOrders from "../components/DashboarLayouts/UserOrder";
// import ManageUsers from "../components/DashboarLayouts/adminrouts/users/ManageUsers";
import AddProduct from "../components/DashboarLayouts/adminrouts/admin/product/AddProduct";
import ManageProducts from "../components/DashboarLayouts/adminrouts/admin/manageproduct/ManageProducts";
import UpdateProduct from "../components/DashboarLayouts/adminrouts/admin/manageproduct/UpdateProduct";
import ManageUsers from "../components/DashboarLayouts/adminrouts/users/ManageUsers";

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
      {
        path: "/success",
        element: <PaymentSuccess/>,
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
        path: "/dashboard",
    
        element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
        children: [
          //user routs
          {
            path: "",
            element: <UserDMain/>, // Replace <Errorpage /> with the actual Orders component
          },
          {
            path: "orders",
            element: <UserOrders/>, // Replace <Errorpage /> with the actual Orders component
          },
          {
            path: "orders/:orderId",
            element: <OrderDetail/>, // Replace <Errorpage /> with the actual Orders component
          },
          {
            path: "payments",
            element: <UserPayments/>, // Replace <Errorpage /> with the actual Payments component
          },
          {
            path: "profile",
            element: <UserProfile/>, // Replace <Errorpage /> with the actual Payments component
          },
          {
            path: "reviews",
            element: <UserReviews/>, // Replace <Errorpage /> with the actual Payments component
          },
          //admin routs
          {
            path: "admin",
            element: <PrivateRoute role="admin"><AdminDMain/></PrivateRoute>, // Replace <Errorpage /> with the actual Payments component
          },
          {
            path: "add-products",
            element: <PrivateRoute role="admin"><AddProduct/></PrivateRoute>, // Replace <Errorpage /> with the actual Payments component
            // element: <AddProduct/> // Replace <Errorpage /> with the actual Payments component
          },
          {
            path: "manage-products",
            // element: <PrivateRoute role="admin"><ManageProducts/></PrivateRoute>, // Replace <Errorpage /> with the actual Payments component
            element: <PrivateRoute role="admin"><ManageProducts/></PrivateRoute> // Replace <Errorpage /> with the actual Payments component
          },
          {
            path: "manage-orders",
            element: <PrivateRoute role="admin"><ManageOrders/></PrivateRoute>, // Replace <Errorpage /> with the actual Payments component
          },
          {
            path: "update-products:/id",
            // element: <PrivateRoute role="admin"><UpdateProduct/></PrivateRoute>, // Replace <Errorpage /> with the actual Payments component
            element: <PrivateRoute role="admin"><UpdateProduct/></PrivateRoute>, // Replace <Errorpage /> with the actual Payments component
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
