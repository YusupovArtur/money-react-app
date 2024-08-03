export type TransactionType = {
  sum: number;
  time: number;
  type: 'expense' | 'income' | 'transfer';
  fromWallet: string;
  toWallet: string;
  category: string;
  subcategory: string;
  description: string;
};
