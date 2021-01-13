import { API_URL } from '../config.json';
import http from './httpService';
// import jwtDecode from 'jwt-decode';

const userToken = 'token';

export async function login(email, password) {
    const { data } = await http.post(`${API_URL}/auth`, { email, password });
    localStorage.setItem(userToken, data.token);
}


export default login;