import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseurl';

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/order`,
        credentials: 'include',
    }),
    tagTypes: ["Order"],

    endpoints: (builder) => ({
        // Fetch a product by ID (Ensure this is actually needed in order API)
        fetchProductbyId: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),

        // Get orders by email
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/${email}`,
                method: 'GET',
            }),
            providesTags: ["Order"],
        }),

        // Get orders by order ID
        getOrdersById: builder.query({
            query: (orderId) => `/${orderId}`, // Fixed endpoint path
            providesTags: ["Order"],
        }),

        // Get all orders (admin only)
        getAllOrders: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
            providesTags: ["Order"],
        }),

        // Get orders by transaction ID
        fetchOrderByTransactionId: builder.query({
            query: (transactionId) => ({
                url: `/transaction/${transactionId}`,
                method: 'GET',
            }),
            providesTags: ["Order"],
        }),

        // Update order status
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/update-order-status/${id}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Order"],
        }),

        // Delete order
        deleteOrderbyId: builder.mutation({
            query: (id) => ({
                url: `/delete-order/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Order"], // Removed "id" reference
        }),
    }),
});

export const {
    useGetOrdersByEmailQuery,
    useGetOrdersByIdQuery,
    useGetAllOrdersQuery,
    useFetchOrderByTransactionIdQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderbyIdMutation,
    useFetchProductbyIdQuery,
} = orderApi;

export default orderApi;
