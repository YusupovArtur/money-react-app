import { useEffect, useLayoutEffect } from 'react';
// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Store
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { clearUserState, fetchPhotoDataURL, getUserState, logoutUser, setUserState } from 'store/slices/userSlice';
import { clearTransactions } from 'store/slices/transactionsSlice';
import { clearWallets } from 'store/slices/walletsSlice';
import { clearCategories } from 'store/slices/categoriesSlice';
import { TransactionsFirestoreListener } from 'store/listener/listeners/TransactionsFirestoreListener.ts';
import { WalletsFirestoreListener } from 'store/listener/listeners/WalletsFirestoreListener.ts';
import { CategoriesFirestoreListener } from 'store/listener/listeners/CategoriesFirestoreListener.ts';
import { SettingsFirestoreListener } from 'store/listener/listeners/SettingsFirestoreListener.ts';

export const useFirestoreListener = () => {
  const dispatch = useAppDispatch();

  const auth = getAuth();
  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);

  const TransactionsListener = new TransactionsFirestoreListener();
  const WalletsListener = new WalletsFirestoreListener();
  const CategoriesListener = new CategoriesFirestoreListener();
  const SettingsListener = new SettingsFirestoreListener();

  useLayoutEffect(() => {
    window.pending = window.pending || {
      transactions: {
        delete: { id: undefined, flags: 0 },
      },
      wallets: {
        add: { id: undefined, flags: 0 },
        delete: { id: undefined, flags: 0 },
        shift: { order: undefined, flags: 0 },
      },
      categories: {
        add: { id: undefined, flags: 0 },
        delete: { id: undefined, flags: 0 },
        shift: { order: undefined, flags: 0 },
      },
      settings: {
        widgetsSettings: {
          walletsWidget: { flags: 0 },
        },
      },
    };
  }, []);

  useEffect(() => {
    return () => {
      TransactionsListener.unsubscribe();
      WalletsListener.unsubscribe();
      CategoriesListener.unsubscribe();
      SettingsListener.unsubscribe();

      if (!isShouldRemember) {
        dispatch(logoutUser({}));
      } else {
        dispatch(clearUserState());
      }
    };
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      WalletsListener.subscribe(user);
      CategoriesListener.subscribe(user);
      TransactionsListener.subscribe(user);
      SettingsListener.subscribe(user);

      dispatch(setUserState(getUserState(user)));
      dispatch(fetchPhotoDataURL({}));
    } else {
      TransactionsListener.unsubscribe();
      WalletsListener.unsubscribe();
      CategoriesListener.unsubscribe();
      SettingsListener.unsubscribe();

      dispatch(clearUserState());
      dispatch(clearTransactions());
      dispatch(clearWallets());
      dispatch(clearCategories());
    }
  });
};
