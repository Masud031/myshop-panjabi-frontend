import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../src/redux/features/cart/cartSlice";
// import axios from "axios";
// import { getBaseUrl } from '../../utils/baseurl';

const OrderSummary = () => {
    const dispatch = useDispatch();
    const { products, selectedItems, totalPrice } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Handle order submission
    const handleOrder = async () => {
    
        
        const body = {
            ...selectedItems,
            totalPrice: totalPrice,
            status: "pending",
            paymentMethod: "sslcommerz",
            userId: user?._id,
            products: products,
        };
        console.log("Request Body:", body);
      
        fetch('http://localhost:5000/api/order/create-checkout-session', { // Correct URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((result) => {
                       window.location.replace(result.url);
                console.log(result);
                // window.location.replace(body.data);
            })
            .catch((error) => {
                console.error("Error during fetch:", error);
                alert("Failed to place order. Please try again.");
            });
        
    //     try {
    //         const response = await fetch('http://localhost:5000/api/orders/create-checkout-session', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(body),
    //         });
            
    //     //     window.location.replace(body.data);
    
    //     //     if (!response.ok) {
    //     //         throw new Error(`HTTP error! status: ${response.status}`);
    //     //     }
    
    //     //     const result = await response.json();
    //     //     console.log("Order Response:", result);
    
    //     //     if (result?.url) {
    //     //         // Redirect the user to SSLCommerz Gateway Page
    //     //         window.location.replace(body.data);
    //     //     } else {
    //     //         throw new Error("Failed to retrieve payment URL");
    //     //     }
    //     // } catch (error) {
    //     //     console.error("Error placing order:", error);
    //     //     alert("Failed to place order. Please try again.");
    //     }
        
    // }
        
    };

    return (
        <div className="bg-primary-light mt-5 rounded text-base">
            <div className="px-6 py-4 space-y-5">
                <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
                <p className="text-dark mt-2">Selected Items: {selectedItems}</p>
                <p className="text-dark mt-2">Total Price: {totalPrice.toFixed(2)}</p>
            </div>
            <div className="px-4 pb-6">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClearCart();
                    }}
                    className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
                >
                    <span className="mr-2">Clear Cart</span>
                    <i className="ri-delete-bin-7-line"></i>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOrder();
                    }}
                    className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center"
                >
                    <span className="mr-2">Place Order</span>
                    <i className="ri-check-line"></i>
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;

