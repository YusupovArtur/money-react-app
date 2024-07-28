import { FC, useEffect, useRef, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook';
import { updatePhotoURL } from 'store/slices/userSlice';
import { drawImage, moveImage, rescaleImage, setImage, uploadImage } from './functions.ts';
// UI
import ProfilePhoto from 'entities/ProfilePhoto';
import ModalContainer from 'shared/containers/ModalContainer';
import { CloudPlusSVG, CrossIconSVG } from '../../small_components/icons_svg/IconsSVG';

const ProfilePhotoFeature: FC = () => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.user.userState.id);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFulfilled = () => setIsOpened(false);

  const photoURLUpdater = (photoURL: string) => {
    dispatch(updatePhotoURL({ photoURL, setIsLoading, setErrorMessage, onFulfilled }));
  };

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const image = useRef<HTMLImageElement>(new Image());
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const image_dx = useRef<number>(0);
  const image_dy = useRef<number>(0);
  const scale = useRef<number>(1);
  const isMousePressed = useRef<boolean>(false);

  const reader = new FileReader();
  reader.onload = (ev) => setImage(ev, image.current, canvasRef.current);

  useEffect(() => {
    if (!isOpened && fileInputRef.current) fileInputRef.current.value = '';
    image_dx.current = 0;
    image_dy.current = 0;
    scale.current = 1;
  }, [isOpened]);

  return (
    <>
      <div className="d-flex flex-column align-self-center">
        <ProfilePhoto iconSize="8rem" className="text-body align-self-center" />
        <input
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              setIsOpened(true);
              reader.readAsDataURL(event.target.files[0]);
            }
          }}
          type="file"
          accept="image/*,.png,.jpg,.gif,.web,"
          ref={fileInputRef}
          className="hidden"
        ></input>
        <button
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.click();
          }}
          className="btn btn-primary mt-2"
        >
          Выбрать фото
        </button>
      </div>

      <ModalContainer isOpened={isOpened} setIsOpened={setIsOpened} style={{ margin: 'auto' }}>
        <div
          style={{ maxWidth: '35rem', width: '100vw' }}
          className="d-flex flex-column bg-body-tertiary shadow-sm p-3 rounded-4"
        >
          <canvas
            onWheel={(event) => {
              const dscale = event.deltaY / Math.abs(event.deltaY) > 0 ? 1 : -1;
              rescaleImage(image.current, canvasRef.current, image_dx, image_dy, scale, dscale);
              drawImage(image.current, canvasRef.current, image_dx.current, image_dy.current, scale.current);
            }}
            onMouseDown={() => (isMousePressed.current = true)}
            onMouseUp={() => (isMousePressed.current = false)}
            onMouseLeave={() => (isMousePressed.current = false)}
            onMouseMove={(event) => {
              if (isMousePressed.current) {
                moveImage(image.current, canvasRef.current, image_dx, image_dy, scale, event.movementX, event.movementY);
                drawImage(image.current, canvasRef.current, image_dx.current, image_dy.current, scale.current);
              }
            }}
            ref={canvasRef}
            className="align-self-center rounded-circle"
            style={{ maxWidth: '33rem', width: '90vmin', maxHeight: '33rem', height: '90vmin', cursor: 'move' }}
          ></canvas>
          <div className="d-flex justify-content-center align-items-center mt-2">
            <button
              onClick={() => uploadImage(canvasRef.current, userID, { setIsLoading, setErrorMessage }, photoURLUpdater)}
              className="btn btn-primary d-flex justify-content-center align-items-center me-2"
            >
              {isLoading ? (
                <div className="spinner-border text-light" style={{ width: '1.5rem', height: '1.5rem' }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <CloudPlusSVG iconSize="1.5rem" />
              )}
              <span className="ms-1">Сохранить</span>
            </button>
            <button
              onClick={() => setIsOpened(false)}
              className="btn btn-danger d-flex justify-content-center align-items-center"
            >
              <CrossIconSVG iconSize="1.5rem" />
            </button>
          </div>
          {errorMessage && (
            <div className="alert alert-warning align-self-stretch px-2 py-1 m-0 mt-2" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
      </ModalContainer>
    </>
  );
};

export default ProfilePhotoFeature;
