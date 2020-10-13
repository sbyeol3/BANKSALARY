import store from './store';
import types from './types';

const reducer = (action) => {
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case types.SET_TAB_VALUE: {
      return (store.account = {
        ...store.account,
        tab: payload,
      });
    }
    case types.SET_AUTH_TOKEN: {
      localStorage.setItem('token', payload);
      return (store.auth = {
        ...store.auth,
        token: payload,
      });
    }
    case types.REMOVE_AUTH_TOKEN: {
      localStorage.removeItem('token');
      return (store.auth = {
        ...store.auth,
        token: null,
        isLoggedIn: false,
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
    case types.SET_LOG_INPUT: {
      const { name, value } = payload;
      return (store.logInput = {
        ...store.logInput,
        [name]: value,
      });
    }
  }
};

export default reducer;
