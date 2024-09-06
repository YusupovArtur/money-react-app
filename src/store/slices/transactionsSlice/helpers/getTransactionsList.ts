import { QuerySnapshot } from 'firebase/firestore';
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';

export const getTransactionsList = (querySnapshot: QuerySnapshot): TransactionsListType => {
  const list: TransactionsListType = {};

  querySnapshot.forEach((doc) => {
    list[doc.id] = doc.data() as TransactionType;
  });

  return list;
};
