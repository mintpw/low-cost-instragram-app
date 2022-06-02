import axios from '../libs/axios';

export const getFeedsAPI = async () => {
  const promise = new Promise((resolve, reject) => {
    try {
      const response = axios.get(
        'https://run.mocky.io/v3/a210a8f1-530c-42f1-b46f-25bd65d558fa'
      );
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
  return Promise.resolve(promise);
};
