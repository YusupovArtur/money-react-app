import React from 'react';
import { operationType, walletType } from 'store/types';
// Inputs
import TransactionTypeToggle from 'components/pages/transactions_page/transaction_form/TransactionTypeToggle';
import NumberInput from 'components/small_components/NumberInput';
import DateInput from 'components/small_components/date_input/DateInput';
import WalletMenu from 'components/small_components/dropdowns/WalletMenu';
// Types
import { dateStateType } from 'components/small_components/date_input/types';
import { getDateStateFromTimestamp } from 'components/small_components/date_input/functions';
// Icons
import { ArrowRightIconSVG } from 'components/small_components/icons_svg/IconsSVG';

const TransactionForm: React.FC<{
  formData: operationType;
  setFormData: React.Dispatch<React.SetStateAction<operationType>>;
  type: 'expense' | 'income' | 'transfer' | 'optional';
  stringNumber: string;
  setStringNumber: React.Dispatch<React.SetStateAction<string>>;
  dateState: dateStateType;
  setDateState: React.Dispatch<React.SetStateAction<dateStateType>>;
  fromWallet: walletType | undefined;
  setFromWallet: React.Dispatch<React.SetStateAction<walletType | undefined>>;
  toWallet: walletType | undefined;
  setToWallet: React.Dispatch<React.SetStateAction<walletType | undefined>>;
}> = ({
  formData,
  setFormData,
  type,
  stringNumber,
  setStringNumber,
  dateState,
  setDateState,
  fromWallet,
  setFromWallet,
  toWallet,
  setToWallet,
}) => {
  return (
    <>
      <div className="d-flex flex-column">
        {type && (
          <TransactionTypeToggle
            type={formData.type}
            setType={(type: 'expense' | 'income' | 'transfer') => setFormData((state) => ({ ...state, type: type }))}
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
              setStringNumber('0');
              setDateState(getDateStateFromTimestamp(new Date().getTime()));
              setFromWallet(undefined);
              setToWallet(undefined);
            }}
          ></TransactionTypeToggle>
        )}

        <span className="text-body-tertiary mt-2">
          {formData.type === 'expense' ? 'Сумма расхода' : formData.type === 'income' ? 'Сумма дохода' : 'Сумма перевода'}
        </span>
        <NumberInput
          stringNumber={stringNumber}
          setStringNumber={setStringNumber}
          setNumberFunction={(number: number) => setFormData((state) => ({ ...state, sum: number }))}
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
      <div className="d-flex flex-row justify-content-center align-items-center">
        {(formData.type === 'expense' || formData.type === 'transfer') && (
          <WalletMenu
            wallet={fromWallet}
            setWallet={setFromWallet}
            setWalletIDFunction={(walletID: string) => setFormData((state) => ({ ...state, fromWallet: walletID }))}
          ></WalletMenu>
        )}
        {formData.type === 'transfer' && <ArrowRightIconSVG iconSize="1.5rem"></ArrowRightIconSVG>}
        {(formData.type === 'income' || formData.type === 'transfer') && (
          <WalletMenu
            wallet={toWallet}
            setWallet={setToWallet}
            setWalletIDFunction={(walletID: string) => setFormData((state) => ({ ...state, toWallet: walletID }))}
            selectedWallet={fromWallet}
          ></WalletMenu>
        )}
      </div>
    </>
  );
};

export default TransactionForm;
