import { FC, useRef, useState } from 'react';
import { WalletWidgetItem } from 'pages/MainPage/widgets/WalletsWidget/WalletWidgetItem.tsx';
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { changeWalletsWidgetSettings } from 'store/slices/settingsSlice';

interface WalletWidgetItemsListProps {}

export const WalletWidgetItemsList: FC<WalletWidgetItemsListProps> = () => {
  const order = useAppSelector((state) => state.settings.settings.widgetsSettings.walletsWidget.order);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // noinspection DuplicatedCode
  const dragStartRef = useRef<number | null>(null);
  const onDragStart = (index: number) => () => {
    dragStartRef.current = index;
  };
  const onDrop = (index: number) => () => {
    if (dragStartRef.current !== null) {
      dispatch(
        changeWalletsWidgetSettings({
          action: {
            type: 'shift',
            payload: { index1: dragStartRef.current, index2: index },
          },
          setIsLoading: setIsLoading,
        }),
      );
      dragStartRef.current = null;
    }
  };

  return (
    <>
      {order.map((id, index) => {
        return (
          <WalletWidgetItem
            key={id + index.toString()}
            id={id}
            index={index}
            onDragStart={onDragStart(index)}
            onDrop={onDrop(index)}
          />
        );
      })}
    </>
  );
};
