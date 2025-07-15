import { CSSProperties, FC } from 'react';
import { ListItemFieldValue, ListItemWrapper } from 'shared/ui';
import { TransactionType } from 'store/slices/transactionsSlice';
import { useAppSelector } from 'store/store.ts';
import { selectWallet, WalletType } from 'store/slices/walletsSlice';
import { useGetDisplayedCategory } from 'store/slices/categoriesSlice';
import { EntityIcon } from 'entities/EntityIcon';
import { getTransactionFormatedSum } from 'pages/TransactionsPage/helpers/getTransactionFormatedSum.ts';
import { TransactionEntityTypeIcon } from 'entities/EntitiesComponents';
import { getStringDate } from 'shared/helpers';
import { ArrowRightIcon } from 'pages/TransactionsPage/forms/TransactionForm/ui/ArrowRight.tsx';

interface TransactionsListItemProps {
  id: string;
  transaction: TransactionType;
  setTransactionID: (id: string) => any;
}

export const TransactionsListItem: FC<TransactionsListItemProps> = ({ id, transaction, setTransactionID }) => {
  // Transaction parameters
  const { time, type, fromWallet: fromWalletId, toWallet: toWalletId, category: categoryId } = transaction;

  const { formatedSum, color } = getTransactionFormatedSum(transaction);

  const fromWallet = useAppSelector(selectWallet(fromWalletId));
  const toWallet = useAppSelector(selectWallet(toWalletId));

  const { displayedCategory: category } = useGetDisplayedCategory({
    id: categoryId,
    type: type,
    isDefaultIconForTransferTypeCategory: true,
  });

  // Styles
  const nowrapStyle: CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  };
  const fontSizeSmall = '0.82rem';

  const handleSetTransactionID = () => {
    setTransactionID(id);
  };

  const WalletNameSpan: FC<{ wallet: WalletType | undefined; style?: CSSProperties }> = ({ wallet, style }) => {
    return (
      <span className="text-body-tertiary" style={{ flexShrink: 1, fontSize: fontSizeSmall, ...nowrapStyle, ...style }}>
        {wallet ? wallet.name : 'Неизвестный счет'}
      </span>
    );
  };

  const WalletsCaption: FC = () => {
    if (type === 'expense') {
      return <WalletNameSpan wallet={fromWallet} />;
    }
    if (type === 'income') {
      return <WalletNameSpan wallet={toWallet} />;
    }
    if (type === 'transfer') {
      return (
        <div className="d-flex align-items-center text-body-tertiary" style={{ flexShrink: 1, maxWidth: '100%' }}>
          <WalletNameSpan wallet={fromWallet} style={{ marginRight: 2 }} />
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <ArrowRightIcon iconSize="0.7rem" />
          </div>
          <WalletNameSpan wallet={toWallet} style={{ marginLeft: 2 }} />
        </div>
      );
    }
  };

  return (
    <ListItemWrapper onClick={handleSetTransactionID}>
      <div className="d-flex align-items-center me-5" style={{ flexShrink: 1, minWidth: 0 }}>
        <EntityIcon iconName={category.iconName} color={category.color} iconSize="2.3rem" />
        <div className="d-flex flex-column align-items-start ms-2" style={{ flexShrink: 1, minWidth: 0 }}>
          <ListItemFieldValue style={{ fontWeight: 400 }}>{category.name}</ListItemFieldValue>
          <WalletsCaption />
        </div>
      </div>

      <div className="d-flex flex-column align-items-end">
        <div className="d-flex align-items-center">
          <ListItemFieldValue className={`me-2 ${color}`} style={{ fontWeight: 500, ...nowrapStyle }}>
            {formatedSum}
          </ListItemFieldValue>
          <TransactionEntityTypeIcon type={type} iconSize="1.2rem" />
        </div>
        <span className="text-body-tertiary" style={{ fontSize: fontSizeSmall, ...nowrapStyle }}>
          {getStringDate(time)}
        </span>
      </div>
    </ListItemWrapper>
  );
};
