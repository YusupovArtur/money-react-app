import { CategoryType } from './CategoryType.ts';

export type CategoryAddType = Omit<CategoryType, 'subcategories'>;
