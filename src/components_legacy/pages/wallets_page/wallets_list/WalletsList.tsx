import { FC, useState } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store';
import { shiftWallet, WALLETS_LIST_LAST_ITEM_ID } from 'store/slices/walletsSlice';
// Components
import WalletItem from '../../../pages/wallets_page/wallets_list/WalletItem';
import DraggableItem from '../../../small_components/dragable/DraggableItem';

const WalletsList: FC = () => {
  const wallets = useAppSelector((state) => state.wallets.list);
  const walletsOrder = useAppSelector((state) => state.wallets.order);

  const dispatch = useAppDispatch();

  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dropFunction = (dropID: string) => {
    dispatch(shiftWallet({ walletID1: dragStartID, walletID2: dropID }));
  };

  return (
    <>
      {walletsOrder.map((id, index) => (
        <DraggableItem
          key={id}
          onDrop={dropFunction}
          isDraggable={true}
          dragStartID={dragStartID}
          setDragStartID={setDragStartID}
          dragOverID={dragOverID}
          setDragOverID={setDragOverID}
          itemID={id}
          itemIDAbove={index === 0 ? 'no-above-item' : walletsOrder[index - 1]}
        >
          <WalletItem id={id} wallet={wallets[id]} />
        </DraggableItem>
      ))}
      <DraggableItem
        onDrop={dropFunction}
        isDraggable={false}
        dragStartID={dragStartID}
        setDragStartID={setDragStartID}
        dragOverID={dragOverID}
        setDragOverID={setDragOverID}
        itemID={WALLETS_LIST_LAST_ITEM_ID}
        itemIDAbove={walletsOrder[walletsOrder.length - 1] ? walletsOrder[walletsOrder.length - 1] : ''}
      />
    </>
  );
};

export default WalletsList;
