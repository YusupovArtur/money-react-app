import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { addWallet, WalletType } from 'store/slices/walletsSlice';
import { ResponseHooksType, useAppDispatch } from 'store/index.ts';
// Input components
import { InputFormControl } from 'entities/InputFormControl';
import { ModalWindowContainer } from 'shared/containers';
import { WalletForm } from 'pages/WalletsPage/forms/WalletForm/WalletForm.tsx';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';
import { typeValidator } from 'pages/WalletsPage/forms/WalletForm/helpers/typeValidator.ts';
import { balanceValidator } from 'pages/WalletsPage/forms/WalletForm/helpers/balanceValidator.ts';

const WalletInput: FC<{
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpened, setIsOpened }) => {
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
  const [isValidate, setIsValidate] = useState<{ [K in keyof WalletType]?: boolean }>({
    name: Boolean(formData.name),
    type: Boolean(formData.type),
    balance: !isNaN(formData.balance),
  });
  const validation = useFormValidation<WalletType>(
    formData,
    {
      name: nameValidator,
      type: typeValidator,
      balance: balanceValidator,
    },
    isValidate,
  );
  const setValidateFields = () => {
    setIsValidate({ name: true, type: true, balance: true });
  };

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

export default WalletInput;
