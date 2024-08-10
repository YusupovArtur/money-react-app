import { FC, useEffect, useRef, useState } from 'react';
// Components
import { ModalWindowContainer } from 'shared/containers';
import { EditFromControl } from 'entities/EditFormBar';
import { WalletForm } from 'pages/WalletsPage/forms/WalletForm/WalletForm.tsx';
import { WalletEditInfo } from 'pages/WalletsPage/widgets/WalletEdit/WalletEditInfo.tsx';
// Store
import { ResponseHooksType, useAppDispatch, useAppSelector } from 'store/index.ts';
import { deleteWallet, updateWallet, WalletType } from 'store/slices/walletsSlice';
import { useSearchParams } from 'react-router-dom';
import { MODAL_CONTAINER_ANIMATION_DURATION } from 'shared/containers/ModalContainer/ModalContainer.tsx';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';
import { typeValidator } from 'pages/WalletsPage/forms/WalletForm/helpers/typeValidator.ts';
import { balanceValidator } from 'pages/WalletsPage/forms/WalletForm/helpers/balanceValidator.ts';

const WalletEdit: FC = () => {
  // Wallet data
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const wallet = useAppSelector((state) => state.wallets.list[id ? id : '']) as WalletType | undefined;
  const isLoading = useAppSelector((state) => state.wallets.responseState.isLoading);

  useEffect(() => {
    if (isLoading === false && id !== null && !wallet) {
      // alert(`Счета с ID "${id}" не существует`);
      setSearchParams({});
    }
  }, [isLoading, id, wallet]);

  // Form data
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<WalletType>({
    name: wallet?.name || '',
    balance: wallet?.balance || 0,
    iconName: wallet?.iconName || '',
    color: wallet?.color || '',
    type: wallet?.type || 'debit',
    description: wallet?.description || '',
  });

  // Modal container state
  const [isOpened, setIsOpened] = useState<boolean>(true);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Form validation
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

  // Return null if not find wallet
  if (id === null || !wallet) {
    return null;
  }

  // Callbacks
  const handleClose = () => {
    setIsOpened(false);
    setTimeout(() => {
      setSearchParams({});
    }, MODAL_CONTAINER_ANIMATION_DURATION);
  };

  const clearFunction = () => {
    setFormData({
      name: wallet?.name || '',
      balance: wallet?.balance || 0,
      iconName: wallet?.iconName || '',
      color: wallet?.color || '',
      type: wallet?.type || 'debit',
      description: wallet?.description || '',
    });
  };

  const onUpdate = (statusHooks: ResponseHooksType) => {
    dispatch(
      updateWallet({
        id,
        walletProps: formData,
        ...statusHooks,
      }),
    );
  };

  const onDelete = (statusHooks: ResponseHooksType) => {
    dispatch(deleteWallet({ id, ...statusHooks }));
  };

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
        setIsValidate={setValidateFields}
        onClear={clearFunction}
        onUpdate={onUpdate}
        onDelete={onDelete}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        captions={{ itemType: 'Cчет', itemName: wallet.name }}
      />
    </ModalWindowContainer>
  );
};

export default WalletEdit;
