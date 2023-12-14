const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team');
const User = require('./user');

const Play = new Schema({ 
    entry: {
        type: String,
        enum: ["Foul", "Special", "Comment", "Feigning Injury"]
    },
    quarter: Number,
    time: {
        minutes: Number,
        seconds: Number
    },
    playType: {
        type: String,
        enum: ["Dead Ball", "FG", "Free Kick", "None", "Pass", "Punt", "Run", "Try"]
    },
    playVideoNumber: Number,
    foulCode: String,
    category: String,
    acceptDecline: String,
    offenseDefense: String,
    team: Team,
    player: [Number],
    officialsCalling: [User],
    description: String,
    grade: String,
    comment: String
});