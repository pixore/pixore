import Canvas from './components/Canvas';
import Sequencer from './components/Sequencer';
import Palette from './components/Palette/Palette';
import Preview from './components/Preview';
import { Panels } from './types';

const components = {
  [Panels.Canvas]: Canvas,
  [Panels.Sequencer]: Sequencer,
  [Panels.Palette]: Palette,
  [Panels.Preview]: Preview,
};

export { components };
