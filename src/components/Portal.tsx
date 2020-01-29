import React from 'react';
import ReachPortal from '@reach/portal';
import { useIsMounted } from '../hooks/useIsMounted';

const Portal: React.FC = (props) => {
  const { children } = props;
  const isMounted = useIsMounted();

  if (isMounted) {
    return <ReachPortal>{children}</ReachPortal>;
  }

  return null;
};

export default Portal;
