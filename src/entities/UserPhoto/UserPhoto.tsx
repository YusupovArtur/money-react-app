import { FC, HTMLAttributes, useState } from 'react';
import { useAppSelector } from 'store';

interface UserPhotoProps extends HTMLAttributes<HTMLSpanElement> {
  iconSize?: string;
}

export const UserPhoto: FC<UserPhotoProps> = ({ iconSize = '1.5rem', ...props }) => {
  const photoURL = useAppSelector((state) => state.user.userState.photoURL);

  const photoDataURL = useAppSelector((state) => state.user.photoDataURL);

  const [url, setUrl] = useState(photoURL ? photoURL : '/images/person-circle.svg');

  return (
    <span {...props}>
      <img
        src={photoDataURL ? photoDataURL : undefined}
        style={{ width: iconSize, height: iconSize, objectFit: 'contain', display: 'block' }}
        className="rounded-circle"
        alt="Нет фото"
      />
      {/*{!isLoaded && <DefaultUserIcon iconSize={iconSize} />}*/}
    </span>
  );
};
