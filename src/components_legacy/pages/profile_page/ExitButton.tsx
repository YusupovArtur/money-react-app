import { FC } from 'react';
import { useAppDispatch } from 'store/hook.ts';
import { exitUser } from 'store/slices/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { BoxArrowLeftSVG } from '../../small_components/icons_svg/IconsSVG';

const ExitButton: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        dispatch(exitUser({}));
        navigate('/signin');
      }}
      className="btn btn-outline-danger align-self-start d-flex justify-content-between align-items-center"
    >
      <BoxArrowLeftSVG iconSize="1.2rem" />
      <span className="ms-1">Выйти</span>
    </button>
  );
};

export default ExitButton;
