import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { CategoriesListType, CategoriesOrderedListType, CategoryType } from 'store/slices/categoriesSlice';

export const getCategoriesOrderedList = (querySnapshot: QuerySnapshot<DocumentData, DocumentData>): CategoriesOrderedListType => {
  const list: CategoriesListType = {};
  let order: string[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.id === 'order') {
      order = (doc.data() as { order: string[] }).order;
    } else {
      list[doc.id] = doc.data() as CategoryType;
    }
  });

  return { list, order };
};
