import { Dispatch, DragEventHandler, FC, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { selectWalletsList, selectWalletsOrder } from 'store/slices/walletsSlice';
import { IDInputDropdown, IDOptionType } from 'shared/inputs';
import { DropdownContainer } from 'shared/containers';
import { changeWalletsWidgetSettings } from 'store/slices/settingsSlice';
import { WalletWidgetItemInfo } from 'pages/MainPage/widgets/WalletsWidget/WalletWidgetItemInfo.tsx';
import { DropdownMenuWrapper } from 'shared/ui';

interface WalletWidgetItemProps {
  id: string;
  index: number;
  orderSet: Set<string>;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
}

export const WalletWidgetItem: FC<WalletWidgetItemProps> = ({ id, index, orderSet, onDragStart, onDrop, setErrorMessage }) => {
  const dispatch = useAppDispatch();

  const wallets = useAppSelector(selectWalletsList);
  const walletsOrder = useAppSelector(selectWalletsOrder);
  const uniqueWalletsOrder = walletsOrder.filter((id) => !orderSet.has(id));
  const options: IDOptionType[] = uniqueWalletsOrder.map((id) => ({
    id,
    name: wallets[id].name,
    color: wallets[id].color,
    iconName: wallets[id].iconName,
  }));

  const setId = (id: string) => {
    dispatch(changeWalletsWidgetSettings({ action: { type: 'change', payload: { id: id, index: index } }, setErrorMessage }));
  };

  return (
    <>
      <DropdownContainer
        DropdownToggle={<WalletWidgetItemInfo id={id} onDragStart={onDragStart} onDrop={onDrop} />}
        DropdownMenu={
          <>
            {uniqueWalletsOrder.length > 0 ? (
              <IDInputDropdown setID={setId} option={id} options={options} />
            ) : (
              <DropdownMenuWrapper>
                <span className="m-2">Все счета уже внесены</span>
              </DropdownMenuWrapper>
            )}
          </>
        }
        isModalDropdownContainerForMobileDevice={true}
      ></DropdownContainer>
    </>
  );
};
