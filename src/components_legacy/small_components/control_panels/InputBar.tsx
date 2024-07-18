// React imports
import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store imports
import { serverResponseStatusHooks } from 'store/types';
// Ui imports
import { ButtonWithIcon } from 'shared/ui/ButtonWithIcon';
import { ErrorMessage } from 'shared/ui/ErrorMessage';
import { CrossIconSVG, PlusIconSVG } from '../icons_svg/IconsSVG.tsx';

interface InputBarProps {
  addButtonsLabel: string;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onAdd: (statusHooks: serverResponseStatusHooks) => void;
  onClear: () => void;
}

const InputBar: FC<InputBarProps> = ({ addButtonsLabel, setIsOpened, onClear, onAdd }) => {
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
        additionalClassNames="btn-primary me-2"
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
        additionalClassNames="btn-danger me-2"
      ></ButtonWithIcon>
      <ErrorMessage errorMessage={errorMessage} additionalClassNames="alert-warning"></ErrorMessage>
    </div>
  );
};

export default InputBar;
