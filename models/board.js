const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    boardData: {
        type: Array,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

const Board = mongoose.model('Board', boardSchema);

exports.Board = Board;