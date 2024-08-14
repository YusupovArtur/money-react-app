import { useEffect } from 'react';
// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Store
import { useAppDispatch, useAppSelector } from 'store';
import { CategoriesFirestoreListener, TransactionsFirestoreListener, WalletsFirestoreListener } from 'store/listeners';
import { clearUserState, getUserState, logoutUser, setUserState } from 'store/slices/userSlice';
import { clearTransactions } from 'store/slices/transactionsSlice';
import { clearWallets } from 'store/slices/walletsSlice';
import { clearCategories } from 'store/slices/categoriesSlice';

export const useFirestoreChangesListener = () => {
  const dispatch = useAppDispatch();

  const auth = getAuth();
  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);

  const TransactionsListener = new TransactionsFirestoreListener();
  const WalletsListener = new WalletsFirestoreListener();
  const CategoriesListener = new CategoriesFirestoreListener();

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
