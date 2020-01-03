import Color from '../Color';

test('toHsl', () => {
  expect(Color.toHSL(Color.create(21, 105, 172))).toEqual(
    Color.createHSL(207, 78, 38),
  );

  expect(Color.toHSL(Color.create(255, 0, 0))).toEqual(
    Color.createHSL(0, 100, 50),
  );
});

test('fromHsl', () => {
  const rgb = Color.create(21, 104, 172);
  const hsl = Color.createHSL(207, 78, 38);
  expect(Color.fromHsl(hsl)).toEqual(rgb);
});
