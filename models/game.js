const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team');
const User = require('./user')

const Game = new Schema({ 
    homeTeam: Team,
    visitingTeam: Team,
    gameDateTime: Date,
    officials: [User]
});

module.exports = mongoose.model('Game', Game);