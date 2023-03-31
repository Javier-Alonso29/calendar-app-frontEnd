import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'

const { REACT_APP_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: REACT_APP_API_URL
})

// TODO: configurar interceptores
//* Para que todas las peticiones usen el header x-token
calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config
})

export default calendarApi;