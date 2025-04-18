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

const getCart = (token) => {
    const URL_API = "/cart";
    return axios.get(URL_API, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const updateCartItem = async (itemId, data, token) => {
    try {
        const response = await axios.put(`/cart/${itemId}`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return { success: true, cart: response.cart };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật giỏ hàng'
        };
    }
};

const removeFromCart = async (itemId, token) => {
    try {
        await axios.delete(`/cart/${itemId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Có lỗi xảy ra khi xóa sản phẩm'
        };
    }
};

const searchProduct = (name) => {
    const URL_API = `/product/search?name=${encodeURIComponent(name)}`;
    return axios.get(URL_API);
};

export { getCategories, getProducts, getProductById, addToCart, getCart, removeFromCart, updateCartItem, searchProduct };