import { Dispatch, SetStateAction } from 'react';

export class ErrorWithCode extends Error {
  code: string;

  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

export type serverResponseStatusHooks = {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  onFulfilled?: () => void;
};

// Categories types
export type categoryType = {
  id: string;
  name: string;
  iconName: string;
  color: string;
  description: string;
  type: 'expense' | 'income' | 'transfer';
  subcategories: subcategoryType[];
};

export type subcategoryType = {
  id: string;
  name: string;
  iconName: string;
  description: string;
};

export type categoriesStateType = {
  list: categoryType[];
};

export type categoryAddType = {
  name: string;
  iconName: string;
  color: string;
  description: string;
  type: 'expense' | 'income' | 'transfer';
};

export type subcategoryAddType = {
  name: string;
  iconName: string;
  description: string;
};

export type categoryUpdateType = {
  name?: string;
  iconName?: string;
  color?: string;
  description?: string;
  type?: 'expense' | 'income' | 'transfer';
};

export type subcategoryUpdateType = {
  name?: string;
  iconName?: string;
  description?: string;
};

export type categoriesHashType = {
  [key: string]: {
    id: string;
    name: string;
    iconName: string;
    color: string;
    description: string;
    type: 'expense' | 'income' | 'transfer';
    subcategories: subcategoriesHashType;
  };
};

export type subcategoriesHashType = {
  [key: string]: subcategoryType;
};

// Wallet types
export type walletType = {
  id: string;
  name: string;
  balance: number;
  iconName: string;
  color: string;
  description: string;
  type: 'debit' | 'credit' | 'investment';
};

export type walletsStateType = {
  list: walletType[];
};

export type walletAddType = {
  name: string;
  balance: number;
  iconName: string;
  color: string;
  description: string;
  type: 'debit' | 'credit' | 'investment';
};

export type walletUpdateType = {
  name?: string;
  balance?: number;
  iconName?: string;
  color?: string;
  description?: string;
  type?: 'debit' | 'credit' | 'investment';
};

export type walletsHashType = {
  [key: string]: walletType;
};

export const WALLETS_LIST_LAST_ITEM_ID = 'THIS_A_WALLETS_LIST_LAST_ITEM_ID';
export const CATEGORIES_LIST_LAST_ITEM_ID = 'THIS_A_CATEGORIES_LIST_LAST_ITEM_ID';
export const SUBCATEGORIES_LIST_LAST_ITEM_ID = 'THIS_A_SUBCATEGORIES_LIST_LAST_ITEM_ID';

export const getCategoriesHashState = (categories: categoriesStateType): categoriesHashType => {
  const categoriesHash: categoriesHashType = {};
  categories.list.forEach((category) => {
    categoriesHash[category.id] = { ...category, subcategories: {} };
    category.subcategories.forEach((subcategory) => {
      categoriesHash[category.id].subcategories[subcategory.id] = subcategory;
    });
  });
  return categoriesHash;
};

export const getWalletsHashState = (wallets: walletsStateType): walletsHashType => {
  const walletsHash: walletsHashType = {};
  wallets.list.forEach((wallet) => (walletsHash[wallet.id] = wallet));
  return walletsHash;
};
