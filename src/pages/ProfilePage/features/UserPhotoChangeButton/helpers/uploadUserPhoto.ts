import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from 'app/firebase.ts';
import getErrorMessage from 'store/helpers/getErrorMessage.ts';
import { serverResponseStatusHooks } from 'store/types.ts';

export const uploadUserPhoto = (
  imageDataURL: string,
  userID: string,
  statusHooks: serverResponseStatusHooks,
  userPhotoURLUpdater: (photoURL: string) => void,
) => {
  const { setErrorMessage, setIsLoading } = statusHooks;
  if (setIsLoading) setIsLoading(true);
  if (setErrorMessage) setErrorMessage('');

  const storageRef = ref(storage, `users_photos/${userID}/profile_photo`);
  uploadString(storageRef, imageDataURL, 'data_url')
    .then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          userPhotoURLUpdater(url);
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
