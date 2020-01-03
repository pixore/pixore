import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';

type PropTypes = React.HTMLProps<HTMLButtonElement>;

const CenterButton: React.FC<PropTypes> = (props) => {
  return (
    <button {...props} type="button">
      <span aria-hidden="true">ⵙ</span>
      <VisuallyHidden>
        <span>center</span>
      </VisuallyHidden>
    </button>
  );
};

export default CenterButton;
