import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import BoxColor from '../BoxColor';
import { useArtboard } from '../../contexts/Artboard';
import { useWindowsActions } from '../../contexts/Windows';
import { Windows } from '../../types';
import { useEmitter } from '../Editor';

const Container = styled.div`
  display: inline-block;
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 2px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.5);
`;

const size = 30;

const Colors = styled.div`
  position: relative;
  margin: 6px;
  width: ${size * 1.5}px;
  height: ${size * 1.5}px;
`;

const common = css`
  position: absolute;
  width: ${size}px;
  height: ${size}px;
`;

const SecondaryColor = styled.div`
  right: 0;
  bottom: 0;
  ${common}
`;
const PrimaryColor = styled.div`
  left: 0;
  top: 0;
  ${common}
`;

const Tools: React.FC = () => {
  const emitter = useEmitter();
  const { primaryColor, secondaryColor } = useArtboard();
  const { openWindow } = useWindowsActions();
  const [colorPickerId, setColorPickerId] = React.useState();

  const openPicker = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const id = openWindow(Windows.ColorPicker, {
      state: {
        top: clientY,
        left: clientX,
        height: 350,
        width: 550,
      },
      config: {
        backdrop: true,
      },
    });
    setColorPickerId(id);
  };

  React.useEffect(() => {
    if (colorPickerId) {
      const onDone = () => {};

      emitter.on(colorPickerId, onDone);
      return () => emitter.off(colorPickerId, onDone);
    }
  }, [colorPickerId, emitter]);

  return (
    <>
      <Container>
        <Colors>
          <SecondaryColor>
            <BoxColor onClick={openPicker} size={size} val={secondaryColor} />
          </SecondaryColor>
          <PrimaryColor>
            <BoxColor onClick={openPicker} size={size} val={primaryColor} />
          </PrimaryColor>
        </Colors>
      </Container>
    </>
  );
};

export default Tools;
