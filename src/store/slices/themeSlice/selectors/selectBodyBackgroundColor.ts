import { RootState } from 'store/store.ts';
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';

export const selectBodyBackgroundColor = (state: RootState): string => {
  const theme = state.theme.themeDisplay;
  return theme === 'light' ? COLOR_NAMES_HEX['gray-100'] : COLOR_NAMES_HEX['body-tertiary-dark'];
};
