import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./Api/baseApi"; // Import your RTK Query API slice
import authSlice from "../Redux/features/Auth/auth.slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "auth",
  storage,
};

const authReducer = persistReducer(persistConfig, authSlice);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Register the API reducer under its designated path
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register"], // Ignore non-serializable values
      },
    }).concat(baseApi.middleware),
});

// Enable automatic refetching on focus/reconnect
setupListeners(store.dispatch);
export const persistor = persistStore(store);
