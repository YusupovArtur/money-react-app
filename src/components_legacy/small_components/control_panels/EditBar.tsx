// React
import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { serverResponseStatusHooks } from 'store/types';
// UI
import { ButtonWithIcon } from 'shared/ui/ButtonWithIcon';
import { AlertMessage } from 'shared/ui/AlertMessage';
// Icons
import { CheckIconSVG, CrossIconSVG, PencilSquareIconSVG, TrashFillIconSVG } from '../icons_svg/IconsSVG.tsx';
import { ButtonWithIconAndSpinner } from 'shared/ui/ButtonWithIconAndSpinner';

interface EditBarProps {
  onClose: () => void;
  onClear: () => void;
  onUpdate: (statusHooks: serverResponseStatusHooks) => void;
  onDelete: (statusHooks: serverResponseStatusHooks) => void;
  itemType: string;
  itemName: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditBar: FC<EditBarProps> = ({ onClose, onClear, onDelete, onUpdate, itemType, itemName, isEdit, setIsEdit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fulfilledFunction = () => setIsEdit(false);

  return (
    <div className="d-flex justify-content-start align-items-center">
      <ButtonWithIconAndSpinner
        isLoading={isLoading}
        onClick={() => {
          if (isEdit) {
            onUpdate({ setIsLoading, setErrorMessage, fulfilledFunction });
          } else {
            setIsEdit(true);
          }
        }}
        Icon={
          isEdit ? <CheckIconSVG iconSize="1.5rem"></CheckIconSVG> : <PencilSquareIconSVG iconSize="1.5rem"></PencilSquareIconSVG>
        }
        className="btn-primary px-3 me-2"
      ></ButtonWithIconAndSpinner>

      {isEdit && (
        <>
          <ButtonWithIcon
            onClick={() => {
              setErrorMessage('');
              setIsEdit(false);
              onClear();
            }}
            Icon={<CrossIconSVG iconSize="1.5rem"></CrossIconSVG>}
            className="btn-danger px-3 me-2"
          ></ButtonWithIcon>

          <ButtonWithIcon
            onClick={() => {
              if (confirm(`Вы уверены что хотите удалить ${itemType}: ${itemName}`)) {
                onDelete({ setIsLoading, setErrorMessage, fulfilledFunction });
              }
            }}
            Icon={<TrashFillIconSVG iconSize={'1.5rem'}></TrashFillIconSVG>}
            className="btn-danger px-3"
          ></ButtonWithIcon>
        </>
      )}

      <AlertMessage alertMessage={errorMessage} className="alert-warning"></AlertMessage>

      <ButtonWithIcon
        onClick={() => {
          onClose();
          onClear();
          setIsEdit(false);
          setErrorMessage('');
        }}
        className="btn-secondary px-3 ms-auto"
        Icon={<CrossIconSVG iconSize={'1.5rem'}></CrossIconSVG>}
      ></ButtonWithIcon>
    </div>
  );
};

export default EditBar;
