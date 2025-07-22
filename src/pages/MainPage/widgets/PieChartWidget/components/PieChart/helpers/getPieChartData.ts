import { TransactionsListType } from 'store/slices/transactionsSlice';
import { PieChartData } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/types/PieChartData.ts';
import { store } from 'store/index.ts';
import { CategoryType, selectCategory, selectSubcategory, SubcategoryType } from 'store/slices/categoriesSlice';

export const getPieChartData = (props: { order: string[]; transactions: TransactionsListType }): PieChartData[] => {
  const { order, transactions } = props;

  const state = store.getState();
  const data: PieChartData[] = [];
  const dataRecord: Record<string, PieChartData & { childrenRecord: Record<string, PieChartData> }> = {};

  for (let id of order) {
    const transaction = transactions[id];
    if (transaction) {
      const categoryId = selectCategory(transaction.category)(state) ? transaction.category : '';
      const subcategoryId = selectSubcategory({
        categoryID: transaction.category,
        subcategoryID: transaction.subcategory,
      })(state)
        ? transaction.subcategory
        : '';

      const category: CategoryType = selectCategory(categoryId)(state) || {
        name: 'Неизвестная категория',
        type: transaction.type,
        color: '#F0F',
        iconName: 'Exclamation',
        subcategories: { order: [], list: {} },
        description: '',
      };
      const subcategory: SubcategoryType = selectSubcategory({
        categoryID: categoryId,
        subcategoryID: subcategoryId,
      })(state) || { name: 'Без подкатегории', iconName: 'QuestionSmall', description: '' };

      if (!dataRecord[categoryId]) {
        dataRecord[categoryId] = {
          id: categoryId,
          label: category.name,
          value: 0,
          color: category.color,
          childrenRecord: {},
        };
      }
      if (!dataRecord[categoryId].childrenRecord[subcategoryId]) {
        dataRecord[categoryId].childrenRecord[subcategoryId] = {
          id: subcategoryId,
          label: subcategory.name,
          value: 0,
          color: category.color,
        };
      }
      dataRecord[categoryId].value += transaction.sum;
      dataRecord[categoryId].childrenRecord[subcategoryId].value += transaction.sum;
    }
  }

  for (let id in dataRecord) {
    const { childrenRecord, ...dataItemWithoutChildren } = dataRecord[id];

    const dataItem = { ...dataItemWithoutChildren };
    dataItem.children = [];

    for (let subcategoryId in childrenRecord) {
      dataItem.children.push(childrenRecord[subcategoryId]);
    }
    data.push(dataItem);
  }

  return data;
};
