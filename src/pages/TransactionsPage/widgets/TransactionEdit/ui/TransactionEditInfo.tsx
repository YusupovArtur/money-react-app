import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectWallet } from 'store/slices/walletsSlice';
import { TransactionType } from 'store/slices/transactionsSlice';
import { selectCategory, selectSubcategory } from 'store/slices/categoriesSlice';
import { getTransactionEntityTypeName, TransactionEntityTypeIcon } from 'entities/EntitiesComponents';
import { EntityFieldLabel, EntityFieldValue } from 'shared/ui';
import { getStringCurrencyValue, getStringDate } from 'shared/helpers';
import { getTransactionSumColor } from 'pages/TransactionsPage/helpers/getTransactionSumColor.ts';
import { getTransactionSignedSum } from 'pages/TransactionsPage/helpers/getTransactionSignedSum.ts';
import { getTransactionSumSign } from 'pages/TransactionsPage/helpers/getTransactionSumSign.ts';

export const TransactionEditInfo: FC<{ transaction: TransactionType }> = ({ transaction }) => {
  const { type, time, description } = transaction;
  const sum = getTransactionSignedSum(transaction);
  const sign = getTransactionSumSign(type);
  const sumColor = getTransactionSumColor(type);

  const fromWallet = useSelector(selectWallet(transaction.fromWallet));
  const toWallet = useSelector(selectWallet(transaction.toWallet));
  const category = useSelector(selectCategory(transaction.category));
  const subcategory = useSelector(
    selectSubcategory({
      categoryID: transaction.category,
      subcategoryID: transaction.subcategory,
    }),
  );

  return (
    <div className="d-flex flex-column mx-2 mb-4">
      {/*Type*/}
      <EntityFieldLabel>Тип транзакции</EntityFieldLabel>
      <div className="d-flex align-items-center">
        <TransactionEntityTypeIcon type={type} />
        <EntityFieldValue className="ms-2">{getTransactionEntityTypeName(type)}</EntityFieldValue>
      </div>

      {/*Sum*/}
      <EntityFieldLabel className="mt-3">Сумма</EntityFieldLabel>
      <EntityFieldValue className={sumColor}>{getStringCurrencyValue({ value: sum, sign })}</EntityFieldValue>

      {/*Date*/}
      <EntityFieldLabel className="mt-3">Дата</EntityFieldLabel>
      <EntityFieldValue>{getStringDate(time)}</EntityFieldValue>
    </div>
  );
};
