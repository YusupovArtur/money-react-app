import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { updateUserName } from 'store/slices/userSlice.ts';
import { PencilSquareIconSVG, CheckIconSVG, CrossIconSVG } from 'components/small_components/icons_svg/IconsSVG';

const UserNameForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.userState.userName);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<string>(!userName ? '' : userName);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fulfilledFunction = () => setIsEdit(false);

  return (
    <div className="mt-2">
      <span className="text-body-tertiary mt-2">Имя пользователя</span>
      <div className="d-flex flex-row justify-content-start align-items-center">
        <input
          type="text"
          onChange={(event) => setFormData(event.target.value)}
          value={formData}
          disabled={!isEdit}
          readOnly={!isEdit}
          className="form-control py-1 px-2 disabled"
          style={{ fontSize: '1.08rem' }}
          autoComplete="off"
          placeholder={!formData && !isEdit ? 'Нет имени' : undefined}
        />
        <button
          className="btn btn-primary d-flex justify-content-center align-items-center ms-2 py-2 px-3"
          onClick={() => {
            if (isEdit) {
              dispatch(updateUserName({ userName: formData, setIsLoading, setErrorMessage, fulfilledFunction }));
            } else {
              setIsEdit(true);
            }
          }}
        >
          {isLoading ? (
            <div className="spinner-border text-light" style={{ width: '1.125rem', height: '1.125rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : isEdit ? (
            <CheckIconSVG iconSize="1.125rem"></CheckIconSVG>
          ) : (
            <PencilSquareIconSVG iconSize="1.125rem"></PencilSquareIconSVG>
          )}
        </button>
        {isEdit && (
          <button
            onClick={() => {
              setIsEdit(false);
              setErrorMessage('');
              setFormData(!userName ? '' : userName);
            }}
            className="btn btn-danger d-flex justify-content-center align-items-center ms-2 py-2 px-3"
          >
            <CrossIconSVG iconSize="1.13rem"></CrossIconSVG>
          </button>
        )}
        {errorMessage && (
          <div className="alert alert-warning align-self-stretch  px-2 py-1 m-0 ms-2" role="alert">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNameForm;
