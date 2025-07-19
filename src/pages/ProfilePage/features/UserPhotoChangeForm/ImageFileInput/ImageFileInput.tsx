import { ChangeEvent, FC, useRef } from 'react';
import { ButtonWithIcon } from 'shared/ui';
import { ImageIcon } from './icons/ImageIcon.tsx';

interface ImageInputProps {
  reader: FileReader;
  disabled?: boolean;
  className?: string;
  iconSize?: string;
}

export const ImageFileInput: FC<ImageInputProps> = ({ reader, disabled, className, iconSize = '1.5rem' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
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

      <ButtonWithIcon caption="Выбрать фото" onClick={handleFileInputClick} disabled={disabled} className={className}>
        <ImageIcon iconSize={iconSize}></ImageIcon>
      </ButtonWithIcon>
    </>
  );
};
