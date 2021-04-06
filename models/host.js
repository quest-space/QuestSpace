// Host Schema model 

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const hostSchema = new Schema({
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
  organization: {
    type: String,
    required: [true, 'Organization is required']
  },
  phone: {
    type: Number, 
    require: [true, 'Phone number is required'], 
  },
  rating: {
    type: Schema.Types.ObjectId,
    ref: 'rating'
  },
  quest: {
    type: Schema.Types.ObjectId,
    ref: 'quest'
  }

});

//Export function to create "hostSchema" model class
module.exports = mongoose.model('host', hostSchema);