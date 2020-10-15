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
    case types.SET_MONTH: {
      return (store.account = {
        ...store.account,
        month: payload,
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
    case types.SET_LOG_DATA: {
      return (store.details = {
        ...store.details,
        logs: [...payload],
      });
    }
    case types.SET_TOTAL_SUM: {
      return (store.details = {
        ...store.details,
        total: {
          ...store.details.total,
          incomings: payload[1],
          outgoings: payload[0],
        },
      });
    }
    case types.SET_STAT_DATE: {
      const { sum, dates } = payload;
      return (store.statistics = {
        ...store.statistics,
        total: sum,
        byDate: [...dates],
      });
    }
    case types.SET_STAT_CATEGORY: {
      const { sum, categories } = payload;
      return (store.statistics = {
        ...store.statistics,
        total: sum,
        byCategory: [...categories],
      });
    }
  }
};

export default reducer;
