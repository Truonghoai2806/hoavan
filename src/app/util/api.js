import axios from "./axios.customize";

const getCategories = () => {
    const URL_API = "/category";
    return axios.get(URL_API,);
}

const getProducts = () => {
    const URL_API = "/product";
    return axios.get(URL_API);
}

const getProductById = (id) => {
    const URL_API = `/product/${id}`;
    return axios.get(URL_API);
};
const addToCart = (data) => {
    const URL_API = "/cart";
    return axios.post(URL_API, data);
};

const getCart = () => {
    const URL_API = "/cart";
    return axios.get(URL_API);
};

export { getCategories, getProducts, getProductById, addToCart, getCart };