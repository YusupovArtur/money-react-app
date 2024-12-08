// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch, useAppDispatch } from 'store/index.ts';
import { getWalletsOrderedList, setWallets, setWalletsResponseState } from 'store/slices/walletsSlice';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { isLocalAdd } from 'store/listener/helpers/isLocalAdd.ts';
import { isLocalDelete } from 'store/listener/helpers/isLocalDelete.ts';
import { isLocalShift } from 'store/listener/helpers/isLocalShift.ts';

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
        {
          includeMetadataChanges: false,
        },
        (querySnapshot) => {
          if (querySnapshot.metadata.hasPendingWrites || querySnapshot.metadata.fromCache) {
            return;
          }

          const changes = querySnapshot.docChanges();
          // Local add checking
          if (isLocalAdd({ id: window.pending.wallets.add.id, changes })) {
            window.pending.wallets.add.flags -= 1;
            if (window.pending.wallets.add.flags <= 0) {
              window.pending.wallets.add.id = undefined;
            }
            return;
          }

          // Local delete checking
          if (isLocalDelete({ id: window.pending.wallets.delete.id, changes })) {
            window.pending.wallets.delete.flags -= 1;
            if (window.pending.wallets.delete.flags <= 0) {
              window.pending.wallets.delete.id = undefined;
            }
            return;
          }

          // Local shift checking
          if (isLocalShift({ order: window.pending.wallets.shift.order, changes })) {
            window.pending.wallets.shift.flags -= 1;
            if (window.pending.wallets.shift.flags <= 0) {
              window.pending.wallets.shift.order = undefined;
            }
            return;
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
