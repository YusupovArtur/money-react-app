import { FC, useEffect } from 'react';
import { useAppSelector } from 'store/index.ts';
import { IDInput, IDOptionType } from './components/IDInput.tsx';

interface WalletIDInputProps {
  inputID?: string;
  walletID: string;
  setWalletID: (id: string) => any;
  walletTransactionType: 'to' | 'from';
  firstSelectedWalletID?: string;
  setValidate: () => any;
}

export const WalletIDInput: FC<WalletIDInputProps> = ({
  inputID,
  walletID,
  setWalletID,
  walletTransactionType,
  firstSelectedWalletID,
  setValidate,
}) => {
  const wallets = useAppSelector((state) => state.wallets.list);
  const walletsOrder = useAppSelector((state) => state.wallets.order);
  const wallet = walletID ? wallets[walletID] : undefined;

  useEffect(() => {
    if (firstSelectedWalletID === walletID) {
      setWalletID('');
    }
  }, [firstSelectedWalletID]);

  const option: IDOptionType = {
    id: walletID,
    name: wallet ? wallet.name : walletID ? 'Неизвестный счет' : 'Счет не выбран',
    iconName: wallet ? wallet.iconName : walletID ? 'Exclamation' : 'Question',
    color: wallet ? wallet.color : '',
  };

  const options: IDOptionType[] = [
    { id: '', name: 'Не выбран', iconName: 'Question', color: '' },
    ...walletsOrder
      .filter((optionID) => optionID !== firstSelectedWalletID)
      .map((id) => {
        return {
          id,
          name: wallets[id].name,
          color: wallets[id].color,
          iconName: wallets[id].iconName,
        };
      }),
  ];

  return (
    <IDInput
      inputID={inputID}
      option={option}
      options={options}
      setID={setWalletID}
      setValidate={setValidate}
      topBorderColor={walletTransactionType === 'from' ? 'danger' : 'success'}
    />
  );
};

// <button
//   key={optionID}
//   onClick={() => {
//     setIsValidate((state) => ({ ...state, fromWallet: true, toWallet: true }));
//     setWalletID(optionID);
//   }}
//   className={`dropdown-option-list-item ${optionID === walletID ? 'active' : ''}`}
// >
//   <EntityIcon iconName={wallets[optionID].iconName} color={wallets[optionID].color} iconSize={optionIconSize} />
//   <span className="text-truncate ms-1 me-2">{wallets[optionID].name}</span>
//   <span style={{ marginLeft: 'auto', fontWeight: 500 }}>
//                     {`${getStringBalance(wallets[optionID].balance)} ₽`}
//                   </span>
// </button>
