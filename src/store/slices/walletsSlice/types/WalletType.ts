export type WalletType = {
  name: string;
  balance: number;
  iconName: string;
  color: string;
  description: string;
  type: 'debit' | 'credit' | 'investment';
};
