import axios from "./axios.customize";

const createUserApi = (email, name, password) => {
    const URL_API = "/api/register";
    const data = { email, name, password, };
    return axios.post(URL_API, data);
}


const loginApi = (email, password) => {
    const URL_API = "/api/login";
    const data = { email, password, };
    return axios.post(URL_API, data);
}

const getApi = () => {
    const URL_API = "/api/user";
    return axios.get(URL_API);
}


export { createUserApi, loginApi, getApi };