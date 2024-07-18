import { Dispatch, FC, SetStateAction, useState } from 'react';
import { CheckIconSVG, CrossIconSVG, PencilSquareIconSVG, TrashFillIconSVG } from '../icons_svg/IconsSVG.tsx';
import { serverResponseStatusHooks } from 'store/types';

interface EditBarProps {
  closeFunction: () => void;
  clearFunction: () => void;
  deleteFunction: (statusHooks: serverResponseStatusHooks) => void;
  updateFunction: (statusHooks: serverResponseStatusHooks) => void;
  itemType: string;
  itemName: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditBar: FC<EditBarProps> = ({
  closeFunction,
  clearFunction,
  deleteFunction,
  updateFunction,
  itemType,
  itemName,
  isEdit,
  setIsEdit,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fulfilledFunction = () => setIsEdit(false);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn btn-primary d-flex justify-content-center align-items-center me-2 py-2 px-3"
          onClick={() => {
            if (isEdit) {
              updateFunction({ setIsLoading, setErrorMessage, fulfilledFunction });
            } else {
              setIsEdit(true);
            }
          }}
        >
          {isLoading ? (
            <div className="spinner-border text-light" style={{ width: '1.25rem', height: '1.25rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : isEdit ? (
            <CheckIconSVG iconSize="1.25rem"></CheckIconSVG>
          ) : (
            <PencilSquareIconSVG iconSize="1.25rem"></PencilSquareIconSVG>
          )}
        </button>
        {isEdit && (
          <>
            <button
              className="btn btn-danger d-flex justify-content-center align-items-center me-2 py-2 px-3"
              onClick={() => {
                setErrorMessage('');
                setIsEdit(false);
                clearFunction();
              }}
            >
              <CrossIconSVG iconSize="1.25rem"></CrossIconSVG>
            </button>
            <button
              className="btn btn-danger d-flex justify-content-center align-items-center me-2 py-2 px-3"
              onClick={() => {
                if (confirm(`Вы уверены что хотите удалить ${itemType}: ${itemName}`)) {
                  deleteFunction({ setIsLoading, setErrorMessage, fulfilledFunction });
                }
              }}
            >
              <TrashFillIconSVG iconSize={'1.25rem'}></TrashFillIconSVG>
            </button>
          </>
        )}
        {errorMessage && (
          <div className="alert alert-warning align-self-stretch  px-2 py-1 m-0 me-2" role="alert">
            {errorMessage}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          closeFunction();
          clearFunction();
          setIsEdit(false);
          setErrorMessage('');
        }}
        className="btn btn btn-secondary d-flex justify-content-center align-items-center py-2 px-3"
      >
        <CrossIconSVG iconSize={'1.25rem'}></CrossIconSVG>
      </button>
    </div>
  );
};

export default EditBar;
