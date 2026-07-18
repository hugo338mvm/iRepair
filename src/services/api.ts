import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev/api',
  withCredentials: false,
  headers: {
    'Authorization': 'Bearer f637f404-891e-433a-8d74-8db30de13123',
    'Content-Type': 'application/json',
  },
});