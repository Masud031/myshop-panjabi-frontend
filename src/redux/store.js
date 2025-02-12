import { configureStore } from "@reduxjs/toolkit";
import authReucer from "../redux/features/auth/authSlice"; 
import { authApi } from "../../src/redux/features/auth/authapi";
import productsApi from '../redux/features/products/productsApi';
import cartReducer from "./features/cart/cartSlice";
import orderApi from "./features/orders/orderApi";
import statsApi from "./features/states/statesapi";
import reviewsApi from "./features/reviews/reviewsApi";
// import authSlice from "../redux/features/auth/authSlice";

export const store=configureStore({
    reducer: {
        // Define your reducers here
        [authApi.reducerPath]:authApi.reducer,
        auth: authReucer,
        [productsApi.reducerPath]:productsApi.reducer,
        [reviewsApi.reducerPath]:reviewsApi.reducer,
        cart:cartReducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [statsApi.reducerPath]:statsApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,productsApi.middleware,
            reviewsApi.middleware,orderApi.middleware,statsApi.middleware
        )
})



