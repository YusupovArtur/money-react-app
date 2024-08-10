import { FC, useState } from 'react';
// Store imports
import { ResponseHooksType } from 'store';
// UI imports
import { AlertMessage, ButtonWithIconAndSpinner } from 'shared/ui';
import { PlusIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG';

interface InputFormControlProps {
  caption: string;
  disabled?: boolean;
  setIsValidate?: () => void;

  setIsOpened: (isOpened: boolean) => void;
  onAdd: (statusHooks: ResponseHooksType) => void;
  onClear: () => void;
}

export const InputFormControl: FC<InputFormControlProps> = ({
  caption,
  disabled,
  setIsValidate,
  setIsOpened,
  onClear,
  onAdd,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onFulfilled = () => {
    setIsOpened(false);
    onClear();
  };

  const handleClick = () => {
    onAdd({ setIsLoading, setErrorMessage, onFulfilled });
  };

  const handleSetIsValidate = () => {
    if (setIsValidate) {
      setIsValidate();
    }
  };

  return (
    <>
      <div onClick={handleSetIsValidate} style={{ cursor: 'pointer' }} className="d-flex flex-column align-self-stretch">
        <ButtonWithIconAndSpinner
          onClick={handleClick}
          caption={caption}
          isLoading={isLoading}
          disabled={disabled || isLoading}
          className="btn-primary"
        >
          <PlusIconSVG iconSize="1.5rem" />
        </ButtonWithIconAndSpinner>
      </div>

      <AlertMessage alertMessage={errorMessage} className="alert-danger mt-2" />
    </>
  );
};
