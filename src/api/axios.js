import axios from 'axios';

const BASE_URL = "http://13.50.14.121:8080";
const BASE_URL_SEARCH = "http://13.50.14.121:9200";

const axiosInstances = {
  axiosSearch: axios.create({
    baseURL: BASE_URL_SEARCH,
    timeout: 5000,
  }),
  axiosPublic: axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  }),
  axiosPrivate: axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  }),
};

// Export par défaut : axiosInstances
export default axiosInstances;

// Export des autres instances axios pour une utilisation spécifique si nécessaire
export const { axiosSearch, axiosPublic, axiosPrivate } = axiosInstances;

