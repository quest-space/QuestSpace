// Rating Schema model 

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    hostUser: {
        type: String,
        required: [true, 'Host username is required']
    },
    participantUser: {
        type: String,
        required: [true, 'Participant username is required']
    },
    score: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        required: [true, 'Host rating is required']
    }
});

// Export function to create "ratingSchema" model class
module.exports = mongoose.model('ratings', ratingSchema);