import { API_URL } from '../config.json';
import http from './httpService';


//Post Board
export async function postData(data) {
    const res = await http.post(`${API_URL}/boards`, {
        name: data.name,
        boardData: data.boardData,
        userId: data.userId,
        background: data.background,
        date: new Date()
    });
    return res.json();
}


export async function getBoards(id) {
    const { data } = await http.get(`${API_URL}/boards/${id}`);
    return data;
}


const boardService = {
    postData,
    getBoards,
};

export default boardService;