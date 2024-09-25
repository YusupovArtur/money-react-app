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
}): {
  displayedCategory: CategoryType;
  categoryForUseEffect: CategoryType | undefined;
} => {
  const { id, type } = props;
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
      name: 'Категория не выбрана',
      iconName: type === 'transfer' ? 'QuestionSmall' : 'Question',
      color: type === 'transfer' ? bodyColor : '',
      ...defaultProps,
    },
    categoryForUseEffect: category,
  };
};
