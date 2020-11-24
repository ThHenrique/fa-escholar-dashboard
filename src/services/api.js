import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-escholar.herokuapp.com',
});

export default api;
