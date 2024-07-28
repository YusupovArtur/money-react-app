import { FC } from 'react';
import { useAppDispatch } from 'store/hook.ts';
import { exitUser } from 'store/slices/userSlice.ts';
import { BoxArrowLeftSVG } from '../../small_components/icons_svg/IconsSVG';
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';

const ExitButton: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <ButtonWithIcon
      caption="Выйти"
      onClick={() => {
        dispatch(exitUser({}));
      }}
      className="btn-outline-danger align-self-start"
    >
      <BoxArrowLeftSVG iconSize="1.5rem" />
    </ButtonWithIcon>
  );
};

export default ExitButton;
