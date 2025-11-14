// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query";
import { getBaseUrl } from "../../../utils/baseurl";

const bannersApi = createApi({
  reducerPath: "bannersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/banner`, 
  }),
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    // Get all banners
    getAllBanners: builder.query({
      query: () => "/banner",
      providesTags: ["Banner"],
    }),

    // Get banner by route path (e.g., /category/panjabi)
    getBannerByRoute: builder.query({
      query: (routePath) => `/banner/route?path=${encodeURIComponent(routePath)}`,
      providesTags: ["Banner"],
    }),

    // Upload or update banner
    uploadBanner: builder.mutation({
      query: (formData) => ({
        url: "/banner/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useGetAllBannersQuery,
  useGetBannerByRouteQuery,
  useUploadBannerMutation,
} = bannersApi;

export default bannersApi;
