import { FC } from 'react';
// Helpers
import { getStringDate } from 'shared/helpers';
import { getTransactionFormatedSum } from 'pages/TransactionsPage/helpers/getTransactionFormatedSum.ts';
// UI
import { WalletShortInfo } from 'pages/TransactionsPage/ui/WalletShortInfo.tsx';
import { CategoryShortInfo } from 'pages/TransactionsPage/ui/CategoryShortInfo.tsx';
import { SubcategoryShortInfo } from 'pages/TransactionsPage/ui/SubcategoryShortInfo.tsx';
import { ArrowRightIcon } from 'pages/TransactionsPage/forms/TransactionForm/ui/ArrowRight.tsx';
import { useMediaQuery } from 'shared/hooks';
import { TransactionEntityTypeIcon } from 'entities/EntitiesComponents';
import { MEDIUM_WINDOW_MEDIA_QUERY } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/MEDIA_QUERY_CONSTANTS.ts';
import { TRANSACTION_TABLE_PROPORTIONS } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/TRANSACTION_TABLE_PROPORTIONS.ts';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';

interface TransactionsTableRowProps {
  id: string;
  transaction: TransactionType;
  setTransactionID: (id: string) => any;
}

export const TransactionsTableRow: FC<TransactionsTableRowProps> = ({ id, transaction, setTransactionID }) => {
  const { time, type, fromWallet, toWallet, category, subcategory } = transaction;

  const handleSetTransactionID = () => {
    setTransactionID(id);
  };

  const isMedium = useMediaQuery(MEDIUM_WINDOW_MEDIA_QUERY);
  const { formatedSum, color } = getTransactionFormatedSum(transaction);

  // Time
  // Icon
  // Sum
  // Wallets
  // Category
  // Subcategory

  return (
    <tr onClick={handleSetTransactionID}>
      {/*Time*/}
      <td style={{ width: TRANSACTION_TABLE_PROPORTIONS.timeWidth, padding: '7px 5px', textAlign: 'center' }}>
        {getStringDate(new Date(time))}
      </td>

      {/*Type*/}
      <td style={{ width: TRANSACTION_TABLE_PROPORTIONS.typeWidth, padding: '7px 5px' }}>
        <div className="d-flex justify-content-center align-items-center">
          <TransactionEntityTypeIcon type={type} iconSize="1.2rem" />
        </div>
      </td>

      {/*Sum*/}
      <td
        colSpan={TRANSACTION_TABLE_PROPORTIONS.sumColSpan}
        className={color}
        style={{
          width: TRANSACTION_TABLE_PROPORTIONS.sumWidth,
          textAlign: 'right',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {formatedSum}
      </td>

      {/*Wallets*/}
      {type === 'expense' ? (
        <td colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan} style={{ maxWidth: '10%' }}>
          <div className="d-flex justify-content-start">
            <WalletShortInfo id={fromWallet}></WalletShortInfo>
          </div>
        </td>
      ) : type === 'income' ? (
        <td colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan} style={{ maxWidth: '10%' }}>
          <div className="d-flex justify-content-start">
            <WalletShortInfo id={toWallet}></WalletShortInfo>
          </div>
        </td>
      ) : (
        <>
          <td colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan / 2} style={{ maxWidth: '5%', paddingRight: 24.6 }}>
            <div className="d-flex justify-content-between align-items-center position-relative">
              <WalletShortInfo id={fromWallet} className="me-1" />
              <div className="d-flex align-items-center position-absolute" style={{ right: -24.6 }}>
                <ArrowRightIcon iconSize="1.2rem" />
              </div>
            </div>
          </td>
          <td colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan / 2} style={{ maxWidth: '5%', paddingLeft: 5.4 }}>
            <div className="d-flex justify-content-start">
              <WalletShortInfo id={toWallet} className="ms-1" />
            </div>
          </td>
        </>
      )}

      {/*Category*/}
      <td colSpan={TRANSACTION_TABLE_PROPORTIONS.categoryColSpan}>
        <div className="d-flex justify-content-start">
          <CategoryShortInfo id={category} type={type} isDefaultIconForTransferTypeCategory={true} />
        </div>
      </td>

      {/*Subcategory*/}
      {!isMedium && (
        <td colSpan={TRANSACTION_TABLE_PROPORTIONS.subcategoryColSpan}>
          <div className="d-flex justify-content-start">
            <SubcategoryShortInfo categoryID={category} subcategoryID={subcategory} type={type} />
          </div>
        </td>
      )}
    </tr>
  );
};
