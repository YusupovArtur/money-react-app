import { FC, useRef, useState } from 'react';
// Model
import ImageFileInput from 'pages/ProfilePage/features/UserPhotoChangeButton/ImageFileInput/ImageFileInput';
import ImageCanvas from 'pages/ProfilePage/features/UserPhotoChangeButton/ImageCanvas/ImageCanvas';
// Helpers
import drawCanvasImage from 'pages/ProfilePage/features/UserPhotoChangeButton/helpers/drawCanvasImage';
// UI
import { ModalContainer } from 'shared/containers';
import { ModalContainerWrapper } from 'shared/wrappers';
import ImageFormControlButtons from 'pages/ProfilePage/features/UserPhotoChangeButton/ImageFormControlButtons/ImageFormControlButtons';

const UserPhotoChangeButton: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const image = useRef<HTMLImageElement>(new Image());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      <ImageFileInput reader={reader} setIsOpened={setIsOpened} className="btn-primary align-self-center mt-3" />

      <ModalContainer isOpened={isOpened} setIsOpened={setIsOpened} style={{ margin: 'auto' }}>
        <ModalContainerWrapper>
          <ImageCanvas canvasRef={canvasRef} image={image} />
          <ImageFormControlButtons canvasRef={canvasRef} setIsOpened={setIsOpened} />
        </ModalContainerWrapper>
      </ModalContainer>
    </>
  );
};

export default UserPhotoChangeButton;
