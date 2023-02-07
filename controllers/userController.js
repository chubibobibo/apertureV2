const User = require('../models/user.js')

module.exports.renderRegister = (req, res) => {
    res.render('users/register.ejs')
}

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)
        //create a new instance of User
        const newUser = await new User({ username: username, email: email });
        //register the password to the new instance of User(newUser)
        await newUser.setPassword(password)
        await newUser.save()
        req.login(newUser, err => {
            if (err) { return next(err) }
            else {
                req.flash('success', 'Successfully created a user')
                res.redirect('/photos')
            }
        })
    } catch (err) {
        req.flash('error', err)
        res.redirect('/photos')
    }
}

module.exports.login = async (req, res) => {
    //parsing data from req.body to obtain username so we can display it as a logged in user for flash('success')
    const { username } = req.body
    const foundUser = await (User.findOne({ username: username }))
    req.flash('success', `Welcome back ${foundUser.username}`)
    res.redirect('/photos')
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
    })
    req.flash('success', 'Logged Out')
    res.redirect('/photos')
}
