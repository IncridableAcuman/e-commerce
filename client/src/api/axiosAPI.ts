import axios from "axios";

const axiosAPI=axios.create({
    withCredentials:true,
    baseURL: "http://localhost:8080/api",
})
axiosAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
axiosAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if(error.response.status===401 && !originalRequest._retry){
            originalRequest._retry=true;
            try {
                const {data}=await axiosAPI.post("/auth/refresh");
                localStorage.setItem("token",data.accessToken);
                return axiosAPI(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }
    }
);
export default axiosAPI;
