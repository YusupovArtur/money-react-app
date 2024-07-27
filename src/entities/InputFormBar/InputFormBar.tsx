import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store imports
import { serverResponseStatusHooks } from 'store/types.ts';
// UI imports
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';
import AlertMessage from 'shared/ui/AlertMessage';
import { CrossIconSVG, PlusIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG.tsx';
import ButtonWithIconAndSpinner from 'shared/ui/ButtonWithIconAndSpinner';

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
      <ButtonWithIconAndSpinner
        onClick={() => onAdd({ setIsLoading, setErrorMessage, fulfilledFunction })}
        caption={addButtonsLabel}
        isLoading={isLoading}
        className="btn-primary me-2"
      >
        <PlusIconSVG iconSize="1.5rem" />
      </ButtonWithIconAndSpinner>

      <ButtonWithIcon
        onClick={() => {
          setIsOpened(false);
          setErrorMessage('');
          onClear();
        }}
        className="btn-danger me-2"
      >
        <CrossIconSVG iconSize="1.5rem" />
      </ButtonWithIcon>
      <AlertMessage alertMessage={errorMessage} className="alert-warning" />
    </div>
  );
};

export default InputFormBar;
