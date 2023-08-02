import axios from 'axios'

const timeout = 600000;
const axiosInstance = axios.create({ timeout });

export default axiosInstance