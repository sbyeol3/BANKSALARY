import store from './store';
import types from './types';

const reducer = (action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_AUTH_TOKEN: {
      store.auth = {
        ...store.auth,
        token: payload,
      };
    }
  }
};

export default reducer;
