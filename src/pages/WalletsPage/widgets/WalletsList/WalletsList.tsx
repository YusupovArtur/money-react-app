import { FC, useDeferredValue, useState } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { selectFilteredWalletsOrder, shiftWallet, WalletType } from 'store/slices/walletsSlice';
// Components
import { WalletsListItem } from './WalletsListItem.tsx';
import { DraggableContainer } from 'shared/containers';
import { AlertMessage } from 'shared/ui';
import { getOpenableContainersState } from 'shared/containers/DraggableContainer/helpers/getOpenableContainersState.ts';

interface WalletsListProps {
  filter?: WalletType['type'] | null;
}

export const WalletsList: FC<WalletsListProps> = ({ filter }) => {
  const deferredFilter = useDeferredValue(filter);
  const order = useAppSelector(selectFilteredWalletsOrder(deferredFilter));

  const errorMessage = useAppSelector((state) => state.wallets.responseState.errorMessage);
  const [shiftIsLoading, setShiftIsLoading] = useState<boolean>(false);
  const [shiftErrorMessage, setShiftErrorMessage] = useState<string>('');

  const [dragOverIndex, setDragOverIndex] = useState<number>(NaN);
  const [dragStartIndex, setDragStartIndex] = useState<number>(NaN);

  const dispatch = useAppDispatch();
  const dropFunction = (index: number) => {
    dispatch(
      shiftWallet({
        index1: dragStartIndex,
        index2: index,
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
        const disabled = shiftIsLoading || (Boolean(dragStartIndex) && index !== dragStartIndex);

        return (
          <DraggableContainer
            key={id}
            index={index}
            draggable={!shiftIsLoading}
            isOpened={getOpenableContainersState({
              index: index,
              startIndex: dragStartIndex,
              overIndex: dragOverIndex,
              length: order.length,
            })}
            onDrop={dropFunction}
            startIndex={dragStartIndex}
            setStartIndex={setDragStartIndex}
            setOverIndex={setDragOverIndex}
          >
            <WalletsListItem walletID={id} disabled={disabled} loading={shiftIsLoading} />
          </DraggableContainer>
        );
      })}
    </>
  );
};
