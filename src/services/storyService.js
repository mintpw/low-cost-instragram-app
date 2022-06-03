import axios from '../libs/axios';

export const getStoriesAPI = async () => {
  const promise = new Promise((resolve, reject) => {
    try {
      const response = axios.get(
        'https://run.mocky.io/v3/f48649bf-2bfd-48db-9a64-5c8ad0646186'
      );
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
  return Promise.resolve(promise);
};
