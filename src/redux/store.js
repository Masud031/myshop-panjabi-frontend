import { configureStore } from "@reduxjs/toolkit";
import authReucer from "../redux/features/auth/authSlice";
import authApi from "./features/auth/authapi";
import productsApi from '../redux/features/products/productsApi';
import reviewsApi from "./features/reviews/reviewsApi";
import cartReducer from "./features/cart/cartSlice";
// import authSlice from "../redux/features/auth/authSlice";

export const store=configureStore({
    reducer: {
        // Define your reducers here
        [authApi.reducerPath]:authApi.reducer,
        auth: authReucer,
        [productsApi.reducerPath]:productsApi.reducer,
        [reviewsApi.reducerPath]:reviewsApi.reducer,
        cart:cartReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,productsApi.middleware,
            reviewsApi.middleware
        )
})


