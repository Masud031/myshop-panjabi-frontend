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

        // Get orders by email//for userpaymnets
      getOrdersByEmail: builder.query({
        //  query: (identifier) => `user/email/${encodeURIComponent(identifier)}`,
         query: (id) => `user/email/${encodeURIComponent(id)}`,
         providesTags: ["Order"],
        }),

        // Get orders by order ID
        getOrdersById: builder.query({
            query: (orderId) => ({
                url: `/order/${orderId}`,
                method: 'GET'
            }),
            providesTags: ["Order"]
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
        // getOrderStats: builder.query({
        //     query: () => ({
        //         url: '/admin/stats',  // Change this to the correct stats endpoint
        //         method: 'GET',
        //     }),
        //     providesTags: ["Order"],
        // }),

        // Update order status
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/update-order-status/${id}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Order"],
        }),
        // get order by userID
        getOrdersByUserId: builder.query({
         query: (userId) => `user/id/${userId}`,
        providesTags: ["Order"],
        }),


        // Delete order
        deleteOrderbyId: builder.mutation({
            query: (id) => ({
                url: `/delete-order/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{type:"Order", id }],// Removed "id" reference
        }),
    }),
});

export const {
     useGetOrdersByEmailQuery,
    useGetOrdersByIdQuery,
    useGetAllOrdersQuery,
    useFetchOrderByTransactionIdQuery,
    // useGetOrderStatsQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderbyIdMutation,
    useFetchProductbyIdQuery,
    useGetOrdersByUserIdQuery
} = orderApi;

export default orderApi;
