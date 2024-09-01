import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { ResponseHooksType, useAppDispatch } from 'store';
import { addWallet, WalletType } from 'store/slices/walletsSlice';
// Form
import { WalletForm } from 'pages/WalletsPage/forms/WalletForm/WalletForm.tsx';
import { InputFormControl } from 'entities/InputFormControl';
import { useGetWalletFormValidation } from 'pages/WalletsPage/forms/WalletForm/helpers/useGetWalletFormValidation.ts';
// UI
import { ModalWindowContainer } from 'shared/containers';

interface WalletInputProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const WalletInput: FC<WalletInputProps> = ({ isOpened, setIsOpened }) => {
  const [formData, setFormData] = useState<WalletType>({
    name: '',
    balance: 0,
    iconName: 'Card',
    color: '#ced4da',
    type: 'debit',
    description: '',
  });

  // Callbacks
  const dispatch = useAppDispatch();
  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(addWallet({ wallet: formData, ...statusHooks }));
  };

  const onClear = () => {
    setIsValidate({ name: Boolean(formData.name), type: Boolean(formData.type), balance: !isNaN(formData.balance) });
    setFormData({ name: '', balance: 0, iconName: 'Card', color: '#ced4da', type: 'debit', description: '' });
  };
  const onClose = (isOpened: boolean) => {
    setIsOpened(isOpened);
    onClear();
  };

  // Validation
  const { setIsValidate, validation, setValidateFields } = useGetWalletFormValidation(formData);

  return (
    <ModalWindowContainer isOpened={isOpened} onCollapse={setIsOpened} onClose={onClose} style={{ margin: 'auto' }}>
      <WalletForm formData={formData} setFormData={setFormData} validation={validation} setIsValidate={setIsValidate} />
      <InputFormControl
        caption="Добавить счет"
        disabled={!validation.isValid}
        setValidate={setValidateFields}
        setIsOpened={setIsOpened}
        onAdd={addFunction}
        onClear={onClear}
      />
    </ModalWindowContainer>
  );
};
