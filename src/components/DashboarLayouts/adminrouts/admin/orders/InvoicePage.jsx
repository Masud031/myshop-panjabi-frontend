/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useParams, Link } from "react-router-dom";
import Loading from "../../../../loading";
import { useGetOrdersByIdQuery } from "../../../../../redux/features/orders/orderApi";

export default function InvoicePage() {
  const { orderId } = useParams();
  const { data, isLoading, error } = useGetOrdersByIdQuery(orderId);
  const qrRef = useRef(null);

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

  const handlePrint = () => {
    const qrCanvas = qrRef.current?.querySelector("canvas");
    const qrImg = qrCanvas?.toDataURL("image/png");

    const printContent = document.getElementById("invoice-print");
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${id}</title>
          <style>
            body { font-family: sans-serif; margin: 20px; }
            h1,h3,p { margin: 0 0 8px 0; }
            .header { display:flex; justify-content:space-between; border-bottom:1px solid #ccc; padding-bottom:10px; margin-bottom:20px; }
            .qr img { display:block; margin-top:10px; }
            table { width:100%; border-collapse: collapse; margin-top:20px; }
            th, td { border:1px solid #ccc; padding:8px; text-align:left; }
            th { background-color:#f5f5f5; }
            .totals { margin-top:20px; width:300px; float:right; border:1px solid #ccc; padding:10px; }
            .totals div { display:flex; justify-content:space-between; margin-bottom:4px; }
            .totals div.total { font-weight:bold; border-top:1px solid #ccc; padding-top:4px; }
            .footer { margin-top:200px; text-align:center; color:#555; font-size:12px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML.replace('<canvas', `<img src="${qrImg}"`).replace('</canvas>', '')}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div id="invoice-print">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-500 text-sm mt-2">Order ID: {id}</p>
            <p className="text-gray-500 text-sm mt-1">Date: {orderDate}</p>
          </div>

          {/* QR Code */}
          <div ref={qrRef} className="qr">
            <QRCodeCanvas
              value={`https://yourdomain.com/track-order/${id}`}
              size={80}
              includeMargin={true}
            />
            <p style={{ fontSize: "10px", marginTop: "4px" }}>Scan for details</p>
          </div>
        </div>

        {/* Customer & Payment Info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Bill To:</h3>
            <p className="text-gray-800 font-medium">{fullName}</p>
            <p className="text-gray-600 text-sm">{address}</p>
            <p className="text-gray-600 text-sm">{district}, {zipCode}</p>
            <p className="text-gray-600 text-sm">Phone: {phone}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Payment Info:</h3>
            <p className="text-gray-600 text-sm">Method: {paymentMethod}</p>
            <p className="text-gray-600 text-sm capitalize">Status: {status}</p>
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
            {products.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="border px-3 py-2">{item.productName}</td>
                <td className="border px-3 py-2 text-center">{item.quantity}</td>
                <td className="border px-3 py-2 text-right">৳{item.price.toFixed(2)}</td>
                <td className="border px-3 py-2 text-right">৳{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mt-4">
          <div className="w-full sm:w-1/3">
            <div className="flex justify-between py-1">
              <span className="text-gray-700 font-medium">Subtotal:</span>
              <span>৳{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-700 font-medium">Delivery:</span>
              <span>৳0.00</span>
            </div>
            <div className="flex justify-between py-2 border-t mt-2 font-semibold">
              <span>Total:</span>
              <span>৳{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div style={{ clear: 'both', marginTop: '120px', textAlign: 'center', color: '#555', fontSize: '12px' }}>
          Thank you for shopping with us!
        </div>
      </div>

      {/* Screen-only buttons */}
      <div className="mt-6 flex justify-between print:hidden">
        <Link to="/dashboard/manage-orders" className="text-blue-600 hover:underline text-sm">
          ← Back to Orders
        </Link>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
}
