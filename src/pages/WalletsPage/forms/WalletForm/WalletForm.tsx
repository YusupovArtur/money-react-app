import { Dispatch, FC, SetStateAction } from 'react';
// Inputs
import { WalletTypeInput } from './WalletTypeInput.tsx';
import { ColorHexInput, IconNameInput, NumberInput, TextInput, WALLET_ICON_OPTIONS } from 'shared/inputs';
import { getValidityClassName, useFormValidation } from 'shared/hooks';
// Store
import { WalletType } from 'store/slices/walletsSlice';
// UI
import { FormLabel, FormValidationFeedback } from 'shared/ui';

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
      <div className="position-relative mb-3">
        <FormLabel htmlFor="type" style={{ display: 'block' }}>
          Тип счета
        </FormLabel>
        <WalletTypeInput
          id="type"
          type={formData.type}
          setType={(type: WalletType['type']) => setFormData((state) => ({ ...state, type: type }))}
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.type} className="align-items-start" />
      </div>

      {/*Name*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor="name">Имя счета</FormLabel>
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
        <FormLabel htmlFor="iconName">Иконка и цвет</FormLabel>
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
        <FormLabel htmlFor="balance">Сумма на счете</FormLabel>
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
        <FormLabel htmlFor="description">Описание</FormLabel>
        <TextInput
          id="description"
          value={formData.description}
          onChange={(event) => setFormData((state) => ({ ...state, description: event.target.value }))}
        />
      </div>
    </form>
  );
};
