import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch } from 'store/hook';
import { addWallet } from 'store/slices/walletsSlice';
import { serverResponseStatusHooks, walletAddType } from 'store/types';
// Input components
import { ModalContainer } from 'shared/layouts/ModalContainer';
import { EntryInputBar } from 'features/EntryInputBar';
import WalletForm from '../../../pages/wallets_page/wallet_form/WalletForm';

const WalletInput: FC<{
  isShowInput: boolean;
  setIsShowInput: Dispatch<SetStateAction<boolean>>;
}> = ({ isShowInput, setIsShowInput }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<walletAddType>({
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

  const addFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(addWallet({ wallet: formData, ...statusHooks }));
  };

  return (
    <ModalContainer isOpened={isShowInput} setIsOpened={setIsShowInput} style={{ margin: 'auto' }}>
      <div style={{ maxWidth: '35rem', width: '100vw' }} className="bg-body-tertiary shadow-sm p-3 rounded-4">
        <EntryInputBar
          addButtonsLabel="Счет"
          setIsOpened={setIsShowInput}
          onClear={clearFunction}
          onAdd={addFunction}
        ></EntryInputBar>
        <WalletForm
          formData={formData}
          setFormData={setFormData}
          stringNumber={stringNumber}
          setStringNumber={setStringNumber}
        ></WalletForm>
      </div>
    </ModalContainer>
  );
};

export default WalletInput;
