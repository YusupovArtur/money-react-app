import { ButtonHTMLAttributes, FC } from 'react';
// Store
import { useAppDispatch } from 'store/hook.ts';
import { logoutUser } from 'store/slices/userSlice.ts';
// UI
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';
import BoxArrowLeftIcon from 'pages/ProfilePage/features/UserLogoutButton/ui/BoxArrowLeftIcon.tsx';

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
