import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import slices
import userSlice from 'store/slices/userSlice/userSlice';
import transactionsSlice from 'store/slices/transactionsSlice/transactionsSlice.ts';
import walletsSlice from 'store/slices/walletsSlice';
import categoriesSlice from 'store/slices/categoriesSlice.ts';
import themeSlice from 'store/slices/themeSlice/themeSlice.ts';

const rootReducer = combineReducers({
  user: userSlice,
  transactions: transactionsSlice,
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
