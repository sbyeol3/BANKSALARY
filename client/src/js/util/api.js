import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const request = async (config) => {
  try {
    const { uri, method, data } = config;
    const response = await axios({
      url: process.env.BASE_URL + uri,
      method,
      data,
    });
    const { status, data: resBody } = response;
    if (status !== 200) return [status, resBody];
    return [200, resBody.data];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default request;
