import React from 'react';
import invariant from 'invariant';

interface ContextValue {
  id: string;
  onRequestedClose: () => void;
}

const defaultValue = {
  id: 'id',
  onRequestedClose() {
    invariant(false, 'Context not implemented');
  },
};

const Context = React.createContext<ContextValue>(defaultValue);
const useWindow = () => React.useContext(Context);
export { useWindow, Context };
