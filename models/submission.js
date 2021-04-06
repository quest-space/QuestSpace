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
        type: Number,
        required:  [true, 'Score is required']
    },
    answeredTill: {
        type: Number
    },
    file: Buffer

});

//Export function to create "submissionSchema" model class
module.exports = mongoose.model('Submissions', submissionSchema);