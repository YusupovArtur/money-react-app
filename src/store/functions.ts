// Firebase imports
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from 'app/firebase';
// Hooks imports
import { setOperations } from 'store/slices/operationsSlice';
import { setCategories } from 'store/slices/categoriesSlice';
import { setWallets } from 'store/slices/walletsSlice';
// Types imports
import { categoriesStateType, operationsStateType, walletsStateType } from 'store/types';
import { AppDispatch } from 'store/store';
import { User } from 'firebase/auth';

export const generateID = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
};

export class operationsOnSnapshot {
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
      this.listener = onSnapshot(doc(db, 'users_data', user.uid, 'transactions', 'list'), (querySnapshot) => {
        if (!querySnapshot.metadata.hasPendingWrites && querySnapshot.exists()) {
          const operationsState = (querySnapshot.data() ? querySnapshot.data() : {}) as operationsStateType;
          if (operationsState) this.dispatch(setOperations(operationsState));
          // const operations: operationsStateType = {};
          // querySnapshot.forEach((doc) => (operations[doc.id] = doc.data() as operationType));
          // this.dispatch(setOperations(operations));
        }
      });
    }
  }
}

export class walletsOnSnapshot {
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

export class categoriesOnSnapshot {
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
      this.listener = onSnapshot(doc(db, 'users_data', user.uid, 'categories', 'list'), (querySnapshot) => {
        if (!querySnapshot.metadata.hasPendingWrites && querySnapshot.exists()) {
          const categoriesState: categoriesStateType = (
            querySnapshot.data() ? querySnapshot.data() : { list: [] }
          ) as categoriesStateType;
          this.dispatch(setCategories(categoriesState));
        }
      });
    }
  }
}
