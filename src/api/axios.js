import axios from 'axios';


const BASE_URL = "http://192.168.88.32:8080"
const BASE_URL_SEARCH = "http://192.168.88.32:9200"


export const axiosSearch = axios.create({
    baseURL: BASE_URL_SEARCH,
    timeout: 5000,
});

export default axios.create({
    baseURL: BASE_URL,
    timeout: 5000,

});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});