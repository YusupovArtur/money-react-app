import { FC, useState } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { shiftWallet, WALLETS_LIST_LAST_ITEM_ID } from 'store/slices/walletsSlice';
// Components
import WalletsListItem from 'pages/WalletsPage/widgets/WalletsList/WalletsListItem.tsx';
import { DraggableContainer } from 'shared/containers';

const WalletsList: FC = () => {
  const walletsOrder = useAppSelector((state) => state.wallets.order);

  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => {
    dispatch(shiftWallet({ walletID1: dragStartID, walletID2: dropID }));
  };

  return (
    <>
      {walletsOrder.map((id, index) => (
        <DraggableContainer
          key={id}
          onDrop={dropFunction}
          draggable={true}
          startID={dragStartID}
          setStartID={setDragStartID}
          overID={dragOverID}
          setOverID={setDragOverID}
          id={id}
          aboveID={index === 0 ? 'no-above-item' : walletsOrder[index - 1]}
        >
          <WalletsListItem id={id} />
        </DraggableContainer>
      ))}
      <DraggableContainer
        onDrop={dropFunction}
        draggable={false}
        startID={dragStartID}
        setStartID={setDragStartID}
        overID={dragOverID}
        setOverID={setDragOverID}
        id={WALLETS_LIST_LAST_ITEM_ID}
        aboveID={walletsOrder[walletsOrder.length - 1] ? walletsOrder[walletsOrder.length - 1] : ''}
      />
    </>
  );
};

export default WalletsList;
