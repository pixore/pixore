import React from 'react';
import styled from '@emotion/styled';
import { useWindow } from './Context';
import { useEmitter } from '../Editor';

const Button = styled.button`
  background: transparent;
  border: 0;
  float: right;

  line {
    stroke: #eceff4;
  }
`;

type PropTypes = React.HTMLProps<HTMLButtonElement>;

const CloseButton: React.FC<PropTypes> = (props) => {
  const emitter = useEmitter();
  const { onRequestedClose, id } = useWindow();

  const onClose = () => {
    emitter.emit(id, {});
    onRequestedClose();
  };

  return (
    <Button {...props} onClick={onClose} type="button" aria-label="close">
      <svg
        width={10}
        height={10}
        viewBox="0 0 10 10"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="10" x2="10" y2="0" stroke="#eceff4" strokeWidth="2" />
        <line x1="0" y1="0" x2="10" y2="10" stroke="#eceff4" strokeWidth="2" />
      </svg>
    </Button>
  );
};

export default CloseButton;
