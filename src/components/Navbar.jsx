import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import avatar from '../assets/mypic.png'
import { useState } from "react";
import { logout } from "../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../redux/features/auth/authapi";
import CartModal from "../pages/Shop/productdetails/cartModal";


const Navbar = () => {
  const products =  useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false)
  const {user}=useSelector((state)=>state.auth);
  console.log("Redux user:", user);
  const dispatch = useDispatch();
  const navigate=useNavigate();

   // handle cart toggle
   const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen)
}

  // 2.dropdown navigation
    
      const [isDropDownOpen, setIsDropDownOpen] = useState(false)
      const handleDropDownToogle = () => {
          setIsDropDownOpen(!isDropDownOpen)
      }

  // 1.user dropdown funtionality//
  const userDropdownMenus = [
    {label: "Dashboard", path: "/dashboard"},
    {label: "Profile", path: "/dashboard/profile"},
    {label: "Payments", path: "/dashboard/payments"},
    {label: "Orders", path: "/dashboard/orders"}
]

const adminDropdownMenus = [
    {label: "Dashboard", path: "/dashboard/admin"},
    { label: "Manage Items", path: "/dashboard/manage-products" },
    {label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add Products", path: "/dashboard/add-products" }
]

  //(2) role based dropdown show
  const dropDownMenues = user?.role === "admin" 
  ? [...adminDropdownMenus] 
 : [...userDropdownMenus];

//  log out//
 const [userLogout] = useLogoutUserMutation()
 const handleLogout = async () => {
     try {
      await userLogout().unwrap();
      dispatch(logout());
      alert("Logout successful!");
       navigate("/"); //when the user is logged out navigate to home//

     } catch (error) {
         console.error("Error logging out", error);
     }
 }


  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Navigation Links */}
        <ul className="flex gap-6 text-gray-700">
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-red-400 rounded-md hover:text-primary transition duration-200 font-medium"
                  : "hover:text-primary transition duration-200 font-medium"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-red-400 rounded-md hover:text-primary transition duration-200 font-medium"
                  : "hover:text-primary transition duration-200 font-medium"
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pages"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-red-400 rounded-md hover:text-primary transition duration-200 font-medium"
                  : "hover:text-primary transition duration-200 font-medium"
              }
            >
              Pages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-red-400 rounded-md hover:text-primary transition duration-200 font-medium"
                  : "hover:text-primary transition duration-200 font-medium"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-primary">
          <Link to="/">
            Lebaba<span className="text-secondary">.</span>
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-gray-700">
          <Link
            to="/search"
            className="hover:text-primary transition duration-200 text-lg"
          >
            <i className="ri-search-line"></i>
          </Link>
          <button
              onClick={handleCartToggle}
           className="flex items-center gap-1 hover:text-primary transition duration-200">
            <i className="ri-shopping-bag-line text-lg"></i>
            <sup className="text-xs px-1.5 py-0.5 bg-primary text-white rounded-full">
              {products.length}
            </sup>
          </button>

          <span>
                         {
                            user? 
                            <>
                                <img 
                                onClick={handleDropDownToogle}
                                 src={user?.photoURL || avatar} alt="" className='size-6 rounded-full cursor-pointer' />
                                {
                                    isDropDownOpen && (
                                        <div 
                                        className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                            <ul className='font-medium space-y-4 p-2'>
                                                {
                                                   dropDownMenues.map((menu, index) => (
                                                    <li key={index}>
                                                            <Link 
                                                            className='dropdown-items'
                                                            onClick={() => handleDropDownToogle(false)}
                                                            to={menu.path}>
                                                            {menu.label}
                                                            </Link>
                                                    </li>
                                                   )) 
                                                }
                                                <li>
                                                    {/* <Link className='dropdown-items' onClick={handleLogout}>Logout</Link> */}
                                                    <Link className='dropdown-items' onClick={handleLogout}>Logout</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }

                            </> :  <Link to="/login"> < i className="ri-user-line rounded-full cursor-pointer"></i></Link>
                         }
                       </span>
         
        </div>
      </nav>
      
            {/* cart model */}
            {
                isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>
            }
    </header>
  );
};

export default Navbar;




 