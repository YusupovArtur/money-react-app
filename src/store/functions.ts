// Firebase imports
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
// Hooks imports
import { setOperations } from 'store/slices/operationsSlice.ts';
import { setCategories } from 'store/slices/categoriesSlice.ts';
import { setWallets } from 'store/slices/walletsSlice.ts';
// Types imports
import { categoriesStateType, operationsStateType, userStateType, walletsStateType } from 'store/types';
import { AppDispatch } from 'store/store.ts';
import { User } from 'firebase/auth';

export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Электронная почта уже используется';
    case 'auth/invalid-email':
      return 'Неверный формат электронной почты';
    case 'auth/weak-password':
      return 'Слабый пароль или неверный формат пароля';
    case 'auth/network-request-failed':
      return 'Отсутствует подключение к интернету';
    case 'auth/internal-error':
      return 'Сервер недоступен, проблема с интернет соединением';
    case 'auth/invalid-login-credentials':
      return 'Неверные электронная почта и пароль';
    case 'auth/popup-blocked':
      return 'Всплывающее окно заблокировано';
    case 'auth/popup-closed-by-user':
      return 'Всплывающее окно закрыто';
    default:
      return errorCode;
  }
};

export const generateID = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
};

export const getUserState = (user: User | null): userStateType => {
  if (user) {
    return {
      isUserAuthorised: true,
      email: user.email,
      userName: user.displayName,
      id: user.uid,
      isEmailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };
  } else {
    return {
      isUserAuthorised: false,
      email: null,
      userName: null,
      id: null,
      isEmailVerified: false,
      photoURL: null,
    };
  }
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
