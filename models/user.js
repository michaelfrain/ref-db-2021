const mongoose = require('mongoose');

const User = mongoose.model('User', { name: String });

function createNewUser(name) {
    const newUser = new User({ name: name });
    newUser.save();
    console.log("New user created");
}