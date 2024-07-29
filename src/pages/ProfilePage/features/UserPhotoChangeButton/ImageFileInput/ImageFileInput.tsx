import { ButtonHTMLAttributes, ChangeEvent, Dispatch, FC, SetStateAction, useRef } from 'react';
import { ButtonWithIcon } from 'shared/ui';
import ImageIcon from 'pages/ProfilePage/features/UserPhotoChangeButton/ImageFileInput/icons/ImageIcon';

interface ImageInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  reader: FileReader;
  setIsOpened?: Dispatch<SetStateAction<boolean>>;
  iconSize?: string;
}

const ImageFileInput: FC<ImageInputProps> = ({ reader, setIsOpened, iconSize = '1.5rem', ...props }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      if (setIsOpened) setIsOpened(true);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*,.png,.jpg,.gif,.web,"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      ></input>
      <ButtonWithIcon caption="Выбрать фото" onClick={handleFileInputClick} {...props}>
        <ImageIcon iconSize={iconSize}></ImageIcon>
      </ButtonWithIcon>
    </>
  );
};

export default ImageFileInput;
