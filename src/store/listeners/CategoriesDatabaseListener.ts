// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch } from 'store/store.ts';
import { categoriesStateType } from 'store/types.ts';
import { setCategories } from 'store/slices/categoriesSlice.ts';

export class CategoriesDatabaseListener {
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
