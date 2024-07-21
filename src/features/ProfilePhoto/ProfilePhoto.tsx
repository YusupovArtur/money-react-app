import { FC, HTMLProps, useState } from 'react';
import { useAppSelector } from 'store/hook.ts';
import DefaultUserIcon from 'features/ProfilePhoto/ui/DefaultUserIcon.tsx';

interface ProfilePhotoProps extends HTMLProps<HTMLSpanElement> {
  iconSize?: string;
}

const ProfilePhoto: FC<ProfilePhotoProps> = ({ iconSize = '1.5rem', ...props }) => {
  const photoURL = useAppSelector((state) => state.user.userState.photoURL);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <span {...props}>
      <img
        src={photoURL ? photoURL : undefined}
        style={{ width: iconSize, height: iconSize, objectFit: 'contain', display: isLoaded ? 'block' : 'none' }}
        className="rounded-circle"
        onLoad={() => {
          setIsLoaded(true);
        }}
        onError={() => {
          setIsLoaded(false);
        }}
        alt="Нет фото"
      />
      {!isLoaded && <DefaultUserIcon iconSize={iconSize}></DefaultUserIcon>}
    </span>
  );
};

export default ProfilePhoto;
