import { ButtonHTMLAttributes, FC } from 'react';
// Store
import { useAppDispatch } from 'store/hook';
import { logoutUser } from 'store/slices/userSlice';
// UI
import { ButtonWithIcon } from 'shared/ui';
import BoxArrowLeftIcon from 'pages/ProfilePage/features/UserLogoutButton/icons/BoxArrowLeftIcon';

interface ExitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: string;
}

const UserLogoutButton: FC<ExitButtonProps> = ({ iconSize = '1.5rem', ...props }) => {
  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(logoutUser({}));
  };

  return (
    <ButtonWithIcon caption="Выйти" onClick={handleExit} {...props}>
      <BoxArrowLeftIcon iconSize={iconSize} />
    </ButtonWithIcon>
  );
};

export default UserLogoutButton;
