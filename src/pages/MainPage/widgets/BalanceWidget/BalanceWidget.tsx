import { FC } from 'react';
import { useAppSelector } from 'store/store.ts';
import { selectWalletsList, selectWalletsOrder } from 'store/slices/walletsSlice';
import { getStringCurrencyValue } from 'shared/helpers';

interface BalanceWidgetProps {}

export const BalanceWidget: FC<BalanceWidgetProps> = () => {
  const order = useAppSelector(selectWalletsOrder);
  const wallets = useAppSelector(selectWalletsList);
  const totals = useAppSelector((state) => state.transactions.walletsTransactionsTotals);

  const isLoadingWallets = useAppSelector((state) => state.wallets.responseState.isLoading);
  const isLoadingTransactions = useAppSelector((state) => state.transactions.responseState.isLoading);
  const isLoading = isLoadingWallets !== false || isLoadingTransactions !== false;

  let balance: number = 0;
  for (let id of order) {
    balance += wallets[id].balance;
  }

  for (let id of Object.keys(totals)) {
    balance += totals[id];
  }

  const balanceColor = balance < 0 ? 'text-danger' : '';

  return (
    <div className="placeholder-wave">
      <div style={{ fontSize: '1.1rem', fontWeight: 500 }} className="mb-2">
        Мой баланс
      </div>
      {isLoading ? (
        <span style={{ height: '1.95rem' }} className="placeholder col-6"></span>
      ) : (
        <div style={{ fontSize: '1.3rem', fontWeight: 500 }} className={`align-self-end ${balanceColor}`}>
          {getStringCurrencyValue({ value: balance })}
        </div>
      )}
    </div>
  );
};
