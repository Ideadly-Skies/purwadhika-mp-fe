import axios from 'axios'
import authStore from '@/zustand/authStore';

const instance = axios.create({
    baseURL: 'http://localhost:4700/api'
})

// middleware versi frontend
instance.interceptors.request.use(
    async request => {
        // take the token from the local storage
        const token = authStore.getState().token;

        if (token){
            request.headers['Authorization'] = `Bearer ${token}`
        }

        return request;
    },

    error => {
        console.log(error);
    }
)

instance.interceptors.response.use(
    async response => {
        return response;
    },

    error => {
        if (error?.response?.data?.message === 'jwt expired'){
            const setAuthLogout = authStore.getState().setAuthLogout;
            setAuthLogout();
        }        
        
        return Promise.reject(error);
    }

);

export default instance;