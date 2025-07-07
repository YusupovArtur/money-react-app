import { ReactNode } from 'react';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionFieldCaptionKeyType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { getStringDate } from 'shared/helpers';
import { WalletShortInfo } from 'pages/TransactionsPage/ui/WalletShortInfo.tsx';
import { CategoryShortInfo } from 'pages/TransactionsPage/ui/CategoryShortInfo.tsx';
import { SubcategoryShortInfo } from 'pages/TransactionsPage/ui/SubcategoryShortInfo.tsx';

interface TransactionsFilterMenuOptionProps<T extends keyof TransactionType> {
  fieldKey: T;
  optionKey: TransactionFieldCaptionKeyType<T>;
}

export const TransactionsFilterMenuOption = <T extends keyof TransactionType>({
  fieldKey,
  optionKey,
}: TransactionsFilterMenuOptionProps<T>): ReactNode => {
  if (fieldKey === 'fromWallet' || fieldKey === 'toWallet') {
  }

  // Time
  if (fieldKey === 'time') {
    return <div>{getStringDate(new Date(optionKey as TransactionFieldCaptionKeyType<'time'>))}</div>;
  }

  // Type
  if (fieldKey === 'type') {
    if (optionKey === 'expense') {
      return 'Расходы';
    } else if (optionKey === 'income') {
      return 'Доходы';
    } else {
      return 'Переводы';
    }
  }

  // Sum
  if (fieldKey === 'sum') {
    return (
      <div>
        {(optionKey as TransactionFieldCaptionKeyType<'sum'>).sum *
          ((optionKey as TransactionFieldCaptionKeyType<'sum'>).type === 'expense' ? -1 : 1)}
      </div>
    );
  }

  // Wallets
  if (fieldKey === 'fromWallet' || fieldKey === 'toWallet') {
    return <WalletShortInfo id={optionKey as TransactionFieldCaptionKeyType<'fromWallet'>}></WalletShortInfo>;
  }

  // Categories
  if (fieldKey === 'category') {
    return <CategoryShortInfo id={optionKey as TransactionFieldCaptionKeyType<'category'>} type={'transfer'} />;
  }

  // Subcategories
  if (fieldKey === 'subcategory') {
    return (
      <SubcategoryShortInfo
        categoryID={(optionKey as TransactionFieldCaptionKeyType<'subcategory'>).categoryID}
        subcategoryID={(optionKey as TransactionFieldCaptionKeyType<'subcategory'>).subcategoryID}
      ></SubcategoryShortInfo>
    );
  }

  return <div>{JSON.stringify(optionKey)}</div>;
};
