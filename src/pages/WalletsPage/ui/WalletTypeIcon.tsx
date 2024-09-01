import { FC } from 'react';
import { WalletType } from 'store/slices/walletsSlice';
import { CashStackIcon } from './CashStackIcon.tsx';
import { PercentIcon } from './PercentIcon.tsx';
import { GraphUpArrowIcon } from './GraphUpArrowIcon.tsx';

export const WalletTypeIcon: FC<{ type: WalletType['type'] }> = ({ type }) => {
  switch (type) {
    case 'debit':
      return (
        <div className="text-primary">
          <CashStackIcon iconSize="1.4rem" />
        </div>
      );
    case 'credit':
      return (
        <div className="text-danger">
          <PercentIcon iconSize="1.4rem" />
        </div>
      );
    case 'investment':
      return (
        <div className="text-success">
          <GraphUpArrowIcon iconSize="1.4rem" />
        </div>
      );
    default:
      return null;
  }
};
