//const http = require('http');
//const app = require('./index');
const express = require('express');
const registerUser = require('./routes/sellerRegistrations');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.port || 7000;
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const upload = multer({ dest : '/uploads/'});
const cors = require('cors');
require("dotenv").config();

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
app.use(express.static('public'));

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

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://zain:capricorn63@wmc-phczt.mongodb.net/test?retryWrites=true' || 'mongodb://localhost/wmc' ,{ useMongoClient: true });
mongoose.Promise = global.Promise;

//const server = http.createServer(app);

app.listen(port,function(){
    console.log("now listening for requests");
})



