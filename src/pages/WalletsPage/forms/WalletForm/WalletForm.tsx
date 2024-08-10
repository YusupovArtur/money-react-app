import { Dispatch, FC, SetStateAction } from 'react';
// Inputs
import { ColorHexInput, IconNameInput, NumberInput, TextInput, WALLET_ICON_OPTIONS } from 'shared/inputs';
import { WalletTypeInput } from './ui/WalletTypeInput.tsx';
import { getValidityClassName, useFormValidation } from 'shared/hooks';
import { FormValidationFeedback } from 'shared/ui';
// Store
import { WalletType } from 'store/slices/walletsSlice';

interface WalletFormProps {
  formData: WalletType;
  setFormData: Dispatch<SetStateAction<WalletType>>;
  validation: ReturnType<typeof useFormValidation<WalletType>>;
  setIsValidate: Dispatch<SetStateAction<{ [K in keyof WalletType]?: boolean }>>;
}

export const WalletForm: FC<WalletFormProps> = ({ formData, setFormData, validation, setIsValidate }) => {
  const { fieldValidities, fieldFeedbacks } = validation;

  return (
    <form onSubmit={(event) => event.preventDefault()} className="d-flex flex-column mb-3">
      {/*Type*/}
      <div className="d-flex flex-column position-relative mb-3 align-items-start">
        <label htmlFor="type" className="form-label text-body user-select-none mb-1">
          Тип счета
        </label>
        <WalletTypeInput
          id="type"
          type={formData.type}
          setType={(type: WalletType['type']) => setFormData((state) => ({ ...state, type: type }))}
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.type} />
      </div>

      {/*Name*/}
      <div className="position-relative mb-3">
        <label htmlFor="name" className="form-label text-body user-select-none mb-1">
          Имя счета
        </label>
        <TextInput
          id="name"
          value={formData.name}
          onChange={(event) => {
            setFormData((state) => ({ ...state, name: event.target.value }));
            setIsValidate((state) => ({ ...state, name: true }));
          }}
          onFocus={() => {
            setIsValidate((state) => ({ ...state, name: true }));
          }}
          className={getValidityClassName(fieldValidities.name)}
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.name} />
      </div>

      {/*Icon*/}
      <div className="position-relative mb-3">
        <label htmlFor="iconName" className="form-label text-body user-select-none mb-1">
          Иконка и цвет
        </label>
        <div className="d-flex align-items-center">
          <IconNameInput
            id="iconName"
            iconName={formData.iconName}
            setIconName={(iconName: string) => setFormData((state) => ({ ...state, iconName }))}
            iconOptions={WALLET_ICON_OPTIONS}
            optionsStyle={{ rowLength: 6, isDivider: false }}
          />
          <ColorHexInput
            id="colorHex"
            colorHex={formData.color}
            setColorHex={(colorHex: string) => setFormData((state) => ({ ...state, color: colorHex }))}
          />
        </div>
      </div>

      {/*Balance*/}
      <div className="position-relative mb-3">
        <label htmlFor="balance" className="form-label text-body user-select-none mb-1">
          Сумма на счете
        </label>
        <NumberInput
          id="balance"
          number={formData.balance}
          setNumber={(number: number) => {
            setFormData((state) => ({ ...state, balance: number }));
            setIsValidate((state) => ({ ...state, balance: true }));
          }}
          onFocus={() => {
            setIsValidate((state) => ({ ...state, balance: true }));
          }}
          className={getValidityClassName(fieldValidities.balance)}
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.balance} />
      </div>

      {/*Description*/}
      <div className="position-relative mb-3">
        <label htmlFor="description" className="form-label text-body user-select-none mb-1">
          Описание
        </label>
        <TextInput
          id="description"
          value={formData.description}
          onChange={(event) => setFormData((state) => ({ ...state, description: event.target.value }))}
        />
      </div>
    </form>
  );
};
