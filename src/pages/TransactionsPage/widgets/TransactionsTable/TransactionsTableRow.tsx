import { JSX, memo } from 'react';
// Helpers
import { getStringDate } from 'shared/helpers';
import { getTransactionFormatedSum } from 'pages/TransactionsPage/helpers/getTransactionFormatedSum.ts';
// UI
import { WalletShortInfo } from 'pages/TransactionsPage/ui/WalletShortInfo.tsx';
import { CategoryShortInfo } from 'pages/TransactionsPage/ui/CategoryShortInfo.tsx';
import { SubcategoryShortInfo } from 'pages/TransactionsPage/ui/SubcategoryShortInfo.tsx';
import { useMediaQuery } from 'shared/hooks';
import { ArrowRightIcon } from 'shared/icons';
import { TypeIcon } from 'entities/EntitiesComponents';
import { MEDIUM_WINDOW_MEDIA_QUERY } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/MEDIA_QUERY_CONSTANTS.ts';
import { TRANSACTION_TABLE_PROPORTIONS } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/TRANSACTION_TABLE_PROPORTIONS.ts';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';

interface TransactionsTableRowProps {
  id: string;
  transaction: TransactionType;
  setTransactionID: (id: string) => any;
}

export const TransactionsTableRow = memo(({ id, transaction, setTransactionID }: TransactionsTableRowProps): JSX.Element => {
  const { time, type, fromWallet, toWallet, category, subcategory } = transaction;

  const handleSetTransactionID = () => {
    setTransactionID(id);
  };

  const isMedium = useMediaQuery(MEDIUM_WINDOW_MEDIA_QUERY);
  const { formatedSum, color } = getTransactionFormatedSum(transaction);

  return (
    <tr onClick={handleSetTransactionID}>
      {/*Time*/}
      <td style={{ width: TRANSACTION_TABLE_PROPORTIONS.timeWidth, padding: '7px 5px', textAlign: 'center' }}>
        {getStringDate(time)}
      </td>

      {/*Type*/}
      <td style={{ width: TRANSACTION_TABLE_PROPORTIONS.typeWidth, padding: '7px 5px' }}>
        <div className="d-flex justify-content-center align-items-center">
          <TypeIcon type={type} iconSize="1.2rem" />
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
        <td colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan}>
          <div className="d-flex justify-content-start">
            <WalletShortInfo id={fromWallet}></WalletShortInfo>
          </div>
        </td>
      ) : type === 'income' ? (
        <td colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan}>
          <div className="d-flex justify-content-start">
            <WalletShortInfo id={toWallet}></WalletShortInfo>
          </div>
        </td>
      ) : (
        <td colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan}>
          <div className="d-flex justify-content-start align-items-center w-100">
            <div className="d-flex justify-content-between align-items-center" style={{ width: 'calc(50% - 0.75rem)' }}>
              <WalletShortInfo id={fromWallet} className="me-1" />
            </div>
            <div className="d-flex align-items-center flex-shrink-0">
              <ArrowRightIcon iconSize="1.2rem" />
            </div>
            <div className="d-flex justify-content-start align-items-center" style={{ width: 'calc(50% - 0.75rem)' }}>
              <WalletShortInfo id={toWallet} className="ms-1" />
            </div>
          </div>
        </td>
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
});
