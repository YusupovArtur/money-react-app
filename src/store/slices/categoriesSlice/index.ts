export { clearCategories, setCategories, setCategoriesResponseState } from './categoriesSlice.ts';

export { downloadCategories } from './asyncThunks/downloadCategories.ts';
export { addCategory } from './asyncThunks/addCategory.ts';
export { addSubCategory } from './asyncThunks/addSubCategory.ts';
export { deleteCategory } from './asyncThunks/deleteCategory.ts';
export { deleteSubCategory } from './asyncThunks/deleteSubCategory.ts';
export { updateCategory } from './asyncThunks/updateCategory.ts';
export { updateSubCategory } from './asyncThunks/updateSubCategory.ts';
export { shiftCategory } from './asyncThunks/shiftCategory.ts';
export { shiftSubCategory } from './asyncThunks/shiftSubCategory.ts';

export type { CategoryType } from './types/CategoryType.ts';
export type { CategoriesListType } from './types/CategoriesListType.ts';
export type { CategoryAddType } from './types/CategoryAddType.ts';
export type { CategoryUpdateType } from './types/CategoryUpdateType.ts';
export type { CategoriesOrderedListType } from './types/CategoriesOrderedListType.ts';

export type { SubcategoryType } from './types/SubcategoryType.ts';
export type { SubcategoryUpdateType } from './types/SubcategoryUpdateType.ts';
export type { SubcategoriesListType } from './types/SubcategoriesListType.ts';
export type { SubcategoriesOrderedListType } from './types/SubcategoriesOrderedListType.ts';
export type { CategoriesStateType } from './types/CategoriesStateType.ts';

export const CATEGORIES_LIST_LAST_ITEM_ID = 'THIS_A_CATEGORIES_LIST_LAST_ITEM_ID';
export const SUBCATEGORIES_LIST_LAST_ITEM_ID = 'THIS_A_SUBCATEGORIES_LIST_LAST_ITEM_ID';