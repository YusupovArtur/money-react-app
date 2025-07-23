import { Dispatch, DragEventHandler, FC, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { selectWalletsList, selectWalletsOrder } from 'store/slices/walletsSlice';
import { IDInputDropdown, IDOptionType } from 'shared/inputs';
import { DropdownContainer } from 'shared/containers';
import { changeWalletsWidgetSettings } from 'store/slices/settingsSlice';
import { WalletWidgetItemInfo } from 'pages/MainPage/widgets/WalletsWidget/WalletWidgetItemInfo.tsx';
import { selectBodyBackgroundColor, selectBodyTertiaryBackgroundColor } from 'store/slices/themeSlice';

interface WalletWidgetItemProps {
  id: string;
  index: number;
  widgetWalletsOrderSet: Set<string>;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const WalletWidgetItem: FC<WalletWidgetItemProps> = ({
  id,
  index,
  widgetWalletsOrderSet,
  onDragStart,
  onDrop,
  setErrorMessage,
  isLoading,
  setIsLoading,
}) => {
  const dispatch = useAppDispatch();

  const wallets = useAppSelector(selectWalletsList);
  const walletsOrder = useAppSelector(selectWalletsOrder);
  const uniqueWalletsOrder = walletsOrder.filter((id) => !widgetWalletsOrderSet.has(id));

  const bodyColor = useAppSelector(selectBodyTertiaryBackgroundColor);
  const DELETE_ACTION_ID = 'THIS_ID_FOR_DELETE_ITEM_FROM_WIDGET';
  const options: IDOptionType[] = [
    { id: DELETE_ACTION_ID, name: 'Скрыть', iconName: 'EyeSlashFill', color: bodyColor },
    ...uniqueWalletsOrder.map((id) => ({
      id,
      name: wallets[id].name,
      color: wallets[id].color,
      iconName: wallets[id].iconName,
    })),
  ];

  const setId = (id: string) => {
    if (id === DELETE_ACTION_ID) {
      dispatch(
        changeWalletsWidgetSettings({
          action: { type: 'delete', payload: index },
          setIsLoading: setIsLoading,
          setErrorMessage: setErrorMessage,
        }),
      );
    } else {
      dispatch(
        changeWalletsWidgetSettings({
          action: { type: 'change', payload: { id: id, index: index } },
          setErrorMessage: setErrorMessage,
          setIsLoading: setIsLoading,
        }),
      );
    }
  };

  return (
    <>
      <DropdownContainer
        disabled={isLoading}
        DropdownToggle={<WalletWidgetItemInfo id={id} onDragStart={onDragStart} onDrop={onDrop} isLoading={isLoading} />}
        DropdownMenu={
          <IDInputDropdown setID={setId} option={id} options={options} />
          // <>
          //   {uniqueWalletsOrder.length > 0 ? (
          //     <IDInputDropdown setID={setId} option={id} options={options} />
          //   ) : (
          //     <DropdownMenuWrapper>
          //       <span className="m-2">Все счета уже внесены</span>
          //     </DropdownMenuWrapper>
          //   )}
          // </>
        }
        isModalDropdownContainerForMobileDevice={true}
      ></DropdownContainer>
    </>
  );
};
