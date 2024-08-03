import { Dispatch, FC, SetStateAction } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
// Inputs
import TransactionTypeToggle from '../../../pages/transactions_page/transaction_form/TransactionTypeToggle';
import { NumberInput, WalletIDInput } from 'shared/inputs';
import DateInput from '../../../small_components/date_input/DateInput';
// Types
import { dateStateType } from '../../../small_components/date_input/types';
import { getDateStateFromTimestamp } from '../../../small_components/date_input/functions';
// Icons
import { ArrowRightIconSVG } from '../../../small_components/icons_svg/IconsSVG';

interface TransactionFormProps {
  formData: TransactionType;
  setFormData: Dispatch<SetStateAction<TransactionType>>;
  type: 'expense' | 'income' | 'transfer' | 'optional';
  dateState: dateStateType;
  setDateState: Dispatch<SetStateAction<dateStateType>>;
}

const TransactionForm: FC<TransactionFormProps> = ({ formData, setFormData, type, dateState, setDateState }) => {
  return (
    <>
      <div className="d-flex flex-column">
        {type && (
          <TransactionTypeToggle
            type={formData.type}
            setType={(type: 'expense' | 'income' | 'transfer') => setFormData((state) => ({ ...state, type }))}
            clearFunction={() => {
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
              setDateState(getDateStateFromTimestamp(new Date().getTime()));
            }}
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
          dateState={dateState}
          setDateState={setDateState}
          setTimestampFunction={(timestamp: number) => setFormData((state) => ({ ...state, time: timestamp }))}
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
        {formData.type === 'transfer' && <ArrowRightIconSVG iconSize="1.5rem" />}
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

export default TransactionForm;
