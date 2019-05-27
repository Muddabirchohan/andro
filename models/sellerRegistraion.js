
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, "name fields is required"]
    },
 
    email: {
        type: String,
        required: [true, "name fields is required"]
    },
    password: {
        type: String,
        required: [true, "password fields is required"]
    },
    })

const User = mongoose.model('user' ,UserSchema);
module.exports = User;


