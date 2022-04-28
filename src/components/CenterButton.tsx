import React from 'react';
import styled from '@emotion/styled';
import VisuallyHidden from '@reach/visually-hidden';

type PropTypes = React.HTMLProps<HTMLButtonElement>;

const Button = styled.button`
  padding: 2px 8px;
  vertical-align: middle;
`;

const CenterButton: React.FC<PropTypes> = (props) => {
  return (
    <Button {...props} type="button">
      <span aria-hidden="true">ⵙ</span>
      <VisuallyHidden>
        <span>center</span>
      </VisuallyHidden>
    </Button>
  );
};

export default CenterButton;
