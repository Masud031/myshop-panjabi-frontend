
import { useParams } from 'react-router-dom';
import { useFetchOrderByTransactionIdQuery } from '../../src/redux/features/orders/orderApi';

const PaymentSuccess = () => {
  const { tran_id } = useParams();
  const { data: paymentData, error, isLoading } = useFetchOrderByTransactionIdQuery(tran_id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching payment details: {error.message}</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold text-green-600 mb-4">Payment Success</h2>
      {paymentData ? (
        <div>
          <p className="text-gray-800">
            <strong>Transaction ID:</strong> {tran_id}
          </p>
          <p className="text-gray-800">
            <strong>Validation ID:</strong> {paymentData.val_id}
          </p>
          <p className="text-gray-800">
            <strong>Message:</strong> {paymentData.message}
          </p>
        </div>
      ) : (
        <p>No payment data found.</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
