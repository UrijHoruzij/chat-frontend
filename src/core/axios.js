import axios from "axios";

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + window.localStorage.token;

window.axios = axios;

export default axios;
