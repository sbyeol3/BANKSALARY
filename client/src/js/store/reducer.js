import store from './store';
import types from './types';

const reducer = (action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_AUTH_TOKEN: {
      localStorage.setItem('token', payload);
      return (store.auth = {
        ...store.auth,
        token: payload,
      });
    }
    case types.SET_IN_CATEGORIES: {
      return (store.select = {
        ...store.select,
        category: {
          ...store.select.category,
          in: [...payload],
        },
      });
    }
    case types.SET_OUT_CATEGORIES: {
      return (store.select = {
        ...store.select,
        category: {
          ...store.select.category,
          out: [...payload],
        },
      });
    }
    case types.SET_PAYMENTS: {
      return (store.select = {
        ...store.select,
        payment: [...payload],
      });
    }
  }
};

export default reducer;
