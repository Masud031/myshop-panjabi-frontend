import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const valId = query.get("val_id");

    if (!valId) {
      setError("Missing val_id in the URL.");
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        // Send `val_id` to the backend for validation
        const response = await axios.post(
          "http://localhost:5000/api/order/success",
          {
            val_id: valId,
          }
        );

        if (response.data && response.data.success) {
          setOrderDetails(response.data.data); // Assuming backend sends order details in `data`
          setShowModal(true); // Trigger the modal on successful validation
        } else {
          setError(response.data.message || "No order details found.");
        }
      } catch (err) {
        setError("Failed to fetch order details.");
        console.error(err);
      }
    };

    fetchOrderDetails();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    navigate("/"); // Navigate to home or another desired route after closing the modal
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Payment Success</h2>
      {error && <p className="text-red-500">{error}</p>}

      {orderDetails && (
        <>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Order Details</h3>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(orderDetails, null, 2)}</pre>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-green-600">Payment Successful!</h2>
                <p className="mt-2">Your payment has been processed successfully.</p>
                <p className="mt-2">
                  <strong>Order ID:</strong> {orderDetails.orderId}
                </p>
                <p className="mt-2">
                  <strong>Total Amount:</strong> ${orderDetails.amount}
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {!orderDetails && !error && <p className="text-gray-600">Loading...</p>}
    </div>
  );
};

export default PaymentSuccess;
