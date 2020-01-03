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

const create = (
  red: number,
  green: number,
  blue: number,
  alpha = 0,
): Color => ({
  red,
  green,
  blue,
  alpha,
});

const createHSL = (
  hue: number,
  saturation: number,
  lightness: number,
  alpha = 0,
): HSLColor => ({
  hue,
  saturation,
  lightness,
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

const toHSL = (color: Color): HSLColor => {
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

const Color = {
  create,
  fromHsl,
  toHSL,
  toHex,
  createHSL,
};

export default Color;
