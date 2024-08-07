import { QuerySnapshot } from 'firebase/firestore';
import { WalletsListType, WalletsOrderedListType, WalletType } from 'store/slices/walletsSlice';

export const getWalletsOrderedList = (querySnapshot: QuerySnapshot): WalletsOrderedListType => {
  const list: WalletsListType = {};
  let order: string[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.id === 'order') {
      order = (doc.data() as { order: string[] }).order;
    } else {
      list[doc.id] = doc.data() as WalletType;
    }
  });

  return { list, order };
};
