import { DocumentChange } from 'firebase/firestore';

export const isLocalDelete = (props: { id: string | undefined; changes: DocumentChange[] }): boolean => {
  const { id, changes } = props;

  if (id && changes.length === 1) {
    const doc = changes.find((change) => change.type === 'removed' && change.doc.id === window.pending.wallets.delete.id);
    // const order = changes.find((change) => change.type === 'modified' && change.doc.id === 'order');

    if (doc) {
      return true;
    }
  }

  return false;
};
