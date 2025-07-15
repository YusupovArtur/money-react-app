// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch, useAppDispatch } from 'store/index.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { CategoryType, setCategories, setCategoriesResponseState, setCategory } from 'store/slices/categoriesSlice';
import { getValidCategoriesOrderedList } from 'store/slices/categoriesSlice/helpers/getValidCategoriesOrderedList.ts';
import { isLocalAdd } from 'store/listener/helpers/isLocalAdd.ts';
import { isLocalDelete } from 'store/listener/helpers/isLocalDelete.ts';
import { isLocalShift } from 'store/listener/helpers/isLocalShift.ts';

export class CategoriesFirestoreListener {
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
    this.dispatch(setCategoriesResponseState({ isLoading: true, errorMessage: '' }));

    if (user && !this.listener) {
      const docsRef = collection(db, 'users_data', user.uid, 'categories');

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
          if (isLocalAdd({ id: window.pending.categories.add.id, changes })) {
            window.pending.categories.add.flags -= 1;
            if (window.pending.categories.add.flags <= 0) {
              window.pending.categories.add.id = undefined;
            }
            return;
          }

          // Local delete checking
          if (isLocalDelete({ id: window.pending.categories.delete.id, changes })) {
            window.pending.categories.delete.flags -= 1;
            if (window.pending.categories.delete.flags <= 0) {
              window.pending.categories.delete.id = undefined;
            }
            return;
          }

          // Local shift checking
          if (isLocalShift({ order: window.pending.categories.shift.order, changes })) {
            window.pending.categories.shift.flags -= 1;
            if (window.pending.categories.shift.flags <= 0) {
              window.pending.categories.shift.order = undefined;
            }
            return;
          }

          // If only one category changed set only one category
          if (changes.length === 1 && changes[0].doc.id !== 'order') {
            const id = changes[0].doc.id;
            const category = changes[0].doc.data() as CategoryType;
            this.dispatch(setCategory({ action: changes[0].type, id, category }));
            this.dispatch(setCategoriesResponseState({ isLoading: false, errorMessage: '' }));
            return;
          }

          const orderedList = getValidCategoriesOrderedList(querySnapshot);
          this.dispatch(setCategories(orderedList));
        },
        (error) => {
          this.dispatch(setCategoriesResponseState({ isLoading: false, errorMessage: getErrorMessage(error.message) }));
        },
      );
    } else {
      this.dispatch(setCategoriesResponseState({ isLoading: false, errorMessage: 'Вы не авторизованы' }));
    }
  }
}
