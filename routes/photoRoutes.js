const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync.js');
const JoiValidatePhoto = require('../joiMiddleware/JoiValidatePhoto.js');
const Photo = require('../models/photo.js');
const photoCont = require('../controllers/photoController.js')
const { storage } = require('../cloudinary/index.js')
const multer = require('multer');
const upload = multer({ storage });



//middleware
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to be logged in')
        res.redirect('/login')
    } else {
        next()
    }
}

const isAuthorPhoto = async (req, res, next) => {
    const { id } = req.params;
    const foundEntry = await Photo.findById(id);//searching for a specific entry
    //then compare the author of the specific photo entry to the user_id
    if (!foundEntry.author.equals(req.user._id)) {
        req.flash('error', 'You are not the author of this entry')
        res.redirect('/photos')
    } else { next() }

}

//restructured photo routes. remove the prefixed route in the app.js
//don't forget to export router to require it int he app.js

//index page
router.get('/', catchAsync(photoCont.renderIndex))

//parsing data need to use urlencoder
router.get('/new', isLoggedIn, photoCont.renderNew)

//creating new photo entry
router.post('/', isLoggedIn, upload.array('image'), JoiValidatePhoto, catchAsync(photoCont.createNew))
// router.post('/', upload.array('image'), (req, res) => {
//     console.log(req.files, req.body)
// })

//detail of photoentry
router.get('/:id', catchAsync(photoCont.renderDetail))

//edit photoentry
router.get('/:id/edit', isLoggedIn, isAuthorPhoto, catchAsync(photoCont.renderEditDetail))

router.put('/:id', isLoggedIn, isAuthorPhoto, upload.array('image'), JoiValidatePhoto, catchAsync(photoCont.editDetail))

//deleting photo entry
router.delete('/:id', isLoggedIn, isAuthorPhoto, catchAsync(photoCont.deleteEntry))

module.exports = router
//reminder