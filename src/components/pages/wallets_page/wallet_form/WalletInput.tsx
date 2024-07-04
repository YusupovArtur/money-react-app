import React, { useState } from 'react';
// Store
import { useAppDispatch } from 'store/hook';
import { addWallet } from 'store/slices/walletsSlice';
import { walletAddType } from 'store/types';
// Input components
import ModalContainer from 'components/small_components/ModalContainer';
import InputBar from 'components/small_components/control_panels/InputBar';
import WalletForm from 'components/pages/wallets_page/wallet_form/WalletForm';

const WalletInput: React.FC<{
  isShowInput: boolean;
  setIsShowInput: React.Dispatch<React.SetStateAction<boolean>>;
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

  const addFunction = (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    isOk: React.MutableRefObject<boolean>,
  ) => {
    dispatch(
      addWallet({
        isOk: isOk,
        setIsLoading: setIsLoading,
        setErrorMessage: setErrorMessage,
        wallet: formData,
      }),
    );
  };

  return (
    <ModalContainer
      isOpened={isShowInput}
      setIsOpened={setIsShowInput}
      style={{ maxWidth: '35rem', width: '100vw' }}
      className="bg-body-tertiary shadow-sm p-3 rounded-4"
    >
      <InputBar
        addButtonLabel="Счет"
        setIsOpened={setIsShowInput}
        clearFunction={clearFunction}
        addFunction={addFunction}
      ></InputBar>
      <WalletForm
        formData={formData}
        setFormData={setFormData}
        stringNumber={stringNumber}
        setStringNumber={setStringNumber}
      ></WalletForm>
    </ModalContainer>
  );
};

export default WalletInput;
