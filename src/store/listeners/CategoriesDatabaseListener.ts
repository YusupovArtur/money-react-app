// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch, getErrorMessage } from 'store';
import { setCategories, setCategoriesResponseState } from 'store/slices/categoriesSlice';
import { getCategoriesOrderedList } from 'store/slices/categoriesSlice/helpers/getCategoriesOrderedList.ts';

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
    this.dispatch(setCategoriesResponseState({ isLoading: true, errorMessage: '' }));

    if (user && !this.listener) {
      const docsRef = collection(db, 'users_data', user.uid, 'categories');

      this.listener = onSnapshot(
        docsRef,
        (querySnapshot) => {
          // TODO: Слушатель реагирует на локальные изменения произведенные через транзакцию, нужно решить проблему
          if (!querySnapshot.metadata.hasPendingWrites && !querySnapshot.metadata.fromCache) {
            const orderedList = getCategoriesOrderedList(querySnapshot);

            this.dispatch(setCategories(orderedList));
            this.dispatch(setCategoriesResponseState({ isLoading: false, errorMessage: '' }));
          }
        },
        (error) => {
          this.dispatch(setCategoriesResponseState({ isLoading: false, errorMessage: getErrorMessage(error.message) }));
        },
      );
    }
  }
}
