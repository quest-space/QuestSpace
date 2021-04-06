// Participation Schema model 

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const participationSchema = new Schema({  
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'participant'
    },
    quest: {
        type: Schema.Types.ObjectId,
        ref: 'quest'
    }
});

//Export function to create " participationSchema" model class
module.exports = mongoose.model('participation',  participationSchema);