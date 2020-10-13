import types from './types';

export const setTabValue = (value) => {
  return {
    type: types.SET_TAB_VALUE,
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
