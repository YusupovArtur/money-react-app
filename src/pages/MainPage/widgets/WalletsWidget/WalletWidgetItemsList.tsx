import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { WalletWidgetItem } from 'pages/MainPage/widgets/WalletsWidget/WalletWidgetItem.tsx';
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { changeWalletsWidgetSettings } from 'store/slices/settingsSlice';
import { ButtonWithIcon } from 'shared/ui';
import { PlusIcon } from 'shared/icons';

interface WalletWidgetItemsListProps {
  setErrorMessage?: Dispatch<SetStateAction<string>>;
}

export const WalletWidgetItemsList: FC<WalletWidgetItemsListProps> = ({ setErrorMessage }) => {
  const order = useAppSelector((state) => state.settings.settings.widgetsSettings.walletsWidget.order);
  const orderSet = new Set(order);

  const dispatch = useAppDispatch();
  const [_, setIsLoading] = useState<boolean>(false);

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

  const addHandler = () => {
    dispatch(changeWalletsWidgetSettings({ action: { type: 'add' } }));
  };

  return (
    <>
      {order.map((id, index) => {
        return (
          <WalletWidgetItem
            key={id + index.toString()}
            id={id}
            orderSet={orderSet}
            index={index}
            onDragStart={onDragStart(index)}
            onDrop={onDrop(index)}
            setErrorMessage={setErrorMessage}
          />
        );
      })}
      <ButtonWithIcon onClick={addHandler} className="btn-body-tertiary rounded-circle" style={{ padding: 6 }}>
        <PlusIcon iconSize="1.5rem" />
      </ButtonWithIcon>
    </>
  );
};
