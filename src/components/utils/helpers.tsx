export const hexToRGB = (hex: string) => {
  const hexValues = hex?.replace(/#/g, '');
  const red = parseInt(hexValues?.substring(0, 2), 16);
  const green = parseInt(hexValues?.substring(2, 4), 16);
  const blue = parseInt(hexValues?.substring(4, 6), 16);
  return { red, green, blue };
};

// based on: https://24ways.org/2010/calculating-color-contrast
// eslint-disable-next-line import/prefer-default-export
export const getColorContrast = (color: string) => {
  // eslint-disable-next-line object-curly-spacing
  const {red, green, blue} = hexToRGB(color);
  const yiq = ((red * 299) + (green * 587) + (blue * 114)) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
};
