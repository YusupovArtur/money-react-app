import { FC } from 'react';
import { WalletType } from 'store/slices/walletsSlice';
import { RadioButtonGroup, RadioOptions } from 'shared/inputs';
import { getWalletTypeName } from 'pages/WalletsPage/helpers/getWalletTypeName.ts';

interface WalletTypeInputProps {
  type: WalletType['type'];
  setType: (type: WalletType['type']) => any;
  id?: string;
}

export const WalletTypeInput: FC<WalletTypeInputProps> = ({ type, setType, id }) => {
  const options: RadioOptions<WalletType['type']> = [
    { value: 'debit', label: getWalletTypeName('debit'), className: 'btn-outline-primary' },
    { value: 'credit', label: getWalletTypeName('credit'), className: 'btn-outline-danger' },
    { value: 'investment', label: getWalletTypeName('investment'), className: 'btn-outline-success' },
  ];

  return (
    <>
      <input id={id} type="text" value={type || ''} readOnly={true} style={{ display: 'none' }} />

      <RadioButtonGroup option={type} setOption={setType} options={options} />
    </>
  );
};
