import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store imports
import { ResponseHooksType } from 'store';
// UI imports
import { AlertMessage, ButtonWithIcon, ButtonWithIconAndSpinner } from 'shared/ui';
import {
  CheckIconSVG,
  CrossIconSVG,
  PencilSquareIconSVG,
  TrashFillIconSVG,
} from 'components_legacy/small_components/icons_svg/IconsSVG';

interface EditFormControlProps {
  onClear: () => void;
  onUpdate: (statusHooks: ResponseHooksType) => void;
  onDelete: (statusHooks: ResponseHooksType) => void;
  disabled?: boolean;
  setIsValidate?: () => void;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  captions: { itemType: string; itemName: string };
}

export const EditFromControl: FC<EditFormControlProps> = ({
  disabled,
  setIsValidate,
  onClear,
  onDelete,
  onUpdate,
  isEdit,
  setIsEdit,
  captions: { itemType, itemName },
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFulfilled = () => setIsEdit(false);

  const handleSetIsValidate = () => {
    if (setIsValidate) {
      setIsValidate();
    }
  };

  return (
    <>
      <div className="d-flex">
        <div onClick={handleSetIsValidate} style={{ cursor: 'pointer' }} className="d-flex flex-grow-1">
          <ButtonWithIconAndSpinner
            caption={isEdit ? 'Сохранить' : 'Редактировать'}
            isLoading={isLoading}
            disabled={isEdit && (disabled || isLoading)}
            onClick={() => {
              if (isEdit) {
                onUpdate({ setIsLoading, setErrorMessage, onFulfilled });
              } else {
                setIsEdit(true);
              }
            }}
            className="btn-primary flex-grow-1"
          >
            {isEdit ? <CheckIconSVG iconSize="1.5rem" /> : <PencilSquareIconSVG iconSize="1.5rem" />}
          </ButtonWithIconAndSpinner>
        </div>

        {isEdit && (
          <ButtonWithIcon
            caption={'Отмена'}
            onClick={() => {
              setErrorMessage('');
              setIsEdit(false);
              onClear();
            }}
            className="btn-secondary ms-2"
          >
            <CrossIconSVG iconSize="1.4rem" />
          </ButtonWithIcon>
        )}

        {!isEdit && (
          <ButtonWithIcon
            caption={'Удалить'}
            onClick={() => {
              if (confirm(`Вы уверены что хотите удалить ${itemType}: ${itemName}`)) {
                onDelete({ setIsLoading, setErrorMessage, onFulfilled });
              }
            }}
            className="btn-danger ms-2"
          >
            <TrashFillIconSVG iconSize="1.3rem" />
          </ButtonWithIcon>
        )}
      </div>

      <AlertMessage alertMessage={errorMessage} className="alert-danger mt-2" />
    </>
  );
};
