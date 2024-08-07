import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { addWallet, WalletType } from 'store/slices/walletsSlice';
import { ResponseHooksType, useAppDispatch } from 'store';
// Input components
import { ModalContainer } from 'shared/containers';
import InputFormBar from 'entities/InputFormBar';
import WalletForm from '../../../pages/wallets_page/wallet_form/WalletForm';

const WalletInput: FC<{
  isShowInput: boolean;
  setIsShowInput: Dispatch<SetStateAction<boolean>>;
}> = ({ isShowInput, setIsShowInput }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<WalletType>({
    name: '',
    balance: 0,
    iconName: 'Card',
    color: '#ced4da',
    type: 'debit',
    description: '',
  });
  const [stringNumber, setStringNumber] = useState<string>('0');

  const clearFunction = () => {
    setFormData({ name: '', balance: 0, iconName: 'Card', color: '#ced4da', type: 'debit', description: '' });
    setStringNumber('0');
  };

  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(addWallet({ wallet: formData, ...statusHooks }));
  };

  return (
    <ModalContainer isOpened={isShowInput} onCollapse={setIsShowInput} style={{ margin: 'auto' }}>
      <div style={{ maxWidth: '35rem', width: '100vw' }} className="bg-body-tertiary shadow-sm p-3 rounded-4">
        <InputFormBar addButtonsLabel="Счет" setIsOpened={setIsShowInput} onClear={clearFunction} onAdd={addFunction} />
        <WalletForm formData={formData} setFormData={setFormData} />
      </div>
    </ModalContainer>
  );
};

export default WalletInput;
