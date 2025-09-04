import axios from 'axios';
import { getEnvVariables } from '../helpers';
import { vi } from 'date-fns/locale';


const { VITE_API_URL } = getEnvVariables()

// console.log(VITE_API_URL)
const calendarApi = axios.create({
    baseURL: VITE_API_URL
});


//TODO: configurar interceptores
calendarApi.interceptors.request.use( config =>{

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default calendarApi;