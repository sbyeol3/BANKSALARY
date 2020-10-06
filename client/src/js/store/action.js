import types from './types';

export const setAuthToken = (value) => {
  return {
    type: types.SET_AUTH_TOKEN,
    payload: value,
  };
};
