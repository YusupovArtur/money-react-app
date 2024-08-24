import { Dispatch, FC, MutableRefObject, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { uploadUserPhoto } from 'store/slices/userSlice';
// UI
import { AlertMessage, ButtonWithIconAndSpinner } from 'shared/ui';
import { CloudPlusIcon } from './ui/CloudPlusIcon.tsx';

interface ImageFormControlButtonsProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const ImageFormControlButtons: FC<ImageFormControlButtonsProps> = ({ canvasRef, setIsOpened }) => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.user.userState.id);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFulfilled = () => {
    setIsOpened(false);
  };

  const handleUploadPhoto = () => {
    if (canvasRef.current && userID) {
      const imageDataURL = canvasRef.current.toDataURL();
      dispatch(uploadUserPhoto({ photoDataURL: imageDataURL, setErrorMessage, setIsLoading, onFulfilled }));
    }
  };

  return (
    <>
      <ButtonWithIconAndSpinner
        onClick={handleUploadPhoto}
        isLoading={isLoading}
        caption="Сохранить"
        className="btn btn-primary mt-3"
      >
        <CloudPlusIcon iconSize="1.5rem" />
      </ButtonWithIconAndSpinner>

      <AlertMessage alertMessage={errorMessage} className="alert-danger mt-2"></AlertMessage>
    </>
  );
};