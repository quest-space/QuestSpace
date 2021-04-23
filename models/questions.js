// Question Schema model 

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questName: {
        type: String,
        required: [true, 'Quest name is required']
    },
    roundNum: {
        type: Number  
    },
    roundName: {
        type: String,
        required: [true, 'Round name is required']
    },
    // auto-increment
    questionNum: {
        type: Number,
    },
    questionType: {
        type: String,
        required: [true, 'Question type is required'],
        enum: ['MCQ', 'Numeric']
    },
    statement: {
        type: String,
        required: [true, 'Question statement is required'],
        maxlength: 200
    },
    options: {
        type: [Schema.Types.Mixed], // could be both Number of String
    },
    answer: {
        type: Schema.Types.Mixed,
        required: [true, 'Correct answer is required']
    },
    imageURL: {
        type: String,
        default: ""
    }
});

//Export function to create "questionSchema" model class
module.exports = mongoose.model('question', questionSchema);