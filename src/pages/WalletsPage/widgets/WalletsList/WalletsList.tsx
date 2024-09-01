import { FC, useDeferredValue, useState } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { shiftWallet, WALLETS_LIST_LAST_ITEM_ID, WalletType } from 'store/slices/walletsSlice';
// Components
import { WalletsListItem } from './WalletsListItem.tsx';
import { DraggableContainer } from 'shared/containers';
import { AlertMessage } from 'shared/ui';
import { getDeviceType } from 'shared/helpers';

interface WalletsListProps {
  filter?: WalletType['type'] | null;
}

export const WalletsList: FC<WalletsListProps> = ({ filter }) => {
  const deferredFilter = useDeferredValue(filter);
  const wallets = useAppSelector((state) => state.wallets.list);
  const order = useAppSelector((state) => state.wallets.order).filter((id) =>
    !deferredFilter ? true : deferredFilter === wallets[id].type,
  );

  const errorMessage = useAppSelector((state) => state.wallets.responseState.errorMessage);
  const [shiftIsLoading, setShiftIsLoading] = useState<boolean>(false);
  const [shiftErrorMessage, setShiftErrorMessage] = useState<string>('');

  const draggable = getDeviceType() === 'desktop';
  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => {
    dispatch(
      shiftWallet({
        walletID1: dragStartID,
        walletID2: dropID,
        setIsLoading: setShiftIsLoading,
        setErrorMessage: setShiftErrorMessage,
      }),
    );
  };

  if (errorMessage) {
    return <AlertMessage alertMessage={errorMessage} className="alert-danger my-3" />;
  }

  return (
    <>
      <AlertMessage alertMessage={shiftErrorMessage} className="alert-danger mt-1" />

      {order.map((id, index) => {
        const aboveID = index === 0 ? undefined : order[index - 1];
        const isOpened = id === dragOverID && id !== dragStartID && aboveID !== dragStartID;
        const disabled = shiftIsLoading || (Boolean(dragStartID) && id !== dragStartID);

        return (
          <DraggableContainer
            key={id}
            id={id}
            draggable={draggable && !shiftIsLoading}
            isOpened={isOpened}
            onDrop={dropFunction}
            startID={dragStartID}
            setStartID={setDragStartID}
            setOverID={setDragOverID}
          >
            <WalletsListItem id={id} disabled={disabled} loading={shiftIsLoading} />
          </DraggableContainer>
        );
      })}

      <DraggableContainer
        id={WALLETS_LIST_LAST_ITEM_ID}
        draggable={false}
        isOpened={
          WALLETS_LIST_LAST_ITEM_ID === dragOverID &&
          WALLETS_LIST_LAST_ITEM_ID !== dragStartID &&
          (order[order.length - 1] ? order[order.length - 1] : undefined) !== dragStartID
        }
        onDrop={dropFunction}
        startID={dragStartID}
        setStartID={setDragStartID}
        setOverID={setDragOverID}
      >
        <div className="mb-3"></div>
      </DraggableContainer>
    </>
  );
};
