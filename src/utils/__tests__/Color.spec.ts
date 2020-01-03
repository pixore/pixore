import Color from '../Color';

test('toHsl', () => {
  expect(Color.toHsl(Color.create(21, 105, 172))).toEqual(
    Color.createHsl(207, 78, 38),
  );

  expect(Color.toHsl(Color.create(255, 0, 0))).toEqual(
    Color.createHsl(0, 100, 50),
  );
});

test('toHsv', () => {
  expect(Color.toHsv(Color.create(21, 105, 172))).toEqual(
    Color.createHsv(207, 88, 67),
  );

  expect(Color.toHsl(Color.create(255, 0, 0))).toEqual(
    Color.createHsl(0, 100, 50),
  );
});

test('fromHsl', () => {
  const expected = Color.create(21, 104, 172);
  const hsl = Color.createHsl(207, 78, 38);
  expect(Color.fromHsl(hsl)).toEqual(expected);
});

test('fromHsv', () => {
  const expected = Color.create(224, 142, 121);
  const hsv = Color.createHsv(12, 46, 88);
  expect(Color.fromHsv(hsv)).toEqual(expected);
});

test('fromHex', () => {
  expect(Color.fromHex('#909EDD')).toEqual(Color.create(144, 158, 221));
  expect(Color.fromHex('#FFE091')).toEqual(Color.create(255, 224, 145));
});
