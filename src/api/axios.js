import axios from 'axios';


const BASE_URL = "http://16.16.212.56:8080";
const BASE_URL_SEARCH = "http://16.16.212.56:9200";


// Create Axios instances with the custom adapter
export const axiosSearch = axios.create({
  baseURL: BASE_URL_SEARCH,
  timeout: 5000,

});

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

