import { store } from 'store/index.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { selectCategory, selectSubcategory } from 'store/slices/categoriesSlice';
import { selectWallet } from 'store/slices/walletsSlice';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionFieldCaptionKeyType.ts';

type TransactionSortWeightType<T extends keyof TransactionType> = T extends 'time' | 'sum' | 'type' ? number : string;

interface GetTransactionFieldSortingWeightSignatures {
  <T extends keyof TransactionType>(props: { fieldKey: T; transaction: TransactionType }): TransactionSortWeightType<T>;

  <T extends keyof TransactionType>(props: {
    fieldKey: T;
    transactionFieldCaptionKey: TransactionFieldCaptionKeyType<T>;
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

export const getTransactionFieldSortingWeight: GetTransactionFieldSortingWeightSignatures = <
  T extends keyof TransactionType,
>(props: {
  fieldKey: T;
  transaction?: TransactionType;
  transactionFieldCaptionKey?: TransactionFieldCaptionKeyType<T>;
}): TransactionSortWeightType<T> => {
  const { transaction, transactionFieldCaptionKey, fieldKey } = props;

  // Time or Description
  if (fieldKey === 'time' || fieldKey === 'description') {
    if (transaction) {
      return transaction[fieldKey] as TransactionSortWeightType<T>;
    }
    if (transactionFieldCaptionKey) {
      return transactionFieldCaptionKey as TransactionSortWeightType<T>;
    }
  }

  // Sum
  if (fieldKey === 'sum') {
    if (transaction) {
      return getWeightFromSum({ type: transaction.type, sum: transaction.sum }) as TransactionSortWeightType<T>;
    }
    if (transactionFieldCaptionKey) {
      return getWeightFromSum({
        type: (transactionFieldCaptionKey as TransactionFieldCaptionKeyType<'sum'>).type,
        sum: (transactionFieldCaptionKey as TransactionFieldCaptionKeyType<'sum'>).sum,
      }) as TransactionSortWeightType<T>;
    }
  }

  // Type
  if (fieldKey === 'type') {
    if (transaction) {
      return getWeightFromType(transaction.type) as TransactionSortWeightType<T>;
    }
    if (transactionFieldCaptionKey) {
      return getWeightFromType(
        transactionFieldCaptionKey as TransactionFieldCaptionKeyType<'type'>,
      ) as TransactionSortWeightType<T>;
    }
  }

  // Wallets
  if (fieldKey === 'fromWallet' || fieldKey === 'toWallet') {
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
    if (transactionFieldCaptionKey) {
      return getWeightFromWallet(
        transactionFieldCaptionKey as TransactionFieldCaptionKeyType<'toWallet'>,
      ) as TransactionSortWeightType<T>;
    }
  }

  // Category
  if (fieldKey === 'category') {
    if (transaction) {
      return getWeightFromCategory(transaction.category) as TransactionSortWeightType<T>;
    }
    if (transactionFieldCaptionKey) {
      return getWeightFromCategory(
        (transactionFieldCaptionKey as TransactionFieldCaptionKeyType<'category'>).categoryID,
      ) as TransactionSortWeightType<T>;
    }
  }

  // Subcategory
  if (fieldKey === 'subcategory') {
    if (transaction) {
      return getWeightFromSubcategory({
        categoryID: transaction.category,
        subcategoryID: transaction.subcategory,
      }) as TransactionSortWeightType<T>;
    }
    if (transactionFieldCaptionKey) {
      return getWeightFromSubcategory(
        transactionFieldCaptionKey as TransactionFieldCaptionKeyType<'subcategory'>,
      ) as TransactionSortWeightType<T>;
    }
  }

  return 0 as TransactionSortWeightType<T>;
};
