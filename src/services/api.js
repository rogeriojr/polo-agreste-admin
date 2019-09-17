import { create } from 'apisauce';

const apiUrl = {
  hml: 'http://api.ofertaplay.com.br',
  prod: 'http://api.ofertaplay.com.br',
};

const api = create({
  baseURL: process.env.NODE_ENV === 'production' ? apiUrl.prod : apiUrl.hml,
  headers: {
    Authorization: '',
  },
});

export default api;
