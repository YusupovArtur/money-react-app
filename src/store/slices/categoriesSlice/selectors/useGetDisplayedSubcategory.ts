import { useAppSelector } from 'store/store.ts';
import { selectCategory, selectSubcategory, SubcategoryType } from 'store/slices/categoriesSlice';
import { selectBodyBackgroundColor } from 'store/slices/themeSlice';

const defaultProps = {
  description: '',
};

export const useGetDisplayedSubcategory = (props: {
  categoryID: string | null;
  subcategoryID: string | null;
}): {
  displayedSubcategory: SubcategoryType;
  categoryColor: string;
  subcategoryColor: string;
  subcategoryForUseEffect: SubcategoryType | undefined;
} => {
  const { categoryID, subcategoryID } = props;
  const category = useAppSelector(selectCategory(categoryID));
  const subcategory = useAppSelector(selectSubcategory({ categoryID, subcategoryID }));
  const bodyColor = useAppSelector(selectBodyBackgroundColor);
  const categoryColor = category ? category.color : bodyColor;

  if (subcategory) {
    return {
      displayedSubcategory: subcategory,
      categoryColor,
      subcategoryColor: categoryColor,
      subcategoryForUseEffect: subcategory,
    };
  }

  if (subcategoryID) {
    return {
      displayedSubcategory: {
        name: 'Неизвестная подкатегория',
        iconName: 'Exclamation',
        ...defaultProps,
      },
      categoryColor,
      subcategoryColor: '',
      subcategoryForUseEffect: subcategory,
    };
  }

  return {
    displayedSubcategory: {
      name: 'Подкатегория не выбрана',
      iconName: 'QuestionSmall',
      ...defaultProps,
    },
    categoryColor,
    subcategoryColor: bodyColor,
    subcategoryForUseEffect: subcategory,
  };
};
