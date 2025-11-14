// src/pages/Shop/CartPage.jsx
import CartModal from "./productdetails/cartModal";
import { useSelector } from "react-redux";

const CartPage = () => {
  const products = useSelector((state) => state.cart.products);
  return (
    <div className="p-4 md:p-8">
      <CartModal products={products} isOpen={true} onClose={() => {}} />
    </div>
  );
};

export default CartPage;
