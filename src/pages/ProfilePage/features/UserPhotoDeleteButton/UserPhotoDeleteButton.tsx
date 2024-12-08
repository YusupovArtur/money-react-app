import { Dispatch, FC, SetStateAction } from 'react';
import { ButtonWithIconAndSpinner } from 'shared/ui';
import { TrashFillIcon } from 'shared/icons';
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { deleteUserPhoto } from 'store/slices/userSlice/asyncThunks/deleteUserPhoto.ts';

interface UserPhotoDeleteButtonProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export const UserPhotoDeleteButton: FC<UserPhotoDeleteButtonProps> = ({ isLoading, setIsLoading, setErrorMessage }) => {
  const dispatch = useAppDispatch();
  const photoURL = useAppSelector((state) => state.user.userState.photoURL);

  const handleClick = () => {
    dispatch(deleteUserPhoto({ setIsLoading, setErrorMessage }));
  };

  return (
    <ButtonWithIconAndSpinner
      caption="Удалить"
      onClick={handleClick}
      disabled={!photoURL || isLoading}
      isLoading={isLoading}
      className="btn btn-danger"
    >
      <TrashFillIcon iconSize="1.5rem" />
    </ButtonWithIconAndSpinner>
  );
};
