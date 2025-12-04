/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import avatar from "../assets/mypic.png";
import { useEffect, useRef, useState } from "react";
import { logout } from "../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../redux/features/auth/authapi";
import CartModal from "../pages/Shop/productdetails/cartModal";
import { useSearchProductsQuery } from "../redux/features/products/productsApi";
import { showToast } from "../utils/showToast";
import LanguageSwitcher from "./translater/LanguageSwitcher";
import Swal from "sweetalert2";

// 

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropDownOpen(false);
      }
    };
        document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    

  const [searchFocused, setSearchFocused] = useState(false);

  const { data, isFetching } = useSearchProductsQuery(query, {
    skip: query.trim() === "",
    refetchOnMountOrArgChange: true,
  });

  const searchResults = data?.data?.products || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogout] = useLogoutUserMutation();

  const handleCartToggle = () => setIsCartOpen(!isCartOpen);
  const handleDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${query}`);
      setShowDropdown(false);
    }
  };

  const handleLogout = async () => {
    try {
      await userLogout().unwrap();
      dispatch(logout());
         await Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Logout successful!",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: "#f1adadff",
      iconColor: "#4CAF50",
    });
      
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
       await Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Failed to logout. Please try again.",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: "#f1adadff",
      iconColor: "#D33",
    });
    }
  };

  const userDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const adminDropdownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add Products", path: "/dashboard/add-products" },
  ];

  const dropDownMenus =
    user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

  return (
 <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow">
      {/* Top Line */}
           <div className="w-full px-2 py-2 border-b border-gray-100 mt-8">
                <div className="flex items-center justify-between gap-1 w-full">
        
        {/* Logo */}
   <div className="text-base lg:text-xl font-bold text-primary whitespace-nowrap mr-1 lg:ml-4 flex-shrink-0">

          <Link to="/">
            Lebaba<span className="text-secondary">.</span>
          </Link>
        </div>

        {/* Search Bar */}
          <div className="flex-1 max-w-[140px] xs:max-w-[160px] sm:max-w-xs lg:max-w-md mx-1">

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-gray-100 rounded-full px-2 py-[3px]"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              placeholder="Search"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent outline-none text-xs"
            />
            {searchFocused && (
              <button
                type="submit"
                className="px-3 py-1 bg-gradient-to-r from-red-600 to-yellow-400 text-white text-xs md:text-sm rounded-full hover:bg-secondary transition"
              >
                <i className="ri-search-line"></i>
              </button>
            )}
          </form>

          {/* Live Search */}
          {showDropdown && (searchFocused || isFetching) && query.trim() !== "" && (
            <div className="absolute left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              {isFetching ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Searching...
                </div>
              ) : searchResults?.length > 0 ? (
                <>
                  {searchResults.slice(0, 5).map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onMouseDown={() => {
                        navigate(`/shop/${product._id}`);
                        setQuery("");
                        setShowDropdown(false);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span className="text-sm">{product.name}</span>
                    </div>
                  ))}

                  <div
                    className="px-3 py-2 text-sm text-primary font-medium cursor-pointer border-t hover:bg-gray-50"
                    onMouseDown={() => {
                      navigate(`/shop?query=${query}`);
                      setShowDropdown(false);
                    }}
                  >
                    View all results
                  </div>
                </>
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart + Profile */}
        <div className="flex items-center gap-3 text-gray-700 pr-2 sm:pr-4 relative">

          {/* Langusge swetcher */}
            <div className="scale-[0.72] flex-shrink-0 mr-1">
            <LanguageSwitcher />
          </div>
           {/* CART ICON */}
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center hover:text-primary text-sm flex-shrink-0"
          >
            <i className="ri-shopping-bag-line"></i>
            <sup className="text-xs px-1 bg-primary text-white rounded-full">
              {products.length}
            </sup>
          </button>

          {user ? (
            <div className="relative">
              <img
                onClick={handleDropDownToggle}
                src={
                  user?.profileImage && user.profileImage.trim() !== ""
                    ? user.profileImage
                    : avatar
                }
                alt="User Avatar"
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full ml-1 border border-gray-200 object-cover cursor-pointer flex-shrink-0"
              />

              {isDropDownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-y-auto max-h-48"
                  style={{ transformOrigin: "top right" }}
                >
                  <ul className="font-medium text-sm p-1 space-y-1">
                    {dropDownMenus.map((menu, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsDropDownOpen(false)}
                          to={menu.path}
                          className="block px-2 py-1 rounded leading-tight hover:bg-gray-100 hover:text-primary transition"
                        >
                          {menu.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-2 py-1 rounded leading-tight hover:bg-gray-100 hover:text-primary transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <i className="ri-user-line text-lg md:text-xl"></i>
            </Link>
          )}
        </div>
      </div>
      </div>

      {/* Navigation Links */}
      {/* Navigation Links */}
{location.pathname === "/" && (
  <div className="border-t border-gray-100">
   <ul className="flex justify-center gap-5 text-black text-sm lg:text-base font-medium py-1.5 lg:py-2">

      {[
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
        { label: "Pages", path: "/pages" },
        { label: "Contact", path: "/contact" },
      ].map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1"
                : "hover:text-primary hover:border-b-2 hover:border-primary pb-1"
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
        

    </ul>
     
  </div>
)}


      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
