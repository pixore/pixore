import React from 'react';
import {
  Color,
  HSVColor,
  HSLColor,
  fromHsl,
  toHsv,
  fromHsv,
  toHsl,
} from '../../../utils/Color';
import Vector from '../../../utils/vector';

type SetRgb = React.Dispatch<React.SetStateAction<Color>>;
type SetHsv = React.Dispatch<React.SetStateAction<HSVColor>>;
type SetHsl = React.Dispatch<React.SetStateAction<HSLColor>>;
type Set<T> = React.Dispatch<React.SetStateAction<T>>;

const toPercentage = (value: number, maxValue: number) => {
  return (value * 100) / maxValue;
};

const getValueBetween = (value: number, max: number, min = 0) => {
  if (value < min) {
    value = 0;
  } else if (value > max) {
    return max;
  }

  return value;
};

const useUpdaters = (setHsv: SetHsv, setRgb: SetRgb, setHsl: SetHsl) => {
  const svPickerRef = React.useRef<HTMLDivElement>();
  const huePickerRef = React.useRef<HTMLDivElement>();
  const alphaPickerRef = React.useRef<HTMLDivElement>();
  const updaters = React.useMemo(() => {
    const updateProperty = <T extends object>(set: Set<T>) => (
      name: string,
      value: number,
    ) => {
      set((current) => ({
        ...current,
        [name]: value,
      }));
    };
    const self = {
      hsl(newHsl: Partial<HSLColor>) {
        setHsl((current) => {
          const hsl = {
            ...current,
            ...newHsl,
          };

          const newRgb = fromHsl(hsl);
          setRgb(newRgb);
          setHsv(toHsv(newRgb));

          return hsl;
        });
      },
      hsv(newHsv: Partial<HSVColor>) {
        setHsv((current) => {
          const hsv = {
            ...current,
            ...newHsv,
          };
          const newRgb = fromHsv(hsv);
          setRgb(newRgb);
          setHsl(toHsl(newRgb));

          return hsv;
        });
      },
      rgb(newRgb: Color) {
        setRgb(newRgb);
        setHsv(toHsv(newRgb));
        setHsl(toHsl(newRgb));
      },
      hue(y: number) {
        const { current: element } = huePickerRef;
        if (!element) {
          return;
        }

        const { top, height } = element.getBoundingClientRect();
        const realY = getValueBetween(y - top, height);
        const hue = 360 - (360 * toPercentage(realY, height)) / 100;

        self.hsv({
          hue,
        });
      },

      sv({ x, y }: Vector) {
        const { current: element } = svPickerRef;
        if (!element) {
          return;
        }
        const { top, left, width, height } = element.getBoundingClientRect();
        const realX = getValueBetween(x - left, width);
        const realY = getValueBetween(y - top, height);

        const saturation = toPercentage(realX, width);
        const value = 100 - toPercentage(realY, height);
        self.hsv({
          saturation,
          value,
        });
      },
      alpha(x: number) {
        const { current: element } = alphaPickerRef;
        if (!element) {
          return;
        }

        const { left, width } = element.getBoundingClientRect();
        const realX = getValueBetween(x - left, width);
        const alpha = toPercentage(realX, width);

        const newHsv = {
          alpha,
        };

        self.hsv(newHsv);
      },
      rgbProperty: updateProperty(setRgb),
      hslProperty: updateProperty(setHsl),
      hsvProperty: updateProperty(setHsv),
    };

    return self;
  }, [setHsv, setRgb, setHsl]);

  return {
    updaters,
    svPickerRef,
    huePickerRef,
    alphaPickerRef,
  };
};

export { useUpdaters };
