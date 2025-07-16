import { FC } from 'react';
import { useAppSelector } from 'store/store.ts';
// Components
import { WalletWidgetSettings } from 'pages/MainPage/widgets/WalletsWidget/WalletWidgetSettings.tsx';
import { AlertMessage } from 'shared/ui';
import { WalletWidgetItemsList } from 'pages/MainPage/widgets/WalletsWidget/WalletWidgetItemsList.tsx';

export const WalletsWidget: FC = () => {
  const isLoadingWallets = useAppSelector((state) => state.wallets.responseState.isLoading);
  const errorMessageWallets = useAppSelector((state) => state.wallets.responseState.errorMessage);
  const isLoadingSettings = useAppSelector((state) => state.settings.responseState.isLoading);
  const errorMessageSettings = useAppSelector((state) => state.settings.responseState.errorMessage);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center">
        <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>Мои счета</span>
        <WalletWidgetSettings />
      </div>

      <div className="d-flex flex-wrap align-items-center gap-2 placeholder-wave">
        {isLoadingWallets !== false && isLoadingSettings !== false ? (
          <>
            {[4, 2, 3].map((index) => (
              <span key={index} style={{ height: '3.984rem' }} className={`placeholder col-${index}`}></span>
            ))}
          </>
        ) : (
          <WalletWidgetItemsList />
        )}

        <AlertMessage alertMessage={errorMessageWallets || errorMessageSettings} className="alert-danger mt-1 w-100" />
      </div>
    </div>
  );
};
