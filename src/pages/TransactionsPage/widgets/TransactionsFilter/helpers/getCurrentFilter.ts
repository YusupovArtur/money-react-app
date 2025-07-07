import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';

export const getCurrentFilter = (props: {
  fieldKey: keyof TransactionType;
  filter: TransactionsFilterType<keyof TransactionType>;
}): TransactionsFilterType<keyof TransactionType> => {
  const { fieldKey, filter } = props;

  if (fieldKey === filter.key) {
    return filter;
  }

  return { key: fieldKey, filter: null };
};
