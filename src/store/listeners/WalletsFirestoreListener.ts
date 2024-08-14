// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch, useAppDispatch } from 'store';
import { getWalletsOrderedList, setWallets, setWalletsResponseState } from 'store/slices/walletsSlice';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

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
          // TODO: Слушатель реагирует на локальные изменения произведенные через транзакцию, нужно решить проблему
          if (!querySnapshot.metadata.hasPendingWrites && !querySnapshot.metadata.fromCache) {
            const orderedList = getWalletsOrderedList(querySnapshot);

            this.dispatch(setWallets(orderedList));
          }
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
