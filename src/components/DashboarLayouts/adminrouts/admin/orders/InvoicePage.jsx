import { QRCodeCanvas } from "qrcode.react";
import { useParams, Link } from "react-router-dom";

import Loading from "../../../../loading";
import { useGetOrdersByIdQuery } from "../../../../../redux/features/orders/orderApi";

export default function InvoicePage() {
  const { orderId } = useParams();
   console.log('Invoice for Order ID:', orderId);
  const { data, isLoading, error } = useGetOrdersByIdQuery(orderId);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center text-red-500">Failed to fetch order!</div>;

  const order = data?.data || data;
  if (!order) return <div className="p-6 text-center">Order not found!</div>;

  const {
    orderId: id,
    fullName,
    address,
    district,
    zipCode,
    phone,
    totalPrice,
    paymentMethod,
    products,
    status,
    createdAt,
  } = order;

  const orderDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg print:shadow-none print:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-gray-500 text-sm">Order ID: {id}</p>
          <p className="text-gray-500 text-sm">Date: {orderDate}</p>
        </div>

        {/* ✅ QR Code */}
        <div className="flex flex-col items-center">
          <QRCodeCanvas
            value={`https://yourdomain.com/track-order/${id}`}
            size={80}
            includeMargin={true}
          />
          <p className="text-xs text-gray-500 mt-1">Scan for details</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Bill To:</h3>
          <p className="text-gray-800 font-medium">{fullName}</p>
          <p className="text-gray-600 text-sm">{address}</p>
          <p className="text-gray-600 text-sm">
            {district}, {zipCode}
          </p>
          <p className="text-gray-600 text-sm">Phone: {phone}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Payment Info:</h3>
          <p className="text-gray-600 text-sm">Method: {paymentMethod}</p>
          <p className="text-gray-600 text-sm capitalize">
            Status:{" "}
            <span
              className={`${
                status === "pending"
                  ? "text-yellow-600"
                  : status === "shipped"
                  ? "text-green-600"
                  : "text-blue-600"
              } font-semibold`}
            >
              {status}
            </span>
          </p>
        </div>
      </div>

      {/* Products Table */}
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-3 py-2 text-left">Product</th>
            <th className="border px-3 py-2 text-center">Qty</th>
            <th className="border px-3 py-2 text-right">Price</th>
            <th className="border px-3 py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="border px-3 py-2">{item?.productName}</td>
              <td className="border px-3 py-2 text-center">{item?.quantity}</td>
              <td className="border px-3 py-2 text-right">
                ৳{item?.price?.toFixed(2)}
              </td>
              <td className="border px-3 py-2 text-right">
                ৳{(item?.price * item?.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mt-4">
        <div className="w-full sm:w-1/3">
          <div className="flex justify-between py-1">
            <span className="text-gray-700 font-medium">Subtotal:</span>
            <span>৳{totalPrice?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-700 font-medium">Delivery:</span>
            <span>৳0.00</span>
          </div>
          <div className="flex justify-between py-2 border-t mt-2 font-semibold">
            <span>Total:</span>
            <span>৳{totalPrice?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center border-t pt-4 text-gray-500 text-sm">
        <p>Thank you for shopping with us!</p>
        <p>Please contact support if you have any questions about your order.</p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between print:hidden">
        <Link
          to="/dashboard/manage-orders"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Orders
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
}
