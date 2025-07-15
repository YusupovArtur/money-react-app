import { ButtonHTMLAttributes, FC, useEffect } from 'react';
import { useAppSelector } from 'store/index.ts';
import { IDInput, IDOptionType } from 'shared/inputs';
import { selectDisplayedWallet, selectWalletsList, selectWalletsOrder } from 'store/slices/walletsSlice';

interface WalletIDInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  ...props
}) => {
  const wallet = useAppSelector(selectDisplayedWallet(walletID));
  const wallets = useAppSelector(selectWalletsList);
  const walletsOrder = useAppSelector(selectWalletsOrder);

  useEffect(() => {
    if (firstSelectedWalletID === walletID) {
      setWalletID('');
    }
  }, [firstSelectedWalletID]);

  const option: IDOptionType = {
    id: walletID,
    name: wallet.name,
    iconName: wallet.iconName,
    color: wallet.color,
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
      {...props}
    />
  );
};
