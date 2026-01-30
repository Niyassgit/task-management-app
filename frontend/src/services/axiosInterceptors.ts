import { api } from "./api";

api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("accessToken");
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }

        return config;
    },

    (error)=>Promise.reject(error)
);

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status===401){
            
        }
    }
)