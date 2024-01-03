import axios from 'axios';

const baseURL = 'https://loan.pip-idea.tk';
const token = localStorage.getItem('token');

export const apiText = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    authorization: `${token}`,
  },
});
