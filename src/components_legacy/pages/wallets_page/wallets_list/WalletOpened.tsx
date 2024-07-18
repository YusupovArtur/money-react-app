import { useState, FC } from 'react';
// Components
import ModalContainer from '../../../small_components/ModalContainer';
import EditBar from '../../../small_components/control_panels/EditBar';
import WalletForm from '../../../pages/wallets_page/wallet_form/WalletForm';
import WalletInfo from '../../../pages/wallets_page/wallets_list/WalletInfo';
// Store
import { useAppDispatch } from 'store/hook';
import { updateWallet, deleteWallet } from 'store/slices/walletsSlice';
import { serverResponseStatusHooks, walletAddType, walletType } from 'store/types';

const WalletOpened: FC<{
  wallet: walletType;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ wallet, isOpened, setIsOpened }) => {
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<walletAddType>({
    name: wallet.name,
    balance: wallet.balance,
    iconName: wallet.iconName,
    color: wallet.color,
    type: wallet.type,
    description: wallet.description,
  });
  const [stringNumber, setStringNumber] = useState<string>(wallet.balance.toString());

  const clearFunction = () => {
    setFormData({
      name: wallet.name,
      balance: wallet.balance,
      iconName: wallet.iconName,
      color: wallet.color,
      type: wallet.type,
      description: wallet.description,
    });
  };

  const updateFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(
      updateWallet({
        walletID: wallet.id,
        newProps: formData,
        ...statusHooks,
      }),
    );
  };

  const deleteFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(deleteWallet({ walletID: wallet.id, ...statusHooks }));
  };

  return (
    <ModalContainer isOpened={isOpened} setIsOpened={isEdit ? undefined : setIsOpened}>
      <div style={{ maxWidth: '40rem', width: '100vw' }} className="d-flex flex-column bg-body-tertiary shadow-sm p-3 rounded-4">
        <EditBar
          closeFunction={() => setIsOpened(false)}
          clearFunction={clearFunction}
          updateFunction={updateFunction}
          deleteFunction={deleteFunction}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemType="счёт"
          itemName={wallet.name}
        ></EditBar>
        {isEdit ? (
          <WalletForm
            formData={formData}
            setFormData={setFormData}
            stringNumber={stringNumber}
            setStringNumber={setStringNumber}
          ></WalletForm>
        ) : (
          <WalletInfo wallet={wallet}></WalletInfo>
        )}
      </div>
    </ModalContainer>
  );
};

export default WalletOpened;