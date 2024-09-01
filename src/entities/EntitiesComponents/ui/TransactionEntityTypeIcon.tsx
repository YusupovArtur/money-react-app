import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { ArrowDownRightIcon } from './ArrowDownRightIcon.tsx';
import { ArrowUpRightIcon } from './ArrowUpRightIcon.tsx';
import { ArrowLeftRightIcon } from 'shared/icons';

export const TransactionEntityTypeIcon: FC<{ type: TransactionType['type'] }> = ({ type }) => {
  switch (type) {
    case 'expense':
      return (
        <div style={{ color: '#dc3545' }}>
          <ArrowDownRightIcon iconSize="1.4rem" />
        </div>
      );
    case 'income':
      return (
        <div style={{ color: '#198754' }}>
          <ArrowUpRightIcon iconSize="1.4rem" />
        </div>
      );
    case 'transfer':
      return (
        <div style={{ color: '#0d6efd' }}>
          <ArrowLeftRightIcon iconSize="1.4rem" />
        </div>
      );
    default:
      return null;
  }
};
