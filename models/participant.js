// Participant Schema model 

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  username: {
    type: String,   
    required: [true, 'Username is required'], 
    unique: [true, 'Username has already been taken'] 
  },
  password: {
    type: String,
    required: [true, 'Password is required'], 
    minlength: [7, 'Password should be atleast 7 characters long'] 
  },
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    validate: [/^[A-Za-z]+$/, 'First name should have alphabets only']
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    validate: [/^[A-Za-z]+$/, 'Last name should have alphabets only']
  },
  organization: {
    type: String,
    required: [true, 'Organization is required']
  }
});

//Export function to create "hostSchema" model class
module.exports = mongoose.model('participants', participantSchema);