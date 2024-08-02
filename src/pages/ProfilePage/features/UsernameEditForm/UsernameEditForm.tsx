import { FC, useEffect, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook';
import { updateUserState } from 'store/slices/userSlice';
// Hooks
import { getValidityClassName, useFormValidation } from 'shared/hooks';
import UsernameEditFormDataType from 'pages/ProfilePage/types/UsernameEditFormStateType';
import { usernameValidator } from 'shared/helpers/validators';
// UI
import { TextInput } from 'shared/inputs';
import { AlertMessage, ButtonWithIcon, ButtonWithIconAndSpinner, FormValidationFeedback } from 'shared/ui';
import { CheckIconSVG, CrossIconSVG, PencilSquareIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG';

const UsernameEditForm: FC = () => {
  const dispatch = useAppDispatch();
  const usernameState = useAppSelector((state) => state.user.userState.username);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<UsernameEditFormDataType>({
    username: usernameState ? usernameState : '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFulfilled = () => {
    setIsEdit(false);
    setIsValidate({ username: false });
    setFormData({ username: usernameState !== null ? usernameState : '' });
  };

  const [isValidate, setIsValidate] = useState<{ [K in keyof UsernameEditFormDataType]?: boolean }>({
    username: Boolean(formData.username) && isEdit,
  });
  const { isValid, fieldValidities, fieldFeedbacks } = useFormValidation<UsernameEditFormDataType>(
    formData,
    {
      username: usernameValidator,
    },
    isValidate,
  );

  useEffect(() => {
    if (!isEdit) {
      setFormData({ username: usernameState !== null ? usernameState : '' });
    }
  }, [usernameState, isEdit]);

  const handleEditButtonClick = () => {
    if (isEdit) {
      dispatch(updateUserState({ username: formData.username, setIsLoading, setErrorMessage, onFulfilled }));
    } else {
      setIsEdit(true);
      setIsValidate({ username: true });
    }
  };

  const handleClearButtonClick = () => {
    setIsEdit(false);
    setErrorMessage('');
    setIsValidate({ username: false });
    setFormData({
      username: usernameState ? usernameState : '',
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="mt-3"
    >
      <div className="position-relative mb-4">
        <label htmlFor="signinEmail" className="form-label text-body user-select-none mb-1">
          Имя
        </label>
        <div className="d-flex align-items-stretch">
          <TextInput
            value={formData.username}
            onChange={(event) => setFormData({ username: event.target.value })}
            onFocus={() => setIsValidate({ username: true })}
            className={getValidityClassName(fieldValidities.username)}
            disabled={!isEdit}
            placeholder={!formData.username && !isEdit ? 'Нет имени' : undefined}
          />
          <ButtonWithIconAndSpinner
            onClick={handleEditButtonClick}
            disabled={(isEdit && !isValid) || isLoading}
            isLoading={isLoading}
            className="btn-primary ms-1"
          >
            {isEdit ? <CheckIconSVG iconSize="1.5rem" /> : <PencilSquareIconSVG iconSize="1.5rem" />}
          </ButtonWithIconAndSpinner>

          {isEdit && (
            <ButtonWithIcon onClick={handleClearButtonClick} disabled={isLoading} className="btn-danger ms-1">
              <CrossIconSVG iconSize="1.5rem" />
            </ButtonWithIcon>
          )}
        </div>
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.username} className="align-items-start" />
      </div>
      <AlertMessage alertMessage={errorMessage} className="alert-danger mt-3" />
    </form>
  );
};

export default UsernameEditForm;
