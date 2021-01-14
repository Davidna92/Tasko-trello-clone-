import { API_URL } from '../config.json';
import http from './httpService';
import jwtDecode from 'jwt-decode';

const userToken = 'token';

export async function login(email, password) {
    const { data } = await http.post(`${API_URL}/auth`, { email, password });
    localStorage.setItem(userToken, data.token);
};

export function logout() {
    localStorage.removeItem(userToken);
};

export function getUser() {
    try {
        const jwt = localStorage.getItem(userToken);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
};

export async function userData(id) {
    const { data } = await http.get(`${API_URL}/users/${id}`);
    return data;
}

const userService = {
    login,
    logout,
    getUser,
    userData,
}

export default userService;
