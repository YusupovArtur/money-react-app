import { Dispatch, FC, SetStateAction, useId, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store';
import { setIsRemember } from 'store/slices/userSlice';
// Hooks
import { getValidityClassName, useFormValidation } from 'shared/hooks';
import { emailValidator, passwordValidator, usernameValidator } from 'shared/hooks/useFormValidation/validators';
import { password2Validator } from 'pages/LoginPage/forms/SignupForm/helpers/password2Validator.ts';
import { SignupFormDataType } from 'pages/LoginPage/types/SignupFormDataType.ts';
// UI
import { FormValidationFeedback } from 'shared/ui';
import { TextInput } from 'shared/inputs';
import { OptionalPrimitiveKeysType } from 'shared/types';

interface SignupFormProps {
  formData: SignupFormDataType;
  setFormData: Dispatch<SetStateAction<SignupFormDataType>>;
  onSubmit?: () => any;
}

export const SignupForm: FC<SignupFormProps> = ({ formData, setFormData, onSubmit }) => {
  const dispatch = useAppDispatch();
  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [isValidate, setIsValidate] = useState<OptionalPrimitiveKeysType<SignupFormDataType, boolean>>({
    email: Boolean(formData.email),
    username: Boolean(formData.username),
    password: Boolean(formData.password),
    password2: Boolean(formData.password2),
  });
  const { isValid, fieldValidities, fieldFeedbacks } = useFormValidation<SignupFormDataType>({
    formData,
    validators: {
      email: emailValidator,
      username: usernameValidator,
      password: passwordValidator,
      password2: password2Validator,
    },
    isValidate,
  });

  const rememberMeId = useId();
  const showPasswordId = useId();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (onSubmit && isValid) onSubmit();
      }}
      className="d-flex flex-column"
    >
      {/*Email*/}
      <div className="position-relative mb-3">
        <label htmlFor="signupEmail" className="form-label text-body user-select-none mb-1">
          Электронная почта
        </label>
        <TextInput
          type="email"
          value={formData.email}
          onChange={(event) => {
            setFormData((state) => ({ ...state, email: event.target.value }));
            setIsValidate((state) => ({ ...state, email: true }));
          }}
          onBlur={() => {
            setIsValidate((state) => ({ ...state, email: true }));
          }}
          className={getValidityClassName(fieldValidities.email)}
          name="email"
          id="signupEmail"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.email} />
      </div>

      {/*Username*/}
      <div className="position-relative mb-3">
        <label htmlFor="signupUsername" className="form-label text-body user-select-none mb-1">
          Имя
        </label>
        <TextInput
          type="text"
          value={formData.username}
          onChange={(event) => {
            setFormData((state) => ({ ...state, username: event.target.value }));
            setIsValidate((state) => ({ ...state, username: true }));
          }}
          onBlur={() => {
            setIsValidate((state) => ({ ...state, username: true }));
          }}
          className={getValidityClassName(fieldValidities.username)}
          id="signupUsername"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.username} />
      </div>

      {/*Password*/}
      <div className="position-relative mb-3">
        <label htmlFor="signupPassword" className="form-label text-body user-select-none mb-1">
          Пароль
        </label>
        <TextInput
          type={isShowPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(event) => {
            setFormData((state) => ({ ...state, password: event.target.value }));
            setIsValidate((state) => ({ ...state, password: true }));
          }}
          onBlur={() => {
            setIsValidate((state) => ({ ...state, password: true }));
          }}
          className={getValidityClassName(fieldValidities.password)}
          name="password"
          id="signupPassword"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.password} />
      </div>

      {/*Password2*/}
      <div className="position-relative mb-3">
        <label htmlFor="signupPassword2" className="form-label text-body user-select-none mb-1">
          Повторите пароль
        </label>
        <TextInput
          type={isShowPassword ? 'text' : 'password'}
          value={formData.password2}
          onChange={(event) => {
            setFormData((state) => ({ ...state, password2: event.target.value }));
            setIsValidate((state) => ({ ...state, password2: true }));
          }}
          onBlur={() => {
            setIsValidate((state) => ({ ...state, password2: true }));
          }}
          className={getValidityClassName(fieldValidities.password2)}
          name="password2"
          id="signupPassword2"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.password2} />
      </div>

      {/*Checkbox*/}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            checked={isShouldRemember}
            onChange={(event) => dispatch(setIsRemember(event.target.checked))}
            className="form-check-input"
            name="rememberCheckbox"
            id={rememberMeId}
          />
          <label className="form-check-label text-body user-select-none" htmlFor={rememberMeId}>
            Запомнить меня
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            checked={isShowPassword}
            onChange={(event) => setIsShowPassword(event.target.checked)}
            className="form-check-input"
            name="rememberCheckbox"
            id={showPasswordId}
          />
          <label className="form-check-label text-body user-select-none" htmlFor={showPasswordId}>
            Показать пароль
          </label>
        </div>
      </div>

      {/*Submit*/}
      <div
        onClick={() => setIsValidate({ email: true, username: true, password: true, password2: true })}
        style={{ cursor: 'pointer' }}
        className="d-flex flex-column align-self-stretch"
      >
        <button disabled={!isValid} className="btn btn-primary align-self-stretch">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};
