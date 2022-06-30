const mongoose = require('mongoose');

const User = mongoose.model('User', { username: String, password: String });

function createNewUser(username, password) {
    const newUser = new User({ username: username, password: password });
    newUser.save();
    console.log("New user created");
}