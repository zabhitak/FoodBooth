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

const Emitter = require('events')



dotenv.config();

const keys = require('./keys');
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();


const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)
var http = require("http").createServer(app);

const server = app.listen(3000 , () => {
  console.log(`Listening on port 3000`)
})


var io = require('socket.io')(server);

io.on('connection', socket => {
});


eventEmitter.on('orderPlaced', (data) => {
  io.sockets.emit("orderReceived", data);
})


eventEmitter.on('sendForDelivery', (data) => {
  io.sockets.emit("sentForDelivery", data);
})


eventEmitter.on('cancelOrder', (data) => {
  io.sockets.emit("cancelledOrder", data);
})

eventEmitter.on('confirmDelivery', (data) => {
  io.sockets.emit("confirmedDelivery", data);
})

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
const Admin = require("./routeModels/admin/Admin")

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

passport.use("user" ,new LocalStratergy(User.authenticate()))
passport.use("admin" ,new LocalStratergy(Admin.authenticate()))

passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    if(user!=null)
        done(null,user);
}); 

var indexRoutes = require('./routes/index');
var authRoutes = require('./routes/auth');
var productRoutes = require("./routes/product")
var orderRoutes = require("./routes/order")
var adminRoutesAuth = require("./routes/adminAuth")
var adminIndexRoutes = require("./routes/adminRoutes")
var adminProductRoutes = require("./routes/adminProductRoutes")
var adminOrderRoutes = require("./routes/adminOrderRoutes")

app.use(indexRoutes);
app.use(authRoutes);
app.use(productRoutes)
app.use(orderRoutes)
app.use("/admin",adminRoutesAuth)
app.use("/admin",adminIndexRoutes)
app.use("/admin",adminOrderRoutes)
app.use(adminProductRoutes)


const port = 3000

// http.listen(port, function () {
//   console.log("Server connected at " + port);    
// });