import React, { useState } from 'react';
import { operationType } from 'store/types';
// Inputs
import NumberInput from 'components/small_components/NumberInput';
import DateInput from 'components/big_components/date_input_legacy/DateInput';

const TransactionForm: React.FC<{
  formData: operationType;
  setFormData: React.Dispatch<React.SetStateAction<operationType>>;
  type: 'expense' | 'income' | 'transfer';
}> = ({ formData, setFormData }) => {
  const [dateString, setDateString] = useState('');

  return (
    <div className="d-flex flex-column">
      <span className="text-body-tertiary mt-2">Сумма на счете</span>
      <NumberInput
        number={formData.sum}
        setNumber={(number: number) => setFormData((state) => ({ ...state, sum: number }))}
      ></NumberInput>
      <DateInput dateInputValue={dateString} setDateInputValue={setDateString}></DateInput>
    </div>
  );
};

export default TransactionForm;
