import React, { useState, useEffect } from "react";
import PostBoard from "../PostBoard/PostBoard";
import boardService from '../../services/boardService';
import { Link, Redirect, Route } from "react-router-dom";
import './boards.css';



export const Boards = ({ user }) => {
    const [saveBoards, setSaveBoards] = useState([]);
    // const [boardTitles, setBoardTitles] = useState("");
    // const [boardBackground, setBoardBackground] = useState("rgb(210, 144, 52)");
    // const [visible, setVisible] = useState(false);
    // const [redirectToBoard, setRedirectToBoard] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const getAllBoards = async () => {
            try {
                const result = await boardService.getBoards(user._id); // Getting all the boards of the current user
                if (isMounted) {
                    setSaveBoards(result)
                }
            } catch (err) {
                console.log(err);
            }
        }
        getAllBoards();
        return () => isMounted = false;
    }, [user]);

    return (
        <>
            {saveBoards.length > 0 && (
                <div className="boards-list">
                    {saveBoards.map((board) => {
                        return (
                            <div className="board-container" key={board._id}>
                                <Link
                                    style={{
                                        color: "black",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                    }}
                                    to={{
                                        pathname: `/board/${board.name}`,
                                        state: {
                                            background: board.background,
                                            title: board.name,
                                            data: board.boardData,
                                            userID: board.userID,
                                            id: board._id,
                                        },
                                    }}
                                >
                                    {board.name}
                                </Link>
                            </div>
                        )
                    })}

                </div>
            )}
        </>
    )
}



