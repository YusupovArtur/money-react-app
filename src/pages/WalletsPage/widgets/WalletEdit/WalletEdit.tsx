import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Store
import { ResponseHooksType, useAppDispatch, useAppSelector } from 'store';
import { deleteWallet, updateWallet, useGetWalletWithTotalBalance, WalletType } from 'store/slices/walletsSlice';
// Form
import { WalletForm } from 'pages/WalletsPage/forms/WalletForm/WalletForm.tsx';
import { useGetWalletFormValidation } from 'pages/WalletsPage/forms/WalletForm/helpers/useGetWalletFormValidation.ts';
import { EditFromControl } from 'entities/EditFormControl';
import { WalletEditInfo } from 'pages/WalletsPage/widgets/WalletEdit/ui/WalletEditInfo.tsx';
// UI
import { ModalWindowContainer } from 'shared/containers';
import { MODAL_CONTAINER_ANIMATION_DURATION } from 'shared/containers/ModalContainer/ModalContainer.tsx';
import { useTimeoutRefWithClear } from 'shared/hooks';
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';

export const WalletEdit: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const walletID = searchParams.get('walletID');
  const { walletWithTotalBalance: wallet, walletForUseEffect } = useGetWalletWithTotalBalance(walletID);
  // const wallet = useAppSelector(selectWalletWithTotalBalance(walletID));

  const isLoading = useAppSelector((state) => state.wallets.responseState.isLoading);
  const defaultValue: WalletType = {
    name: wallet?.name || '',
    balance: wallet?.balance || 0,
    iconName: wallet?.iconName || 'Card',
    color: wallet?.color || COLOR_NAMES_HEX['gray-400'],
    type: wallet?.type || 'debit',
    description: wallet?.description || '',
  };

  useEffect(() => {
    if (isLoading === false && walletID !== null && !walletForUseEffect) {
      alert(`Счета с ID "${walletID}" не существует`);
      searchParams.delete('walletID');
      setSearchParams(searchParams);
    }
    onClear();
  }, [isLoading, walletID, walletForUseEffect]);

  // Form data
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<WalletType>(defaultValue);
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const timeoutRef = useTimeoutRefWithClear();

  // Callbacks
  const handleClose = () => {
    setIsOpened(false);
    timeoutRef.current = setTimeout(() => {
      searchParams.delete('walletID');
      setSearchParams(searchParams);
    }, MODAL_CONTAINER_ANIMATION_DURATION);
  };

  const onClear = () => {
    setFormData(defaultValue);
  };

  const dispatch = useAppDispatch();
  const onUpdate = (statusHooks: ResponseHooksType) => {
    if (walletID !== null) {
      dispatch(updateWallet({ id: walletID, walletProps: formData, ...statusHooks }));
    }
  };
  const onUpdateFulfilled = () => {
    setIsEdit(false);
  };

  const onDelete = (statusHooks: ResponseHooksType) => {
    if (walletID !== null) {
      dispatch(deleteWallet({ id: walletID, ...statusHooks }));
    }
  };
  const onDeleteFulfilled = () => {
    searchParams.delete('walletID');
    setSearchParams(searchParams);
  };

  // Form validation
  const { setIsValidate, validation, setValidateFields } = useGetWalletFormValidation(formData);

  // Return null if not find wallet
  if (!wallet) {
    return null;
  }

  return (
    <ModalWindowContainer
      isOpened={isOpened}
      onClose={handleClose}
      onCollapse={isEdit ? undefined : handleClose}
      style={{ margin: 'auto' }}
    >
      {isEdit ? (
        <WalletForm formData={formData} setFormData={setFormData} validation={validation} setIsValidate={setIsValidate} />
      ) : (
        <WalletEditInfo wallet={wallet} />
      )}

      <EditFromControl
        disabled={!validation.isValid}
        setValidate={setValidateFields}
        onClear={onClear}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onUpdateFulfilled={onUpdateFulfilled}
        onDeleteFulfilled={onDeleteFulfilled}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        captions={{ itemType: 'Cчет', itemName: wallet.name }}
      />
    </ModalWindowContainer>
  );
};
