import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

const server = axios.create({
  baseURL: API_URL,
  headers: {},
});

const responseBody = (response) => response.data;

const serverRequests = {
  del: (url) => server.delete(`${url}`).then(responseBody),
  get: (url) => server.get(`${url}`).then(responseBody),
  put: (url, body) => server.put(`${url}`, body).then(responseBody),
  post: (url, body) => server.post(`${url}`, body).then(responseBody),
};

export default serverRequests;
