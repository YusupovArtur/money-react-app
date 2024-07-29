import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store imports
import { serverResponseStatusHooks } from 'store/types';
// UI imports
import { AlertMessage, ButtonWithIcon, ButtonWithIconAndSpinner } from 'shared/ui';
import { CrossIconSVG, PlusIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG';

interface InputFormBarProps {
  addButtonsLabel: string;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onAdd: (statusHooks: serverResponseStatusHooks) => void;
  onClear: () => void;
}

const InputFormBar: FC<InputFormBarProps> = ({ addButtonsLabel, setIsOpened, onClear, onAdd }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFulfilled = () => {
    setIsOpened(false);
    onClear();
  };

  return (
    <div className="d-flex justify-content-start align-items-center">
      <ButtonWithIconAndSpinner
        onClick={() => onAdd({ setIsLoading, setErrorMessage, onFulfilled })}
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
