const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({ 
    firstName: String,
    secondName: String
});

module.exports = mongoose.model('Team', Team);