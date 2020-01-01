import Canvas from './components/Canvas';
import FramesAndLayers from './components/FramesAndLayers';
import Palette from './components/Palette/Palette';
import Preview from './components/Preview';
import { Panels } from './types';

const components = {
  [Panels.Canvas]: Canvas,
  [Panels.Sequencer]: FramesAndLayers,
  [Panels.Palette]: Palette,
  [Panels.Preview]: Preview,
};

export { components };
