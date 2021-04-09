// Quest Schema model 

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const questSchema = new Schema({  
    
    questName: {
        type: String,  
        required: [true, 'Quest name is required'],
        unique: [true, 'Quest name has already been taken'] 
      },
    hostUser: {
        type: String,
        required: [true, 'Host username is required']
        },
    nature: {
        type: String,
        required: [true, 'Nature of contest is required'],
        enum: ['public', 'private']
    },
    description: {
        type: String,
        required: [true, 'Description has not been provided'],
        maxlength: [50, 'Exceeded limit of 50 characters']
    },
    startTime: {
        type: Date, 
        required: [true, 'Start time has not been specified'] 
    },
    endTime: {
        type: Date, 
        required: [true, 'End time has not been specified']  
    },
    logo: {
        type: Buffer
    }
}, // Schema completed 
{timestamps: true} // Add timestamp property
);

//Export function to create "questSchema" model class
module.exports = mongoose.model('quest', questSchema);