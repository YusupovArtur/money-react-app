const getNormalisedColor = (color: number): number => {
  const normalised = color / 255;

  if (normalised <= 0.03928) {
    return normalised / 12.92;
  } else {
    return ((normalised + 0.055) / 1.055) ** 2.4;
  }
};

const getColorHexNormalised = (hex: string): { r: number; g: number; b: number } => {
  const r = getNormalisedColor(parseInt(hex.substring(1, 3), 16));
  const g = getNormalisedColor(parseInt(hex.substring(3, 5), 16));
  const b = getNormalisedColor(parseInt(hex.substring(5), 16));
  return { r, g, b };
};

export const getTextColorType = (backgroundColor: string | undefined): 'light' | 'dark' | undefined => {
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
