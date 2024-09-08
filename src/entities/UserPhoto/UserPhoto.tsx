import { FC, HTMLAttributes } from 'react';
import { useAppSelector } from 'store';
import { DefaultUserPhotoIcon } from 'entities/UserPhoto/ui/DefaultUserPhotoIcon.tsx';

interface UserPhotoProps extends HTMLAttributes<HTMLSpanElement> {
  iconSize?: string;
}

export const UserPhoto: FC<UserPhotoProps> = ({ iconSize = '1.5rem', ...props }) => {
  const photoDataURL = useAppSelector((state) => state.user.photoDataURL);

  return (
    <span {...props}>
      {photoDataURL ? (
        <img
          src={photoDataURL || undefined}
          style={{ width: iconSize, height: iconSize, objectFit: 'contain', display: 'block' }}
          className="rounded-circle"
          alt="Нет фото"
        />
      ) : (
        <DefaultUserPhotoIcon iconSize={iconSize}></DefaultUserPhotoIcon>
      )}
    </span>
  );
};
