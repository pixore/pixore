import React from 'react';
import { useEmitter } from '../../Editor';
import { useWindow } from '../Context';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import Vector from '../../../utils/vector';
import {
  Slider,
  SliderTrack,
  SliderTrackHighlight,
  SliderHandle,
} from '@reach/slider';
import {
  NewColor,
  Container,
  HuePicker,
  HueBarPicker,
  AlphaBarPicker,
  HSVPicker,
  ColorLayer,
  RoundPicker,
  AlphaPicker,
  TopContainer,
  CurrentColor,
  BottomContainer,
  ValuesContainer,
  ColorsContainer,
  PickersContainer,
  ColorRepresentations,
  BlackToTransparentLayer,
  WhiteToTransparentLayer,
  SaturationAndValuePicker,
} from './elements';
import {
  create,
  fromHsv,
  toHsl,
  toHsv,
  toString,
  pureHue,
  HSVColor,
} from '../../../utils/Color';
import { useMouseEvent } from '../../../hooks/useMouseEvent';

const currentColor = create(250, 230, 100, 0.5);
const newColor = create(250, 130, 100, 1);

const getValueBetween = (value: number, max: number, min = 0) => {
  if (value < min) {
    value = 0;
  } else if (value > max) {
    return max;
  }

  return value;
};

interface MouseEvent {
  clientX: number;
  clientY: number;
}

const ColorPicker: React.FC = () => {
  const svPickerRef = React.useRef<HTMLDivElement>();
  const huePickerRef = React.useRef<HTMLDivElement>();
  const alphaPickerRef = React.useRef<HTMLDivElement>();
  const { id, onRequestedClose } = useWindow();
  const emitter = useEmitter();
  const [rgb, setRgb] = React.useState(newColor);
  const [hsv, setHsv] = React.useState(toHsv(rgb));
  const [hsl, setHsl] = React.useState(toHsl(rgb));

  const newColorWithFullAlpha = pureHue(hsv);

  const onClick = () => {
    emitter.emit(id);
    onRequestedClose();
  };

  const updateHsv = (newHsv: HSVColor) => {
    const newRgb = fromHsv(newHsv);
    setHsv(newHsv);
    setRgb(newRgb);
    setHsl(toHsl(rgb));
  };

  const updateSV = ({ x, y }: Vector) => {
    const { current: element } = svPickerRef;
    if (!element) {
      return;
    }
    const { top, left, width, height } = element.getBoundingClientRect();
    const realX = getValueBetween(x - left, width);
    const realY = getValueBetween(y - top, height);

    const saturation = (realX * 100) / width;
    const value = 100 - (realY * 100) / height;
    const newHsv = {
      ...hsv,
      saturation,
      value,
    };
    updateHsv(newHsv);
  };

  const handlerMouseEventSV = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    updateSV({
      x: clientX,
      y: clientY,
    });
  };

  const mouseEventSV = useMouseEvent({
    onMouseDown: handlerMouseEventSV,
    onMouseMove: handlerMouseEventSV,
  });

  const updateHue = (y: number) => {
    const { current: element } = huePickerRef;
    if (!element) {
      return;
    }

    const { top, height } = element.getBoundingClientRect();
    const realY = getValueBetween(y - top, height);
    const hue = 360 - (360 * ((realY * 100) / height)) / 100;
    const newHsv = {
      ...hsv,
      hue,
    };

    updateHsv(newHsv);
  };

  const handlerMouseEventHue = (event: MouseEvent) => {
    const { clientY } = event;
    updateHue(clientY);
  };

  const mouseEventHue = useMouseEvent({
    onMouseDown: handlerMouseEventHue,
    onMouseMove: handlerMouseEventHue,
  });

  const updateAlpha = (x: number) => {
    const { current: element } = alphaPickerRef;
    if (!element) {
      return;
    }

    const { left, width } = element.getBoundingClientRect();
    const realX = getValueBetween(x - left, width);
    const alpha = realX / width;
    const newHsv = {
      ...hsv,
      alpha,
    };

    updateHsv(newHsv);
  };

  const handlerMouseEventAlpha = (event: MouseEvent) => {
    const { clientX } = event;
    updateAlpha(clientX);
  };

  const mouseEventAlpha = useMouseEvent({
    onMouseDown: handlerMouseEventAlpha,
    onMouseMove: handlerMouseEventAlpha,
  });

  return (
    <Container>
      <TopContainer>
        <PickersContainer>
          <HSVPicker>
            <SaturationAndValuePicker {...mouseEventSV} ref={svPickerRef}>
              <ColorLayer color={toString(newColorWithFullAlpha)} />
              <WhiteToTransparentLayer />
              <BlackToTransparentLayer />
              <RoundPicker
                style={{
                  top: `${100 - hsv.value}%`,
                  left: `${hsv.saturation}%`,
                }}
              />
            </SaturationAndValuePicker>
            <HuePicker ref={huePickerRef} {...mouseEventHue}>
              <HueBarPicker
                style={{
                  top: `${100 - (hsv.hue * 100) / 360}%`,
                }}
              />
            </HuePicker>
          </HSVPicker>
          <AlphaPicker
            {...mouseEventAlpha}
            ref={alphaPickerRef}
            val={newColorWithFullAlpha}
          >
            <AlphaBarPicker
              style={{
                left: `${hsv.alpha * 100}%`,
              }}
            />
          </AlphaPicker>
        </PickersContainer>
        <ValuesContainer>
          <ColorsContainer>
            <CurrentColor val={currentColor} />
            <NewColor val={rgb} />
          </ColorsContainer>
          <ColorRepresentations>
            <Tabs>
              <TabList>
                <Tab>HSV</Tab>
                <Tab>HSL</Tab>
                <Tab>RGB</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Slider min={0} max={360} value={hsv.hue}>
                    <SliderTrack>
                      <SliderTrackHighlight />
                      <SliderHandle />
                    </SliderTrack>
                  </Slider>
                  <Slider min={0} max={100} value={hsv.saturation}>
                    <SliderTrack>
                      <SliderTrackHighlight />
                      <SliderHandle />
                    </SliderTrack>
                  </Slider>
                  <Slider min={0} max={100} value={hsv.value}>
                    <SliderTrack>
                      <SliderTrackHighlight />
                      <SliderHandle />
                    </SliderTrack>
                  </Slider>
                </TabPanel>
                <TabPanel>
                  <Slider min={0} max={360} value={hsl.hue}>
                    <SliderTrack>
                      <SliderTrackHighlight />
                      <SliderHandle />
                    </SliderTrack>
                  </Slider>
                  <Slider min={0} max={100} value={hsl.saturation}>
                    <SliderTrack>
                      <SliderTrackHighlight />
                      <SliderHandle />
                    </SliderTrack>
                  </Slider>
                  <Slider min={0} max={100} value={hsl.lightness}>
                    <SliderTrack>
                      <SliderTrackHighlight />
                      <SliderHandle />
                    </SliderTrack>
                  </Slider>
                </TabPanel>
                <TabPanel>
                  <Slider min={0} max={255} value={rgb.red}>
                    <SliderTrack>
                      <SliderTrackHighlight />
                      <SliderHandle />
                    </SliderTrack>
                  </Slider>
                  <Slider min={0} max={255} value={rgb.green}>
                    <SliderTrack>
                      <SliderTrackHighlight />
                      <SliderHandle />
                    </SliderTrack>
                  </Slider>
                  <Slider min={0} max={255} value={rgb.blue}>
                    <SliderTrack>
                      <SliderTrackHighlight />
                      <SliderHandle />
                    </SliderTrack>
                  </Slider>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ColorRepresentations>
        </ValuesContainer>
      </TopContainer>
      <BottomContainer>
        <button onClick={onClick}>Done</button>
        <button onClick={onClick}>Cancel</button>
        <button onClick={onClick}>As a new color</button>
      </BottomContainer>
    </Container>
  );
};

export default ColorPicker;
