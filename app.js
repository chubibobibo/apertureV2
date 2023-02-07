if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError.js');
const photoRoutes = require('./routes/photoRoutes.js');
const commentRoutes = require('./routes/reviewRoutes.js');
const userRoutes = require('./routes/userRoutes.js')
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user.js');
const passport = require('passport');
const localStrategy = require('passport-local')



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }))//parsing data from forms
app.use(methodOverride('_method'))//overide with post having ?_method=""
app.use(express.static(path.join(__dirname, 'public')));//serving static folders
app.use(flash());



// Mongoose Database
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    mongoose.set('strictQuery', true)
    await mongoose.connect('mongodb://127.0.0.1:27017/aperture2');
}

//setting session config
const sessionConfig = {
    secret: 'ultimateSecretCode',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,

    }
}
app.use(session(sessionConfig))
// app.use(session({
//     secret: 'ultimateSecretCode',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//         httpOnly: true,

//     }
// }))
app.use(flash());

//configuring passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//store user in a session
passport.deserializeUser(User.deserializeUser());//unstore a use in a session


//flash middleware, storing req.flash to .locals
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.loggedUser = req.user
    next()
})

//========ROUTES==========
//Landing Page
app.get('/', (req, res) => {
    res.render('photo/home.ejs');
})


//restructured photo routes
app.use('/photos', photoRoutes)
//restructured comment routes
app.use('/photos/:id/comment', commentRoutes)
//restructured user routes
app.use('/', userRoutes)



//middleware that will apply to every single route
//if route doesn't exist it will display the ExpressError
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404))//passing the error to the next error handler
})

//default express error handler so that when error occurs, our app doesn't break instead it display an error
app.use((err, req, res, next) => {
    //destructure the err received then use it to display the err status and err message
    const { message = 'An Error Occured', status = 500 } = err
    res.status(status).render('errorAlert.ejs', { err })
})


app.listen(3000, () => (
    console.log('SERVING PORT 3000')
))


