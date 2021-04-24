// Rounds Schema model 

// api/participant/quest/:questid/:roundnum/attempt // if body is empty (give round details and begin button here)
// api/participant/quest/:questid/:roundnum/attempt // body: { action: `begin` } -> { question: {} }
// api/participant/quest/:questid/:roundnum/attempt // body: { answer: {  } } -> next question/quiz done
// api/participant/quest/:questid/:roundnum/leaderboard

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const roundSchema = new Schema({
    questName: {
        type: String,
        required: [true, 'Quest name is required'],
    },
    roundName: {
        type: String,
        required: [true, 'Round name is required']
    },
    // round number
    roundNum: {
        type: Number,
    },
    roundType: {
        type: String,
        required: [true, 'Round type is required'],
        enum: ['Rapid Fire', 'Quiz', 'Submission']
    },
    description: {
        type: String,
        required: [true, 'Description has not been provided'],
        maxlength: [150, 'Exceeded limit of 150 characters']
    },
    startTime: {
        type: Date, 
        required: [true, 'Start time has not been specified'] 
    },
    endTime: {
        type: Date, 
        required: [true, 'End time has not been specified']  
    },
    timer: {
        type: Number,
        min: 30,
        max: 300,
        default: 30 
    },
    // Parts per question for rapid fire and quiz-based round and for submission as well now.
    eachMarks: {
        type: Number, 
        default: 1
    },
    // Marks for submission-based round only
    totalMarks: {
        type: Number,
    },
    numQuestions: {
        type: Number,
        default: 0
    },
    Image: {
        type: Buffer
    }
});

//Export function to create "roundSchema" model class
// roundSchema.plugin(autoIncrement.plugin, 'Counter');
module.exports = mongoose.model('rounds', roundSchema);