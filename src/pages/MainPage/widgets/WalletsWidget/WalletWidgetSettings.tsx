import { FC, useRef, useState } from 'react';
import { CrossIcon, GearFillIcon, PlusIcon } from 'shared/icons';
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { DropdownContainer } from 'shared/containers';
import { ButtonWithIcon, DropdownMenuWrapper } from 'shared/ui';
import { WalletShortInfo } from 'pages/TransactionsPage/ui/WalletShortInfo.tsx';
import { changeWalletsWidgetSettings } from 'store/slices/settingsSlice';

export const WalletWidgetSettings: FC = () => {
  const order = useAppSelector((state) => state.settings.settings.widgetsSettings.walletsWidget.order);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteHandler = (index: number) => () => {
    dispatch(changeWalletsWidgetSettings({ action: { type: 'delete', payload: index }, setIsLoading: setIsLoading }));
  };
  const addHandler = () => {
    dispatch(changeWalletsWidgetSettings({ action: { type: 'add' }, setIsLoading: setIsLoading }));
  };

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
    <DropdownContainer
      isInsideClickClose={false}
      isModalDropdownContainerForMobileDevice={true}
      menuAlignment={{ x: 'left', y: 'bottom' }}
      DropdownToggle={
        <ButtonWithIcon className="btn-body-tertiary">
          <GearFillIcon iconSize="1.5rem" />
        </ButtonWithIcon>
      }
      DropdownMenu={
        order.length > 0 && (
          <DropdownMenuWrapper className="align-items-start" style={{ minWidth: '14rem' }}>
            {order.map((id, index) => {
              return (
                <div
                  key={id + index.toString()}
                  className={`d-flex justify-content-between align-items-center w-100 ${index ? 'pt-2' : ''}`}
                  draggable={!isLoading}
                  onDragStart={onDragStart(index)}
                  onDrop={onDrop(index)}
                >
                  <WalletShortInfo id={id} />
                  <ButtonWithIcon disabled={isLoading} onClick={deleteHandler(index)} className="btn-outline-danger ms-1 p-1">
                    <CrossIcon iconSize="1rem" />
                  </ButtonWithIcon>
                </div>
              );
            })}
            <ButtonWithIcon onClick={addHandler} disabled={isLoading} className="btn-outline-primary p-1 mt-3 w-100">
              <PlusIcon iconSize="1rem" />
            </ButtonWithIcon>
          </DropdownMenuWrapper>
        )
      }
    />
  );
};
