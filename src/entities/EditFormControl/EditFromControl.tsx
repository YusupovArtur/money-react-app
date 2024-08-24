import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { ResponseHooksType } from 'store';
// UI
import { AlertMessage, ButtonWithIcon, ButtonWithIconAndSpinner } from 'shared/ui';
import { CheckIcon, CrossIcon, PencilSquareIcon, TrashFillIcon } from 'shared/icons';

interface EditFormControlProps {
  disabled?: boolean;
  onClear: () => any;
  onUpdate: (statusHooks: ResponseHooksType) => any;
  onDelete: (statusHooks: ResponseHooksType) => any;
  onUpdateFulfilled: () => any;
  onDeleteFulfilled: () => any;
  setValidateFields?: () => any;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  captions: { itemType: string; itemName: string };
}

export const EditFromControl: FC<EditFormControlProps> = ({
  disabled,
  setValidateFields,
  onClear,
  onUpdate,
  onDelete,
  onUpdateFulfilled,
  onDeleteFulfilled,
  isEdit,
  setIsEdit,
  captions: { itemType, itemName },
}) => {
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [updateErrorMessage, setUpdateErrorMessage] = useState<string>('');

  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>('');

  const handleSetIsValidate = () => {
    if (setValidateFields) {
      setValidateFields();
    }
  };

  const handleDelete = () => {
    if (confirm(`Вы уверены что хотите удалить ${itemType}: ${itemName}`)) {
      onDelete({
        setIsLoading: setDeleteIsLoading,
        setErrorMessage: setDeleteErrorMessage,
        onFulfilled: onDeleteFulfilled,
      });
    }
  };

  const handleUpdate = () => {
    if (isEdit) {
      onUpdate({
        setIsLoading: setIsUpdateLoading,
        setErrorMessage: setUpdateErrorMessage,
        onFulfilled: onUpdateFulfilled,
      });
    } else {
      setIsEdit(true);
    }
  };

  return (
    <>
      <div className="d-flex">
        <div onClick={handleSetIsValidate} style={{ cursor: 'pointer' }} className="d-flex flex-grow-1">
          <ButtonWithIconAndSpinner
            caption={isEdit ? 'Сохранить' : 'Редактировать'}
            isLoading={isUpdateLoading}
            disabled={isEdit && (disabled || isUpdateLoading)}
            onClick={handleUpdate}
            className="btn-primary flex-grow-1"
          >
            {isEdit ? <CheckIcon iconSize="1.5rem" /> : <PencilSquareIcon iconSize="1.5rem" />}
          </ButtonWithIconAndSpinner>
        </div>

        {isEdit && (
          <ButtonWithIcon
            caption="Отмена"
            onClick={() => {
              setUpdateErrorMessage('');
              setIsEdit(false);
              onClear();
            }}
            className="btn-secondary ms-2"
          >
            <CrossIcon iconSize="1.3rem" />
          </ButtonWithIcon>
        )}

        {!isEdit && (
          <ButtonWithIconAndSpinner
            caption="Удалить"
            isLoading={deleteIsLoading}
            onClick={handleDelete}
            className="btn-danger ms-2"
          >
            <TrashFillIcon iconSize="1.5rem" />
          </ButtonWithIconAndSpinner>
        )}
      </div>

      <AlertMessage alertMessage={deleteErrorMessage} className="alert-danger mt-2" />
      <AlertMessage alertMessage={updateErrorMessage} className="alert-danger mt-2" />
    </>
  );
};
