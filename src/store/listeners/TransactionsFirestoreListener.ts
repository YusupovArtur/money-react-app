// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch } from 'store';
import {
  setTransactions,
  setTransactionsResponseState,
  TransactionsListType,
  TransactionType,
} from 'store/slices/transactionsSlice';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export class TransactionsFirestoreListener {
  listener: Unsubscribe | null = null;
  dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.listener = null;
    this.dispatch = dispatch;
  }

  unsubscribe() {
    if (this.listener) {
      this.listener();
      this.listener = null;
    }
  }

  subscribe(user: User | null) {
    this.dispatch(setTransactionsResponseState({ isLoading: true, errorMessage: '' }));

    if (user && !this.listener) {
      const docsRef = collection(db, 'users_data', user.uid, 'transactions');

      this.listener = onSnapshot(
        docsRef,
        (querySnapshot) => {
          if (!querySnapshot.metadata.hasPendingWrites) {
            const list: TransactionsListType = {};
            querySnapshot.forEach((doc) => {
              list[doc.id] = doc.data() as TransactionType;
            });

            this.dispatch(setTransactions(list));
            this.dispatch(setTransactionsResponseState({ isLoading: false, errorMessage: '' }));
          }
        },
        (error) => {
          this.dispatch(
            setTransactionsResponseState({
              isLoading: false,
              errorMessage: getErrorMessage(error.message),
            }),
          );
        },
      );
    } else {
      this.dispatch(setTransactionsResponseState({ isLoading: false, errorMessage: 'Вы не авторизованы' }));
    }
  }
}
