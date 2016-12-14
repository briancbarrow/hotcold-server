const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GuessSchema = new Schema({
    fewest: Number
});

module.exports = mongoose.model('FewestGuesses', GuessSchema)
