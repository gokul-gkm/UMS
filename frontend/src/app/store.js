import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import adminAuthReducer from '../features/adminAuthSlice';
import { apiSlice } from '../features/apiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;