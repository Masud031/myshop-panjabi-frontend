/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useUpdateOrderStatusMutation } from "../../../../../redux/features/orders/orderApi";

const UpdateOrderModal = ({ order, isOpen, onClose, isViewMode }) => {
  // ✅ All hooks at top level
  const [status, setStatus] = useState(order?.status || "");
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  // ✅ Keep local status synced
  useEffect(() => {
    if (order?.status) setStatus(order.status);
  }, [order]);

  // ✅ Return early AFTER hooks
  if (!isOpen || !order) return null;

  const handleUpdate = async () => {
    try {
      await updateOrderStatus({ id: order._id, status }).unwrap();
      alert("✅ Order status updated successfully!");
      onClose();
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">
          {isViewMode ? "Order Details" : "Update Order Status"}
        </h2>

        <div className="mb-4 text-sm space-y-1">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Customer:</strong> {order.email}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Date:</strong> {new Date(order.updatedAt).toLocaleDateString()}</p>
        </div>

        {!isViewMode && (
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 mb-2">
              Change Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Close
          </button>

          {!isViewMode && (
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
