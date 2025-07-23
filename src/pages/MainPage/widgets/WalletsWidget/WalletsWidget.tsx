import { FC, useState } from 'react';
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

  const [errorMessageWidgetItemChange, setErrorMessageWidgetItemChange] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-start">
        <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>Мои счета</span>
        <WalletWidgetSettings isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>

      <div className="d-flex flex-wrap align-items-center gap-2 placeholder-wave">
        {isLoadingWallets !== false && isLoadingSettings !== false ? (
          <>
            {[4, 2, 3].map((index) => (
              <span key={index} style={{ height: '3.984rem' }} className={`placeholder col-${index}`}></span>
            ))}
          </>
        ) : (
          <WalletWidgetItemsList
            setErrorMessage={setErrorMessageWidgetItemChange}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
      <AlertMessage alertMessage={errorMessageWallets || errorMessageSettings} className="alert-danger mt-1 w-100" />
      <AlertMessage alertMessage={errorMessageWidgetItemChange} className="alert-danger mt-1 w-100" />
    </div>
  );
};
