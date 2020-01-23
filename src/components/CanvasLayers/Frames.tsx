import React from 'react';
import CanvasLayer from '../CanvasLayer';
import { useCanvas2DContext } from '../../hooks/useCanvas';
import { useSprite } from '../../contexts/Sprite';
import { imageSmoothingDisabled, clean } from '../../utils';
import { getContext } from '../../utils/contexts';

interface PropTypes {
  width: number;
  height: number;
  isPlaying: boolean;
  scale: number;
  x: number;
  y: number;
}

const Frames: React.FC<PropTypes> = (props) => {
  const sprite = useSprite();
  const { scale, y, x, width, height, isPlaying } = props;
  const [frame, setFrame] = React.useState(0);
  const timerRef = React.useRef(null);
  const { onRef: setRef, context } = useCanvas2DContext();
  const numberOfFrames = sprite.frameList.length;
  const { layerList } = sprite;

  React.useEffect(() => {
    clearInterval(timerRef.current);

    if (!isPlaying || numberOfFrames === 1) {
      return;
    }

    const updateFrame = () => {
      setFrame((frame) => {
        const nextFrame = frame + 1;

        if (nextFrame >= numberOfFrames) {
          return 0;
        }

        return nextFrame;
      });
    };
    timerRef.current = setInterval(updateFrame, 100);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, numberOfFrames]);

  React.useEffect(() => {
    if (!context) {
      return;
    }

    const width = sprite.width * scale;
    const height = sprite.height * scale;

    clean(context);
    imageSmoothingDisabled(context);

    layerList.forEach((layer) => {
      const layerContext = getContext(sprite, sprite.frameList[frame], layer);
      context.drawImage(
        layerContext.canvas,
        0,
        0,
        sprite.width,
        sprite.height,
        x,
        y,
        width,
        height,
      );
    });
  }, [frame, context, sprite, scale, x, y, layerList]);
  return <CanvasLayer ref={setRef} width={width} height={height} />;
};

export default Frames;
