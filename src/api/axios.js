import axios from 'axios';


const BASE_URL = "http://13.49.221.234:8080"
const BASE_URL_SEARCH = "http://16.170.207.196:9200"


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
