import { getColorHexNormalised } from './getColorHexNormalised.ts';

export const getTextColor = (backgroundColor: string | undefined): 'light' | 'dark' | undefined => {
  if (!backgroundColor) {
    return undefined;
  }

  const hexPattern = /#[0-9a-fA-F]{6}/;
  if (hexPattern.test(backgroundColor)) {
    const rgb = getColorHexNormalised(backgroundColor);
    const l = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;

    if (l < 0.5) {
      return 'light';
    } else {
      return 'dark';
    }
  }

  return undefined;
};
