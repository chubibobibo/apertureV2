const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync.js');
const passport = require('passport')
const userCont = require('../controllers/userController.js')



//rendering user.ejs
router.get('/register', userCont.renderRegister)

//registering a new user
router.post('/register', catchAsync(userCont.register))

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    keepSessionInfo: true,
    failureFlash: true
}), userCont.login);

//logout
router.get('/logout', userCont.logout)

module.exports = router