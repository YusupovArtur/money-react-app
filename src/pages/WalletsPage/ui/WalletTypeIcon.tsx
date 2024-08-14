import { FC } from 'react';
import { WalletType } from 'store/slices/walletsSlice';
import { CashStackIcon } from './CashStackIcon.tsx';
import { PercentIcon } from './PercentIcon.tsx';
import { GraphUpArrowIcon } from './GraphUpArrowIcon.tsx';

export const WalletTypeIcon: FC<{ type: WalletType['type'] }> = ({ type }) => {
  switch (type) {
    case 'debit':
      return (
        <div style={{ color: '#0d6efd' }}>
          <CashStackIcon iconSize="1.4rem" />
        </div>
      );
    case 'credit':
      return (
        <div style={{ color: '#dc3545' }}>
          <PercentIcon iconSize="1.4rem" />
        </div>
      );
    case 'investment':
      return (
        <div style={{ color: '#198754' }}>
          <GraphUpArrowIcon iconSize="1.4rem" />
        </div>
      );
    default:
      return null;
  }
};
