import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseurl';



const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include'
    }),
    tagTypes: ["Products"],
    endpoints: (builder) =>({
        fetchAllProduts:  builder.query({
            query:({category, color, minPrice, maxPrice, page=1, limit=10}) =>{
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || '',
                    page: page.toString(),
                    limit: limit.toString()
                })
               return `/?${queryParams}`
            },
            providesTags: ["Products"]
        }),
        fetchProductbyId: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type:"Products", id }]
        }),
        fetchTrendingProducts: builder.query({
        query: () => `/trending`,
         providesTags: ["Products"],
        }),
        AddProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product", 
                method: "POST",
                body: newProduct, 
                credentials: 'include'
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/update-product/${id}`,
                method: "PATCH",
                body: rest,
            }),
            invalidatesTags: ["Products"]
        }),
       reduceStock: builder.mutation({
    query: ({ id, quantityOrdered,selectedSize }) => ({
        url: `/reduce-stock/${id}`,
        method: 'PATCH',
        body: { quantityOrdered,selectedSize },
    }),
    invalidatesTags: (result, error, { id }) => [{ type: "Products", id }] // ✅ This is the key
}),


        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{type:"Products", id }]
        })
    })
})

export const { 
useFetchAllProdutsQuery, 
useFetchProductbyIdQuery,
useAddProductMutation,
useUpdateProductMutation,
useReduceStockMutation,
useDeleteProductMutation,
useFetchTrendingProductsQuery } = productsApi;
export default productsApi