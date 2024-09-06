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
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';

interface WalletInputProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const WalletInput: FC<WalletInputProps> = ({ isOpened, setIsOpened }) => {
  const defaultData: WalletType = {
    name: '',
    balance: 0,
    iconName: 'Card',
    color: COLOR_NAMES_HEX['gray-400'],
    type: 'debit',
    description: '',
  };

  const [formData, setFormData] = useState<WalletType>(defaultData);

  // Callbacks
  const dispatch = useAppDispatch();
  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(addWallet({ wallet: formData, ...statusHooks }));
  };

  const onClear = () => {
    setIsValidate({ name: false, type: true, balance: false });
    setFormData(defaultData);
  };
  const onClose = (isOpened: boolean) => {
    onClear();
    setIsOpened(isOpened);
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
