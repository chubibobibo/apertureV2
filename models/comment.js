const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    rating: {
        type: Number,
        max: 5
    },
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Comment = new mongoose.model('Comment', CommentSchema)

module.exports = Comment