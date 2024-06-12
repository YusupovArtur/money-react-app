import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import slices
import userSlice from 'store/slices/userSlice';
import operationsSlice from 'store/slices/operationsSlice';
import walletsSlice from 'store/slices/walletsSlice';
import categoriesSlice from 'store/slices/categoriesSlice';
import themeSlice from 'store/slices/themeSlice';

const rootReducer = combineReducers({
  user: userSlice,
  operations: operationsSlice,
  wallets: walletsSlice,
  categories: categoriesSlice,
  theme: themeSlice,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  //blacklist: ['user', 'operations']
  whitelist: ['theme', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
