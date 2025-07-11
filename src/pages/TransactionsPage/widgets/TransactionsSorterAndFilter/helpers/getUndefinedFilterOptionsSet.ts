import { TransactionType } from 'store/slices/transactionsSlice';
import { store } from 'store/index.ts';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionFieldCaptionKeyType.ts';
import { selectCategory, selectSubcategory } from 'store/slices/categoriesSlice';
import { selectWallet } from 'store/slices/walletsSlice';

export const getUndefinedFilterOptionsSet = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  options: TransactionType[T][];
  optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>>;
}): Set<TransactionType[T]> => {
  const { fieldKey, options, optionKeys } = props;

  if (fieldKey === 'time' || fieldKey === 'type' || fieldKey === 'sum') {
    return new Set();
  }

  const state = store.getState();

  if (fieldKey === 'fromWallet' || fieldKey === 'toWallet') {
    const undefinedSet = new Set<TransactionType[T]>();

    options.forEach((option) => {
      const wallet = selectWallet(option as string)(state);
      if (wallet === undefined) {
        undefinedSet.add(option);
      }
    });

    return undefinedSet;
  }

  if (fieldKey === 'category') {
    const undefinedSet = new Set<TransactionType[T]>();

    options.forEach((option) => {
      const category = selectCategory(option as string)(state);
      if (category === undefined && option !== '') {
        undefinedSet.add(option);
      }
    });

    return undefinedSet;
  }

  if (fieldKey === 'subcategory') {
    const undefinedSet = new Set<TransactionType[T]>();

    options.forEach((option) => {
      if (option !== '') {
        const optionKey: TransactionFieldCaptionKeyType<'subcategory'> = (
          optionKeys as Record<TransactionType['subcategory'], TransactionFieldCaptionKeyType<'subcategory'>>
        )[option as TransactionType['subcategory']];
        const subcategory = selectSubcategory(optionKey)(state);

        if (subcategory === undefined) {
          undefinedSet.add(option);
        }
      }
    });

    return undefinedSet;
  }

  return new Set();
};
