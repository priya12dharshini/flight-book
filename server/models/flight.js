const mongoose = require('mongoose')
const {Schema} = mongoose

const flightSchema = new Schema({
    flightNumber: String,
    source: String,
    destination: String,
    date: Date,
  
});

const FlightModel = mongoose.model('Flight', flightSchema);

module.exports = FlightModel;