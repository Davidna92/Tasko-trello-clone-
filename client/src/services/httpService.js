import axios from 'axios';

axios.defaults.headers.common['auth-token'] = localStorage.getItem('token'); //saving token to local storage


axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response.status >= 403;
    if (expectedError) console.error("Something went wrong, try again later");
    return Promise.reject(error);
});



const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
}

export default http;
