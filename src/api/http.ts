import axios, {AxiosRequestConfig} from "axios";


const BASE_URL = 'http://localhost:9999';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config? : AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL : BASE_URL,
        timeout : DEFAULT_TIMEOUT,
        headers : {
            'content-Type' : 'application/json',
        },
        withCredentials : true,
        ...config,
    })

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    

    return axiosInstance;
}


//왜 다른 이름으로 Export??
export const httpClient = createClient();