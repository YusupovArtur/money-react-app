import { Dispatch, FC, MutableRefObject, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import updateUserState from 'store/slices/userSlice/asyncThunks/updateUserState.ts';
import { uploadUserPhoto } from 'pages/ProfilePage/features/UserPhotoChangeButton/helpers/uploadUserPhoto.ts';
// UI
import AlertMessage from 'shared/ui/AlertMessage';
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';
import ButtonWithIconAndSpinner from 'shared/ui/ButtonWithIconAndSpinner';
import { CloudPlusSVG, CrossIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG.tsx';

interface ImageFormControlButtonsProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

const ImageFormControlButtons: FC<ImageFormControlButtonsProps> = ({ canvasRef, setIsOpened }) => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.user.userState.id);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFulfilled = () => {
    setIsOpened(false);
  };
  const userPhotoURLUpdater = (photoURL: string) => {
    dispatch(updateUserState({ photoURL, setIsLoading, setErrorMessage, onFulfilled }));
  };

  const handleUploadPhoto = () => {
    if (canvasRef.current && userID) {
      const imageDataURL = canvasRef.current.toDataURL();
      uploadUserPhoto(imageDataURL, userID, { setIsLoading, setErrorMessage }, userPhotoURLUpdater);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <ButtonWithIconAndSpinner
          onClick={handleUploadPhoto}
          isLoading={isLoading}
          caption="Сохранить"
          className="btn btn-primary d-flex justify-content-center align-items-center me-2"
        >
          <CloudPlusSVG iconSize="1.5rem" />
        </ButtonWithIconAndSpinner>
        <ButtonWithIcon
          onClick={() => {
            setIsOpened(false);
          }}
          className="btn-danger"
        >
          <CrossIconSVG iconSize="1.5rem" />
        </ButtonWithIcon>
        <AlertMessage alertMessage={errorMessage} className="alert-danger mt-2"></AlertMessage>
      </div>
    </>
  );
};

export default ImageFormControlButtons;
