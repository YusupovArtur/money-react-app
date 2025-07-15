// Firebase
import { db } from 'app/firebase.ts';
import { User } from 'firebase/auth';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
// Store
import { AppDispatch, useAppDispatch } from 'store/index.ts';
import { setWalletsResponseState } from 'store/slices/walletsSlice';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { setSettings, setSettingsResponseState } from 'store/slices/settingsSlice';
import { getValidSettings } from 'store/slices/settingsSlice/helpers/getValidSettings.ts';

export class SettingsFirestoreListener {
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
    this.dispatch(setSettingsResponseState({ isLoading: true, errorMessage: '' }));

    if (user && !this.listener) {
      const docsRef = collection(db, 'users_data', user.uid, 'settings');

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
          if (
            window.pending.settings.widgetsSettings.walletsWidget.flags > 0 &&
            changes.length === 1 &&
            changes[0].doc.id === 'widgetsSettings'
          ) {
            window.pending.settings.widgetsSettings.walletsWidget.flags -= 1;
          }

          const settings = getValidSettings(querySnapshot);
          this.dispatch(setSettings(settings));
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
