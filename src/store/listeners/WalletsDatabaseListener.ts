// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch } from 'store/store.ts';
import { walletsStateType } from 'store/types.ts';
import { setWallets } from 'store/slices/walletsSlice.ts';

export class WalletsDatabaseListener {
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
      this.listener = onSnapshot(doc(db, 'users_data', user.uid, 'wallets', 'list'), (querySnapshot) => {
        if (!querySnapshot.metadata.hasPendingWrites && querySnapshot.exists()) {
          const walletsState = (querySnapshot.data() ? querySnapshot.data() : { list: [] }) as walletsStateType;
          if (walletsState) this.dispatch(setWallets(walletsState));
        }
      });
    }
  }
}
