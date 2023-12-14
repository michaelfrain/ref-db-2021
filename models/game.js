const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team');
const User = require('./user');
const Play = require('./play');

const Game = new Schema({ 
    gameNumber: Number,
    date: Date,
    homeTeam: Team,
    visitorTeam: Team,
    homeScore: Number,
    visitorScore: Number,
    televised: {
        type: Boolean,
        default: false
    },
    startTime: Date,
    regEndTime: Date,
    otEndTime: Date,
    overtime: {
        type: Boolean,
        default: false
    },
    numberOfOvertimes: {
        type: Number,
        default: 0
    },
    gradedPlays: [Play],
    officials: [User]
});

module.exports = mongoose.model('Game', Game);