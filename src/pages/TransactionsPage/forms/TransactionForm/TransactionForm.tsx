import { Dispatch, FC, SetStateAction, useId } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
// Inputs
import { DateInput, NumberInput, TextInput } from 'shared/inputs';
import { TransactionTypeInput } from 'pages/TransactionsPage/inputs/TransactionTypeInput.tsx';
// Icons
import { EntityFieldValue, FormLabel, FormValidationFeedback } from 'shared/ui';
import { getTransactionEntityTypeName, TransactionEntityTypeIcon } from 'entities/EntitiesComponents';
import { WalletsIDForm } from './components/WalletsIDForm.tsx';
import { CategoryAndSubcategoryIDForm } from 'pages/TransactionsPage/forms/TransactionForm/components/CategoryAndSubcategoryIDForm.tsx';
import { getValidityClassName, useFormValidation } from 'shared/hooks';
import { getTodayTimestamp } from 'shared/helpers';

interface TransactionFormProps {
  type: TransactionType['type'] | null;
  formData: TransactionType;
  setFormData: Dispatch<SetStateAction<TransactionType>>;
  validation: ReturnType<typeof useFormValidation<TransactionType>>;
  setIsValidate: Dispatch<SetStateAction<{ [K in keyof TransactionType]?: boolean }>>;
}

export const TransactionForm: FC<TransactionFormProps> = ({ type, formData, setFormData, validation, setIsValidate }) => {
  const { fieldValidities, fieldFeedbacks } = validation;

  const typeInputID = useId();
  const sumInputID = useId();
  const dateInputID = useId();
  const descriptionInputID = useId();

  const onClear = () => {
    setFormData((state) => ({
      ...state,
      sum: 0,
      time: getTodayTimestamp(),
      fromWallet: '',
      toWallet: '',
      category: '',
      subcategory: '',
      description: '',
    }));
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} className="d-flex flex-column mb-3">
      {/*Type*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor={typeInputID} style={{ display: 'block' }}>
          Тип транзакции
        </FormLabel>
        {type === null ? (
          <TransactionTypeInput
            id={typeInputID}
            type={formData.type}
            setType={(type: TransactionType['type']) => setFormData((state) => ({ ...state, type }))}
            onClear={onClear}
          ></TransactionTypeInput>
        ) : (
          <div className="d-flex align-items-center">
            <input id={typeInputID} type="text" value={type || ''} readOnly={true} style={{ display: 'none' }} />
            <TransactionEntityTypeIcon type={formData.type} />
            <EntityFieldValue className="ms-2">{getTransactionEntityTypeName(formData.type)}</EntityFieldValue>
          </div>
        )}
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.type} className="align-items-start" />
      </div>

      {/*Sum*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor={sumInputID}>
          {formData.type === 'expense' ? 'Сумма расхода' : formData.type === 'income' ? 'Сумма дохода' : 'Сумма перевода'}
        </FormLabel>
        <NumberInput
          id={sumInputID}
          number={formData.sum}
          setNumber={(number: number) => {
            setFormData((state) => ({ ...state, sum: number }));
            setIsValidate((state) => ({ ...state, sum: true }));
          }}
          className={getValidityClassName(fieldValidities.sum)}
          onBlur={() => {
            setIsValidate((state) => ({ ...state, sum: true }));
          }}
        ></NumberInput>
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.sum} />
      </div>

      {/*Time*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor={dateInputID}>Дата</FormLabel>
        <DateInput
          id={dateInputID}
          timestamp={formData.time}
          setTimestamp={(timestamp: number) => setFormData((state) => ({ ...state, time: timestamp }))}
          isModalForMobileDevice={true}
          className={getValidityClassName(fieldValidities.time)}
        ></DateInput>
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.time} />
      </div>

      {/*Wallets*/}
      <div className="position-relative mb-4">
        <WalletsIDForm
          formData={formData}
          setFormData={setFormData}
          isValid={fieldValidities.toWallet ? fieldValidities.toWallet : fieldValidities.fromWallet}
          setIsValidate={setIsValidate}
        />
        <FormValidationFeedback
          feedbackMessage={fieldFeedbacks.fromWallet ? fieldFeedbacks.fromWallet : fieldFeedbacks.toWallet}
          className="align-items-start ms-1"
        />
      </div>

      {/*Category*/}
      <div className="position-relative mb-4">
        <CategoryAndSubcategoryIDForm
          formData={formData}
          setFormData={setFormData}
          isValidCategory={fieldValidities.category}
          isValidSubcategory={fieldValidities.subcategory}
          setIsValidate={setIsValidate}
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.category} className="align-items-start ms-1" />
        <FormValidationFeedback
          feedbackMessage={fieldFeedbacks.subcategory}
          className="align-items-start"
          style={{ paddingLeft: '50%' }}
        />
      </div>

      {/*Description*/}
      <div className="position-relative mb-3">
        <FormLabel htmlFor={descriptionInputID}>Описание</FormLabel>
        <TextInput
          id={descriptionInputID}
          value={formData.description}
          onChange={(event) => setFormData((state) => ({ ...state, description: event.target.value }))}
        />
      </div>
    </form>
  );
};
