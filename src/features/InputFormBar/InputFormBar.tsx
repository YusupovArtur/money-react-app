import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store imports
import { serverResponseStatusHooks } from 'store/types.ts';
// UI imports
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';
import AlertMessage from 'shared/ui/AlertMessage';
import { CrossIconSVG, PlusIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG.tsx';

interface InputFormBarProps {
  addButtonsLabel: string;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onAdd: (statusHooks: serverResponseStatusHooks) => void;
  onClear: () => void;
}

const InputFormBar: FC<InputFormBarProps> = ({ addButtonsLabel, setIsOpened, onClear, onAdd }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fulfilledFunction = () => {
    setIsOpened(false);
    onClear();
  };

  return (
    <div className="d-flex justify-content-start align-items-center">
      <ButtonWithIcon
        onClick={() => onAdd({ setIsLoading, setErrorMessage, fulfilledFunction })}
        className="btn-primary me-2"
        Icon={
          isLoading ? (
            <div className="spinner-border text-light" style={{ width: '1.5rem', height: '1.5rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <PlusIconSVG iconSize="1.5rem"></PlusIconSVG>
          )
        }
        buttonsCaption={addButtonsLabel}
      ></ButtonWithIcon>

      <ButtonWithIcon
        onClick={() => {
          setIsOpened(false);
          setErrorMessage('');
          onClear();
        }}
        Icon={<CrossIconSVG iconSize="1.5rem"></CrossIconSVG>}
        className="btn-danger me-2"
      ></ButtonWithIcon>
      <AlertMessage alertMessage={errorMessage} className="alert-warning"></AlertMessage>
    </div>
  );
};

export default InputFormBar;
