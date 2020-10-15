import types from './types';

export const setTabValue = (value) => {
  return {
    type: types.SET_TAB_VALUE,
    payload: value,
  };
};

export const setMonth = (value) => {
  return {
    type: types.SET_MONTH,
    payload: value,
  };
};

export const setAuthToken = (value) => {
  return {
    type: types.SET_AUTH_TOKEN,
    payload: value,
  };
};

export const removeAuthToken = () => {
  return {
    type: types.REMOVE_AUTH_TOKEN,
    payload: null,
  };
};

export const setInCategories = (inCategories) => {
  return {
    type: types.SET_IN_CATEGORIES,
    payload: inCategories,
  };
};

export const setOutCategories = (outCategories) => {
  return {
    type: types.SET_OUT_CATEGORIES,
    payload: outCategories,
  };
};

export const setPayments = (payments) => {
  return {
    type: types.SET_PAYMENTS,
    payload: payments,
  };
};

export const setLogInput = (name, value) => {
  return {
    type: types.SET_LOG_INPUT,
    payload: { name, value },
  };
};

export const resetLogInput = () => {
  return {
    type: types.RESET_LOG_INPUT,
    payload: null,
  };
};

export const setLogData = (value) => {
  return {
    type: types.SET_LOG_DATA,
    payload: value,
  };
};

export const setTotalSum = (value) => {
  return {
    type: types.SET_TOTAL_SUM,
    payload: value,
  };
};

export const setStatByCategory = (value) => {
  return {
    type: types.SET_STAT_CATEGORY,
    payload: value,
  };
};

export const setStatByDate = (value) => {
  return {
    type: types.SET_STAT_DATE,
    payload: value,
  };
};
