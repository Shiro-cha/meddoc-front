import axios from 'axios';
import http from 'http'; // Import the Node.js HTTP module

const BASE_URL = "http://16.16.212.56:8080";
const BASE_URL_SEARCH = "http://16.16.212.56:9200";

// Create a custom adapter that allows mixed content
const mixedContentAdapter = config => {
  const isHttps = config.baseURL.startsWith('https'); // Check if base URL is HTTPS
  const agent = isHttps ? null : new http.Agent({ keepAlive: true }); // Use HTTP agent for non-HTTPS base URLs
  config.httpAgent = agent; // Set the HTTP agent in the Axios config
  return axios.defaults.adapter(config); // Use the default Axios adapter
};

// Create Axios instances with the custom adapter
export const axiosSearch = axios.create({
  baseURL: BASE_URL_SEARCH,
  timeout: 5000,
  adapter: mixedContentAdapter // Use the custom adapter
});

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  adapter: mixedContentAdapter // Use the custom adapter
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  adapter: mixedContentAdapter // Use the custom adapter
});

