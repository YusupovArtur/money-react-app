import { QuerySnapshot } from 'firebase/firestore';
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';

const defaultTransaction: TransactionType = {
  type: 'expense',
  time: 0,
  sum: 0,
  fromWallet: '',
  toWallet: '',
  category: '',
  subcategory: '',
  description: '',
};

const isTransaction = (obj: any): obj is TransactionType => {
  return (
    obj &&
    typeof obj === 'object' &&
    (obj.type === 'expense' || obj.type === 'income' || obj.type === 'transfer') &&
    typeof obj.time === 'number' &&
    typeof obj.sum === 'number' &&
    typeof obj.fromWallet === 'string' &&
    typeof obj.toWallet === 'string' &&
    typeof obj.category === 'string' &&
    typeof obj.subcategory === 'string' &&
    typeof obj.description === 'string'
  );
};

const getValidTransaction = (obj: unknown): TransactionType => {
  if (isTransaction(obj)) {
    return obj;
  }
  return defaultTransaction;
};

export const getValidTransactionsList = (querySnapshot: QuerySnapshot): TransactionsListType => {
  const list: TransactionsListType = {};

  querySnapshot.forEach((doc) => {
    list[doc.id] = getValidTransaction(doc.data());
  });

  return list;
};
