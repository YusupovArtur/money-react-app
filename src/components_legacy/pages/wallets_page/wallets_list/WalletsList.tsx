import { useState, FC } from 'react';
// Store imports
import { useAppDispatch } from 'store/hook';
import { shiftWallet } from 'store/slices/walletsSlice';
import { WALLETS_LIST_LAST_ITEM_ID, walletType } from 'store/types';

import WalletItem from '../../../pages/wallets_page/wallets_list/WalletItem';
import DraggableItem from '../../../small_components/dragable/DraggableItem.tsx';

const WalletsList: FC<{
  wallets: walletType[];
}> = ({ wallets }) => {
  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();

  const dropFunction = (dropID: string) => {
    dispatch(shiftWallet({ walletID: dragStartID, newIndexID: dropID }));
  };

  return (
    <>
      {wallets.map((wallet, index) => (
        <DraggableItem
          key={wallet.id}
          dropFunction={dropFunction}
          isDraggable={true}
          dragStartID={dragStartID}
          setDragStartID={setDragStartID}
          dragOverID={dragOverID}
          setDragOverID={setDragOverID}
          itemID={wallet.id}
          itemIDAbove={index === 0 ? 'no-above-item' : wallets[index - 1].id}
        >
          <WalletItem wallet={wallet}></WalletItem>
        </DraggableItem>
      ))}
      <DraggableItem
        dropFunction={dropFunction}
        isDraggable={false}
        dragStartID={dragStartID}
        setDragStartID={setDragStartID}
        dragOverID={dragOverID}
        setDragOverID={setDragOverID}
        itemID={WALLETS_LIST_LAST_ITEM_ID}
        itemIDAbove={wallets[wallets.length - 1] ? wallets[wallets.length - 1].id : ''}
      ></DraggableItem>
    </>
  );
};

export default WalletsList;