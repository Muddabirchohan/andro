const express = require('express');
const app = express();
const registerUser = require('./api/routes/sellerRegistrations');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest : '/uploads/'});
const cors = require('cors');


mongoose.connect('mongodb://localhost/wmc' ,{ useMongoClient: true });
mongoose.Promise = global.Promise;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


    app.use(allowCrossDomain);
    

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
app.use(express.static('uploads'));

app.use("/users", registerUser );

// app.use("/forgot",ForgotPassword);

app.use(cors({
    methods: ['GET','POST','PUT','PATCH'],
    credentials: true, origin: true,
}))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use((req,res,next)=> {
  const error = new Error('Not Found');
  error.status = 404;
  next(error)
})


app.use((error,req,res,next)=> {
    res.status(error.status || 7000);
    res.json({
        error: {
        message: error.message
        }
    })
})


module.exports = app;


