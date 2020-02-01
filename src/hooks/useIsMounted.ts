import React from 'react';

const useIsMounted = () => {
  const [isMounted, setIsMounted] = React.useState();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

export { useIsMounted };
