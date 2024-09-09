import { Dispatch, FC, SetStateAction, useId } from 'react';
import { WalletIDInput } from 'pages/TransactionsPage/inputs/WalletIDInput.tsx';
import { ArrowRightIcon } from 'pages/TransactionsPage/forms/TransactionForm/ui/ArrowRight.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';
import { ValidityIcon, WalletIcon } from 'shared/icons';
import { FormLabel } from 'shared/ui';
import { OptionalPrimitiveKeysType } from 'shared/types';

interface WalletIDFormProps {
  formData: TransactionType;
  setFormData: Dispatch<SetStateAction<TransactionType>>;
  isValid?: boolean;
  setIsValidate: Dispatch<SetStateAction<OptionalPrimitiveKeysType<TransactionType, boolean>>>;
}

export const WalletsIDForm: FC<WalletIDFormProps> = ({ formData, setFormData, isValid, setIsValidate }) => {
  const walletFromInputID = useId();
  const walletToInputID = useId();

  const setValidate = () => {
    setIsValidate((state) => ({ ...state, fromWallet: true, toWallet: true }));
  };

  const WalletFromInput = (
    <WalletIDInput
      inputID={walletFromInputID}
      walletID={formData.fromWallet}
      setWalletID={(id: string) => {
        setFormData((state) => {
          if (id === state.fromWallet) {
            return state;
          }
          return { ...state, fromWallet: id };
        });
      }}
      walletTransactionType="from"
      setValidate={setValidate}
    ></WalletIDInput>
  );

  const WalletToInput = (
    <WalletIDInput
      inputID={walletToInputID}
      walletID={formData.toWallet}
      firstSelectedWalletID={formData.fromWallet}
      setWalletID={(id: string) => {
        setFormData((state) => {
          if (id === state.toWallet) {
            return state;
          }
          return { ...state, toWallet: id };
        });
      }}
      walletTransactionType="to"
      setValidate={setValidate}
    ></WalletIDInput>
  );

  return (
    <>
      <div className="d-flex align-items-center mx-1">
        <WalletIcon iconSize="1rem" />
        <FormLabel htmlFor={formData.type === 'income' ? walletToInputID : walletFromInputID}>
          {formData.type === 'expense' ? 'Счет расхода' : formData.type === 'income' ? 'Счет дохода' : 'Счета перевода'}
        </FormLabel>
        <ValidityIcon isValid={isValid} iconSize="1.4rem" />
      </div>

      {formData.type === 'expense' && WalletFromInput}
      {formData.type === 'transfer' && (
        <div className="d-flex align-items-center">
          <div className="flex-fill w-100" style={{ maxWidth: 'calc(50% - 1.25rem)' }}>
            {WalletFromInput}
          </div>
          <div className="flex-grow-0 flex-shrink-1 mx-2">
            <ArrowRightIcon iconSize="1.5rem" />
          </div>
          <div className="flex-fill w-100" style={{ maxWidth: 'calc(50% - 1.25rem)' }}>
            {WalletToInput}
          </div>
        </div>
      )}
      {formData.type === 'income' && WalletToInput}
    </>
  );
};
