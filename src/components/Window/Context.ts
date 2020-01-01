import React from 'react';
import invariant from 'invariant';

interface ContextValue {
  onRequestedClose: () => void;
}

const defaultValue = {
  onRequestedClose() {
    invariant(false, 'Context not implemented');
  },
};

const Context = React.createContext<ContextValue>(defaultValue);
const useWindow = () => React.useContext(Context);
export { useWindow, Context };
