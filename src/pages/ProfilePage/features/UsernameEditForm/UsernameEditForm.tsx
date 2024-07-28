import { FC, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { updateUsername } from 'store/slices/userSlice.ts';
// Hooks
import useFormValidation, { getValidityClassName } from 'shared/hooks/useFormValidation';
import UsernameEditFormDataType from 'pages/ProfilePage/types/UsernameEditFormStateType.ts';
import usernameValidator from 'pages/ProfilePage/features/UsernameEditForm/helpers/usernameValidator.ts';
// UI
import TextInput from 'shared/inputs/TextInput';
import AlertMessage from 'shared/ui/AlertMessage';
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';
import ButtonWithIconAndSpinner from 'shared/ui/ButtonWithIconAndSpinner';
import FormValidationFeedback from 'shared/ui/FormValidationFeedback';
import { CheckIconSVG, CrossIconSVG, PencilSquareIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG.tsx';

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

  const handleEditButtonClick = () => {
    if (isEdit) {
      dispatch(updateUsername({ username: formData.username, setIsLoading, setErrorMessage, onFulfilled }));
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
      className="my-3 position-relative"
    >
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
          disabled={isEdit && !isValid}
          isLoading={isLoading}
          className="btn-primary ms-1"
        >
          {isEdit ? <CheckIconSVG iconSize="1.5rem" /> : <PencilSquareIconSVG iconSize="1.5rem" />}
        </ButtonWithIconAndSpinner>

        {isEdit && (
          <ButtonWithIcon onClick={handleClearButtonClick} className="btn-danger ms-1">
            <CrossIconSVG iconSize="1.5rem" />
          </ButtonWithIcon>
        )}
        <AlertMessage alertMessage={errorMessage} className="alert-warning ms-1" />
      </div>
      <FormValidationFeedback feedbackMessage={fieldFeedbacks.username} className="align-items-start" />
    </form>
  );
};

export default UsernameEditForm;
