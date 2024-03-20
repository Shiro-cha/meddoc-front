import axios from 'axios';


const BASE_URL = "http://13.50.14.121:8080"
const BASE_URL_SEARCH = "http://13.50.14.121:9200"


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
