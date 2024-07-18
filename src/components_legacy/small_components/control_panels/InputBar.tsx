import { useState, FC } from 'react';
import { CrossIconSVG, PlusIconSVG } from '../../small_components/icons_svg/IconsSVG';
import { serverResponseStatusHooks } from 'store/types';

interface InputBarProps {
  addButtonLabel: string;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  clearFunction: () => void;
  addFunction: (statusHooks: serverResponseStatusHooks) => void;
}

const InputBar: FC<InputBarProps> = ({ addButtonLabel, setIsOpened, clearFunction, addFunction }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fulfilledFunction = () => {
    setIsOpened(false);
    clearFunction();
  };

  return (
    <div className="d-flex justify-content-start align-items-center">
      <button
        className="btn btn-primary d-flex justify-content-between align-items-center me-2"
        onClick={() => addFunction({ setIsLoading, setErrorMessage, fulfilledFunction })}
      >
        {isLoading ? (
          <div className="spinner-border text-light" style={{ width: '1.25rem', height: '1.25rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <PlusIconSVG iconSize="1.25rem"></PlusIconSVG>
        )}

        <span className="ms-1">{addButtonLabel}</span>
      </button>
      <button
        className="btn btn-danger d-flex justify-content-center align-items-center py-2 px-3 me-2"
        onClick={() => {
          setIsOpened(false);
          setErrorMessage('');
          clearFunction();
        }}
      >
        <CrossIconSVG iconSize="1.25rem"></CrossIconSVG>
      </button>
      {errorMessage && (
        <div className="alert alert-warning px-2 py-1 m-0 align-self-stretch" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputBar;
