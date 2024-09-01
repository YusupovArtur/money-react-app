import { Dispatch, FC, SetStateAction } from 'react';
import { WalletType } from 'store/slices/walletsSlice';
import { RadioButtonGroup, RadioOptions } from 'shared/inputs';

interface WalletsFilterProps {
  filter: WalletType['type'] | null;
  setFilter: Dispatch<SetStateAction<WalletType['type'] | null>>;
}

export const WalletsFilter: FC<WalletsFilterProps> = ({ filter, setFilter }) => {
  const options: RadioOptions<WalletType['type'] | null> = [
    { value: null, label: 'Все', className: 'btn-outline-primary flex-shrink-0' },
    { value: 'debit', label: 'Дебетовые', className: 'btn-outline-primary flex-shrink-1' },
    { value: 'credit', label: 'Кредитовые', className: 'btn-outline-danger flex-shrink-1' },
    { value: 'investment', label: 'Инвестиционные', className: 'btn-outline-success flex-shrink-1' },
  ];

  return <RadioButtonGroup option={filter} setOption={setFilter} options={options} />;
};
