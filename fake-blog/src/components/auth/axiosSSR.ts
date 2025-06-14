import axiosLib from "axios";

const axiosSSR = axiosLib.create({
    baseURL: "http://localhost:5173",
    timeout: 60000,
    headers: {
        Accept: "text/html"
    },
    withCredentials: true
});

export default axiosSSR;