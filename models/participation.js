// Participation Schema model 

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const participationSchema = new Schema({  
    participantUser: {
        type: String,
        required: ['true', 'Participant username is required']
        
    },
    questName: {
        type: String,
        required: ['true', 'Quest name is required']
    }
},
{timestamps: true} // Add timestamp property
);

//Export function to create " participationSchema" model class
module.exports = mongoose.model('participation',  participationSchema);