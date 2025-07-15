import { QuerySnapshot } from 'firebase/firestore';
import { WalletsListType, WalletsOrderedListType, WalletType } from 'store/slices/walletsSlice';
import { getValidOrder } from 'store/helpers/getValidOrder.ts';

const defaultWallet: WalletType = {
  type: 'debit',
  name: '',
  balance: 0,
  iconName: '',
  color: '',
  description: '',
};
const isWallet = (obj: any): obj is WalletType => {
  return (
    obj &&
    typeof obj === 'object' &&
    (obj.type === 'debit' || obj.type === 'credit' || obj.type === 'investment') &&
    typeof obj.name === 'string' &&
    typeof obj.balance === 'number' &&
    typeof obj.iconName === 'string' &&
    typeof obj.color === 'string' &&
    typeof obj.description === 'string'
  );
};
const getValidWallet = (obj: unknown): WalletType => {
  if (isWallet(obj)) {
    return obj;
  }
  return defaultWallet;
};

export const getValidWalletsOrderedList = (querySnapshot: QuerySnapshot): WalletsOrderedListType => {
  const list: WalletsListType = {};
  let order: string[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.id === 'order') {
      order = getValidOrder(doc.data());
    } else {
      list[doc.id] = getValidWallet(doc.data());
    }
  });

  return { list, order };
};
