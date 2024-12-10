import { configureStore } from "@reduxjs/toolkit";
import authReucer from "../redux/features/auth/authSlice";
import authApi from "./features/auth/authapi";
// import authSlice from "../redux/features/auth/authSlice";

export const store=configureStore({
    reducer: {
        // Define your reducers here
        [authApi.reducerPath]:authApi.reducer,
        auth: authReucer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
})
