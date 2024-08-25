import { Dispatch, FC, MutableRefObject, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch } from 'store/index.ts';
import { uploadUserPhoto } from 'store/slices/userSlice';
// UI
import { AlertMessage, ButtonWithIconAndSpinner } from 'shared/ui';
import { CloudPlusIcon } from './ui/CloudPlusIcon.tsx';
import { ImageFileInput } from '../ImageFileInput/ImageFileInput.tsx';

interface ImageFormControlButtonsProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  reader: FileReader;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const ImageFormControlButtons: FC<ImageFormControlButtonsProps> = ({ canvasRef, setIsOpened, reader }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFulfilled = () => {
    setIsOpened(false);
  };

  const handleUploadPhoto = () => {
    if (canvasRef.current) {
      const imageDataURL = canvasRef.current.toDataURL();
      dispatch(uploadUserPhoto({ photoDataURL: imageDataURL, setErrorMessage, setIsLoading, onFulfilled }));
    }
  };

  return (
    <>
      <div className="d-flex mt-3">
        <ButtonWithIconAndSpinner
          onClick={handleUploadPhoto}
          isLoading={isLoading}
          caption="Сохранить"
          className="btn btn-primary flex-grow-1 me-2"
        >
          <CloudPlusIcon iconSize="1.5rem" />
        </ButtonWithIconAndSpinner>

        <ImageFileInput reader={reader} disabled={isLoading} className="btn-secondary" />
      </div>

      <AlertMessage alertMessage={errorMessage} className="alert-danger mt-2"></AlertMessage>
    </>
  );
};
