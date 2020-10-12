import types from './types';

export const setAuthToken = (value) => {
  return {
    type: types.SET_AUTH_TOKEN,
    payload: value,
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
