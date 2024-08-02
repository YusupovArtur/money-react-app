import { Dispatch, FC, MutableRefObject, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook';
import { uploadUserPhoto } from 'store/slices/userSlice';
// UI
import { AlertMessage, ButtonWithIcon, ButtonWithIconAndSpinner } from 'shared/ui';
import { CloudPlusSVG, CrossIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG';

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
      dispatch(uploadUserPhoto({ imageDataURL, setErrorMessage, setIsLoading, onFulfilled }));
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
          disabled={isLoading}
        >
          <CrossIconSVG iconSize="1.5rem" />
        </ButtonWithIcon>
        <AlertMessage alertMessage={errorMessage} className="alert-danger mt-2"></AlertMessage>
      </div>
    </>
  );
};
