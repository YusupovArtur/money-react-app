import { store } from 'store/index.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { selectCategory, selectSubcategory } from 'store/slices/categoriesSlice';
import { selectWallet } from 'store/slices/walletsSlice';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionFieldCaptionKeyType.ts';

type TransactionSortWeightType<T extends keyof TransactionType> = T extends 'time' | 'sum' | 'type' ? number : string;

interface GetTransactionFieldSortWeightSignatures {
  <T extends keyof TransactionType>(props: { transaction: TransactionType; key: T }): TransactionSortWeightType<T>;

  <T extends keyof TransactionType>(props: {
    captionKey: TransactionFieldCaptionKeyType<T>;
    key: T;
  }): TransactionSortWeightType<T>;
}

const getWeightFromSum = (props: { type: TransactionType['type']; sum: number }): number => {
  const { type, sum } = props;
  if (type === 'expense') {
    return -sum;
  } else {
    return sum;
  }
};

const getWeightFromType = (type: TransactionType['type']): number => {
  switch (type) {
    case 'transfer':
      return 1;
    case 'expense':
      return 2;
    case 'income':
      return 3;
    default:
      return 0;
  }
};

const getWeightFromWallet = (walletID: string): string => {
  const state = store.getState();
  const wallet = selectWallet(walletID)(state);
  return wallet ? wallet.name : 'undefined';
};

const getWeightFromCategory = (categoryID: string): string => {
  const state = store.getState();
  const category = selectCategory(categoryID)(state);
  return category ? category.name : 'undefined';
};

const getWeightFromSubcategory = (props: { categoryID: string; subcategoryID: string }): string => {
  const state = store.getState();
  const subcategory = selectSubcategory(props)(state);
  return subcategory ? subcategory.name : 'undefined';
};

export const getTransactionFieldSortWeight: GetTransactionFieldSortWeightSignatures = <T extends keyof TransactionType>(props: {
  key: T;
  transaction?: TransactionType;
  captionKey?: TransactionFieldCaptionKeyType<T>;
}): TransactionSortWeightType<T> => {
  const { transaction, captionKey, key } = props;

  // Time Description
  if (key === 'time' || key === 'description') {
    if (transaction) {
      return transaction[key] as TransactionSortWeightType<T>;
    }
    if (captionKey) {
      return captionKey as TransactionSortWeightType<T>;
    }
  }

  // Sum
  if (key === 'sum') {
    if (transaction) {
      return getWeightFromSum({ type: transaction.type, sum: transaction.sum }) as TransactionSortWeightType<T>;
    }
    if (captionKey) {
      return getWeightFromSum({
        type: (captionKey as TransactionFieldCaptionKeyType<'sum'>).type,
        sum: (captionKey as TransactionFieldCaptionKeyType<'sum'>).sum,
      }) as TransactionSortWeightType<T>;
    }
  }

  // Type
  if (key === 'type') {
    if (transaction) {
      return getWeightFromType(transaction.type) as TransactionSortWeightType<T>;
    }
    if (captionKey) {
      return getWeightFromType(captionKey as TransactionFieldCaptionKeyType<'type'>) as TransactionSortWeightType<T>;
    }
  }

  // Wallets
  if (key === 'fromWallet' || key === 'toWallet') {
    if (transaction) {
      const fromWalletName = getWeightFromWallet(transaction.fromWallet);
      const toWalletName = getWeightFromWallet(transaction.toWallet);
      switch (transaction.type) {
        case 'transfer':
          return (fromWalletName + toWalletName) as TransactionSortWeightType<T>;
        case 'expense':
          return fromWalletName as TransactionSortWeightType<T>;
        case 'income':
          return toWalletName as TransactionSortWeightType<T>;
        default:
          return 'undefined' as TransactionSortWeightType<T>;
      }
    }
    if (captionKey) {
      return getWeightFromWallet(captionKey as TransactionFieldCaptionKeyType<'toWallet'>) as TransactionSortWeightType<T>;
    }
  }

  // Category
  if (key === 'category') {
    if (transaction) {
      return getWeightFromCategory(transaction.category) as TransactionSortWeightType<T>;
    }
    if (captionKey) {
      return getWeightFromCategory(captionKey as TransactionFieldCaptionKeyType<'category'>) as TransactionSortWeightType<T>;
    }
  }

  // Subcategory
  if (key === 'subcategory') {
    if (transaction) {
      return getWeightFromSubcategory({
        categoryID: transaction.category,
        subcategoryID: transaction.subcategory,
      }) as TransactionSortWeightType<T>;
    }
    if (captionKey) {
      return getWeightFromSubcategory(
        captionKey as TransactionFieldCaptionKeyType<'subcategory'>,
      ) as TransactionSortWeightType<T>;
    }
  }

  return 0 as TransactionSortWeightType<T>;
};
