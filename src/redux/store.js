import { configureStore } from "@reduxjs/toolkit";
import { reducerCars } from "./cars/slice.js";
import { filtersReducer } from "./filters/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "favorite",
  storage,
  whitelist: ["favorite"],
};

const carPersistor = persistReducer(persistConfig, reducerCars);

export const store = configureStore({
  reducer: {
    cars: carPersistor,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
