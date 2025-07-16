import { DragEventHandler, FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { selectWalletsList, selectWalletsOrder } from 'store/slices/walletsSlice';
import { IDInputDropdown, IDOptionType } from 'shared/inputs';
import { DropdownContainer } from 'shared/containers';
import { changeWalletsWidgetSettings } from 'store/slices/settingsSlice';
import { WalletWidgetItemInfo } from 'pages/MainPage/widgets/WalletsWidget/WalletWidgetItemInfo.tsx';

interface WalletWidgetItemProps {
  id: string;
  index: number;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
}

export const WalletWidgetItem: FC<WalletWidgetItemProps> = ({ id, index, onDragStart, onDrop }) => {
  const dispatch = useAppDispatch();

  const wallets = useAppSelector(selectWalletsList);
  const walletsOrder = useAppSelector(selectWalletsOrder);
  const options: IDOptionType[] = walletsOrder.map((id) => ({
    id,
    name: wallets[id].name,
    color: wallets[id].color,
    iconName: wallets[id].iconName,
  }));

  const setId = (id: string) => {
    dispatch(changeWalletsWidgetSettings({ action: { type: 'change', payload: { id: id, index: index } } }));
  };

  return (
    <DropdownContainer
      DropdownToggle={<WalletWidgetItemInfo id={id} onDragStart={onDragStart} onDrop={onDrop} />}
      DropdownMenu={<IDInputDropdown setID={setId} option={id} options={options} />}
    ></DropdownContainer>
  );
};
