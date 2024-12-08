const getNormalisedColor = (color: number): number => {
  const normalised = color / 255;

  if (normalised <= 0.03928) {
    return normalised / 12.92;
  } else {
    return ((normalised + 0.055) / 1.055) ** 2.4;
  }
};

export const getColorHexNormalised = (hex: string): { r: number; g: number; b: number } => {
  const r = getNormalisedColor(parseInt(hex.substring(1, 3), 16));
  const g = getNormalisedColor(parseInt(hex.substring(3, 5), 16));
  const b = getNormalisedColor(parseInt(hex.substring(5), 16));
  return { r, g, b };
};
