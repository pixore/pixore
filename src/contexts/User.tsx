import React from 'react';
import fetch from 'isomorphic-fetch';

interface User {
  userId: string;
  username: string;
}

interface UserContext {
  user?: User;
  loading: boolean;
}

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState;

const User = React.createContext<UserContext>({ user: null, loading: false });

const fetchUser = async () => {
  if (userState !== undefined) {
    return userState;
  }

  const res = await fetch('/api/me');
  userState = res.ok ? await res.json() : null;
  return userState;
};

const useUser = () => React.useContext(User).user;
const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined,
  });

  React.useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    fetchUser().then((user) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser({ user, loading: false });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userState]);

  return data;
};

interface PropTypes {
  value: UserContext;
}

const Provider: React.FC<PropTypes> = (props) => {
  const { value, children } = props;
  const { user } = value;

  React.useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, [user]);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export { useUser, useFetchUser, Provider };
