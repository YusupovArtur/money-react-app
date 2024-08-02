import { Dispatch, FC, SetStateAction, useState } from 'react';
// Components
import { ModalContainer } from 'shared/containers';
import EditFormBar from 'entities/EditFormBar';
import WalletForm from '../../../pages/wallets_page/wallet_form/WalletForm';
import WalletInfo from '../../../pages/wallets_page/wallets_list/WalletInfo';
// Store
import { useAppDispatch } from 'store/hook';
import { deleteWallet, updateWallet } from 'store/slices/walletsSlice';
import { serverResponseStatusHooks, walletAddType, walletType } from 'store/types';

const WalletOpened: FC<{
  wallet: walletType;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
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
    <ModalContainer isOpened={isOpened} onCollapse={isEdit ? undefined : () => setIsOpened(false)} style={{ margin: 'auto' }}>
      <div style={{ maxWidth: '40rem', width: '100vw' }} className="d-flex flex-column bg-body-tertiary shadow-sm p-3 rounded-4">
        <EditFormBar
          onClose={() => setIsOpened(false)}
          onClear={clearFunction}
          onUpdate={updateFunction}
          onDelete={deleteFunction}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemType="счёт"
          itemName={wallet.name}
        />
        {isEdit ? <WalletForm formData={formData} setFormData={setFormData} /> : <WalletInfo wallet={wallet} />}
      </div>
    </ModalContainer>
  );
};

export default WalletOpened;
