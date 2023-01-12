import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_TEST
// const API_URL = process.env.LOCAL = true ? "http://localhost:8080/api/test/" : "https://practice-online-store-1-production.up.railway.app/api/test/";
// const API_URL = 'https://practice-online-store-1-production.up.railway.app/api/test/';

//https://practice-online-store-1-production.up.railway.app/api/test/all

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
