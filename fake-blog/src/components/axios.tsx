import axiosLib from "axios";

const axios = axiosLib.create({
    baseURL: "http://localhost:8000",
    timeout: 60000,
    // xsrfCookieName: "XSRF-TOKEN",
    // xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        Accept: "application/json"
    }
});

export default axios;