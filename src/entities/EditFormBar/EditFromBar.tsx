import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store imports
import { serverResponseStatusHooks } from 'store/types';
// UI imports
import { AlertMessage, ButtonWithIcon, ButtonWithIconAndSpinner } from 'shared/ui';
import {
  CheckIconSVG,
  CrossIconSVG,
  PencilSquareIconSVG,
  TrashFillIconSVG,
} from 'components_legacy/small_components/icons_svg/IconsSVG';

interface EditFormBarProps {
  onClose: () => void;
  onClear: () => void;
  onUpdate: (statusHooks: serverResponseStatusHooks) => void;
  onDelete: (statusHooks: serverResponseStatusHooks) => void;
  itemType: string;
  itemName: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditFromBar: FC<EditFormBarProps> = ({ onClose, onClear, onDelete, onUpdate, itemType, itemName, isEdit, setIsEdit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFulfilled = () => setIsEdit(false);

  return (
    <div className="d-flex justify-content-start align-items-center">
      <ButtonWithIconAndSpinner
        isLoading={isLoading}
        onClick={() => {
          if (isEdit) {
            onUpdate({ setIsLoading, setErrorMessage, onFulfilled });
          } else {
            setIsEdit(true);
          }
        }}
        className="btn-primary px-3 me-2"
      >
        {isEdit ? <CheckIconSVG iconSize="1.5rem" /> : <PencilSquareIconSVG iconSize="1.5rem" />}
      </ButtonWithIconAndSpinner>

      {isEdit && (
        <>
          <ButtonWithIcon
            onClick={() => {
              setErrorMessage('');
              setIsEdit(false);
              onClear();
            }}
            className="btn-danger px-3 me-2"
          >
            <CrossIconSVG iconSize="1.5rem" />
          </ButtonWithIcon>

          <ButtonWithIcon
            onClick={() => {
              if (confirm(`Вы уверены что хотите удалить ${itemType}: ${itemName}`)) {
                onDelete({ setIsLoading, setErrorMessage, onFulfilled });
              }
            }}
            className="btn-danger px-3"
          >
            <TrashFillIconSVG iconSize={'1.5rem'} />
          </ButtonWithIcon>
        </>
      )}

      <AlertMessage alertMessage={errorMessage} className="alert-warning" />

      <ButtonWithIcon
        onClick={() => {
          onClose();
          onClear();
          setIsEdit(false);
          setErrorMessage('');
        }}
        className="btn-secondary px-3 ms-auto"
      >
        <CrossIconSVG iconSize={'1.5rem'} />
      </ButtonWithIcon>
    </div>
  );
};

export default EditFromBar;
