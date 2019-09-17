import { create } from 'apisauce';

const apiUrl = {
  // hml: 'https://xbmfs67lyl.execute-api.us-east-1.amazonaws.com/dev',
  hml: 'https://a17qs59l7b.execute-api.us-east-1.amazonaws.com/prod',
  prod: 'https://a17qs59l7b.execute-api.us-east-1.amazonaws.com/prod',
};

const api = create({
  baseURL: process.env.NODE_ENV === 'production' ? apiUrl.prod : apiUrl.hml,
  headers: {
    Authorization: '',
  },
});

export default api;
