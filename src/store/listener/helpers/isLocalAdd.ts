import { DocumentChange } from 'firebase/firestore';

export const isLocalAdd = (props: { id: string | undefined; changes: DocumentChange[] }): boolean => {
  const { id, changes } = props;

  if (id && changes.length === 2) {
    const doc = changes.find((change) => change.type === 'added' && change.doc.id === id);
    const order = changes.find((change) => change.type === 'modified' && change.doc.id === 'order');

    if (doc && order) {
      return true;
    }
  }

  return false;
};
