import axios, {AxiosRequestConfig} from "axios";
import { getToken, removeToken } from "../store/authStore";


const BASE_URL = 'http://localhost:9999';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config? : AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL : BASE_URL,
        timeout : DEFAULT_TIMEOUT,
        headers : {
            'Content-Type' : 'application/json',
            Authorization : getToken() ? getToken() : '',
        },
        withCredentials : true,
        ...config,
    })

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            //로그인 만료 처리
            if(error.response.staus === 401) {
                removeToken();
                window.location.href = '/login';
                return;
            }
            return Promise.reject(error);
        }
    );
    

    return axiosInstance;
}


//왜 다른 이름으로 Export??
export const httpClient = createClient();