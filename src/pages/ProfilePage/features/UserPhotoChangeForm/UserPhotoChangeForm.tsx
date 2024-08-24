import { FC, useRef, useState } from 'react';
// Model
import { ImageFileInput } from './ImageFileInput/ImageFileInput.tsx';
import { ImageCanvas } from './ImageCanvas/ImageCanvas.tsx';
// Helpers
import { drawCanvasImage } from './helpers/drawCanvasImage.ts';
// UI
import { ModalWindowContainer } from 'shared/containers';
import { ImageFormControlButtons } from './ImageFormControlButtons/ImageFormControlButtons.tsx';
import { UserPhotoDeleteButton } from 'pages/ProfilePage/features/UserPhotoDeleteButton/UserPhotoDeleteButton.tsx';
import { AlertMessage } from 'shared/ui';

export const UserPhotoChangeForm: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const image = useRef<HTMLImageElement>(new Image());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reader = new FileReader();
  reader.onload = (event) => {
    if (event.target && typeof event.target.result === 'string') {
      image.current.onload = () => {
        drawCanvasImage(canvasRef.current, image.current, 0, 0, 1);
      };
      image.current.src = event.target.result;
    }
  };

  return (
    <>
      <div className="d-flex mt-2">
        <ImageFileInput reader={reader} disabled={deleteIsLoading} setIsOpened={setIsOpened} />
        <UserPhotoDeleteButton
          isLoading={deleteIsLoading}
          setIsLoading={setDeleteIsLoading}
          setErrorMessage={setDeleteErrorMessage}
        />
      </div>
      <AlertMessage alertMessage={deleteErrorMessage} className="alert-danger mt-1" />

      <ModalWindowContainer isOpened={isOpened} onClose={setIsOpened} onCollapse={setIsOpened} style={{ margin: 'auto' }}>
        <ImageCanvas canvasRef={canvasRef} image={image} />
        <ImageFormControlButtons canvasRef={canvasRef} setIsOpened={setIsOpened} />
      </ModalWindowContainer>
    </>
  );
};
