import React from 'react';
import styled from '@emotion/styled';

interface ButtonPropTypes {
  size: number;
}

const getSize = ({ size }: ButtonPropTypes) => `${size}px`;

const Button = styled.button`
  border: 0px;
  display: inline-block;
  height: ${getSize};
  width: ${getSize};
  position: relative;
  margin: 0;
  padding: 0;
  border: 0px;
  background: transparent;
`;

interface PropTypes {
  value: string;
  size?: number;
}

interface ContentColorPropTypes {
  value: string;
  isHover: boolean;
}

const getTransform = ({ isHover }: ContentColorPropTypes) =>
  isHover
    ? `transform: scale(1.1);
    box-shadow: 0 0 5px rgba(0,0,0,0.7);
    transform-origin: 50%;`
    : '';

const getBackground = ({ value }: ContentColorPropTypes) => value;

const ContentColor = styled.span`
  font-size: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${getBackground};
  ${getTransform};
`;

const Color: React.FC<PropTypes> = (props) => {
  const [isHover, setIsHover] = React.useState(false);
  const { value, size = 20 } = props;

  return (
    <Button
      size={size}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ContentColor value={value} isHover={isHover}>
        {value}
      </ContentColor>
    </Button>
  );
};

export default Color;
