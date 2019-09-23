import { create } from 'apisauce';

const apiUrl = {
  hml: 'https://api.44express.com',
  prod: 'https://api.44express.com',
};

const api = create({
  baseURL: process.env.NODE_ENV === 'production' ? apiUrl.prod : apiUrl.hml,
  headers: {
    Authorization: '',
  },
});

export default api;
