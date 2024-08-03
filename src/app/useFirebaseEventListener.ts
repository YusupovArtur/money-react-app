import { useEffect } from 'react';
// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { CategoriesDatabaseListener, TransactionsDatabaseListener, WalletsDatabaseListener } from 'store/listeners';
import { clearUserState, getUserState, logoutUser, setUserState } from 'store/slices/userSlice';
import { clearTransactions, downloadTransactions } from 'store/slices/transactionsSlice';
import { clearWallets, downloadWallets } from 'store/slices/walletsSlice.ts';
import { clearCategories, downloadCategories } from 'store/slices/categoriesSlice.ts';

export const useFirebaseEventListener = () => {
  const dispatch = useAppDispatch();

  const auth = getAuth();
  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);

  const operationListener = new TransactionsDatabaseListener(dispatch);
  const walletsListener = new WalletsDatabaseListener(dispatch);
  const categoriesListener = new CategoriesDatabaseListener(dispatch);

  useEffect(() => {
    dispatch(downloadTransactions({}));
    dispatch(downloadWallets({}));
    dispatch(downloadCategories({}));
    return () => {
      operationListener.unsubscribe();
      walletsListener.unsubscribe();
      categoriesListener.unsubscribe();
      if (!isShouldRemember) dispatch(logoutUser({}));
      else dispatch(clearUserState());
    };
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      operationListener.subscribe(user);
      walletsListener.subscribe(user);
      categoriesListener.subscribe(user);
      dispatch(setUserState(getUserState(user)));
    } else {
      operationListener.unsubscribe();
      walletsListener.unsubscribe();
      categoriesListener.unsubscribe();
      dispatch(clearUserState());
      dispatch(clearTransactions());
      dispatch(clearWallets());
      dispatch(clearCategories());
    }
  });
};
