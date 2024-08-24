import { ChangeEvent, Dispatch, FC, SetStateAction, useRef } from 'react';
import { ButtonWithIcon } from 'shared/ui';
import { ImageIcon } from './icons/ImageIcon.tsx';

interface ImageInputProps {
  reader: FileReader;
  disabled?: boolean;
  setIsOpened?: Dispatch<SetStateAction<boolean>>;
  iconSize?: string;
}

export const ImageFileInput: FC<ImageInputProps> = ({ reader, disabled, setIsOpened, iconSize = '1.5rem' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      <ButtonWithIcon
        caption="Выбрать фото"
        onClick={handleFileInputClick}
        disabled={disabled}
        className="btn-primary flex-grow-1"
      >
        <ImageIcon iconSize={iconSize}></ImageIcon>
      </ButtonWithIcon>
    </>
  );
};
