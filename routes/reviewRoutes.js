const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync.js');
const JoiValidateComment = require('../joiMiddleware/JoiValidateComment.js');
const Comment = require('../models/comment.js')
const commentCont = require('../controllers/commentController.js')

//middleware
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to be logged in')
        return res.redirect('/login')
    } else {
        next()
    }
}

const isAuthorReview = async (req, res, next) => {
    const { commentId, } = req.params;
    const foundComment = await Comment.findById(commentId);//searching for a specific entry
    if (!foundComment.author.equals(req.user._id)) {
        req.flash('error', 'You are not the author of this entry')
        res.redirect('/photos')
    } else { next() }

}

//creating comments
router.post('/', isLoggedIn, JoiValidateComment, catchAsync(commentCont.createComment))

//delete comments
//delete first in the array then in the db
router.delete('/:commentId', isLoggedIn, isAuthorReview, catchAsync(commentCont.deleteComment))

module.exports = router

//changes