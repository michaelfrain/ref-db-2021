const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({ 
    firstname: String, 
    lastname: String, 
    email: String, 
    password: String, 
    userLevel: {
        type: String,
        enum: ['guest', 'official', 'admin'],
        default: 'guest'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed'],
        default: 'pending'
    }
});

const options = {usernameField: 'email'};

User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', User);