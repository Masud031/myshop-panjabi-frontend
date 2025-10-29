/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useMemo } from "react";
import UpdateOrderModal from "./UpdateOrderModal";
import {
  useDeleteOrderbyIdMutation,
  useGetAllOrdersQuery,
} from "../../../../../redux/features/orders/orderApi";
import Loading from "../../../../loading";
import { Link } from "react-router-dom";

const ManageOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error, refetch } = useGetAllOrdersQuery();
  const [deleteOrderbyId] = useDeleteOrderbyIdMutation();

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to fetch orders!</div>;

  const orders = data?.data || [];

  // 🔹 Client-side filtered orders
  const filteredOrders = useMemo(() => {
    if (!searchQuery) return orders;
    const lowerQuery = searchQuery.toLowerCase();
    return orders.filter(
      (order) =>
        order.orderId.toLowerCase().includes(lowerQuery) ||
        (order.fullName && order.fullName.toLowerCase().includes(lowerQuery)) ||
        (order.phone && order.phone.includes(lowerQuery))
    );
  }, [orders, searchQuery]);

  const handleDeleteClick = async (orderId) => {
    try {
      await deleteOrderbyId(orderId).unwrap();
      alert(`Deleted order ${orderId}`);
      refetch();
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setIsViewMode(false);
  };

  return (
    <section className="section__container p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Manage Orders</h2>

        {/* 🔹 Search Bar */}
        <div className="mt-2 sm:mt-0 w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by Order ID, Name, or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm uppercase">
            <tr>
              <th className="py-1 px-2 border-b whitespace-nowrap text-left font-mono">
                Order ID
              </th>
              <th className="py-1 px-2 border-b text-left text-sm sm:text-base">
                Customer
              </th>
              <th className="py-1 px-2 border-b text-left text-sm sm:text-base">
                Phone
              </th>
              <th className="py-1 px-2 border-b text-left">Status</th>
              <th className="py-1 px-2 border-b text-left text-xs sm:text-sm">
                Date
              </th>
              <th className="py-1 px-2 border-b text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors text-xs sm:text-sm"
              >
                <td className="py-1 px-2 border-b whitespace-nowrap font-mono">
                  {order.orderId}
                </td>
                <td className="py-1 px-2 border-b capitalize text-sm sm:text-base">
                  {order.fullName || "N/A"}
                </td>
                <td className="py-1 px-2 border-b text-sm sm:text-base">
                  {order.phone || "—"}
                </td>
                <td className="py-1 px-2 border-b">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs text-white rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-1 px-2 border-b text-xs sm:text-sm">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </td>
                <td className="py-1 px-2 border-b flex items-center space-x-1 sm:space-x-2">
                 <Link
                                 to={`/orders/${order._id}`}
                                 onClick={() => handleView(order)}
                                 className="text-blue-500 hover:underline"
                                                        >
                                     View
                                </Link>
                  <button
                    onClick={() => handleEdit(order)}
                    className="text-green-500 hover:underline text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(order._id)}
                    className="text-red-500 hover:underline text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isViewMode={isViewMode}
        />
      )}
    </section>
  );
};

export default ManageOrders;

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-green-500";
    case "completed":
      return "bg-gray-500";
    default:
      return "bg-gray-400";
  }
};
