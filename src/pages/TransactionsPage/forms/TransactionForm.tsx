import { Dispatch, FC, SetStateAction } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
// Inputs
import { TransactionTypeToggle } from './ui/TransactionTypeToggle.tsx';
import { DateInput, NumberInput, WalletIDInput } from 'shared/inputs';
// Icons
import { ArrowRightIcon } from './ui/ArrowRight.tsx';

interface TransactionFormProps {
  formData: TransactionType;
  setFormData: Dispatch<SetStateAction<TransactionType>>;
  type: TransactionType['type'] | 'optional';
}

export const TransactionForm: FC<TransactionFormProps> = ({ formData, setFormData, type }) => {
  const onClear = () => {
    setFormData((state) => ({
      ...state,
      sum: 0,
      time: new Date().getTime(),
      fromWallet: '',
      toWallet: '',
      category: '',
      subcategory: '',
      description: '',
    }));
  };

  return (
    <>
      <div className="d-flex flex-column">
        {type && (
          <TransactionTypeToggle
            type={formData.type}
            setType={(type: TransactionType['type']) => setFormData((state) => ({ ...state, type }))}
            onClear={onClear}
          ></TransactionTypeToggle>
        )}

        <span className="text-body-tertiary mt-2">
          {formData.type === 'expense' ? 'Сумма расхода' : formData.type === 'income' ? 'Сумма дохода' : 'Сумма перевода'}
        </span>
        <NumberInput
          number={formData.sum}
          setNumber={(number: number) => setFormData((state) => ({ ...state, sum: number }))}
        ></NumberInput>

        <span className="text-body-tertiary mt-2">Дата операции</span>
        <DateInput
          timestamp={formData.time}
          setTimestamp={(timestamp: number) => setFormData((state) => ({ ...state, time: timestamp }))}
          isModalForMobileDevice={true}
        ></DateInput>

        <span className="text-body-tertiary mt-2">
          {formData.type === 'expense' ? 'Счет расхода' : formData.type === 'income' ? 'Счет дохода' : 'Счета перевода'}
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {(formData.type === 'expense' || formData.type === 'transfer') && (
          <WalletIDInput
            walletID={formData.fromWallet}
            setWalletID={(walletID: string) => setFormData((state) => ({ ...state, fromWallet: walletID }))}
          ></WalletIDInput>
        )}
        {formData.type === 'transfer' && <ArrowRightIcon iconSize="1.5rem" />}
        {(formData.type === 'income' || formData.type === 'transfer') && (
          <WalletIDInput
            walletID={formData.toWallet}
            setWalletID={(walletID: string) => setFormData((state) => ({ ...state, toWallet: walletID }))}
            firstSelectedWalletID={formData.fromWallet}
          ></WalletIDInput>
        )}
      </div>
    </>
  );
};
