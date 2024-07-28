import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from 'app/firebase.ts';
import { getErrorMessage } from 'store/functions.ts';
import { serverResponseStatusHooks } from 'store/types.ts';

export const uploadUserPhoto = (
  imageDataURL: string,
  userID: string,
  statusHooks: serverResponseStatusHooks,
  userPhotoURLUpdater: (photoURL: string, statusHooks: serverResponseStatusHooks) => void,
) => {
  const { setErrorMessage, setIsLoading } = statusHooks;
  if (setIsLoading) setIsLoading(true);
  if (setErrorMessage) setErrorMessage('');

  const storageRef = ref(storage, `users_photos/${userID}/profile_photo`);
  uploadString(storageRef, imageDataURL, 'data_url')
    .then(() => {
      getDownloadURL(ref(storage, `users_photos/${userID}/profile_photo`))
        .then((url) => {
          userPhotoURLUpdater(url, statusHooks);
        })
        .catch((error) => {
          console.error('Ошибка получения url фото:', error.code);
          if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
          if (setIsLoading) setIsLoading(false);
        });
    })
    .catch((error) => {
      console.error('Ошибка выгрузки фото:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
};
