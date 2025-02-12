/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../src/redux/features/cart/cartSlice";

const OrderSummary = () => {
    const dispatch = useDispatch();
    const { products, totalPrice } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        district: "",
        zipCode: "",
        phone: "",
        email: "",
    });

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOrder = async () => {
    
        const orderData = {
            ...formData,
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deliveryStatus: "pending",
            deliveryAddress: `${formData.address}, ${formData.district}, ${formData.zipCode}`,
            deliveryPhone: formData.phone,
            deliveryEmail: formData.email,
            deliveryMethod: "Standard",
            paymentStatus: "pending",
            paymentMethod: "Cash on Delivery",
            totalPrice,
            email: user.email, 
            userId: user._id,
    
            products: products.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
                name: item.name,
                category: item.category,
                color: item.color,
                price: item.price,
                image: item.image,
                totalPrice: item.price * item.quantity, 
            })),
        };
    
        try {
            const response = await fetch("http://localhost:5000/api/order/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(orderData),
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                throw new Error(result.message || "Failed to place order");
            }
    
            console.log("Order Response:", result);
            // alert(`Order placed successfully! Order ID: ${result.orderId}`);
            alert(`Order placed successfully!`);
            setIsModalOpen(false);
            handleClearCart();
    
        } catch (error) {
            console.error("Error during order submission:", error);
            alert("Failed to place order. Please try again.");
        }
    };
    

    return (
        <div className="bg-primary-light mt-5 rounded text-base">
            <div className="px-6 py-4 space-y-5">
                <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
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
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center"
                >
                    <span className="mr-2">Place Order</span>
                    <i className="ri-check-line"></i>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md w-80 space-y-4">
                        <h2 className="text-xl font-bold">Enter Your Details</h2>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            name="district"
                            placeholder="District"
                            value={formData.district}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            name="zipCode"
                            placeholder="ZIP Code"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOrder}
                                className="bg-green-600 text-white px-3 py-1 rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
