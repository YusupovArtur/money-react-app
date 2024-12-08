import { collection, getDocs } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getTransactionsList } from './getTransactionsList.ts';

export const getTransactionsQuerySnapshot = async (id: string) => {
  try {
    const transactionsRef = collection(db, 'users_data', id, 'transactions');
    const querySnapshot = await getDocs(transactionsRef);
    return getTransactionsList(querySnapshot);
  } catch (error) {
    throw error;
  }
};
