const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStratergy = require('passport-local');
const multer = require("multer")
const uuid = require("uuid")
const dotenv = require('dotenv');
dotenv.config();

const keys = require('./keys');
const MONGODB_URI = keys.MONGODB_URI;

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'views');

const fileStorage = multer.diskStorage({
  destination : "products/",
  filename : function(req,file,cb){
      cb(null,file.fieldname + "-" + uuid.v4() + path.extname(file.originalname));
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/JPG' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload =  multer({ storage: fileStorage, fileFilter: fileFilter }).array('image',4);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/products', express.static(path.join(__dirname, 'products')));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array('image',4)
);


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
    secret: 'This is food shop',
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
var productRoutes = require("./routes/product")
var orderRoutes = require("./routes/order")

app.use(indexRoutes);
app.use(authRoutes);
app.use(productRoutes)
app.use(orderRoutes)

const port = 3000

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
