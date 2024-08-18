import { FC, useState } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { shiftWallet, WALLETS_LIST_LAST_ITEM_ID, WalletType } from 'store/slices/walletsSlice';
// Components
import { WalletsListItem } from './WalletsListItem.tsx';
import { DraggableContainer } from 'shared/containers';
import { AlertMessage } from 'shared/ui';

interface WalletsListProps {
  filter?: WalletType['type'] | null;
}

export const WalletsList: FC<WalletsListProps> = ({ filter }) => {
  const wallets = useAppSelector((state) => state.wallets.list);
  const order = useAppSelector((state) => state.wallets.order).filter((id) => (!filter ? true : filter === wallets[id].type));

  const errorMessage = useAppSelector((state) => state.wallets.responseState.errorMessage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => {
    dispatch(shiftWallet({ walletID1: dragStartID, walletID2: dropID, setIsLoading }));
  };

  if (errorMessage) {
    return <AlertMessage alertMessage={errorMessage} className="alert-danger my-3" />;
  }

  return (
    <>
      {order.map((id, index) => {
        const aboveID = index === 0 ? undefined : order[index - 1];
        const isOpened = id === dragOverID && id !== dragStartID && aboveID !== dragStartID;
        return (
          <DraggableContainer
            key={id}
            id={id}
            draggable={!isLoading}
            isOpened={isOpened}
            onDrop={dropFunction}
            startID={dragStartID}
            setStartID={setDragStartID}
            setOverID={setDragOverID}
          >
            <WalletsListItem id={id} />
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
