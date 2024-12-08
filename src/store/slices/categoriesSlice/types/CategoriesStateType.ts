import { CategoriesOrderedListType } from './CategoriesOrderedListType.ts';
import { ResponseStateType } from 'store';

export type CategoriesStateType = CategoriesOrderedListType & { responseState: ResponseStateType };
