import { Dispatch, FC, SetStateAction, useState } from 'react';
// Components
import { ModalContainer } from 'shared/containers';
import EditFormBar from 'entities/EditFormBar';
import WalletForm from '../../../pages/wallets_page/wallet_form/WalletForm';
import WalletInfo from '../../../pages/wallets_page/wallets_list/WalletInfo';
// Store
import { ResponseHooksType, useAppDispatch } from 'store';
import { deleteWallet, updateWallet, WalletType } from 'store/slices/walletsSlice';

interface WalletOpenedProps {
  id: string;
  wallet: WalletType;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

const WalletOpened: FC<WalletOpenedProps> = ({ id, wallet, isOpened, setIsOpened }) => {
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<WalletType>({
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

  const updateFunction = (statusHooks: ResponseHooksType) => {
    dispatch(
      updateWallet({
        id,
        walletProps: formData,
        ...statusHooks,
      }),
    );
  };

  const deleteFunction = (statusHooks: ResponseHooksType) => {
    dispatch(deleteWallet({ id, ...statusHooks }));
  };

  return (
    <ModalContainer isOpened={isOpened} onCollapse={isEdit ? undefined : setIsOpened} style={{ margin: 'auto' }}>
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
