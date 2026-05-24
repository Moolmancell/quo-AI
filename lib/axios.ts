import axios from 'axios';

axios.defaults.withCredentials = true;
// Optional: axios.defaults.baseURL = 'http://localhost:8080';

export default axios;