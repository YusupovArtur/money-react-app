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

export const useFirestoreListener = () => {
  const dispatch = useAppDispatch();

  const auth = getAuth();
  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);

  const TransactionsListener = new TransactionsFirestoreListener();
  const WalletsListener = new WalletsFirestoreListener();
  const CategoriesListener = new CategoriesFirestoreListener();

  useLayoutEffect(() => {
    window.pending = window.pending || {
      transactions: {
        delete: { id: undefined },
      },
      wallets: {
        add: { id: undefined },
        delete: { id: undefined },
        shift: { order: undefined },
      },
      categories: {
        add: { id: undefined },
        delete: { id: undefined },
        shift: { order: undefined },
      },
    };
  }, []);

  useEffect(() => {
    return () => {
      TransactionsListener.unsubscribe();
      WalletsListener.unsubscribe();
      CategoriesListener.unsubscribe();

      if (!isShouldRemember) {
        dispatch(logoutUser({}));
      } else {
        dispatch(clearUserState());
      }
    };
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      TransactionsListener.subscribe(user);
      WalletsListener.subscribe(user);
      CategoriesListener.subscribe(user);
      dispatch(setUserState(getUserState(user)));
      dispatch(fetchPhotoDataURL({}));
    } else {
      TransactionsListener.unsubscribe();
      WalletsListener.unsubscribe();
      CategoriesListener.unsubscribe();
      dispatch(clearUserState());
      dispatch(clearTransactions());
      dispatch(clearWallets());
      dispatch(clearCategories());
    }
  });
};
