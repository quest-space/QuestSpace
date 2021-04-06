// Quest Schema model 

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const questSchema = new Schema({  
    
    questName: {
        type: String,  
        required: [true, 'Quest name is required'],
        // unique: [true, 'Quest name has already been taken'] 
      },
    hostUser: {
        type: String,
        required: [true, 'Host name is required']
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
    createTime: {
        type: Date, 
        default: Date.now() 
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
        type: Buffer,
        required: [true, 'Logo has not been added']
    },
});

//Export function to create "questSchema" model class
module.exports = mongoose.model('quest', questSchema);