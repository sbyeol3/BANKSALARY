import axios from 'axios';

const request = async (config) => {
  try {
    const { uri, method, data } = config;
    const response = await axios({
      url: process.env.BASE_URL + uri,
      method,
      data,
    });
    const { status } = response;
    if (status !== 200) return errorHadler(response);
    return successHadler(response);
  } catch (err) {
    console.log(err);
    return null;
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
