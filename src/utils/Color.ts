export interface Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface HSLColor {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

export interface HSVColor {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}

const create = (
  red: number,
  green: number,
  blue: number,
  alpha = 1,
): Color => ({
  red,
  green,
  blue,
  alpha,
});

const createHsl = (
  hue: number,
  saturation: number,
  lightness: number,
  alpha = 1,
): HSLColor => ({
  hue,
  saturation,
  lightness,
  alpha,
});

const createHsv = (
  hue: number,
  saturation: number,
  value: number,
  alpha = 1,
) => ({
  hue,
  saturation,
  value,
  alpha,
});

const rgbComponentToHex = (component: number) => {
  const hex = component.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

const toHex = (color: Color): string =>
  [
    '#',
    rgbComponentToHex(color.red),
    rgbComponentToHex(color.green),
    rgbComponentToHex(color.blue),
  ].join('');

const toInt = (value: number) => Math.round(value * 100);

const toHsl = (color: Color): HSLColor => {
  const { alpha } = color;
  const red = color.red / 255;
  const green = color.green / 255;
  const blue = color.blue / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  const getHue = (delta: number) => {
    switch (max) {
      case red:
        return ((green - blue) / delta) % 6;
      case green:
        return 2 + (blue - red) / delta;
      case blue:
        return 4 + (red - green) / delta;
    }
  };

  if (max === min) {
    return {
      hue: 0,
      saturation: 0,
      lightness,
      alpha,
    };
  }
  const delta = max - min;

  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  return {
    hue: Math.round(getHue(delta) * 60),
    saturation: toInt(saturation),
    lightness: toInt(lightness),
    alpha,
  };
};

const toHsv = (color: Color): HSVColor => {
  const { alpha } = color;
  const red = color.red / 255;
  const green = color.green / 255;
  const blue = color.blue / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const hsv = createHsv(0, 0, 0, alpha);

  const C = max - min;

  if (C == 0) {
    hsv.hue = 0;
  } else if (max == red) {
    hsv.hue = ((green - blue) / C) % 6;
  } else if (min == green) {
    hsv.hue = (blue - red) / C + 2;
  } else {
    hsv.hue = (red - green) / C + 4;
  }
  hsv.hue = hsv.hue * 60;
  if (hsv.hue < 0) {
    hsv.hue = hsv.hue + 360;
  }
  hsv.value = max;
  if (hsv.value == 0) {
    hsv.saturation = 0;
  } else {
    hsv.saturation = C / hsv.value;
  }

  hsv.hue = Math.round(hsv.hue);
  hsv.saturation = Math.round(hsv.saturation * 100);
  hsv.value = Math.round(hsv.value * 100);

  return hsv;
};

const fromHex = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    throw new Error('Invalid value');
  }

  return create(
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  );
};

const fromHsv = (color: HSVColor) => {
  const { alpha } = color;
  const hue = color.hue / 60;
  const saturation = color.saturation / 100.0;
  const value = color.value / 100.0;
  const C = value * saturation;
  const X = C * (1 - Math.abs((hue % 2) - 1));

  const rgb = create(0, 0, 0, alpha);
  if (hue >= 0 && hue < 1) {
    rgb.red = C;
    rgb.green = X;
  } else if (hue >= 1 && hue < 2) {
    rgb.red = X;
    rgb.green = C;
  } else if (hue >= 2 && hue < 3) {
    rgb.green = C;
    rgb.blue = X;
  } else if (hue >= 3 && hue < 4) {
    rgb.green = X;
    rgb.blue = C;
  } else if (hue >= 4 && hue < 5) {
    rgb.red = X;
    rgb.blue = C;
  } else {
    rgb.red = C;
    rgb.blue = X;
  }

  const m = value - C;
  rgb.red = Math.round((rgb.red + m) * 255);
  rgb.green = Math.round((rgb.green + m) * 255);
  rgb.blue = Math.round((rgb.blue + m) * 255);

  return rgb;
};

const fromHsl = (color: HSLColor) => {
  const { alpha } = color;
  const hue = color.hue / 60;
  const saturation = color.saturation / 100;
  const lightness = color.lightness / 100;

  const C = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const X = C * (1 - Math.abs((hue % 2) - 1));
  const rgb = create(0, 0, 0, alpha);
  const m = lightness - C / 2;
  if (hue >= 0 && hue < 1) {
    rgb.red = C;
    rgb.green = X;
  } else if (hue >= 1 && hue < 2) {
    rgb.red = X;
    rgb.green = C;
  } else if (hue >= 2 && hue < 3) {
    rgb.green = C;
    rgb.blue = X;
  } else if (hue >= 3 && hue < 4) {
    rgb.green = X;
    rgb.blue = C;
  } else if (hue >= 4 && hue < 5) {
    rgb.red = X;
    rgb.blue = C;
  } else {
    rgb.red = C;
    rgb.blue = X;
  }

  rgb.red = Math.round((rgb.red + m) * 255);
  rgb.green = Math.round((rgb.green + m) * 255);
  rgb.blue = Math.round((rgb.blue + m) * 255);
  return rgb;
};

const fullAlpha = ({ red, green, blue }: Color) => create(red, green, blue);
const pureHue = ({ hue }: HSVColor) => {
  return fromHsv(createHsv(hue, 100, 100));
};
const black = () => create(0, 0, 0);
const transparent = () => create(0, 0, 0, 0);
const isTransparent = (color: Color | HSLColor) => color.alpha === 0;
const toString = ({ red, green, blue, alpha }: Color) =>
  `rgba(${red}, ${green}, ${blue}, ${alpha})`;
const isEqual = (color1: Color, color2: Color) =>
  color1 === color2 ||
  (color1.red === color2.red &&
    color1.green === color2.green &&
    color1.blue === color2.blue &&
    color1.alpha === color2.alpha);

export {
  create,
  pureHue,
  fullAlpha,
  createHsl,
  createHsv,
  fromHsl,
  fromHex,
  fromHsv,
  toHsl,
  toHsv,
  toHex,
  toString,
  black,
  transparent,
  isTransparent,
  isEqual,
};
