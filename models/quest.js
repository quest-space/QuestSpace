// Quest Schema model 

//Require Mongoose
const mongoose = require('mongoose');
const { getImgUploadURL } = require('../routes/helpers/imgUploadHelper');

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
    about: {
        type: String,
        required: [true, 'About has not been provided'],
        maxlength: [300, 'Exceeded limit of 300 characters']
    },
    startTime: {
        type: Date, 
        required: [true, 'Start time has not been specified'] 
    },
    endTime: {
        type: Date, 
        required: [true, 'End time has not been specified']  
    },
    logoURL: {
        type: String,
        required: [true, 'Logo is required']  
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected', 'pending'],
        default: 'pending'
    },
    numRounds: {
        type: Number,
        default: 0
    }
}, // Schema completed 
{timestamps: true} // Add timestamp property
);

//Export function to create "questSchema" model class
module.exports = mongoose.model('quest', questSchema);