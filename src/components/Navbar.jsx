import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import avatar from "../assets/mypic.png";
import { useState } from "react";
import { logout } from "../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../redux/features/auth/authapi";
import CartModal from "../pages/Shop/productdetails/cartModal";
import { useSearchProductsQuery } from "../redux/features/products/productsApi";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);

  

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const { data, isFetching } = useSearchProductsQuery(query, {
  skip: query.trim() === "", 
   refetchOnMountOrArgChange: true,   
});

const searchResults = data?.data?.products || []; 
console.log(searchResults);

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
      alert("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
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
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      {/* Top Line */}
      <div className="flex items-center justify-between px-4 lg:px-8 py-2 border-b border-gray-200 shadow-sm">
        {/* Logo */}
        <div className="text-lg md:text-xl font-bold text-primary whitespace-nowrap">
          <Link to="/">
            Lebaba<span className="text-secondary">.</span>
          </Link>
        </div>

        {/* Search Bar with Dropdown */}
        <div className="flex-1 max-w-lg mx-4 relative">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full bg-gray-100 rounded-full px-2 py-1.5"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              placeholder="Search for products..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 bg-transparent outline-none px-2 text-sm md:text-base"
            />
            {searchFocused && (
              <button
                type="submit"
                className="px-3 py-1 bg-primary text-white text-xs md:text-sm rounded-full hover:bg-secondary transition"
              >
                <i className="ri-search-line"></i>
              </button>
            )}
          </form>

{/* Live Search Results */}
{showDropdown && (searchFocused || isFetching) && query.trim() !== "" && (
  <div className="absolute left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
    {isFetching ? (
      <div className="px-3 py-2 text-sm text-gray-500">Searching...</div>
    ) : searchResults?.length > 0 ? (
      <>
        {searchResults.slice(0, 5).map((product) => ( // ✅ Show first 5
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

        {/* View All Results Button */}
        <div
          className="px-3 py-2 text-sm text-primary font-medium cursor-pointer border-t hover:bg-gray-50"
          onMouseDown={() => {
            navigate(`/shop?query=${query}`);
            setShowDropdown(false);
          }}
        >
          View all results →
        </div>
      </>
    ) : (
      <div className="px-3 py-2 text-sm text-gray-500">No products found.</div>
    )}
  </div>
)}
        </div>

        {/* Cart + Profile */}
        <div className="flex items-center gap-3 text-gray-700 pr-2 sm:pr-4 relative">
          <button
            onClick={handleCartToggle}
            className="flex items-center gap-0.5 hover:text-primary text-sm md:text-base"
          >
            <i className="ri-shopping-bag-line"></i>
            <sup className="text-xs px-1 bg-primary text-white rounded-full">
              {products.length}
            </sup>
          </button>

          {user ? (
            <>
              <img
                onClick={handleDropDownToggle}
                src={user?.profileImage || avatar}
                alt="user"
                className="w-6 h-6 md:w-7 md:h-7 rounded-full cursor-pointer"
              />
              {isDropDownOpen && (
                <div className="absolute right-0 mt-10 p-4 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="font-medium space-y-3 text-sm">
                    {dropDownMenus.map((menu, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsDropDownOpen(false)}
                          to={menu.path}
                          className="block hover:text-primary"
                        >
                          {menu.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left hover:text-primary"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <i className="ri-user-line text-lg md:text-xl"></i>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-t border-gray-200 shadow-sm">
        <ul className="flex justify-center gap-4 sm:gap-6 text-gray-600 text-sm sm:text-base font-medium py-2">
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

      {/* Cart Modal */}
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
