import axios from "./axios.customize";

const getCategories = () => {
    const URL_API = "/category";
    return axios.get(URL_API,);
}

const getProducts = () => {
    const URL_API = "/product";
    return axios.get(URL_API);
}

export { getCategories, getProducts };