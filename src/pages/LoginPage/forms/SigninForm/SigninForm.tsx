import { Dispatch, FC, SetStateAction, useState } from 'react';
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
          type="password"
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
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          checked={isShouldRemember}
          onChange={(event) => dispatch(setIsRemember(event.target.checked))}
          className="form-check-input"
          name="rememberCheckbox"
          id="rememberCheckbox"
        />
        <label className="form-check-label text-body user-select-none" htmlFor="rememberCheckbox">
          Запомнить меня
        </label>
      </div>
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
