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
   getAllProducts: builder.query({
      query: ({ category, color, minPrice, maxPrice, page, limit, search } = {}) => {
        const params = new URLSearchParams();

        if (category && category !== "all") params.append("category", category);
        if (color && color !== "all") params.append("color", color);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("search", search);

        return {
          url: `/?${params.toString()}`, // ✅ must return object
        };
      },
      providesTags: ["Products"],
    }),

        fetchProductbyId: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type:"Products", id }]
        }),
        fetchTrendingProducts: builder.query({
        query: () => `/trending`,
         providesTags: ["Products"],
        }),

        searchProducts: builder.query({
         query: (query) => `/search?query=${query}`, 
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
useGetAllProductsQuery,
useFetchProductbyIdQuery,
useAddProductMutation,
useUpdateProductMutation,
useReduceStockMutation,
useDeleteProductMutation,
useFetchTrendingProductsQuery,
 useSearchProductsQuery
  } = productsApi;
export default productsApi