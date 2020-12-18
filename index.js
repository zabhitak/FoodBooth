const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
var flash = require('connect-flash');
const bodyParser = require('body-parser');
var passport = require('passport');
var LocalStratergy = require('passport-local');
const dotenv = require('dotenv');
dotenv.config();

const keys = require('./keys');
const MONGODB_URI = keys.MONGODB_URI;

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('database connected');
  })
  .catch((err) => {
    console.log(err);
  });

const User = require('./routeModels/user/User');

app.use(
  require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: 'This is cara',
  })
);

app.use(flash());
app.use(function (req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var indexRoutes = require('./routes/index');
var authRoutes = require('./routes/auth');

app.use(indexRoutes);
app.use(authRoutes);

app.listen(3000, () => {
  console.log('server running at 3000');
});
