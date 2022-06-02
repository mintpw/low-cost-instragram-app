import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.defaults.headers.common['Authorization'] = '';

instance.interceptors.request.use(
  function (config) {
    console.log('Making request : ' + config.url);
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
