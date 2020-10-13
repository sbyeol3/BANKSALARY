import axios from 'axios';
import store from '../store/store';

const request = async (config) => {
  try {
    const { uri, method, data, params } = config;
    const { token } = store.auth;
    const response = await axios({
      url: process.env.BASE_URL + uri,
      headers: {
        Authorization: token,
      },
      params,
      method,
      data,
    });
    return successHadler(response);
  } catch (err) {
    console.log(err);
    const { response } = err;
    return errorHadler(response);
  }
};

const successHadler = (response) => {
  const { status, data } = response;
  return {
    success: true,
    status,
    data,
  };
};

const errorHadler = (response) => {
  const { status, data } = response;
  console.log(data.message);
  return {
    success: false,
    status,
    data,
  };
};

export default request;
