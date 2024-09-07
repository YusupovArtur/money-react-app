import { DocumentChange } from 'firebase/firestore';
import { deepEqual } from 'shared/helpers';

export const isLocalShift = (props: { order: string[] | undefined; changes: DocumentChange[] }): boolean => {
  const { order, changes } = props;

  if (order && changes.length === 1) {
    const orderChangeDoc = changes.find((change) => change.type === 'modified' && change.doc.id === 'order');

    if (orderChangeDoc) {
      const orderChange = (orderChangeDoc.doc.data() as { order: string[] }).order;

      if (deepEqual(order, orderChange)) {
        return true;
      }
    }
  }

  return false;
};
