import axios from "axios";

const axiosAPI=axios.create({
    withCredentials:true,
    baseURL: "http://localhost:8080/api",
})
axiosAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['Authorization']=`Bearer ${token}`
    }
    return config;
    },
    (error)=>Promise.reject(error)
);
axiosAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if(error.response.status===403 && !originalRequest._retry){
            originalRequest._retry=true;
            try {
                const {data}=await axiosAPI.get("/auth/refresh");
                localStorage.setItem("token",data.accessToken);
                error.config['Authorization']=`Bearer ${data.token}`
                return axiosAPI(originalRequest);
            } catch (error) {
                console.log(error);
                localStorage.removeItem("token");
                window.location.href="/home"
            }
        }
    }
);
export default axiosAPI;
