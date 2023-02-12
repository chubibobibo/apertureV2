
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment.js')

//new schema for photo property
const imageSchema = new Schema({
    url: String,
    filename: String
})

//refer to mongoose virtuals
imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload/', '/upload/w_400/')
})
//setting mongoose to use virtuals is JSON
const opts = { toJSON: { virtual: true } };

const PhotoSchema = new Schema({
    title: String,
    location: String,
    //added from geodata(mapbox)
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
    photo: [imageSchema],
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
}, opts)

//using virtuals to access the .title and .description of our specific photo entry
//properties.popUpMarkup allows access to the function popUpMarkup in the clusterMap.
//clusterData will return a link that will use the id of the parsed stringified data of our specific photoEntry and use .title to display the title of the marker in the popup
PhotoSchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href="/photos/${this._id}">${this.title}</a>`
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