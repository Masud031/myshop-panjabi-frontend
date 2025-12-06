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
    productCode,
    status,
    createdAt,
  } = order;

  console.log("product code have",order);

  const orderDate = new Date(createdAt).toLocaleDateString();

  const handlePrint = () => {
 // 1. Get the canvas element from the ref
 const qrCanvas = qrRef.current?.querySelector("canvas");
let qrImg = "";

 // 2. Check if the canvas exists and get its image data URL
 if (qrCanvas) {
 qrImg = qrCanvas.toDataURL("image/png");
 }

 const printContent = document.getElementById("invoice-print");

 // Ensure printContent exists and has content before proceeding
 if (!printContent) return;

// Get the *current* HTML content of the invoice section
 let contentHTML = printContent.innerHTML;

// A simple placeholder div is safer than relying on the specific structure
 // of the <QRCodeCanvas> component's output for replacement.
 // You can put this placeholder inside the ref={qrRef} div in the render.

 // 3. The key: Replace the entire QR code container with the <img> tag
 // This targets the 'qr' class div, assuming the entire QR component is inside it.
 const qrRegex = /<div\s+ref="[^"]+"\s+class="qr">([\s\S]*?)<\/div>/i;

    // A simpler replacement strategy is to target the entire content of the ref div:
    const qrPrintHtml = `
      <img src="${qrImg}" style="width: 80px; height: 80px; display: block;" alt="QR Code" />
      <p style="font-size: 10px; margin-top: 4px;">Scan for details</p>
    `;

    // A safer way is to ensure you target the element inside the existing HTML that corresponds to the QR code.
    // In your case, the entire content of the element with ref={qrRef} needs replacement.
    // Since you can't easily target a React ref's content in the raw innerHTML string,
    // the most reliable fix is to modify the *original* element's content before taking innerHTML,
    // or use a unique ID on the QR code container for better targeting.

    // Let's use your current method but make the replacement logic more targeted if possible:
    // It seems you're trying to replace the *canvas* tag with an *img* tag inside the raw HTML string.

    setTimeout(() => {
        const printContent = document.getElementById("invoice-print");
        const newWindow = window.open("", "_blank");

                let printHTML = `
            <html>
            <head>
            <title>Invoice - ${id}</title>
            <style>
            body { font-family: sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .footer { margin-top: 150px; text-align:center; color:#555; font-size:12px; }
            </style>
            </head>
            <body>
            ${printContent.innerHTML
            .replace(/<canvas[^>]*>([\s\S]*?)<\/canvas>/i, `<img src="${qrImg}" style="width: 80px; height: 80px; display: block;" alt="QR Code" />`)
            }
            
                      ${/* Optionally add the footer here if it was a problem */ ''}

            </body>
            </html>
            `;
          

 

 newWindow.document.write(printHTML);

newWindow.document.close();
        newWindow.focus();
        newWindow.print();
        newWindow.close();
    }, 50)
  }

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

        {/* Products Table with Product Code Added */}
        <table className="w-full border border-gray-200 text-sm">
  <thead className="bg-gray-100 text-gray-700">
    <tr>
      <th className="border px-3 py-2">Product</th>
      <th className="border px-3 py-2">Product Code</th>
      <th className="border px-3 py-2 text-center">Qty</th>
      <th className="border px-3 py-2 text-right">Price</th>
      <th className="border px-3 py-2 text-right">Total</th>
    </tr>
  </thead>
  <tbody>
    {products.map((item, i) => (
      <tr key={i}>
        <td className="border px-3 py-2">{item.name || "N/A"}</td>
        <td className="border px-3 py-2">
          {item.productCode || item.productId?.productCode || "N/A"}
        </td>
        <td className="border px-3 py-2 text-center">{item.quantity}</td>
        <td className="border px-3 py-2 text-right">৳{item.price.toFixed(2)}</td>
        <td className="border px-3 py-2 text-right">৳{(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>
      

        
    <p className="mt-4 mb-4">+ Standard delivery charge applied.</p>

        <div className="footer">
          Thank you for shopping with us!
        </div>

      </div>

      {/* Buttons */}
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
