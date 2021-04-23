// Submissions Schema model 

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const submissionSchema = new Schema({  
    
    questName: {
        type: String,  
        required: [true, 'Quest name is required'],
      },
    roundNum: {
        type: Number  
      },
    participantUser: {
        type: String,
        required: [true, 'Participant name is required']
    },
    roundScore: {
        type: Number
    },
    numOfQsSent: {
        type: Number
    },
    answeredTill: {
        type: Number
    },
    beginTime: {
        type: Date
    },
    expireTime: {
        type: Date
    },
    isAttemptFinished: {
        type: Boolean,
        default: false
    },
    fileURL: {
        type: String
    }

});

//Export function to create "submissionSchema" model class
module.exports = mongoose.model('Submissions', submissionSchema);