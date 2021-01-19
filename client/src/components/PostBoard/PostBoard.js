import React from 'react';
import boardService from '../../services/boardService';


const PostBoard = (props) => {

    async function postBoardData() {
        const res = await boardService.postData(props.data);
        return res.json();
    }
    postBoardData();

    return <div></div>
}

export default PostBoard;