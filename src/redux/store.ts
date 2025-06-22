import { configureStore } from '@reduxjs/toolkit';
import { carsReducer } from './cars/slice';
import { filtersReducer } from './filters/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'favorite',
  storage,
  whitelist: ['favorite'],
};

const carPersistor = persistReducer(persistConfig, carsReducer);
// const filterPersistor = persistReducer(filterConfig, filtersReducer);

export const store = configureStore({
  reducer: {
    cars: carPersistor,
    filters: filtersReducer,
    // filter: filterPersistor,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export const persistor = persistStore(store);
