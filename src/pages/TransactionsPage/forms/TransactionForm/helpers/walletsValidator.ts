import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';
import { store } from 'store';

export const walletsValidator = (formData: TransactionType): validatorsReturnType => {
  const { type, fromWallet, toWallet } = formData;
  const state = store.getState();
  const wallets = state.wallets.list;

  if (type === 'income') {
    if (fromWallet) {
      return { isValid: false, feedback: 'Удалите счёт расхода' };
    } else if (!toWallet) {
      return { isValid: false, feedback: 'Введите счёт прихода' };
    } else if (!wallets[toWallet]) {
      return { isValid: false, feedback: 'Несуществует такого счёта прихода' };
    }
  }

  if (type === 'expense') {
    if (!fromWallet) {
      return { isValid: false, feedback: 'Введите счёт расхода' };
    } else if (toWallet) {
      return { isValid: false, feedback: 'Удалите счёт прихода' };
    } else if (!wallets[fromWallet]) {
      return { isValid: false, feedback: 'Несуществует такого счёта расхода' };
    }
  }

  if (type === 'transfer') {
    if (!fromWallet && !toWallet) {
      return { isValid: false, feedback: 'Введите счета перевода' };
    } else if (!fromWallet) {
      return { isValid: false, feedback: 'Введите имя счета прихода' };
    } else if (!toWallet) {
      return { isValid: false, feedback: 'Введите имя счета расхода' };
    } else if (fromWallet === toWallet) {
      return { isValid: false, feedback: 'Счета перевода совпадают' };
    } else if (!wallets[fromWallet]) {
      return { isValid: false, feedback: 'Несуществует такого счёта расхода' };
    } else if (!wallets[toWallet]) {
      return { isValid: false, feedback: 'Несуществует такого счёта прихода' };
    }
  }

  return { isValid: true };
};
