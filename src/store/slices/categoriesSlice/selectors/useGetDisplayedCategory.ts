import { useAppSelector } from 'store/store.ts';
import { CategoryType, selectCategory } from 'store/slices/categoriesSlice';
import { selectBodyBackgroundColor } from 'store/slices/themeSlice';

const defaultProps = {
  type: 'expense' as CategoryType['type'],
  subcategories: { order: [], list: {} },
  description: '',
};

export const useGetDisplayedCategory = (props: {
  id: string | null;
  type?: CategoryType['type'];
  isDefaultIconForTransferTypeCategory?: boolean;
}): {
  displayedCategory: CategoryType;
  categoryForUseEffect: CategoryType | undefined;
} => {
  const { id, type, isDefaultIconForTransferTypeCategory } = props;
  const category = useAppSelector(selectCategory(id));
  const bodyColor = useAppSelector(selectBodyBackgroundColor);

  if (category) {
    return { displayedCategory: category, categoryForUseEffect: category };
  }

  if (id) {
    return {
      displayedCategory: {
        name: 'Неизвестная категория',
        iconName: 'Exclamation',
        color: '',
        ...defaultProps,
      },
      categoryForUseEffect: category,
    };
  }

  return {
    displayedCategory: {
      name: isDefaultIconForTransferTypeCategory ? 'Перевод' : 'Категория не выбрана',
      iconName: type === 'transfer' ? (isDefaultIconForTransferTypeCategory ? 'ArrowLeftRight' : 'QuestionSmall') : 'Question',
      color: type === 'transfer' ? bodyColor : '',
      ...defaultProps,
    },
    categoryForUseEffect: category,
  };
};
