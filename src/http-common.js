import axios from "axios";

const baseURL = process.env.REACT_APP_API
// "https://practice-online-store-1-production.up.railway.app/api/";

export default axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json"
  }
});