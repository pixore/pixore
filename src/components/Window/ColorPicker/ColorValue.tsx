import React from 'react';
import styled from '@emotion/styled';
import {
  SliderInput,
  SliderTrack,
  SliderTrackHighlight,
  SliderHandle,
} from '@reach/slider';
import VisuallyHidden from '@reach/visually-hidden';
import { numberIsBetween } from '../../../utils/numbers';

interface PropTypes {
  name: string;
  min: number;
  max: number;
  value: number;
  updateValue: (name: string, value: number) => void;
}

const Slider = styled(SliderInput)`
  vertical-align: middle;
  width: 100%;
  max-width: calc(100% - 2.5em);
  padding: 0 0 0 10px;
  display: inline-block;
`;

const Container = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  max-width: 2.5em;
  font-size: 1rem;
  color: #d8dee9;
  background: #3b4252;
  border-color: #2e3440;
  text-align: center;
`;

const ColorValue: React.FC<PropTypes> = (props) => {
  const { value, updateValue, min, max, name } = props;

  const id = `${name}-input`;
  const changeValue = (newValue: number | string) => {
    const parsedValue = Number(String(newValue).trim());
    if (Number.isNaN(parsedValue) || numberIsBetween(parsedValue, min, max)) {
      return;
    }

    return updateValue(name, parsedValue);
  };
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(event.target.value);
  };

  const onChangeSlide = (newValue: number) => {
    changeValue(newValue);
  };

  return (
    <Container>
      <VisuallyHidden>
        <label htmlFor={id}>value name</label>
      </VisuallyHidden>
      <Input onChange={onChangeInput} value={value} type="text" id={id} />
      <Slider
        min={min}
        max={max}
        onChange={onChangeSlide}
        value={value}
        name={`${name}-slider`}
      >
        <SliderTrack>
          <SliderTrackHighlight />
          <SliderHandle />
        </SliderTrack>
      </Slider>
    </Container>
  );
};

export default React.memo(ColorValue);
