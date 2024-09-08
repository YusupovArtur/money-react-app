import { FC } from 'react';
// Store
import { useAppSelector } from 'store/store.ts';
import { selectWallet } from 'store/slices/walletsSlice';
import { selectCategory, selectSubcategory } from 'store/slices/categoriesSlice';
import { TransactionType } from 'store/slices/transactionsSlice';
// UI
import { getTransactionEntityTypeName, TransactionEntityTypeIcon } from 'entities/EntitiesComponents';
import { EntityFieldLabel, EntityFieldValue } from 'shared/ui';
// Helpers
import { getStringCurrencyValue, getStringDate } from 'shared/helpers';
import { getTransactionSumColor } from 'pages/TransactionsPage/helpers/getTransactionSumColor.ts';
import { getTransactionSignedSum } from 'pages/TransactionsPage/helpers/getTransactionSignedSum.ts';
import { getTransactionSumSign } from 'pages/TransactionsPage/helpers/getTransactionSumSign.ts';
import { WalletShortInfo } from 'pages/TransactionsPage/ui/WalletShortInfo.tsx';
import { ArrowRightIcon } from 'pages/TransactionsPage/forms/TransactionForm/ui/ArrowRight.tsx';
import { CategoryShortInfo } from 'pages/TransactionsPage/ui/CategoryShortInfo.tsx';
import { SubcategoryShortInfo } from 'pages/TransactionsPage/ui/SubcategoryShortInfo.tsx';
import { CategoryIcon, WalletIcon } from 'shared/icons';

export const TransactionEditInfo: FC<{ transaction: TransactionType }> = ({ transaction }) => {
  const { type, time, description } = transaction;
  const sum = getTransactionSignedSum(transaction);
  const sign = getTransactionSumSign(type);
  const sumColor = getTransactionSumColor(type);

  const fromWallet = useAppSelector(selectWallet(transaction.fromWallet));
  const toWallet = useAppSelector(selectWallet(transaction.toWallet));
  const category = useAppSelector(selectCategory(transaction.category));
  const subcategory = useAppSelector(
    selectSubcategory({
      categoryID: transaction.category,
      subcategoryID: transaction.subcategory,
    }),
  );

  const iconSize = '2.3rem';

  return (
    <div className="d-flex flex-column align-items-start mx-2 mb-4">
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

      {/*Wallets*/}
      <div className="d-flex align-items-center mt-3">
        <WalletIcon iconSize="1rem"></WalletIcon>
        <EntityFieldLabel className="ms-1">
          {type === 'expense' ? 'Счет расхода' : type === 'income' ? 'Счет дохода' : 'Счета перевода'}
        </EntityFieldLabel>
      </div>
      {type === 'expense' && <WalletShortInfo id={transaction.fromWallet} wallet={fromWallet} iconSize={iconSize} />}
      {type === 'income' && <WalletShortInfo id={transaction.toWallet} wallet={toWallet} iconSize={iconSize} />}
      {type === 'transfer' && (
        <div className="d-flex align-items-center w-100">
          <WalletShortInfo
            id={transaction.fromWallet}
            wallet={fromWallet}
            iconSize={iconSize}
            style={{ maxWidth: 'calc(50% - 1.25rem)' }}
          />
          <div className="mx-2">
            <ArrowRightIcon iconSize="1.5rem" />
          </div>
          <WalletShortInfo
            id={transaction.toWallet}
            wallet={toWallet}
            iconSize={iconSize}
            style={{ maxWidth: 'calc(50% - 1.25rem)' }}
          />
        </div>
      )}

      {/*Category*/}
      <div className="d-flex w-100">
        <div className="d-flex flex-column align-items-start w-50">
          <div className="d-flex align-items-center mt-3">
            <CategoryIcon iconSize="1rem" />
            <EntityFieldLabel className="ms-1">Категория</EntityFieldLabel>
          </div>
          <CategoryShortInfo category={category} iconSize={iconSize} />
        </div>
        <div className="d-flex flex-column align-items-start w-50">
          <EntityFieldLabel className="mt-3">Подкатегория</EntityFieldLabel>
          <SubcategoryShortInfo category={category} subcategory={subcategory} iconSize={iconSize} />
        </div>
      </div>

      {/* Описание счета */}
      {description && (
        <>
          <EntityFieldLabel className="mt-3">Описание</EntityFieldLabel>
          <EntityFieldValue>{description}</EntityFieldValue>
        </>
      )}
    </div>
  );
};
