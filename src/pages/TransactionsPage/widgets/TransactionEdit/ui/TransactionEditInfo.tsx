import { FC } from 'react';
// Store
import { TransactionType } from 'store/slices/transactionsSlice';
// UI
import { getTransactionEntityTypeName, TransactionEntityTypeIcon } from 'entities/EntitiesComponents';
import { EntityFieldLabel, EntityFieldValue } from 'shared/ui';
import { ArrowRightIcon, CategoryIcon, WalletIcon } from 'shared/icons';
import { WalletShortInfo } from 'pages/TransactionsPage/ui/WalletShortInfo.tsx';
import { CategoryShortInfo } from 'pages/TransactionsPage/ui/CategoryShortInfo.tsx';
import { SubcategoryShortInfo } from 'pages/TransactionsPage/ui/SubcategoryShortInfo.tsx';
// Helpers
import { getStringDate } from 'shared/helpers';
import { getTransactionFormatedSum } from 'pages/TransactionsPage/helpers/getTransactionFormatedSum.ts';

export const TransactionEditInfo: FC<{ transaction: TransactionType }> = ({ transaction }) => {
  const { type, time, fromWallet, toWallet, category, subcategory, description } = transaction;
  const { formatedSum, color } = getTransactionFormatedSum(transaction);

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
      <EntityFieldValue className={color}>{formatedSum}</EntityFieldValue>

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
      {type === 'expense' && <WalletShortInfo id={fromWallet} iconSize={iconSize} />}
      {type === 'income' && <WalletShortInfo id={toWallet} iconSize={iconSize} />}
      {type === 'transfer' && (
        <div className="d-flex align-items-center w-100">
          <WalletShortInfo
            id={fromWallet}
            iconSize={iconSize}
            className="w-100 flex-fill"
            style={{ maxWidth: 'calc(50% - 1.25rem)' }}
          />
          <div className="flex-grow-0 flex-shrink-1 mx-2 mx-2">
            <ArrowRightIcon iconSize="1.5rem" />
          </div>
          <WalletShortInfo
            id={toWallet}
            iconSize={iconSize}
            className="w-100 flex-fill"
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
          <CategoryShortInfo id={category} type={type} iconSize={iconSize} />
        </div>
        <div className="d-flex flex-column align-items-start w-50">
          <EntityFieldLabel className="mt-3">Подкатегория</EntityFieldLabel>
          <SubcategoryShortInfo categoryID={category} subcategoryID={subcategory} iconSize={iconSize} />
        </div>
      </div>

      {/* Описание счета */}
      {description && (
        <>
          <EntityFieldLabel className="mt-3">Описание</EntityFieldLabel>
          <EntityFieldValue style={{ fontWeight: 400 }}>{description}</EntityFieldValue>
        </>
      )}
    </div>
  );
};
