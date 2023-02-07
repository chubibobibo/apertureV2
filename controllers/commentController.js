const Comment = require('../models/comment.js');
const Photo = require('../models/photo.js')

module.exports.createComment = async (req, res) => {
    const { id } = req.params;
    const { userComment } = req.body;
    console.log(req.params)
    const foundEntry = await Photo.findById(id);
    const newComment = await new Comment(userComment);//create new instance of comment before pushing. this is where the req.body will be saved first
    newComment.author = req.user//creating an author for comments
    foundEntry.comment.push(newComment)
    await foundEntry.save()
    await newComment.save()
    req.flash('success', 'Comment added')
    res.redirect(`/photos/${foundEntry._id}`)
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    console.log(commentId)
    await Photo.findByIdAndUpdate(id, { $pull: { comment: commentId } })
    await Comment.findByIdAndDelete(commentId)
    req.flash('success', 'Deleted comment')
    res.redirect(`/photos/${id}`)
}

//sample change
