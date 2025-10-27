import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseurl';


const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/reviews`,
        credentials: 'include'
    }),
    tagTypes: ["Reviews"],
    endpoints: (builder) => ({
        postAReview: builder.mutation({
            query: (reviewData) =>({
                url: '/post-review',
                method: 'POST',
                body: reviewData
            }),
            invalidatesTags: (result, error, {postId}) => [{type: "Reviews", id:postId }]
        }),
        getReviewsCount: builder.query({
            query: () => ({
                url: "/total-reviews"
            })
        }),
        getReviewByUserId: builder.query({
            query: (id) => ({
                url: `/${id}`,
            }),
           providesTags: ["Reviews"], 
        }),
        
    })
})

export const {useGetReviewByUserIdQuery, 
    useGetReviewsCountQuery, 
    usePostAReviewMutation} = reviewsApi;

export default reviewsApi;
