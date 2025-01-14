import { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentSuccess = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const valId = query.get('val_id');

    if (!valId) {
      setError('Missing val_id in the URL.');
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        // Sending the val_id to the backend for verification
        const response = await axios.post('http://localhost:5000/api/order/confirm-payment', {
          val_id: valId,
        });

        if (response.data && response.data.success) {
          setOrderDetails(response.data.data); // Assuming backend sends order details in `data`
        } else {
          setError(response.data.message || 'No order details found.');
        }
      } catch (err) {
        setError('Failed to fetch order details.');
        console.error(err);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Payment Success</h2>
      {error && <p className="text-red-500">{error}</p>}
      {orderDetails ? (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Order Details</h3>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(orderDetails, null, 2)}</pre>
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
