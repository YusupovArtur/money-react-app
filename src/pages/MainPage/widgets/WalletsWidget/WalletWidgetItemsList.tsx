import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { WalletWidgetItem } from 'pages/MainPage/widgets/WalletsWidget/WalletWidgetItem.tsx';
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { changeWalletsWidgetSettings } from 'store/slices/settingsSlice';
import { ButtonWithIcon } from 'shared/ui';
import { PlusIcon } from 'shared/icons';

interface WalletWidgetItemsListProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export const WalletWidgetItemsList: FC<WalletWidgetItemsListProps> = ({ setErrorMessage, isLoading, setIsLoading }) => {
  const widgetWalletsOrder = useAppSelector((state) => state.settings.settings.widgetsSettings.walletsWidget.order);
  const emptiesNum = widgetWalletsOrder.reduce((acc, cur) => acc + (cur ? 0 : 1), 0);

  const widgetWalletsOrderSet = new Set(widgetWalletsOrder);

  const dispatch = useAppDispatch();

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
          setErrorMessage: setErrorMessage,
        }),
      );
      dragStartRef.current = null;
    }
  };

  const addHandler = () => {
    dispatch(
      changeWalletsWidgetSettings({
        action: { type: 'add' },
        setIsLoading: setIsLoading,
        setErrorMessage: setErrorMessage,
      }),
    );
  };

  return (
    <>
      {widgetWalletsOrder.map((id, index) => {
        return (
          <WalletWidgetItem
            key={id + index.toString()}
            id={id}
            widgetWalletsOrderSet={widgetWalletsOrderSet}
            index={index}
            onDragStart={onDragStart(index)}
            onDrop={onDrop(index)}
            setErrorMessage={setErrorMessage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      })}
      <ButtonWithIcon
        disabled={isLoading || emptiesNum > 0}
        onClick={addHandler}
        className="btn-body-tertiary rounded-circle"
        style={{ padding: 6 }}
      >
        <PlusIcon iconSize="1.5rem" />
      </ButtonWithIcon>
    </>
  );
};
