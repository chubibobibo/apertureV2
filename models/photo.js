const { ref } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment.js')

const PhotoSchema = new Schema({
    title: String,
    location: String,
    photo: [
        {
            url: String,
            filename: String,
        }
    ],
    description: String,
    comment: [//multiple comments, better to be an array
        {
            type: Schema.Types.ObjectId,//mongoose schema
            ref: 'Comment'//schema referred to 
        }
    ],
    author: {
        type: Schema.Types.ObjectId,//mongoose schema
        ref: 'User'//model referred to
    }
})

//mongoose middleware to delete a model with all the comments in it
// (.post) will run after the findByIdAndDelete
PhotoSchema.post('findOneAndDelete', async function (delPhoto) {
    if (delPhoto) {
        await Comment.deleteMany({ $in: delPhoto.comment })
    }
})

const Photo = new mongoose.model('Photo', PhotoSchema)
module.exports = Photo