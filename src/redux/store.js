import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice"; 
import { authApi } from "../../src/redux/features/auth/authapi";
import productsApi from '../redux/features/products/productsApi';
import cartReducer from "./features/cart/cartSlice";
import orderApi from "./features/orders/orderApi";
import statsApi from "./features/states/statesapi";
import reviewsApi from "./features/reviews/reviewsApi";
import categoriesApi from "./features/categoriesApi";
import bannersApi from "./features/Banner/bannersApi";
// import authSlice from "../redux/features/auth/authSlice";

export const store=configureStore({
    reducer: {
        // Define your reducers here
        [authApi.reducerPath]:authApi.reducer,
        auth: authReducer,
        [productsApi.reducerPath]:productsApi.reducer,
        [reviewsApi.reducerPath]:reviewsApi.reducer,
        cart:cartReducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [statsApi.reducerPath]:statsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [bannersApi.reducerPath]: bannersApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,productsApi.middleware,
            reviewsApi.middleware,orderApi.middleware,statsApi.middleware,categoriesApi.middleware,
             bannersApi.middleware
        )
})



