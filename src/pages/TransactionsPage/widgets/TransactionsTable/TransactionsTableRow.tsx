import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { getStringDate } from 'shared/helpers';
import { getTransactionFormatedSum } from 'pages/TransactionsPage/helpers/getTransactionFormatedSum.ts';
import { TransactionEntityTypeIcon } from 'entities/EntitiesComponents';
import { WalletShortInfo } from 'pages/TransactionsPage/ui/WalletShortInfo.tsx';
import { CategoryShortInfo } from 'pages/TransactionsPage/ui/CategoryShortInfo.tsx';
import { SubcategoryShortInfo } from 'pages/TransactionsPage/ui/SubcategoryShortInfo.tsx';
import { ArrowRightIcon } from 'pages/TransactionsPage/forms/TransactionForm/ui/ArrowRight.tsx';

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
      <td style={{ textAlign: 'center' }}>{getStringDate(new Date(time))}</td>

      {/*Icon*/}
      <td style={{ padding: '7px 5px' }}>
        <div className="d-flex justify-content-center align-items-center">
          <TransactionEntityTypeIcon type={type} iconSize="1.2rem" />
        </div>
      </td>

      {/*Sum*/}
      <td className={color} style={{ textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {formatedSum}
      </td>

      {/*Wallets*/}
      {type === 'expense' ? (
        <td colSpan={2} style={{ maxWidth: '10%' }}>
          <div className="d-flex justify-content-start">
            <WalletShortInfo id={fromWallet}></WalletShortInfo>
          </div>
        </td>
      ) : type === 'income' ? (
        <td colSpan={2} style={{ maxWidth: '10%' }}>
          <div className="d-flex justify-content-start">
            <WalletShortInfo id={toWallet}></WalletShortInfo>
          </div>
        </td>
      ) : (
        <>
          <td style={{ maxWidth: '5%', paddingRight: 24.6 }}>
            <div className="d-flex justify-content-between align-items-center position-relative">
              <WalletShortInfo id={fromWallet} className="me-1" />
              <div className="d-flex align-items-center position-absolute" style={{ right: -24.6 }}>
                <ArrowRightIcon iconSize="1.2rem" />
              </div>
            </div>
          </td>
          <td style={{ maxWidth: '5%', paddingLeft: 5.4 }}>
            <div className="d-flex justify-content-start">
              <WalletShortInfo id={toWallet} className="ms-1" />
            </div>
          </td>
        </>
      )}

      {/*Category*/}
      <td colSpan={2}>
        <div className="d-flex justify-content-start">
          <CategoryShortInfo id={category} type={type} />
        </div>
      </td>

      {/*Subcategory*/}
      <td>
        <div className="d-flex justify-content-start">
          <SubcategoryShortInfo categoryID={category} subcategoryID={subcategory} type={type} />
        </div>
      </td>
    </tr>
  );
};
