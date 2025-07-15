import { collection, getDocs } from 'firebase/firestore';
import { db } from 'app/firebase.ts';

export const getTransactionsQuerySnapshot = async (id: string) => {
  try {
    const transactionsRef = collection(db, 'users_data', id, 'transactions');
    return await getDocs(transactionsRef);
  } catch (error) {
    throw error;
  }
};
