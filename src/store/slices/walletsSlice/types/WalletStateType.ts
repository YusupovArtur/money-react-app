import { ResponseStateType } from 'store';
import { WalletsOrderedListType } from 'store/slices/walletsSlice';

export type WalletsStateType = WalletsOrderedListType & { responseState: ResponseStateType };
