import {
  toHsl,
  toHsv,
  create,
  createHsv,
  createHsl,
  fromHsl,
  fromHsv,
  fromHex,
} from '../Color';

test('toHsl', () => {
  expect(toHsl(create(21, 105, 172))).toEqual(createHsl(207, 78, 38));

  expect(toHsl(create(255, 0, 0))).toEqual(createHsl(0, 100, 50));
});

test('toHsv', () => {
  expect(toHsv(create(21, 105, 172))).toEqual(createHsv(207, 88, 67));

  expect(toHsl(create(255, 0, 0))).toEqual(createHsl(0, 100, 50));
});

test('fromHsl', () => {
  const expected = create(21, 104, 172);
  const hsl = createHsl(207, 78, 38);
  expect(fromHsl(hsl)).toEqual(expected);
});

test('fromHsv', () => {
  const expected = create(224, 142, 121);
  const hsv = createHsv(12, 46, 88);
  expect(fromHsv(hsv)).toEqual(expected);
});

test('fromHex', () => {
  expect(fromHex('#909EDD')).toEqual(create(144, 158, 221));
  expect(fromHex('#FFE091')).toEqual(create(255, 224, 145));
});
