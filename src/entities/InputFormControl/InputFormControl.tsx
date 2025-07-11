import { FC, useState } from 'react';
// Store imports
import { ResponseHooksType } from 'store';
// UI imports
import { AlertMessage, ButtonWithIconAndSpinner } from 'shared/ui';
import { PlusIcon } from 'shared/icons';

interface InputFormControlProps {
  caption: string;
  disabled?: boolean;
  setValidate?: () => any;

  setIsOpened: (value: boolean | ((prev: boolean) => boolean)) => any;
  onAdd: (statusHooks: ResponseHooksType) => any;
  onClear: () => any;
}

export const InputFormControl: FC<InputFormControlProps> = ({ caption, disabled, setValidate, setIsOpened, onClear, onAdd }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onFulfilled = () => {
    setIsOpened(false);
    onClear();
  };

  const handleAdd = () => {
    if (setValidate) {
      setValidate();
    }
    onAdd({ setIsLoading, setErrorMessage, onFulfilled });
  };

  // const click = useHandleDisabledClick({ disabled, callback: handleAdd });
  const handleSetValidate = () => {
    if (setValidate && disabled) {
      setValidate();
      // handleAdd();
    }
  };

  return (
    <>
      <div onClick={handleSetValidate} style={{ cursor: 'pointer' }} className="d-flex flex-column align-self-stretch">
        <ButtonWithIconAndSpinner
          onClick={handleAdd}
          caption={caption}
          isLoading={isLoading}
          disabled={disabled || isLoading}
          className="btn-primary"
        >
          <PlusIcon iconSize="1.5rem" />
        </ButtonWithIconAndSpinner>
      </div>

      <AlertMessage alertMessage={errorMessage} className="alert-danger mt-2" />
    </>
  );
};
