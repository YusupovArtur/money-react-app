import { FC, HTMLAttributes, useState } from 'react';
import { useAppSelector } from 'store';

interface UserPhotoProps extends HTMLAttributes<HTMLSpanElement> {
  iconSize?: string;
}

export const UserPhoto: FC<UserPhotoProps> = ({ iconSize = '1.5rem', ...props }) => {
  const photoURL = useAppSelector((state) => state.user.userState.photoURL);
  const [url, setUrl] = useState(photoURL ? photoURL : '/images/person-circle.svg');

  return (
    <span {...props}>
      <img
        src={url}
        style={{ width: iconSize, height: iconSize, objectFit: 'contain', display: 'block' }}
        className="rounded-circle"
        onError={() => {
          setUrl('/images/person-circle.svg');
          console.log('error');
        }}
        alt="Нет фото"
      />
      {/*{!isLoaded && <DefaultUserIcon iconSize={iconSize} />}*/}
    </span>
  );
};
