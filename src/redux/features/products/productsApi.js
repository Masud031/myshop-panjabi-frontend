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
      query: ({ category, color, minPrice, maxPrice, page, limit, search,size } = {}) => {
        const params = new URLSearchParams();

        if (category && category !== "all") params.append("category", category);
        if (color && color !== "all") params.append("color", color);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("search", search);
            if (size) {
      if (Array.isArray(size)) {
        params.append("size",size.join(","));
      } else {
        params.append("size",size);
      }
    }

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
                url: `/update-products/${id}`,
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
        }),
         // ✅ Releated with
   getAllFilters: builder.query({
  query: (category = 'all') => `/filters/${category}`,
}),

// subcategory filters //
getAllFilterProducts: builder.query({
  query: (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.category && filters.category !== "all") {
      params.append("category", filters.category);
    }

        if (filters.size) {
      if (Array.isArray(filters.size)) {
        params.append("size", filters.size.join(","));
      } else {
        params.append("size", filters.size);
      }
    }
    if (filters.color?.length) params.append("color", filters.color.join(","));
    if (filters.style?.length) params.append("style", filters.style.join(","));

    // ✅ Match backend: priceMin & priceMax
    if (filters.price) {
      if (filters.price.min !== undefined && filters.price.min !== null)
        params.append("priceMin", filters.price.min);
      if (filters.price.max !== undefined && filters.price.max !== null)
        params.append("priceMax", filters.price.max);
    }

    if (filters.page) params.append("page", filters.page);
    if (filters.limit) params.append("limit", filters.limit);
  

    return `/filter?${params.toString()}`;
  },
  providesTags: ["Products"],
}),

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
 useSearchProductsQuery,
  useGetAllFiltersQuery,
  useGetAllFilterProductsQuery
  } = productsApi;
export default productsApi