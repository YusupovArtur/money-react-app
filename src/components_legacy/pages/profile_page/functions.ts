import { MutableRefObject } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase.ts';
import { getErrorMessage } from 'store/functions';
import { serverResponseStatusHooks } from 'store/types.ts';

export const setImage = (ev: ProgressEvent<FileReader>, image: HTMLImageElement, canvas: HTMLCanvasElement | null) => {
  if (ev.target && typeof ev.target.result === 'string') {
    image.onload = () => drawImage(image, canvas, 0, 0, 1);
    image.src = ev.target.result;
  }
};

export const drawImage = (image: HTMLImageElement, canvas: HTMLCanvasElement | null, x: number, y: number, scale: number) => {
  if (canvas) {
    const imageSize: number = Math.min(image.width, image.height) * scale;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    canvas
      .getContext('2d')
      ?.drawImage(
        image,
        image.width / 2 + x - imageSize / 2,
        image.height / 2 + y - imageSize / 2,
        imageSize,
        imageSize,
        0,
        0,
        canvas.width,
        canvas.height,
      );
  }
};

export const moveImage = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement | null,
  x: MutableRefObject<number>,
  y: MutableRefObject<number>,
  scale: MutableRefObject<number>,
  dx: number,
  dy: number,
) => {
  const imageSize: number = Math.min(image.width, image.height) * scale.current;
  const move_scale = canvas ? (Math.min(image.width, image.height) / Math.min(canvas.width, canvas.height)) * scale.current : 1;

  const dx_rescale = -dx * move_scale;
  const dy_rescale = -dy * move_scale;

  const x_max = image.width / 2 - imageSize / 2;
  const y_max = image.height / 2 - imageSize / 2;
  const x_min = imageSize / 2 - image.width / 2;
  const y_min = imageSize / 2 - image.height / 2;

  x.current = Math.min(Math.max(x.current + dx_rescale, x_min), x_max);
  y.current = Math.min(Math.max(y.current + dy_rescale, y_min), y_max);
};

export const rescaleImage = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement | null,
  x: React.MutableRefObject<number>,
  y: React.MutableRefObject<number>,
  scale: React.MutableRefObject<number>,
  dscale: -1 | 0 | 1,
) => {
  const dscale_rescale = scale.current * 0.1 * dscale;
  scale.current = Math.min(Math.max(scale.current + dscale_rescale, 0.1), 1);
  moveImage(image, canvas, x, y, scale, 0, 0);
};

export const uploadImage = (
  canvas: HTMLCanvasElement | null,
  userID: string | null,
  statusHooks: serverResponseStatusHooks,
  photoUrlUpdater: (photoURL: string, statusHooks: serverResponseStatusHooks) => void,
) => {
  const { setErrorMessage, setIsLoading } = statusHooks;
  if (setIsLoading) setIsLoading(true);
  if (setErrorMessage) setErrorMessage('');
  if (canvas) {
    const dataURL = canvas.toDataURL('image/png');
    if (userID) {
      const storageRef = ref(storage, `users_photos/${userID}/profile_photo`);
      uploadString(storageRef, dataURL, 'data_url')
        .then(() => {
          getDownloadURL(ref(storage, `users_photos/${userID}/profile_photo`))
            .then((url) => {
              photoUrlUpdater(url, statusHooks);
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
    } else {
      if (setIsLoading) setIsLoading(false);
      if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    }
  } else {
    if (setIsLoading) setIsLoading(false);
    if (setErrorMessage) setErrorMessage('Не найден canvas');
  }
};
