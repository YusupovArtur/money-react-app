// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch } from 'store/store.ts';
import { setTransactions, TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';

export class TransactionsDatabaseListener {
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
    if (user && !this.listener) {
      this.listener = onSnapshot(collection(db, 'users_data', user.uid, 'transactions'), (querySnapshot) => {
        if (!querySnapshot.metadata.hasPendingWrites) {
          const transactionsList: TransactionsListType = {};
          querySnapshot.forEach((doc) => {
            transactionsList[doc.id] = doc.data() as TransactionType;
          });
          this.dispatch(setTransactions(transactionsList));
        }
      });
    }
  }
}
