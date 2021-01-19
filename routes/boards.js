const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

//Board model
const { Board } = require('../models/board');

//Post new board
router.post('/', auth, async (req, res) => {
    try {
        const newBoard = new Board({
            name: req.body.name,
            boardData: req.body.boardData,
            date: req.body.date,
            background: req.body.background,
            user_id: req.body.user_id,
        });
        await newBoard.save()
        res.send(newBoard);

    } catch (err) {
        console.log("Error when try to post req", err);
    }
});


router.get('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        Board.find({ user_id: id })
            .sort({ date: -1 })
            .then((board) => res.json(board));
    } catch (error) {
        res.send({ message: error });
        console.log("Error with get board by user id", error);
    }
});


module.exports = router;