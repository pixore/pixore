import React from 'react';
import { useEmitter } from '../../Editor';
import { useWindow } from '../Context';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import { useUpdaters } from './useUpdaters';
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
import { toHsl, toHsv, toString, pureHue, Color } from '../../../utils/Color';
import { useMouseEvent } from '../../../hooks/useMouseEvent';
import ColorValue from './ColorValue';

interface MouseEvent {
  clientX: number;
  clientY: number;
}

export interface PropTypes {
  color: Color;
}

const ColorPicker: React.FC<PropTypes> = (props) => {
  const { color } = props;
  const [tabIndex, setTabIndex] = React.useState(0);
  const addColorRef = React.useRef<HTMLInputElement>();
  const { id, onRequestedClose } = useWindow();
  const emitter = useEmitter();
  const [rgb, setRgb] = React.useState(color);
  const [hsv, setHsv] = React.useState(() => toHsv(rgb));
  const [hsl, setHsl] = React.useState(() => toHsl(rgb));
  const { updaters, alphaPickerRef, huePickerRef, svPickerRef } = useUpdaters(
    setHsv,
    setRgb,
    setHsl,
  );

  const newColorWithFullAlpha = pureHue(hsv);

  const onDone = () => {
    emitter.emit(id, {
      color: rgb,
      addToPalette: addColorRef.current.checked,
    });
    onRequestedClose();
  };

  const onCancel = () => {
    emitter.emit(id, {});
    onRequestedClose();
  };

  const handlerMouseEventSV = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    updaters.sv({
      x: clientX,
      y: clientY,
    });
  };

  const mouseEventSV = useMouseEvent({
    onMouseDown: handlerMouseEventSV,
    onMouseMove: handlerMouseEventSV,
  });

  const handlerMouseEventHue = (event: MouseEvent) => {
    const { clientY } = event;
    updaters.hue(clientY);
  };

  const mouseEventHue = useMouseEvent({
    onMouseDown: handlerMouseEventHue,
    onMouseMove: handlerMouseEventHue,
  });

  const handlerMouseEventAlpha = (event: MouseEvent) => {
    const { clientX } = event;
    updaters.alpha(clientX);
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
                  bottom: `${hsv.value}%`,
                  left: `${hsv.saturation}%`,
                }}
              />
            </SaturationAndValuePicker>
            <HuePicker ref={huePickerRef} {...mouseEventHue}>
              <HueBarPicker
                style={{
                  bottom: `${(hsv.hue * 100) / 360}%`,
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
                left: `${hsv.alpha}%`,
              }}
            />
          </AlphaPicker>
        </PickersContainer>
        <ValuesContainer>
          <ColorsContainer>
            <CurrentColor val={color} />
            <NewColor val={rgb} />
          </ColorsContainer>
          <ColorRepresentations>
            <Tabs onChange={setTabIndex}>
              <TabList>
                <Tab>HSV</Tab>
                <Tab>HSL</Tab>
                <Tab>RGB</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {tabIndex === 0 && (
                    <>
                      <ColorValue
                        value={hsv.hue}
                        updateValue={updaters.hsvProperty}
                        name="hue"
                        min={0}
                        max={360}
                      />
                      <ColorValue
                        value={hsv.saturation}
                        updateValue={updaters.hsvProperty}
                        name="saturation"
                        min={0}
                        max={100}
                      />
                      <ColorValue
                        value={hsv.value}
                        updateValue={updaters.hsvProperty}
                        name="value"
                        min={0}
                        max={100}
                      />
                      <ColorValue
                        value={hsv.alpha}
                        updateValue={updaters.hsvProperty}
                        name="alpha"
                        min={0}
                        max={100}
                      />
                    </>
                  )}
                </TabPanel>
                <TabPanel>
                  {tabIndex === 1 && (
                    <>
                      <ColorValue
                        value={hsl.hue}
                        updateValue={updaters.hslProperty}
                        name="hue"
                        min={0}
                        max={360}
                      />
                      <ColorValue
                        value={hsl.saturation}
                        updateValue={updaters.hslProperty}
                        name="saturation"
                        min={0}
                        max={100}
                      />
                      <ColorValue
                        value={hsl.lightness}
                        updateValue={updaters.hslProperty}
                        name="lightness"
                        min={0}
                        max={100}
                      />
                      <ColorValue
                        value={hsl.alpha}
                        updateValue={updaters.hslProperty}
                        name="alpha"
                        min={0}
                        max={100}
                      />
                    </>
                  )}
                </TabPanel>
                <TabPanel>
                  {tabIndex === 2 && (
                    <>
                      <ColorValue
                        value={rgb.red}
                        updateValue={updaters.rgbProperty}
                        name="red"
                        min={0}
                        max={255}
                      />
                      <ColorValue
                        value={rgb.green}
                        updateValue={updaters.rgbProperty}
                        name="green"
                        min={0}
                        max={255}
                      />
                      <ColorValue
                        value={rgb.blue}
                        updateValue={updaters.rgbProperty}
                        name="blue"
                        min={0}
                        max={255}
                      />
                      <ColorValue
                        value={rgb.alpha}
                        updateValue={updaters.rgbProperty}
                        name="alpha"
                        min={0}
                        max={100}
                      />
                    </>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ColorRepresentations>
        </ValuesContainer>
      </TopContainer>
      <BottomContainer>
        <button onClick={onDone}>Done</button>
        <button onClick={onCancel}>Cancel</button>
        <label>
          <input
            ref={addColorRef}
            type="checkbox"
            defaultChecked
            name="add-color"
          />
          add to the palette
        </label>
      </BottomContainer>
    </Container>
  );
};

export default ColorPicker;
