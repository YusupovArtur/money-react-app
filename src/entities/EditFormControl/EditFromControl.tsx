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
  setValidate?: () => any;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  captions: { itemType: string; itemName: string };
}

export const EditFromControl: FC<EditFormControlProps> = ({
  disabled,
  setValidate,
  onClear,
  onUpdate,
  onDelete,
  onUpdateFulfilled,
  onDeleteFulfilled,
  isEdit,
  setIsEdit,
  captions: { itemType, itemName },
}) => {
  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>(false);
  const [updateErrorMessage, setUpdateErrorMessage] = useState<string>('');

  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>('');

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
      if (setValidate) {
        setValidate();
      }
      onUpdate({
        setIsLoading: setUpdateIsLoading,
        setErrorMessage: setUpdateErrorMessage,
        onFulfilled: onUpdateFulfilled,
      });
    } else {
      setIsEdit(true);
    }
  };

  // const click = useHandleDisabledClick({ disabled, callback: handleUpdate });
  const handleSetValidate = () => {
    if (setValidate && disabled && isEdit) {
      setValidate();
      // handleUpdate();
    }
  };

  return (
    <>
      <div className="d-flex">
        <div onClick={handleSetValidate} style={{ cursor: 'pointer' }} className="d-flex flex-grow-1">
          <ButtonWithIconAndSpinner
            caption={isEdit ? 'Сохранить' : 'Редактировать'}
            isLoading={updateIsLoading}
            disabled={(isEdit && disabled) || updateIsLoading || deleteIsLoading}
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
            disabled={updateIsLoading}
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
