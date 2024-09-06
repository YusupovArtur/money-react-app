// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch, useAppDispatch } from 'store/index.ts';
import { getWalletsOrderedList, setWallets, setWalletsResponseState } from 'store/slices/walletsSlice';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { deepEqual } from 'shared/helpers';

export class WalletsFirestoreListener {
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
    this.dispatch(setWalletsResponseState({ isLoading: true, errorMessage: '' }));

    if (user && !this.listener) {
      const docsRef = collection(db, 'users_data', user.uid, 'wallets');

      this.listener = onSnapshot(
        docsRef,
        (querySnapshot) => {
          if (querySnapshot.metadata.hasPendingWrites || querySnapshot.metadata.fromCache) {
            return;
          }

          const changes = querySnapshot.docChanges();
          // Local add checking
          if (window.pending.wallets.add.id && changes.length === 2) {
            const addWallet = changes.find(
              (change) => change.type === 'added' && change.doc.id === window.pending.wallets.add.id,
            );
            const order = changes.find((change) => change.type === 'modified' && change.doc.id === 'order');
            if (addWallet && order) {
              window.pending.wallets.add.id = undefined;
              return;
            }
          }

          // Local delete checking
          if (window.pending.wallets.delete.id && changes.length === 1) {
            const deleteWallet = changes.find(
              (change) => change.type === 'removed' && change.doc.id === window.pending.wallets.delete.id,
            );
            // const order = changes.find((change) => change.type === 'modified' && change.doc.id === 'order');
            if (deleteWallet) {
              window.pending.wallets.delete.id = undefined;
              return;
            }
          }

          // Local shift checking
          if (window.pending.wallets.shift.order && changes.length === 1) {
            const orderChange = changes.find((change) => change.type === 'modified' && change.doc.id === 'order');
            if (orderChange) {
              const order = (orderChange.doc.data() as { order: string[] }).order;
              if (deepEqual(order, window.pending.wallets.shift.order)) {
                window.pending.wallets.shift.order = undefined;
                return;
              }
            }
          }

          const orderedList = getWalletsOrderedList(querySnapshot);
          this.dispatch(setWallets(orderedList));
        },
        (error) => {
          this.dispatch(setWalletsResponseState({ isLoading: false, errorMessage: getErrorMessage(error.message) }));
        },
      );
    } else {
      this.dispatch(setWalletsResponseState({ isLoading: false, errorMessage: 'Вы не авторизованы' }));
    }
  }
}
