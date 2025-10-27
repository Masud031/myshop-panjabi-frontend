import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/baseurl";


export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/categories`,
    credentials: "include",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    // ✅ Fetch all categories
    getAllCategories: builder.query({
      query: () => "/",
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
export default categoriesApi;
