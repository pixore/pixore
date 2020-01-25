import React from 'react';

interface PropTypes {
  children: React.ReactNode;
}

const Bootstrap: React.FC<PropTypes> = (props) => {
  const { children } = props;

  return <>{children}</>;
};

export default Bootstrap;
