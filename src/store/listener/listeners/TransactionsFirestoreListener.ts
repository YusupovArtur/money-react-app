// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch, useAppDispatch } from 'store/index.ts';
import { setTransactions, setTransactionsResponseState } from 'store/slices/transactionsSlice';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { getValidTransactionsList } from 'store/slices/transactionsSlice/helpers/getValidTransactionsList.ts';

export class TransactionsFirestoreListener {
  listener: Unsubscribe | null = null;
  dispatch: AppDispatch;

  constructor() {
    this.dispatch = useAppDispatch();
    this.listener = null;
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
        {
          includeMetadataChanges: false,
        },
        (querySnapshot) => {
          if (querySnapshot.metadata.hasPendingWrites || querySnapshot.metadata.fromCache) {
            return;
          }

          // Local delete checking
          const changes = querySnapshot.docChanges();
          if (window.pending.transactions.delete.id && window.pending.transactions.delete.flags && changes.length === 1) {
            const change = changes[0];
            if (change.type === 'removed' && window.pending.transactions.delete.id === change.doc.id) {
              window.pending.transactions.delete.flags -= 1;
              if (window.pending.transactions.delete.flags <= 0) {
                window.pending.transactions.delete.id = undefined;
              }
              return;
            }
          }

          const list = getValidTransactionsList(querySnapshot);
          this.dispatch(setTransactions(list));
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
