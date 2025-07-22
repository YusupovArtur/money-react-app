import { RootState } from 'store/store.ts';
import { TEXT_COLORS } from 'shared/helpers';

export const selectTextBodyColor = (state: RootState): string => {
  const theme = state.theme.themeDisplay;
  return TEXT_COLORS[theme];
};
