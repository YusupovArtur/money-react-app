import { Dispatch, FC, SetStateAction, useId, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store';
import { setIsRemember } from 'store/slices/userSlice';
// Hooks
import { getValidityClassName, useFormValidation } from 'shared/hooks';
import { emailValidator, passwordValidator } from 'shared/hooks/useFormValidation/validators';
import { SigninFormDataType } from 'pages/LoginPage/types/SigninFormDataType';
// UI
import { FormValidationFeedback } from 'shared/ui';
import { TextInput } from 'shared/inputs';
import { OptionalPrimitiveKeysType } from 'shared/types';

interface SigninFormProps {
  formData: SigninFormDataType;
  setFormData: Dispatch<SetStateAction<SigninFormDataType>>;
  onSubmit?: () => any;
}

export const SigninForm: FC<SigninFormProps> = ({ formData, setFormData, onSubmit }) => {
  const dispatch = useAppDispatch();
  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [isValidate, setIsValidate] = useState<OptionalPrimitiveKeysType<SigninFormDataType, boolean>>({
    email: Boolean(formData.email),
    password: Boolean(formData.password),
  });
  const { isValid, fieldValidities, fieldFeedbacks } = useFormValidation<SigninFormDataType>({
    formData,
    validators: {
      email: emailValidator,
      password: passwordValidator,
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
      <div className="mb-3 position-relative">
        <label htmlFor="signinEmail" className="form-label text-body user-select-none mb-1">
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
          id="signinEmail"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.email} />
      </div>

      {/*Password*/}
      <div className="mb-3 position-relative">
        <label htmlFor="signinPassword" className="form-label text-body user-select-none mb-1">
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
          id="signinPassword"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.password} />
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
        onClick={() => setIsValidate({ email: true, password: true })}
        style={{ cursor: 'pointer' }}
        className="d-flex flex-column align-self-stretch"
      >
        <button disabled={!isValid} className="btn btn-primary align-self-stretch">
          Войти
        </button>
      </div>
    </form>
  );
};
