export class ErrorWithCode extends Error {
  code: string;

  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

// Categories types
// export type CategoryType = {
//   id: string;
//   name: string;
//   iconName: string;
//   color: string;
//   description: string;
//   type: 'expense' | 'income' | 'transfer';
//   subcategories: SubcategoryType[];
// };

// export type SubcategoryType = {
//   id: string;
//   name: string;
//   iconName: string;
//   description: string;
// };

// export type CategoriesStateType = {
//   list: CategoryType[];
// };
//
// export type CategoryAddType = {
//   name: string;
//   iconName: string;
//   color: string;
//   description: string;
//   type: 'expense' | 'income' | 'transfer';
// };
//
// export type SubcategoryAddType = {
//   name: string;
//   iconName: string;
//   description: string;
// };
//
// export type CategoryUpdateType = {
//   name?: string;
//   iconName?: string;
//   color?: string;
//   description?: string;
//   type?: 'expense' | 'income' | 'transfer';
// };
//
// export type SubcategoryUpdateType = {
//   name?: string;
//   iconName?: string;
//   description?: string;
// };
//
// export type subcategoriesHashType = {
//   [key: string]: SubcategoryType;
// };

// export type CategoriesHashType = {
//   [key: string]: {
//     id: string;
//     name: string;
//     iconName: string;
//     color: string;
//     description: string;
//     type: 'expense' | 'income' | 'transfer';
//     subcategories: subcategoriesHashType;
//   };
// };

// Wallet types

// export type walletsHashType = {
//   [key: string]: walletType;
// };

// export const getCategoriesHashState = (categories: CategoriesStateType): CategoriesHashType => {
//   const categoriesHash: CategoriesHashType = {};
//   categories.list.forEach((category) => {
//     categoriesHash[category.id] = { ...category, subcategories: {} };
//     category.subcategories.forEach((subcategory) => {
//       categoriesHash[category.id].subcategories[subcategory.id] = subcategory;
//     });
//   });
//   return categoriesHash;
// };

// export const getWalletsHashState = (wallets: walletsStateType): walletsHashType => {
//   const walletsHash: walletsHashType = {};
//   wallets.list.forEach((wallet) => (walletsHash[wallet.id] = wallet));
//   return walletsHash;
// };
