import React, { useState } from 'react';
// Store imports
import { useAppDispatch } from 'store/hook';
import { shiftWallet } from 'store/slices/walletsSlice';
import { WALLETS_LIST_LAST_ITEM_ID, walletType } from 'store/types';

import WalletItem from 'components/pages/wallets_page/wallets_list/WalletItem';
import DragableItem from 'components/small_components/dragable/DragableItem';

const WalletsList: React.FC<{
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
        <DragableItem
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
        </DragableItem>
      ))}
      <DragableItem
        dropFunction={dropFunction}
        isDraggable={false}
        dragStartID={dragStartID}
        setDragStartID={setDragStartID}
        dragOverID={dragOverID}
        setDragOverID={setDragOverID}
        itemID={WALLETS_LIST_LAST_ITEM_ID}
        itemIDAbove={wallets[wallets.length - 1] ? wallets[wallets.length - 1].id : ''}
      ></DragableItem>
    </>
  );
};

export default WalletsList;
